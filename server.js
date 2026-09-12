const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4001;

const PROPERTIES_FILE = path.join(__dirname, 'data', 'properties.json');
const ROOMS_FILE = path.join(__dirname, 'data', 'rooms.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Helpers ───────────────────────────────────────────────
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function writeJSON(file, data) {
  // Ghi ra file tam truoc, roi rename - tranh file bi hong nua chung
  // neu server crash giua luc ghi (vi du mat dien, out of disk).
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmp, file);
}

function genId(prefix, list) {
  const nums = list
    .map(x => parseInt(String(x.id).replace(prefix, ''), 10))
    .filter(n => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return prefix + String(next).padStart(3, '0');
}

const VALID_STATUS = ['trong', 'da_thue', 'dang_giu_cho'];
const VALID_ROOM_TYPE = ['ban_cong', 'ben_trong'];

// ── Properties ────────────────────────────────────────────
app.get('/api/properties', (req, res) => {
  res.json(readJSON(PROPERTIES_FILE));
});

app.post('/api/properties', (req, res) => {
  const { name, address, ward, city, phone } = req.body;
  if (!name || !address) {
    return res.status(400).json({ error: 'Thiếu name hoặc address' });
  }
  const properties = readJSON(PROPERTIES_FILE);
  const newProp = {
    id: genId('P', properties),
    name,
    address,
    ward: ward || '',
    city: city || '',
    phone: phone || '',
    promotion: req.body.promotion || null,
    amenities: req.body.amenities || [],
    utilityFees: req.body.utilityFees || {},
    nearby: req.body.nearby || [],
    depositPolicy: req.body.depositPolicy || [],
    commissionPolicy: req.body.commissionPolicy || [],
    notes: req.body.notes || ''
  };
  properties.push(newProp);
  writeJSON(PROPERTIES_FILE, properties);
  res.json(newProp);
});

app.put('/api/properties/:id', (req, res) => {
  const properties = readJSON(PROPERTIES_FILE);
  const idx = properties.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy property' });
  properties[idx] = { ...properties[idx], ...req.body, id: properties[idx].id };
  writeJSON(PROPERTIES_FILE, properties);
  res.json(properties[idx]);
});

app.delete('/api/properties/:id', (req, res) => {
  const properties = readJSON(PROPERTIES_FILE);
  const rooms = readJSON(ROOMS_FILE);
  const hasRooms = rooms.some(r => r.propertyId === req.params.id);
  if (hasRooms) {
    return res.status(400).json({
      error: 'Property này còn phòng bên trong — xoá hết phòng trước khi xoá property'
    });
  }
  const filtered = properties.filter(p => p.id !== req.params.id);
  if (filtered.length === properties.length) {
    return res.status(404).json({ error: 'Không tìm thấy property' });
  }
  writeJSON(PROPERTIES_FILE, filtered);
  res.json({ success: true });
});

// ── Rooms ─────────────────────────────────────────────────
app.get('/api/rooms', (req, res) => {
  const rooms = readJSON(ROOMS_FILE);
  const { propertyId, status } = req.query;
  let result = rooms;
  if (propertyId) result = result.filter(r => r.propertyId === propertyId);
  if (status) result = result.filter(r => r.status === status);
  res.json(result);
});

app.post('/api/rooms', (req, res) => {
  const { propertyId, floor, code, roomType, areaM2, priceMonthly } = req.body;
  if (!propertyId || !code || !priceMonthly) {
    return res.status(400).json({ error: 'Thiếu propertyId, code hoặc priceMonthly' });
  }
  const properties = readJSON(PROPERTIES_FILE);
  if (!properties.some(p => p.id === propertyId)) {
    return res.status(400).json({ error: 'propertyId không tồn tại' });
  }
  if (roomType && !VALID_ROOM_TYPE.includes(roomType)) {
    return res.status(400).json({ error: 'roomType không hợp lệ' });
  }
  const status = req.body.status || 'trong';
  if (!VALID_STATUS.includes(status)) {
    return res.status(400).json({ error: 'status không hợp lệ' });
  }
  const rooms = readJSON(ROOMS_FILE);
  const newRoom = {
    id: genId('R', rooms),
    propertyId,
    floor: floor || '',
    code,
    roomType: roomType || 'ben_trong',
    areaM2: Number(areaM2) || 0,
    priceMonthly: Number(priceMonthly),
    status,
    images: req.body.images || [],
    notes: req.body.notes || ''
  };
  rooms.push(newRoom);
  writeJSON(ROOMS_FILE, rooms);
  res.json(newRoom);
});

app.put('/api/rooms/:id', (req, res) => {
  const rooms = readJSON(ROOMS_FILE);
  const idx = rooms.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy room' });

  if (req.body.status && !VALID_STATUS.includes(req.body.status)) {
    return res.status(400).json({ error: 'status không hợp lệ' });
  }
  if (req.body.roomType && !VALID_ROOM_TYPE.includes(req.body.roomType)) {
    return res.status(400).json({ error: 'roomType không hợp lệ' });
  }

  rooms[idx] = { ...rooms[idx], ...req.body, id: rooms[idx].id };
  writeJSON(ROOMS_FILE, rooms);
  res.json(rooms[idx]);
});

app.delete('/api/rooms/:id', (req, res) => {
  const rooms = readJSON(ROOMS_FILE);
  const filtered = rooms.filter(r => r.id !== req.params.id);
  if (filtered.length === rooms.length) {
    return res.status(404).json({ error: 'Không tìm thấy room' });
  }
  writeJSON(ROOMS_FILE, filtered);
  res.json({ success: true });
});

// ── Backup ────────────────────────────────────────────────
// Render free tier restart se mat data ghi qua form (o dia tam).
// Endpoint nay cho phep tai snapshot ve may, phong truong hop mat data.
app.get('/api/backup', (req, res) => {
  const backup = {
    exportedAt: new Date().toISOString(),
    properties: readJSON(PROPERTIES_FILE),
    rooms: readJSON(ROOMS_FILE)
  };
  res.setHeader('Content-Disposition', `attachment; filename="backup-${Date.now()}.json"`);
  res.json(backup);
});

app.listen(PORT, () => {
  console.log(`✅ Room Rental server running on port ${PORT}`);
});
