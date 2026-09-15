const STORAGE_KEY_PROPS = 'rr_properties';
const STORAGE_KEY_ROOMS = 'rr_rooms';
const STORAGE_KEY_VERSION = 'rr_data_version';
// Bump this bất cứ khi nào data/*.json schema hoặc data mẫu thay đổi đáng kể.
// localStorage cũ (kể cả từ site/origin khác dùng chung domain github.io) sẽ tự bị bỏ qua và fetch lại.
const DATA_VERSION = 'v5-fee-inheritance';

function genId(prefix, list) {
  const nums = list
    .map(x => parseInt(String(x.id).replace(prefix, ''), 10))
    .filter(n => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return prefix + String(next).padStart(3, '0');
}

async function storeLoad() {
  let propsRaw = localStorage.getItem(STORAGE_KEY_PROPS);
  let roomsRaw = localStorage.getItem(STORAGE_KEY_ROOMS);
  const cachedVersion = localStorage.getItem(STORAGE_KEY_VERSION);
  if (!propsRaw || !roomsRaw || cachedVersion !== DATA_VERSION) {
    const [p, r] = await Promise.all([
      fetch('data/properties.json').then(x => x.json()),
      fetch('data/rooms.json').then(x => x.json())
    ]);
    propsRaw = JSON.stringify(p);
    roomsRaw = JSON.stringify(r);
    localStorage.setItem(STORAGE_KEY_PROPS, propsRaw);
    localStorage.setItem(STORAGE_KEY_ROOMS, roomsRaw);
    localStorage.setItem(STORAGE_KEY_VERSION, DATA_VERSION);
  }
  return { properties: JSON.parse(propsRaw), rooms: JSON.parse(roomsRaw) };
}

function storePersist(properties, rooms) {
  localStorage.setItem(STORAGE_KEY_PROPS, JSON.stringify(properties));
  localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(rooms));
  localStorage.setItem(STORAGE_KEY_VERSION, DATA_VERSION);
}

async function storeResetToSample() {
  localStorage.removeItem(STORAGE_KEY_PROPS);
  localStorage.removeItem(STORAGE_KEY_ROOMS);
  localStorage.removeItem(STORAGE_KEY_VERSION);
  return storeLoad();
}
