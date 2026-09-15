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

// ── Icons cho label form (chỉ để dễ nhìn, không mang nghĩa) ──
const ICON_LBL_TYPE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>';
const ICON_LBL_PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.2"/></svg>';
const ICON_LBL_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6.5 3h3l1.2 4.5-2 1.5a13 13 0 0 0 6.3 6.3l1.5-2 4.5 1.2v3c0 1-.9 1.7-1.9 1.5C11.4 18 6 12.6 5 5.9 4.8 4.9 5.5 4 6.5 3z"/></svg>';
const ICON_LBL_AMENITY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"/><path d="M19 15l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9z"/></svg>';
const ICON_LBL_NEARBY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 5-5 2 2-5 5-2z"/></svg>';
const ICON_LBL_DEPOSIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M9.5 10c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.6c0 2.2-5 1.6-5 4 0 1 1 1.7 2.5 1.7s2.5-.7 2.5-1.6"/><path d="M12 6.5v11"/></svg>';
const ICON_LBL_COMMISSION = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><path d="M18 6 6 18"/></svg>';
const ICON_LBL_PROMO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 12 12 20 4 12l3-7h10l3 7z"/><path d="M4 12h16"/></svg>';
const ICON_LBL_NOTE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 3h9l3 3v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>';
const ICON_LBL_FLOOR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>';
const ICON_LBL_CODE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 3 7 21M17 3l-2 18M4 8h5M15 8h5M3 16h5M14 16h5"/></svg>';
const ICON_LBL_PRICE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.7c0 2.3-5 1.7-5 4.2 0 1 1 1.8 2.5 1.8s2.5-.8 2.5-1.7"/></svg>';
const ICON_LBL_STATUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 21V4l13 3-13 3"/></svg>';
const ICON_LBL_IMG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-5 4 4 3-3 4 4"/></svg>';
const ICON_LBL_ELECTRIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>';
const ICON_LBL_WATER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>';

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
let filters = { status: 'trong', propertyType: 'phong_tro', priceFrom: 0, priceTo: 1000000000, district: 'Quận 7', ward: '', q: '' };
let sortBy = 'default';

const PRICE_SLIDER_MAX = 15000000; // ngân sách slider chỉ hiện thực tế tới mức này, vượt mức = "không giới hạn"

const PRICE_BUCKETS = [
  { key: 'lt3', label: '< 3tr', from: 0, to: 2999999 },
  { key: '3_4', label: '3tr - 4tr', from: 3000000, to: 3999999 },
  { key: '4_5', label: '4tr - 5tr', from: 4000000, to: 4999999 },
  { key: '5_6', label: '5tr - 6tr', from: 5000000, to: 5999999 },
  { key: 'gt6', label: '> 6tr', from: 6000000, to: 1000000000 }
];

function onTypeCheckboxChange() {
  detailView = null;
  const phongTro = document.getElementById('ftypePhongTro').checked;
  const canHo = document.getElementById('ftypeCanHo').checked;
  if (phongTro && !canHo) filters.propertyType = 'phong_tro';
  else if (canHo && !phongTro) filters.propertyType = 'can_ho';
  else filters.propertyType = ''; // cả 2 hoặc không cái nào = tất cả
  render();
}

function onPriceRangeInput(changedId) {
  detailView = null;
  const minEl = document.getElementById('priceRangeMin');
  const maxEl = document.getElementById('priceRangeMax');
  let minV = Number(minEl.value), maxV = Number(maxEl.value);
  const gap = 200000; // khoảng cách tối thiểu giữa 2 nút kéo, tránh chồng lên nhau
  if (maxV - minV < gap) {
    if (changedId === 'priceRangeMin') minV = maxV - gap;
    else maxV = minV + gap;
    minEl.value = minV;
    maxEl.value = maxV;
  }
  filters.priceFrom = Math.max(0, minV);
  filters.priceTo = maxV >= PRICE_SLIDER_MAX ? 1000000000 : maxV;
  render();
}

function updatePriceSliderUI() {
  const minEl = document.getElementById('priceRangeMin');
  const maxEl = document.getElementById('priceRangeMax');
  if (!minEl || !maxEl) return;
  minEl.value = filters.priceFrom;
  maxEl.value = Math.min(filters.priceTo, PRICE_SLIDER_MAX);
  document.getElementById('priceFromLabel').textContent = fmtPrice(filters.priceFrom);
  document.getElementById('priceToLabel').textContent = filters.priceTo >= PRICE_SLIDER_MAX ? fmtPrice(PRICE_SLIDER_MAX) + '+' : fmtPrice(filters.priceTo);
  const fill = document.getElementById('priceFill');
  const leftPct = (Number(minEl.value) / PRICE_SLIDER_MAX) * 100;
  const rightPct = 100 - (Number(maxEl.value) / PRICE_SLIDER_MAX) * 100;
  fill.style.left = leftPct + '%';
  fill.style.right = rightPct + '%';
}

