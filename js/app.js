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

// ── Small inline icons (no external asset/font dependency) ──
const ICON_AREA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 3v4M16 3v4M3 8h4M3 16h4"/></svg>';
const ICON_DOOR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="1"/><circle cx="14.5" cy="12" r="1" fill="currentColor" stroke="none"/></svg>';
const ICON_HOUSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>';

// ── Lightbox (xem ảnh to, vanilla — không thêm thư viện) ────
function openLightbox(url) {
  if (!url) return;
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.onclick = () => overlay.remove();
  overlay.innerHTML = `<img src="${url}" alt="" onclick="event.stopPropagation()">`;
  document.body.appendChild(overlay);
}

let PROPERTIES = [];
let ROOMS = [];
let WARDS = [];
let DISTRICTS = {};
let filters = { propertyId: '', status: 'trong', propertyType: 'phong_tro', priceFrom: 0, priceTo: 1000000000, district: 'Quận 7', ward: '', q: '' };

const PRICE_BUCKETS = [
  { key: 'lt3', label: '< 3tr', from: 0, to: 2999999 },
  { key: '3_4', label: '3tr - 4tr', from: 3000000, to: 3999999 },
  { key: '4_5', label: '4tr - 5tr', from: 4000000, to: 4999999 },
  { key: '5_6', label: '5tr - 6tr', from: 5000000, to: 5999999 },
  { key: 'gt6', label: '> 6tr', from: 6000000, to: 1000000000 }
];

function setFilterType(v) { filters.propertyType = v; render(); }
function setFilterPrice() {
  filters.priceFrom = Number(document.getElementById('filterPriceFrom').value) || 0;
  filters.priceTo = Number(document.getElementById('filterPriceTo').value) || 1000000000;
  render();
}
function setFilterWard(v) {
  const opts = DISTRICTS[filters.district] || [];
  const found = opts.find(o => o.label === v);
  filters.ward = found ? found.match : v.trim();
  render();
}
function onDistrictChange(v) {
  filters.district = v;
  filters.ward = '';
  document.getElementById('filterWardInput').value = '';
  populateWardList();
  render();
}
function populateWardList() {
  const opts = DISTRICTS[filters.district] || [];
  document.getElementById('wardList').innerHTML = opts.map(o => `<option value="${o.label}">`).join('');
}

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

function fullAddress(prop) {
  const parts = [prop.soNha, prop.ward];
  if (prop.quan) parts.push(prop.quan);
  parts.push(prop.city);
  return parts.filter(Boolean).join(', ');
}

function matchesBaseFilters(prop, room, opts) {
  opts = opts || {};
  if (filters.propertyId && prop.id !== filters.propertyId) return false;
  if (filters.propertyType && (prop.propertyType || 'phong_tro') !== filters.propertyType) return false;
  if (filters.ward && (prop.ward || '') !== filters.ward) return false;
  if (!opts.skipStatus && filters.status && room.status !== filters.status) return false;
  if (!opts.skipPrice && (room.priceMonthly < filters.priceFrom || room.priceMonthly > filters.priceTo)) return false;
  const q = filters.q.trim().toLowerCase();
  if (q && !(room.code.toLowerCase().includes(q) || prop.soNha.toLowerCase().includes(q))) return false;
  return true;
}

function renderDashboard() {
  const el = document.getElementById('miniDashboard');
  const statusCounts = { trong: 0, da_thue: 0, dang_giu_cho: 0 };
  const bucketCounts = {};
  PRICE_BUCKETS.forEach(b => bucketCounts[b.key] = 0);

  ROOMS.forEach(r => {
    const prop = PROPERTIES.find(p => p.id === r.propertyId);
    if (!prop) return;
    if (matchesBaseFilters(prop, r, { skipStatus: true })) {
      statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
    }
    if (matchesBaseFilters(prop, r, { skipPrice: true })) {
      const b = PRICE_BUCKETS.find(bb => r.priceMonthly >= bb.from && r.priceMonthly <= bb.to);
      if (b) bucketCounts[b.key]++;
    }
  });

  const statusHtml = `
    <div class="dash-row">
      ${['trong','da_thue','dang_giu_cho'].map(s => `
        <div class="dash-chip ${filters.status === s ? 'active' : ''}" onclick="setFilterStatus('${s}')">
          ${STATUS_LABEL[s]}<span class="n">${statusCounts[s]}</span>
        </div>
      `).join('')}
      <div class="dash-chip ${filters.status === '' ? 'active' : ''}" onclick="setFilterStatus('')">Tất cả<span class="n">${statusCounts.trong + statusCounts.da_thue + statusCounts.dang_giu_cho}</span></div>
    </div>`;

  const currentBucket = PRICE_BUCKETS.find(b => b.from === filters.priceFrom && b.to === filters.priceTo);
  const priceHtml = `
    <div class="dash-row">
      ${PRICE_BUCKETS.map(b => `
        <div class="dash-chip ${currentBucket && currentBucket.key === b.key ? 'active' : ''}" onclick="setPriceBucket('${b.key}')">
          ${b.label}<span class="n">${bucketCounts[b.key]}</span>
        </div>
      `).join('')}
    </div>`;

  el.innerHTML = statusHtml + priceHtml;
}

