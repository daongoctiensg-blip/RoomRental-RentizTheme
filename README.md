# Room Rental — Quản lý phòng trọ / căn hộ

Công cụ nội bộ quản lý danh sách phòng trọ/căn hộ cho thuê nhiều khu (property). Bản này là **static site 100%** (không backend) — deploy free trên GitHub Pages.

## Chạy local

M�� trực tiếp `index.html` bằng trình duyệt, hoặc chạy 1 static server bất kỳ (ví dụ `npx serve .`).

## Đăng nhập

M� truy cập: hỏi Boss. Chỉ chặn người vô tình lướt vào — không phải bảo mật thật (client-side).

## Lưu trữ data

**Không có backend, không có database thật.** Data lưu trong `localStorage` của trình duyệt:
- Lần đầu mở, tự nạp data mẫu từ `data/properties.json` + `data/rooms.json`
- Mọi thay đổi (thêm/sửa/xoá qua form) lưu vào `localStorage`, **chỉ tồn tại trên máy/trình duyệt đó** — đổi máy, xoá cache, hay dùng trình duyệt khác sẽ mất, không đồng bộ giữa nhiều người dùng
- Nút "Nạp lại data mẫu" ở header: xoá hết, nạp lại đúng data gốc trong `data/*.json`

## Kiến trúc

- `index.html` + `js/app.js` — danh sách, filter, form thêm/sửa/xoá
- `js/store.js` — lớp lưu trữ (localStorage), thay cho backend
- `js/keygate.js` — popup hỏi mã truy cập, hash SHA-256
- `export.html` — trang xuất PDF (theo property hoặc room), dùng `window.print()`
- `data/*.json` — data mẫu ban đầu (chỉ dùng lúc seed lần đầu, sau đó mọi sửa đổi nằm ở localStorage, không ghi lại vào file này)

## Data model

**Property**: id, name, address, ward, city, phone, promotion {text, validFrom, validTo}, amenities[], utilityFees{electricity,water,service}, nearby[], depositPolicy[], commissionPolicy[], notes

**Room**: id, propertyId (FK → Property.id), floor, code, roomType (`ban_cong` | `ben_trong`), areaM2, priceMonthly, status (`trong` | `da_thue` | `dang_giu_cho`), images[], notes

## Deploy GitHub Pages

Repo Settings → Pages → Source: branch `main`, folder `/ (root)`.

## Việc còn lại (chưa làm ở bản này)

- Data không đồng bộ giữa nhiều người/nhiều máy — mỗi người sửa trên máy mình, không thấy thay đổi của người khác
- Chưa có xử lý ảnh upload thật (đang nhận link URL qua textarea)
- Nếu sau này cần data thật dùng chung nhiều người: phải quay lại có backend + database (đã có bản Express CRUD ở lần build trước, có thể khôi phục khi cần)