function syncFilterSidebarUI() {
  const pt = document.getElementById('ftypePhongTro');
  const ch = document.getElementById('ftypeCanHo');
  if (pt && ch) {
    pt.checked = filters.propertyType === 'phong_tro';
    ch.checked = filters.propertyType === 'can_ho';
  }
  updatePriceSliderUI();
}
function setFilterWard(v) {
  detailView = null;
  const opts = DISTRICTS[filters.district] || [];
  const found = opts.find(o => o.label === v);
  filters.ward = found ? found.match : v.trim();
  render();
}
function onDistrictChange(v) {
  detailView = null;
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

function isPromoActive(promo) {
  if (!promo || !promo.text) return false;
  const today = new Date().toISOString().slice(0, 10);
  if (promo.validFrom && today < promo.validFrom) return false;
  if (promo.validTo && today > promo.validTo) return false;
  return true;
}

// Phí điện/nước/dịch vụ: nhà có mức mặc định, phòng nào không tự đặt thì dùng theo nhà,
// phòng nào có đặt riêng thì ưu tiên giá trị của phòng cho đúng field đó.
function effectiveUtilityFees(prop, room) {
  const p = (prop && prop.utilityFees) || {};
  const r = (room && room.utilityFees) || {};
  return {
    electricity: r.electricity || p.electricity || '',
    water: r.water || p.water || '',
    service: r.service || p.service || ''
  };
}

function matchesBaseFilters(prop, room, opts) {
  opts = opts || {};
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

  const currentBucket = PRICE_BUCKETS.find(b => b.from === filters.priceFrom && b.to === filters.priceTo);

  el.innerHTML = `
    <div class="dash-row">
      ${['trong','da_thue','dang_giu_cho'].map(s => `
        <div class="dash-chip ${filters.status === s ? 'active' : ''}" onclick="setFilterStatus('${s}')">
          ${STATUS_LABEL[s]}<span class="n">${statusCounts[s]}</span>
        </div>
      `).join('')}
      <div class="dash-chip ${filters.status === '' ? 'active' : ''}" onclick="setFilterStatus('')">Tất cả<span class="n">${statusCounts.trong + statusCounts.da_thue + statusCounts.dang_giu_cho}</span></div>
      <span class="dash-sep"></span>
      ${PRICE_BUCKETS.map(b => `
        <div class="dash-chip ${currentBucket && currentBucket.key === b.key ? 'active' : ''}" onclick="setPriceBucket('${b.key}')">
          ${b.label}<span class="n">${bucketCounts[b.key]}</span>
        </div>
      `).join('')}
    </div>`;
}

function setFilterStatus(v) { detailView = null; filters.status = v; render(); }
function setPriceBucket(key) {
  detailView = null;
  const b = PRICE_BUCKETS.find(x => x.key === key);
  if (!b) return;
  filters.priceFrom = b.from;
  filters.priceTo = b.to;
  render();
}

// ── Render ────────────────────────────────────────────────
let detailView = null; // { propertyId, highlightRoomId } | null — xem "1 nhà + tất cả phòng của nó"

function roomCardHtml(r, prop, opts) {
  opts = opts || {};
  const mode = opts.mode || 'browse'; // 'browse' (khách xem, chỉ Xuất PDF) | 'admin' (Sửa/Nhân bản/Xoá/Xuất PDF)
  const images = (r.images && r.images.length) ? r.images : [];
  const hasImg = images.length > 0;
  const imagesAttr = hasImg ? JSON.stringify(images).replace(/'/g, '&#39;') : '[]';
  return `
    <div class="room-card${opts.highlight ? ' highlight' : ''}" id="room-${r.id}">
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
        <div onclick="${mode === 'admin' ? `goAdminRoomForm('${r.id}')` : `openPropertyDetail('${prop.id}', '${r.id}')`}">
          <div class="room-addr">${prop.soNha}</div>
          <div class="floor">${r.floor}</div>
          <div class="code">${r.code}</div>
          ${isPromoActive(r.promotion) ? `<div class="promo-tag">🎉 ${r.promotion.text}</div>` : ''}
          <div class="meta">
            <span class="meta-item">${ICON_AREA}${r.areaM2}m²</span>
            <span class="meta-item">${ICON_DOOR}${ROOM_TYPE_LABEL[r.roomType] || r.roomType}</span>
          </div>
        </div>
        <div class="room-card-foot">
          <div class="price">${fmtPrice(r.priceMonthly)}/tháng</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${mode === 'admin' ? `
              <button class="btn btn-sm" onclick="goAdminRoomForm('${r.id}')">Sửa</button>
              <button class="btn btn-sm" onclick="duplicateRoom('${r.id}')">Nhân bản</button>
              <button class="btn btn-sm btn-danger" onclick="deleteRoom('${r.id}')">Xoá</button>
            ` : ''}
            <button class="btn btn-sm" onclick="exportRoom('${r.id}')">Xuất PDF</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function render() {
  if (detailView) { renderPropertyDetailView(); return; }
  renderDashboard();
  syncFilterSidebarUI();
  const el = document.getElementById('main-content');

  // Danh sách phẳng: không gộp theo nhà, chỉ trả về các phòng khớp tiêu chí
  const matchedRooms = [];
  ROOMS.forEach(r => {
    const prop = PROPERTIES.find(p => p.id === r.propertyId);
    if (!prop) return;
    if (!matchesBaseFilters(prop, r)) return;
    matchedRooms.push({ room: r, prop });
  });

  // Sắp theo lựa chọn của người dùng; mặc định vẫn theo nhà (địa chỉ) rồi tầng/mã
  matchedRooms.sort((a, b) => {
    if (sortBy === 'price_asc') return a.room.priceMonthly - b.room.priceMonthly;
    if (sortBy === 'price_desc') return b.room.priceMonthly - a.room.priceMonthly;
    if (sortBy === 'newest') return (b.room.createdAt || 0) - (a.room.createdAt || 0);
    const byAddr = a.prop.soNha.localeCompare(b.prop.soNha);
    if (byAddr !== 0) return byAddr;
    return String(a.room.floor).localeCompare(String(b.room.floor)) || a.room.code.localeCompare(b.room.code);
  });

  document.getElementById('roomCount').textContent = matchedRooms.length;
  const mrc = document.getElementById('mobileResultCount');
  if (mrc) mrc.textContent = matchedRooms.length;

  if (!matchedRooms.length) {
    el.innerHTML = '<div class="empty-state">Không tìm thấy phòng phù hợp bộ lọc.</div>';
    return;
  }

  el.innerHTML = `
    <div class="room-grid">
      ${matchedRooms.map(({ room: r, prop }) => roomCardHtml(r, prop)).join('')}
    </div>
  `;
}

// ── Xem 1 nhà + tất cả phòng của nó (giống Trip.com: bấm "Xem phòng
// trống" ở kết quả tìm kiếm -> mở trang khách sạn, cuộn tới đúng phòng) ──
function openPropertyDetail(propertyId, roomId) {
  detailView = { propertyId, highlightRoomId: roomId };
  render();
}
function closePropertyDetail() {
  detailView = null;
  render();
}
function amenitiesNearbyHtml(prop) {
  let html = '';
  if (prop.amenities && prop.amenities.length) {
    html += `<div class="detail-highlights"><div class="detail-highlights-title">${ICON_LBL_AMENITY} Điểm nổi bật</div><ul>${prop.amenities.map(a => `<li>${a}</li>`).join('')}</ul></div>`;
  }
  if (prop.nearby && prop.nearby.length) {
    html += `<div class="detail-highlights"><div class="detail-highlights-title">${ICON_LBL_NEARBY} Xung quanh</div><ul>${prop.nearby.map(a => `<li>${a}</li>`).join('')}</ul></div>`;
  }
  return html;
}

function renderPropertyDetailView() {
  const el = document.getElementById('main-content');
  const prop = PROPERTIES.find(p => p.id === detailView.propertyId);
  if (!prop) { detailView = null; render(); return; }
  // Hiện TẤT CẢ phòng của nhà này, không áp bộ lọc tìm kiếm đang chọn — đúng như Trip.com hiện cả khách sạn
  const rooms = ROOMS.filter(r => r.propertyId === prop.id);
  document.getElementById('roomCount').textContent = rooms.length;
  const heroImg = rooms.map(r => r.images && r.images[0]).find(Boolean);
  el.innerHTML = `
    <div class="detail-back"><button class="btn btn-sm" onclick="closePropertyDetail()">← Quay lại danh sách</button></div>
    ${heroImg ? `<img class="detail-hero" src="${heroImg}" alt="">` : ''}
    <div class="detail-head">
      <div>
        <h2>${prop.soNha}</h2>
        <div class="addr">${fullAddress(prop)}</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-sm" onclick="exportProperty('${prop.id}')">Xuất PDF cả nhà</button>
      </div>
    </div>
    ${amenitiesNearbyHtml(prop)}
    <div class="room-grid">
      ${rooms.map(r => roomCardHtml(r, prop, { highlight: r.id === detailView.highlightRoomId })).join('')}
    </div>
  `;
  if (detailView.highlightRoomId) {
    const target = document.getElementById('room-' + detailView.highlightRoomId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
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

// ── Toast + confirm tự chế (thay cho alert()/confirm() của trình duyệt) ──
function showToast(message, type) {
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'error' ? ' toast-error' : '');
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 250);
  }, 2600);
}

function showConfirm(message, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" style="max-width:360px;">
      <p style="margin:0 0 20px;">${message}</p>
      <div class="modal-actions" style="position:static;margin:0;padding:0;border-top:none;background:none;">
        <button class="btn" id="confirmNoBtn">Huỷ</button>
        <button class="btn btn-danger" id="confirmYesBtn">Đồng ý</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('confirmNoBtn').onclick = () => overlay.remove();
  document.getElementById('confirmYesBtn').onclick = () => { overlay.remove(); onConfirm(); };
}

// ── Bộ lọc dạng overlay toàn màn hình trên mobile (giống Trip.com) ──
function openMobileFilters() {
  document.getElementById('sidebar').classList.add('open');
}
function closeMobileFilters() {
  document.getElementById('sidebar').classList.remove('open');
}
// ── Filters ───────────────────────────────────────────────
function setSearch(v) { detailView = null; filters.q = v; render(); }
function setSortBy(v) { detailView = null; sortBy = v; render(); }

// ── Khu Quản lý (Admin) — tách riêng khỏi trang tìm phòng, có "trang"
// riêng cho từng việc (danh sách nhà / sửa nhà / danh sách phòng của 1
// nhà / sửa phòng), thay cho modal nhỏ trước đây ───────────────────
let adminPage = 'properties'; // 'properties' | 'property-form' | 'room-list' | 'room-form'
let adminCtx = {};

function openAdmin() {
  document.getElementById('search-view').style.display = 'none';
  document.getElementById('admin-view').style.display = 'block';
  goAdminProperties();
}
function closeAdmin() {
  document.getElementById('admin-view').style.display = 'none';
  document.getElementById('search-view').style.display = 'block';
  render();
}
function goAdminProperties() { adminPage = 'properties'; adminCtx = {}; renderAdmin(); }
function goAdminPropertyForm(propertyId) { adminPage = 'property-form'; adminCtx = { propertyId }; renderAdmin(); }
function goAdminRoomList(propertyId) { adminPage = 'room-list'; adminCtx = { propertyId }; renderAdmin(); }
function goAdminRoomForm(roomId, presetPropertyId, cloneFrom) { adminPage = 'room-form'; adminCtx = { roomId, presetPropertyId, cloneFrom }; renderAdmin(); }

function renderAdmin() {
  const el = document.getElementById('admin-content');
  const title = document.getElementById('adminTitle');
  if (adminPage === 'properties') {
    title.textContent = 'Danh sách nhà';
    el.innerHTML = renderAdminPropertiesHtml();
  } else if (adminPage === 'property-form') {
    const prop = adminCtx.propertyId ? PROPERTIES.find(p => p.id === adminCtx.propertyId) : null;
    title.textContent = prop ? 'Sửa nhà' : 'Thêm nhà mới';
    el.innerHTML = renderAdminPropertyFormHtml(prop);
  } else if (adminPage === 'room-list') {
    const prop = PROPERTIES.find(p => p.id === adminCtx.propertyId);
    if (!prop) { goAdminProperties(); return; }
    title.textContent = 'Phòng của ' + prop.soNha;
    el.innerHTML = renderAdminRoomListHtml(prop);
  } else if (adminPage === 'room-form') {
    const room = adminCtx.roomId ? ROOMS.find(r => r.id === adminCtx.roomId) : null;
    title.textContent = room ? 'Sửa phòng ' + room.code : (adminCtx.cloneFrom ? 'Nhân bản từ phòng ' + adminCtx.cloneFrom.code : 'Thêm phòng mới');
    el.innerHTML = renderAdminRoomFormHtml(room, adminCtx.presetPropertyId, adminCtx.cloneFrom);
    renderCommissionRows();
  }
}

function renderAdminPropertiesHtml() {
  return `
    <div style="margin-bottom:16px;"><button class="btn btn-primary" onclick="goAdminPropertyForm(null)">+ Thêm nhà</button></div>
    <div class="admin-list">
      ${PROPERTIES.map(p => {
        const count = ROOMS.filter(r => r.propertyId === p.id).length;
        return `
        <div class="admin-row">
          <div>
            <div class="admin-row-title">${p.soNha}</div>
            <div class="admin-row-sub">${fullAddress(p)} · ${count} phòng</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-sm" onclick="goAdminRoomList('${p.id}')">Quản lý phòng</button>
            <button class="btn btn-sm" onclick="goAdminPropertyForm('${p.id}')">Sửa nhà</button>
          </div>
        </div>
      `;
      }).join('') || '<div class="empty-state">Chưa có nhà nào.</div>'}
    </div>
  `;
}

function renderAdminRoomListHtml(prop) {
  const rooms = ROOMS.filter(r => r.propertyId === prop.id);
  return `
    <div class="detail-back"><button class="btn btn-sm" onclick="goAdminProperties()">← Danh sách nhà</button></div>
    <div class="detail-head">
      <div>
        <h2>${prop.soNha}</h2>
        <div class="addr">${fullAddress(prop)}</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-sm" onclick="goAdminPropertyForm('${prop.id}')">Sửa nhà</button>
        <button class="btn btn-sm" onclick="exportProperty('${prop.id}')">Xuất PDF cả nhà</button>
        <button class="btn btn-primary btn-sm" onclick="goAdminRoomForm(null, '${prop.id}')">+ Thêm phòng</button>
      </div>
    </div>
    ${rooms.length ? `<div class="room-grid">${rooms.map(r => roomCardHtml(r, prop, { mode: 'admin' })).join('')}</div>` : '<div class="empty-state">Nhà này chưa có phòng nào.</div>'}
  `;
}

// ── Room modal (add/edit) ────────────────────────────────
let commissionRowsState = []; // { termMonths, percent }[] — state tạm trong lúc sửa form, ghi vào room.commissionPolicy khi Lưu

function renderAdminRoomFormHtml(room, presetPropertyId, cloneFrom) {
  const src = room || cloneFrom || null;
  commissionRowsState = src && src.commissionPolicy ? src.commissionPolicy.map(r => ({ ...r })) : [];
  const uf = (src && src.utilityFees) || {};
  const propForFees = PROPERTIES.find(p => p.id === ((room && room.propertyId) || presetPropertyId)) || null;
  const defFees = (propForFees && propForFees.utilityFees) || {};
  return `
    <div class="detail-back"><button class="btn btn-sm" onclick="goAdminRoomList('${room ? room.propertyId : (presetPropertyId || (PROPERTIES[0] && PROPERTIES[0].id))}')">← Danh sách phòng</button></div>
    <div class="form-page">
      <div class="form-row">
        <label>${ICON_LBL_TYPE} Thuộc nhà</label>
        <select id="f_propertyId">
          ${PROPERTIES.map(p => `<option value="${p.id}" ${((room && room.propertyId === p.id) || presetPropertyId === p.id) ? 'selected' : ''}>${p.soNha}</option>`).join('')}
        </select>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>${ICON_LBL_FLOOR} Tầng</label>
          <input id="f_floor" value="${src ? src.floor : ''}" placeholder="Trệt / Lầu 1...">
        </div>
        <div class="form-row">
          <label>${ICON_LBL_CODE} Mã phòng *</label>
          <input id="f_code" value="${room ? room.code : ''}" placeholder="T002">
          <div class="field-error" id="err_code">Bắt buộc nhập mã phòng</div>
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>${ICON_DOOR} Loại phòng</label>
          <select id="f_roomType">
            <option value="ben_trong" ${src && src.roomType === 'ben_trong' ? 'selected' : ''}>Bên trong</option>
            <option value="ban_cong" ${src && src.roomType === 'ban_cong' ? 'selected' : ''}>Ban công</option>
          </select>
        </div>
        <div class="form-row">
          <label>${ICON_AREA} Diện tích (m²)</label>
          <input id="f_areaM2" type="number" value="${src ? src.areaM2 : ''}">
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>${ICON_LBL_PRICE} Giá thuê/tháng *</label>
          <input id="f_priceMonthly" type="number" value="${src ? src.priceMonthly : ''}" placeholder="6200000">
          <div class="field-error" id="err_price">Bắt buộc nhập giá &gt; 0</div>
        </div>
        <div class="form-row">
          <label>${ICON_LBL_STATUS} Trạng thái</label>
          <select id="f_status">
            <option value="trong" ${room && room.status === 'trong' ? 'selected' : ''}>Còn trống</option>
            <option value="da_thue" ${room && room.status === 'da_thue' ? 'selected' : ''}>Đã thuê</option>
            <option value="dang_giu_cho" ${room && room.status === 'dang_giu_cho' ? 'selected' : ''}>Đang giữ chỗ</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <label>${ICON_LBL_IMG} Ảnh (mỗi dòng 1 link, có thể để trống)</label>
        <textarea id="f_images">${src ? (src.images || []).join('\n') : ''}</textarea>
      </div>

      <div class="form-grid-2">
        <div class="form-row">
          <label>${ICON_LBL_DEPOSIT} Cọc (số tháng)</label>
          <input id="f_depositMonths" type="number" step="0.5" min="0" value="${src && src.depositPolicy ? src.depositPolicy.months : ''}" placeholder="1">
        </div>
      </div>
      <div class="form-row">
        <label>${ICON_LBL_NOTE} Ghi chú chính sách cọc</label>
        <textarea id="f_depositNote" placeholder="Xem phòng chốt thì giữ 2tr, giữ 7 ngày...">${src && src.depositPolicy ? src.depositPolicy.note || '' : ''}</textarea>
      </div>

      <div class="form-row">
        <label>${ICON_LBL_COMMISSION} Chính sách hoa hồng</label>
        <div id="commissionRows"></div>
        <button type="button" class="btn btn-sm" onclick="addCommissionRow()">+ Thêm mức hoa hồng</button>
      </div>

      <div class="form-row">
        <label>${ICON_LBL_PROMO} Khuyến mãi (để trống nếu không có)</label>
        <input id="f_promoText" value="${src && src.promotion ? src.promotion.text || '' : ''}" placeholder="Lì xì 500k khi cọc thành công">
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>Từ ngày</label>
          <input type="date" id="f_promoFrom" value="${src && src.promotion ? src.promotion.validFrom || '' : ''}">
        </div>
        <div class="form-row">
          <label>Đến ngày</label>
          <input type="date" id="f_promoTo" value="${src && src.promotion ? src.promotion.validTo || '' : ''}">
        </div>
      </div>

      <div class="form-row">
        <label>${ICON_LBL_ELECTRIC} Điện / Nước / Phí dịch vụ — ghi đè riêng cho phòng này</label>
        <div style="font-size:12px;color:var(--ink-soft);margin:-2px 0 8px;">Để trống thì dùng theo mức mặc định của nhà (ghi trong ô placeholder dưới đây).</div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>${ICON_LBL_ELECTRIC} Điện</label>
          <input id="f_feeElectricity" value="${uf.electricity || ''}" placeholder="${defFees.electricity || 'Theo nhà: chưa đặt'}">
        </div>
        <div class="form-row">
          <label>${ICON_LBL_WATER} Nước</label>
          <input id="f_feeWater" value="${uf.water || ''}" placeholder="${defFees.water || 'Theo nhà: chưa đặt'}">
        </div>
      </div>
      <div class="form-row">
        <label>${ICON_LBL_NOTE} Phí dịch vụ (giữ xe, vệ sinh...)</label>
        <input id="f_feeService" value="${uf.service || ''}" placeholder="${defFees.service || 'Theo nhà: chưa đặt'}">
      </div>

      <div class="form-row">
        <label>${ICON_LBL_NOTE} Ghi chú phòng</label>
        <textarea id="f_notes">${src ? src.notes || '' : ''}</textarea>
      </div>
      <div class="modal-actions">
        ${room ? `<button class="btn btn-danger" onclick="deleteRoom('${room.id}')">Xoá phòng</button>` : ''}
        <button class="btn" onclick="goAdminRoomList('${room ? room.propertyId : (presetPropertyId || (PROPERTIES[0] && PROPERTIES[0].id))}')">Huỷ</button>
        <button class="btn btn-primary" onclick="saveRoom(${room ? `'${room.id}'` : 'null'})">Lưu</button>
      </div>
    </div>
  `;
}

// ── Chính sách hoa hồng: entity {termMonths, percent} thay cho text tự do ──
function renderCommissionRows() {
  const el = document.getElementById('commissionRows');
  if (!el) return;
  el.innerHTML = commissionRowsState.length ? commissionRowsState.map((row, i) => `
    <div class="form-grid-2" style="align-items:end;margin-bottom:8px;">
      <div class="form-row" style="margin-bottom:0;">
        <label style="font-size:11px;">Hợp đồng (tháng)</label>
        <input type="number" min="0" value="${row.termMonths}" onchange="updateCommissionRow(${i}, 'termMonths', this.value)">
      </div>
      <div class="form-row" style="margin-bottom:0;display:flex;gap:6px;">
        <div style="flex:1;">
          <label style="font-size:11px;">Hoa hồng (%)</label>
          <input type="number" min="0" max="100" value="${row.percent}" onchange="updateCommissionRow(${i}, 'percent', this.value)">
        </div>
        <button type="button" class="btn btn-sm btn-danger" style="margin-top:18px;" onclick="removeCommissionRow(${i})">Xoá</button>
      </div>
    </div>
  `).join('') : '<div style="font-size:13px;color:var(--ink-soft);margin-bottom:8px;">Chưa có mức hoa hồng nào.</div>';
}
function addCommissionRow() { commissionRowsState.push({ termMonths: 6, percent: 50 }); renderCommissionRows(); }
function removeCommissionRow(i) { commissionRowsState.splice(i, 1); renderCommissionRows(); }
function updateCommissionRow(i, field, value) { commissionRowsState[i][field] = Number(value) || 0; }

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
  const depositMonths = Number(document.getElementById('f_depositMonths').value) || 0;
  const depositNote = document.getElementById('f_depositNote').value.trim();
  const promoText = document.getElementById('f_promoText').value.trim();
  const feeElectricity = document.getElementById('f_feeElectricity').value.trim();
  const feeWater = document.getElementById('f_feeWater').value.trim();
  const feeService = document.getElementById('f_feeService').value.trim();
  const payload = {
    propertyId: document.getElementById('f_propertyId').value,
    floor: document.getElementById('f_floor').value.trim(),
    code: document.getElementById('f_code').value.trim(),
    roomType: document.getElementById('f_roomType').value,
    areaM2: Number(document.getElementById('f_areaM2').value) || 0,
    priceMonthly: Number(document.getElementById('f_priceMonthly').value),
    status: document.getElementById('f_status').value,
    images: document.getElementById('f_images').value.split('\n').map(s => s.trim()).filter(Boolean),
    depositPolicy: (depositMonths || depositNote) ? { months: depositMonths, note: depositNote } : null,
    commissionPolicy: commissionRowsState.filter(r => r.termMonths > 0 && r.percent > 0),
    promotion: promoText ? { text: promoText, validFrom: document.getElementById('f_promoFrom').value, validTo: document.getElementById('f_promoTo').value } : null,
    utilityFees: (feeElectricity || feeWater || feeService) ? { electricity: feeElectricity, water: feeWater, service: feeService } : null,
    notes: document.getElementById('f_notes').value.trim()
  };
  if (!VALID_ROOM_TYPE.includes(payload.roomType) || !VALID_STATUS.includes(payload.status)) {
    showToast('Loại phòng hoặc trạng thái không hợp lệ', 'error');
    return;
  }
  if (roomId) {
    const idx = ROOMS.findIndex(r => r.id === roomId);
    ROOMS[idx] = { ...ROOMS[idx], ...payload, id: roomId };
  } else {
    payload.createdAt = Date.now();
    ROOMS.push({ id: genId('R', ROOMS), ...payload });
  }
  persist();
  showToast(roomId ? `Đã lưu phòng ${payload.code}` : `Đã thêm phòng ${payload.code}`);
  goAdminRoomList(payload.propertyId);
}

function deleteRoom(roomId) {
  const room = ROOMS.find(r => r.id === roomId);
  const propertyId = room ? room.propertyId : null;
  showConfirm('Xoá phòng này? Không thể hoàn tác.', () => {
    ROOMS = ROOMS.filter(r => r.id !== roomId);
    persist();
    showToast('Đã xoá phòng');
    goAdminRoomList(propertyId);
  });
}

function duplicateRoom(roomId) {
  const src = ROOMS.find(r => r.id === roomId);
  if (!src) return;
  goAdminRoomForm(null, src.propertyId, src);
}

// ── Trang Thêm/Sửa nhà (Admin) ───────────────────────────
function renderAdminPropertyFormHtml(prop) {
  return `
    <div class="detail-back"><button class="btn btn-sm" onclick="goAdminProperties()">← Danh sách nhà</button></div>
    <div class="form-page">
      <div class="form-row">
        <label>${ICON_LBL_TYPE} Loại hình</label>
        <select id="pf_propertyType">
          <option value="phong_tro" ${!prop || prop.propertyType === 'phong_tro' ? 'selected' : ''}>Phòng trọ</option>
          <option value="can_ho" ${prop && prop.propertyType === 'can_ho' ? 'selected' : ''}>Căn hộ</option>
        </select>
      </div>
      <div class="form-row">
        <label>${ICON_LBL_PIN} Số nhà / Địa chỉ chi tiết *</label>
        <input id="pf_soNha" value="${prop ? prop.soNha : ''}" placeholder="CHDV Lô C6, Khu dân cư Nam Long, Khu phố 2">
        <div class="field-error" id="err_soNha">Bắt buộc nhập số nhà/địa chỉ</div>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>${ICON_LBL_PIN} Phường/Xã</label>
          <input id="pf_ward" list="wardList" value="${prop ? prop.ward : ''}">
        </div>
        <div class="form-row">
          <label>${ICON_LBL_PIN} Quận (địa chỉ cũ, thường để trống)</label>
          <input id="pf_quan" value="${prop ? prop.quan || '' : ''}" placeholder="Để trống nếu địa chỉ mới">
        </div>
      </div>
      <div class="form-row">
        <label>${ICON_LBL_PIN} Tỉnh/Thành phố</label>
        <input id="pf_city" value="${prop ? prop.city : 'Thành phố Hồ Chí Minh'}">
      </div>
      <div class="form-row">
        <label>${ICON_LBL_PHONE} Số điện thoại liên hệ</label>
        <input id="pf_phone" value="${prop ? prop.phone : ''}">
      </div>
      <div class="form-row">
        <label>${ICON_LBL_AMENITY} Tiện ích (mỗi dòng 1 ý)</label>
        <textarea id="pf_amenities">${prop ? (prop.amenities || []).join('\n') : ''}</textarea>
      </div>
      <div class="form-row">
        <label>${ICON_LBL_NEARBY} Xung quanh / di chuyển (mỗi dòng 1 ý)</label>
        <textarea id="pf_nearby">${prop ? (prop.nearby || []).join('\n') : ''}</textarea>
      </div>
      <div class="form-grid-2">
        <div class="form-row">
          <label>${ICON_LBL_ELECTRIC} Điện (mặc định cho cả nhà)</label>
          <input id="pf_feeElectricity" value="${prop && prop.utilityFees ? prop.utilityFees.electricity || '' : ''}" placeholder="4.000đ/kWh">
        </div>
        <div class="form-row">
          <label>${ICON_LBL_WATER} Nước (mặc định cho cả nhà)</label>
          <input id="pf_feeWater" value="${prop && prop.utilityFees ? prop.utilityFees.water || '' : ''}" placeholder="100.000đ/người">
        </div>
      </div>
      <div class="form-row">
        <label>${ICON_LBL_NOTE} Phí dịch vụ (mặc định cho cả nhà)</label>
        <input id="pf_feeService" value="${prop && prop.utilityFees ? prop.utilityFees.service || '' : ''}" placeholder="200.000đ/tháng">
        <div style="font-size:12px;color:var(--ink-soft);margin-top:4px;">Áp dụng cho mọi phòng trong nhà. Phòng nào cần giá khác thì đặt riêng trong "Sửa phòng" — chỉ ghi đè đúng phòng đó.</div>
      </div>
      <div class="modal-actions">
        ${prop ? `<button class="btn btn-danger" onclick="deleteProperty('${prop.id}')">Xoá nhà</button>` : ''}
        <button class="btn" onclick="goAdminProperties()">Huỷ</button>
        <button class="btn btn-primary" onclick="saveProperty(${prop ? `'${prop.id}'` : 'null'})">Lưu</button>
      </div>
    </div>
  `;
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
  const feeElectricity = document.getElementById('pf_feeElectricity').value.trim();
  const feeWater = document.getElementById('pf_feeWater').value.trim();
  const feeService = document.getElementById('pf_feeService').value.trim();
  const payload = {
    propertyType: document.getElementById('pf_propertyType').value,
    soNha: document.getElementById('pf_soNha').value.trim(),
    ward: document.getElementById('pf_ward').value.trim(),
    quan: document.getElementById('pf_quan').value.trim(),
    city: document.getElementById('pf_city').value.trim(),
    phone: document.getElementById('pf_phone').value.trim(),
    amenities: split('pf_amenities'),
    nearby: split('pf_nearby'),
    utilityFees: (feeElectricity || feeWater || feeService) ? { electricity: feeElectricity, water: feeWater, service: feeService } : null
  };
  if (propertyId) {
    const idx = PROPERTIES.findIndex(p => p.id === propertyId);
    PROPERTIES[idx] = { ...PROPERTIES[idx], ...payload, id: propertyId };
  } else {
    PROPERTIES.push({ id: genId('P', PROPERTIES), ...payload });
  }
  persist();
  showToast(propertyId ? 'Đã lưu thông tin nhà' : 'Đã thêm nhà mới');
  goAdminProperties();
}

function deleteProperty(propertyId) {
  const hasRooms = ROOMS.some(r => r.propertyId === propertyId);
  if (hasRooms) {
    showToast('Nhà này còn phòng bên trong — xoá hết phòng trước khi xoá nhà', 'error');
    return;
  }
  showConfirm('Xoá nhà này? Không thể hoàn tác.', () => {
    PROPERTIES = PROPERTIES.filter(p => p.id !== propertyId);
    persist();
    showToast('Đã xoá nhà');
    goAdminProperties();
  });
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
  showConfirm('Xoá hết data hiện tại, nạp lại data mẫu ban đầu?', async () => {
    const data = await storeResetToSample();
    PROPERTIES = data.properties;
    ROOMS = data.rooms;
    render();
    showToast('Đã nạp lại data mẫu');
  });
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