function setFilterStatus(v) { filters.status = v; render(); }
function setPriceBucket(key) {
  const b = PRICE_BUCKETS.find(x => x.key === key);
  if (!b) return;
  filters.priceFrom = b.from;
  filters.priceTo = b.to;
  document.getElementById('filterPriceFrom').value = b.from;
  document.getElementById('filterPriceTo').value = b.to;
  render();
}

// ── Render ────────────────────────────────────────────────
function render() {
  renderDashboard();
  const el = document.getElementById('main-content');
  const propSelect = document.getElementById('filterProperty');
  propSelect.innerHTML = '<option value="">Tất cả nhà</option>' +
    PROPERTIES.map(p => `<option value="${p.id}" ${filters.propertyId === p.id ? 'selected' : ''}>${p.soNha}</option>`).join('');

  renderPropertyActionsBar();

  // Danh sách phẳng: không gộp theo nhà, chỉ trả về các phòng khớp tiêu chí
  const matchedRooms = [];
  ROOMS.forEach(r => {
    const prop = PROPERTIES.find(p => p.id === r.propertyId);
    if (!prop) return;
    if (!matchesBaseFilters(prop, r)) return;
    matchedRooms.push({ room: r, prop });
  });

  // Sắp theo nhà (địa chỉ) rồi tầng/mã, để các phòng cùng nhà vẫn đứng gần nhau dù không có tiêu đề gộp
  matchedRooms.sort((a, b) => {
    const byAddr = a.prop.soNha.localeCompare(b.prop.soNha);
    if (byAddr !== 0) return byAddr;
    return String(a.room.floor).localeCompare(String(b.room.floor)) || a.room.code.localeCompare(b.room.code);
  });

  document.getElementById('roomCount').textContent = matchedRooms.length;

  if (!matchedRooms.length) {
    el.innerHTML = '<div class="empty-state">Không tìm thấy phòng phù hợp bộ lọc.</div>';
    return;
  }

  el.innerHTML = `
    <div class="room-grid">
      ${matchedRooms.map(({ room: r, prop }) => {
        const images = (r.images && r.images.length) ? r.images : [];
        const hasImg = images.length > 0;
        const imagesAttr = hasImg ? JSON.stringify(images).replace(/'/g, '&#39;') : '[]';
        return `
        <div class="room-card">
          <div class="room-card-img${hasImg ? '' : ' placeholder'}" data-idx="0" data-images='${imagesAttr}'${hasImg ? ` onclick="event.stopPropagation(); openLightboxFromCard(this)"` : ''}>
            <span class="status-pill status-${r.status}">${STATUS_LABEL[r.status]}</span>
            ${hasImg ? `<img src="${images[0]}" alt="${r.code}" loading="lazy">` : ICON_HOUSE}
            ${images.length > 1 ? `
              <button class="cs-arrow cs-prev" onclick="event.stopPropagation(); slideRoomImg(this, -1)">‹</button>
              <button class="cs-arrow cs-next" onclick="event.stopPropagation(); slideRoomImg(this, 1)">›</button>
              <div class="cs-dots">${images.map((_, i) => `<span class="cs-dot${i === 0 ? ' active' : ''}" onclick="event.stopPropagation(); setRoomImg(this, ${i})"></span>`).join('')}</div>
            ` : ''}
          </div>
          <div class="room-card-body">
            <div onclick="openRoomModal('${r.id}')">
              <div class="room-addr">${prop.soNha}</div>
              <div class="floor">${r.floor}</div>
              <div class="code">${r.code}</div>
              <div class="meta">
                <span class="meta-item">${ICON_AREA}${r.areaM2}m²</span>
                <span class="meta-item">${ICON_DOOR}${ROOM_TYPE_LABEL[r.roomType] || r.roomType}</span>
              </div>
            </div>
            <div class="room-card-foot">
              <div class="price">${fmtPrice(r.priceMonthly)}/tháng</div>
              <button class="btn btn-sm" onclick="exportRoom('${r.id}')">Xuất PDF</button>
            </div>
          </div>
        </div>
      `;
      }).join('')}
    </div>
  `;
}

