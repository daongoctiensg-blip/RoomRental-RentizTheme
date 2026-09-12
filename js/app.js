const STATUS_LABEL = {
  trong: 'Còn trống',
  da_thue: 'Đã thuê',
  dang_giu_cho: 'Đang giữ chỗ'
};
const ROOM_TYPE_LABEL = {
  ban_cong: 'Ban công',
  ben_trong: 'Bên trong'
};
const VALID_STATUS = Object.keys(STATUS_LABEL);
const VALID_ROOM_TYPE = Object.keys(ROOM_TYPE_LABEL);

let PROPERTIES = [];
let ROOMS = [];
let filters = { propertyId: '', status: '', q: '' };

async function loadData() {
  const data = await storeLoad();
  PROPERTIES = data.properties;
  ROOMS = data.rooms;
}

function persist() {
  storePersist(PROPERTIES, ROOMS);
}

function fmtPrice(n) {
  return Number(n).toLocaleString('vi-VN') + 'đ';
}

// ── Render ────────────────────────────────────────────────
function render() {
  const el = document.getElementById('main-content');
  const propSelect = document.getElementById('filterProperty');
  propSelect.innerHTML = '<option value="">Tất cả khu</option>' +
    PROPERTIES.map(p => `<option value="${p.id}" ${filters.propertyId === p.id ? 'selected' : ''}>${p.name}</option>`).join('');

  const q = filters.q.trim().toLowerCase();
  const visibleProperties = PROPERTIES.filter(p => !filters.propertyId || p.id === filters.propertyId);

  if (!visibleProperties.length) {
    el.innerHTML = '<div class="empty-state">Chưa có khu/property nào. Bấm "+ Thêm khu" để bắt đầu.</div>';
    document.getElementById('roomCount').textContent = 0;
    return;
  }

  let html = '';
  let totalShown = 0;

  visibleProperties.forEach(prop => {
    let rooms = ROOMS.filter(r => r.propertyId === prop.id);
    if (filters.status) rooms = rooms.filter(r => r.status === filters.status);
    if (q) {
      rooms = rooms.filter(r =>
        r.code.toLowerCase().includes(q) ||
        prop.name.toLowerCase().includes(q) ||
        prop.address.toLowerCase().includes(q)
      );
    }
    if (!rooms.length) return;
    totalShown += rooms.length;

    html += `
      <div class="property-block">
        <div class="property-head">
          <div>
            <h2>${prop.name}</h2>
            <div class="addr">${prop.address}, ${prop.ward}, ${prop.city}</div>
          </div>
          <div class="property-actions">
            <button class="btn btn-sm" onclick="openPropertyModal('${prop.id}')">Sửa khu</button>
            <button class="btn btn-sm" onclick="openRoomModal(null, '${prop.id}')">+ Thêm phòng</button>
            <button class="btn btn-sm" onclick="exportProperty('${prop.id}')">Xuất PDF cả khu</button>
          </div>
        </div>
        <div class="room-grid">
          ${rooms.map(r => `
            <div class="room-card">
              <span class="status-pill status-${r.status}">${STATUS_LABEL[r.status]}</span>
              <div onclick="openRoomModal('${r.id}')">
                <div class="floor">${r.floor}</div>
                <div class="code">${r.code}</div>
                <div class="meta">${ROOM_TYPE_LABEL[r.roomType] || r.roomType} · ${r.areaM2}m²</div>
                <div class="price">${fmtPrice(r.priceMonthly)}/tháng</div>
              </div>
              <button class="btn btn-sm" style="margin-top:8px;" onclick="exportRoom('${r.id}')">Xuất PDF phòng này</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  document.getElementById('roomCount').textContent = totalShown;
  el.innerHTML = html || '<div class="empty-state">Không tìm thấy phòng phù hợp bộ lọc.</div>';
}

// ── Filters ───────────────────────────────────────────────
function setFilterProperty(v) { filters.propertyId = v; render(); }
function setFilterStatus(v) { filters.status = v; render(); }
function setSearch(v) { filters.q = v; render(); }

// ── Room modal (add/edit) ────────────────────────────────
function openRoomModal(roomId, presetPropertyId) {
  const room = roomId ? ROOMS.find(r => r.id === roomId) : null;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'roomModalOverlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <h2>${room ? 'Sửa phòng ' + room.code : 'Thêm phòng mới'}</h2>
      <div class="form-row">
        <label>Thuộc khu</label>
        <select id="f_propertyId">
          ${PROPERTIES.map(p => `<option value="${p.id}" ${((room && room.propertyId === p.id) || presetPropertyId === p.id) ? 'selected' : ''}>${p.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>Tầng</label>
          <input id="f_floor" value="${room ? room.floor : ''}" placeholder="Trệt / Lầu 1...">
        </div>
        <div class="form-row">
          <label>Mã phòng *</label>
          <input id="f_code" value="${room ? room.code : ''}" placeholder="T002">
          <div class="field-error" id="err_code">Bắt buộc nhập mã phòng</div>
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>Loại phòng</label>
          <select id="f_roomType">
            <option value="ben_trong" ${room && room.roomType === 'ben_trong' ? 'selected' : ''}>Bên trong</option>
            <option value="ban_cong" ${room && room.roomType === 'ban_cong' ? 'selected' : ''}>Ban công</option>
          </select>
        </div>
        <div class="form-row">
          <label>Diện tích (m²)</label>
          <input id="f_areaM2" type="number" value="${room ? room.areaM2 : ''}">
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>Giá thuê/tháng *</label>
          <input id="f_priceMonthly" type="number" value="${room ? room.priceMonthly : ''}" placeholder="6200000">
          <div class="field-error" id="err_price">Bắt buộc nhập giá &gt; 0</div>
        </div>
        <div class="form-row">
          <label>Trạng thái</label>
          <select id="f_status">
            <option value="trong" ${room && room.status === 'trong' ? 'selected' : ''}>Còn trống</option>
            <option value="da_thue" ${room && room.status === 'da_thue' ? 'selected' : ''}>Đã thuê</option>
            <option value="dang_giu_cho" ${room && room.status === 'dang_giu_cho' ? 'selected' : ''}>Đang giữ chỗ</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <label>Ảnh (mỗi dòng 1 link, có thể để trống)</label>
        <textarea id="f_images">${room ? (room.images || []).join('\n') : ''}</textarea>
      </div>
      <div class="form-row">
        <label>Ghi chú</label>
        <textarea id="f_notes">${room ? room.notes || '' : ''}</textarea>
      </div>
      <div class="modal-actions">
        ${room ? `<button class="btn btn-danger" onclick="deleteRoom('${room.id}')">Xoá phòng</button>` : ''}
        <button class="btn" onclick="closeModal('roomModalOverlay')">Đóng</button>
        <button class="btn btn-primary" onclick="saveRoom(${room ? `'${room.id}'` : 'null'})">Lưu</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function validateRoomForm() {
  let ok = true;
  const code = document.getElementById('f_code').value.trim();
  const price = Number(document.getElementById('f_priceMonthly').value);
  document.getElementById('err_code').style.display = code ? 'none' : 'block';
  document.getElementById('err_price').style.display = price > 0 ? 'none' : 'block';
  if (!code) ok = false;
  if (!(price > 0)) ok = false;
  return ok;
}

function saveRoom(roomId) {
  if (!validateRoomForm()) return;
  const payload = {
    propertyId: document.getElementById('f_propertyId').value,
    floor: document.getElementById('f_floor').value.trim(),
    code: document.getElementById('f_code').value.trim(),
    roomType: document.getElementById('f_roomType').value,
    areaM2: Number(document.getElementById('f_areaM2').value) || 0,
    priceMonthly: Number(document.getElementById('f_priceMonthly').value),
    status: document.getElementById('f_status').value,
    images: document.getElementById('f_images').value.split('\n').map(s => s.trim()).filter(Boolean),
    notes: document.getElementById('f_notes').value.trim()
  };
  if (!VALID_ROOM_TYPE.includes(payload.roomType) || !VALID_STATUS.includes(payload.status)) {
    alert('Loại phòng hoặc trạng thái không hợp lệ');
    return;
  }
  if (roomId) {
    const idx = ROOMS.findIndex(r => r.id === roomId);
    ROOMS[idx] = { ...ROOMS[idx], ...payload, id: roomId };
  } else {
    ROOMS.push({ id: genId('R', ROOMS), ...payload });
  }
  persist();
  closeModal('roomModalOverlay');
  render();
}

function deleteRoom(roomId) {
  if (!confirm('Xoá phòng này? Không thể hoàn tác.')) return;
  ROOMS = ROOMS.filter(r => r.id !== roomId);
  persist();
  closeModal('roomModalOverlay');
  render();
}

// ── Property modal (add/edit) ────────────────────────────
function openPropertyModal(propertyId) {
  const prop = propertyId ? PROPERTIES.find(p => p.id === propertyId) : null;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'propertyModalOverlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <h2>${prop ? 'Sửa khu: ' + prop.name : 'Thêm khu mới'}</h2>
      <div class="form-row">
        <label>Tên khu/tòa *</label>
        <input id="pf_name" value="${prop ? prop.name : ''}">
        <div class="field-error" id="err_name">Bắt buộc nhập tên</div>
      </div>
      <div class="form-row">
        <label>Địa chỉ *</label>
        <input id="pf_address" value="${prop ? prop.address : ''}">
        <div class="field-error" id="err_address">Bắt buộc nhập địa chỉ</div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>Phường/Xã</label>
          <input id="pf_ward" value="${prop ? prop.ward : ''}">
        </div>
        <div class="form-row">
          <label>Tỉnh/Thành phố</label>
          <input id="pf_city" value="${prop ? prop.city : ''}">
        </div>
      </div>
      <div class="form-row">
        <label>Số điện thoại liên hệ</label>
        <input id="pf_phone" value="${prop ? prop.phone : ''}">
      </div>
      <div class="form-row">
        <label>Tiện ích (mỗi dòng 1 ý)</label>
        <textarea id="pf_amenities">${prop ? (prop.amenities || []).join('\n') : ''}</textarea>
      </div>
      <div class="form-row">
        <label>Xung quanh / di chuyển (mỗi dòng 1 ý)</label>
        <textarea id="pf_nearby">${prop ? (prop.nearby || []).join('\n') : ''}</textarea>
      </div>
      <div class="form-row">
        <label>Chính sách cọc (mỗi dòng 1 ý)</label>
        <textarea id="pf_deposit">${prop ? (prop.depositPolicy || []).join('\n') : ''}</textarea>
      </div>
      <div class="form-row">
        <label>Chính sách hoa hồng (mỗi dòng 1 ý)</label>
        <textarea id="pf_commission">${prop ? (prop.commissionPolicy || []).join('\n') : ''}</textarea>
      </div>
      <div class="form-row">
        <label>Ghi chú</label>
        <textarea id="pf_notes">${prop ? prop.notes || '' : ''}</textarea>
      </div>
      <div class="modal-actions">
        ${prop ? `<button class="btn btn-danger" onclick="deleteProperty('${prop.id}')">Xoá khu</button>` : ''}
        <button class="btn" onclick="closeModal('propertyModalOverlay')">Đóng</button>
        <button class="btn btn-primary" onclick="saveProperty(${prop ? `'${prop.id}'` : 'null'})">Lưu</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function validatePropertyForm() {
  let ok = true;
  const name = document.getElementById('pf_name').value.trim();
  const address = document.getElementById('pf_address').value.trim();
  document.getElementById('err_name').style.display = name ? 'none' : 'block';
  document.getElementById('err_address').style.display = address ? 'none' : 'block';
  if (!name) ok = false;
  if (!address) ok = false;
  return ok;
}

function saveProperty(propertyId) {
  if (!validatePropertyForm()) return;
  const split = id => document.getElementById(id).value.split('\n').map(s => s.trim()).filter(Boolean);
  const payload = {
    name: document.getElementById('pf_name').value.trim(),
    address: document.getElementById('pf_address').value.trim(),
    ward: document.getElementById('pf_ward').value.trim(),
    city: document.getElementById('pf_city').value.trim(),
    phone: document.getElementById('pf_phone').value.trim(),
    amenities: split('pf_amenities'),
    nearby: split('pf_nearby'),
    depositPolicy: split('pf_deposit'),
    commissionPolicy: split('pf_commission'),
    notes: document.getElementById('pf_notes').value.trim()
  };
  if (propertyId) {
    const idx = PROPERTIES.findIndex(p => p.id === propertyId);
    PROPERTIES[idx] = { ...PROPERTIES[idx], ...payload, id: propertyId };
  } else {
    PROPERTIES.push({ id: genId('P', PROPERTIES), ...payload, promotion: null, utilityFees: {} });
  }
  persist();
  closeModal('propertyModalOverlay');
  render();
}

function deleteProperty(propertyId) {
  const hasRooms = ROOMS.some(r => r.propertyId === propertyId);
  if (hasRooms) {
    alert('Property này còn phòng bên trong — xoá hết phòng trước khi xoá property');
    return;
  }
  if (!confirm('Xoá khu này? Không thể hoàn tác.')) return;
  PROPERTIES = PROPERTIES.filter(p => p.id !== propertyId);
  persist();
  closeModal('propertyModalOverlay');
  filters.propertyId = '';
  render();
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function exportProperty(propertyId) {
  window.open(`export.html?type=property&id=${propertyId}`, '_blank');
}
function exportRoom(roomId) {
  window.open(`export.html?type=room&id=${roomId}`, '_blank');
}

async function resetSampleData() {
  if (!confirm('Xoá hết data hiện tại, nạp lại data mẫu ban đầu?')) return;
  const data = await storeResetToSample();
  PROPERTIES = data.properties;
  ROOMS = data.rooms;
  render();
}

// ── Init ──────────────────────────────────────────────────
(async function init() {
  await loadData();
  render();
})();