// ── Card image slideshow (vanilla, no library) ───────────
function slideRoomImg(btn, dir) {
  const wrap = btn.closest('.room-card-img');
  const images = JSON.parse(wrap.dataset.images);
  if (!images.length) return;
  let idx = (parseInt(wrap.dataset.idx, 10) + dir + images.length) % images.length;
  wrap.dataset.idx = idx;
  wrap.querySelector('img').src = images[idx];
  wrap.querySelectorAll('.cs-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}
function setRoomImg(dot, idx) {
  const wrap = dot.closest('.room-card-img');
  const images = JSON.parse(wrap.dataset.images);
  wrap.dataset.idx = idx;
  wrap.querySelector('img').src = images[idx];
  wrap.querySelectorAll('.cs-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}
function openLightboxFromCard(el) {
  const images = JSON.parse(el.dataset.images || '[]');
  const idx = parseInt(el.dataset.idx || '0', 10);
  if (images.length) openLightbox(images[idx]);
}

function renderPropertyActionsBar() {
  const bar = document.getElementById('propertyActionsBar');
  if (!bar) return;
  if (!filters.propertyId) { bar.innerHTML = ''; return; }
  const prop = PROPERTIES.find(p => p.id === filters.propertyId);
  if (!prop) { bar.innerHTML = ''; return; }
  bar.innerHTML = `
    <div class="addr">${fullAddress(prop)}</div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-sm" onclick="openPropertyModal('${prop.id}')">Sửa nhà</button>
      <button class="btn btn-sm" onclick="exportProperty('${prop.id}')">Xuất PDF cả nhà</button>
    </div>
  `;
}
// ── Filters ───────────────────────────────────────────────
function setFilterProperty(v) { filters.propertyId = v; render(); }
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
        <label>Thuộc nhà</label>
        <select id="f_propertyId">
          ${PROPERTIES.map(p => `<option value="${p.id}" ${((room && room.propertyId === p.id) || presetPropertyId === p.id) ? 'selected' : ''}>${p.soNha}</option>`).join('')}
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
      <h2>${prop ? 'Sửa nhà: ' + prop.soNha : 'Thêm nhà mới'}</h2>
      <div class="form-row">
        <label>Loại hình</label>
        <select id="pf_propertyType">
          <option value="phong_tro" ${!prop || prop.propertyType === 'phong_tro' ? 'selected' : ''}>Phòng trọ</option>
          <option value="can_ho" ${prop && prop.propertyType === 'can_ho' ? 'selected' : ''}>Căn hộ</option>
        </select>
      </div>
      <div class="form-row">
        <label>Số nhà / Địa chỉ chi tiết *</label>
        <input id="pf_soNha" value="${prop ? prop.soNha : ''}" placeholder="CHDV Lô C6, Khu dân cư Nam Long, Khu phố 2">
        <div class="field-error" id="err_soNha">Bắt buộc nhập số nhà/địa chỉ</div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>Phường/Xã</label>
          <input id="pf_ward" list="wardList" value="${prop ? prop.ward : ''}">
        </div>
        <div class="form-row">
          <label>Quận (địa chỉ cũ, thường để trống)</label>
          <input id="pf_quan" value="${prop ? prop.quan || '' : ''}" placeholder="Để trống nếu địa chỉ mới">
        </div>
      </div>
      <div class="form-row">
        <label>Tỉnh/Thành phố</label>
        <input id="pf_city" value="${prop ? prop.city : 'Thành phố Hồ Chí Minh'}">
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
        ${prop ? `<button class="btn btn-danger" onclick="deleteProperty('${prop.id}')">Xoá nhà</button>` : ''}
        <button class="btn" onclick="closeModal('propertyModalOverlay')">Đóng</button>
        <button class="btn btn-primary" onclick="saveProperty(${prop ? `'${prop.id}'` : 'null'})">Lưu</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function validatePropertyForm() {
  let ok = true;
  const soNha = document.getElementById('pf_soNha').value.trim();
  document.getElementById('err_soNha').style.display = soNha ? 'none' : 'block';
  if (!soNha) ok = false;
  return ok;
}

function saveProperty(propertyId) {
  if (!validatePropertyForm()) return;
  const split = id => document.getElementById(id).value.split('\n').map(s => s.trim()).filter(Boolean);
  const payload = {
    propertyType: document.getElementById('pf_propertyType').value,
    soNha: document.getElementById('pf_soNha').value.trim(),
    ward: document.getElementById('pf_ward').value.trim(),
    quan: document.getElementById('pf_quan').value.trim(),
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
  if (!confirm('Xoá nhà này? Không thể hoàn tác. (phải xoá hết phòng bên trong trước)')) return;
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
  try {
    WARDS = await fetch('data/wards_hcm.json').then(r => r.json());
    DISTRICTS = await fetch('data/districts_hcm.json').then(r => r.json());
    const districtSelect = document.getElementById('filterDistrict');
    districtSelect.innerHTML = Object.keys(DISTRICTS).map(d => `<option value="${d}" ${d === filters.district ? 'selected' : ''}>${d}</option>`).join('');
    populateWardList();
  } catch (e) { /* danh sach quan/phuong khong tai duoc, khong chan render chinh */ }
  render();
})();
