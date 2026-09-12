# Room Rental — Quản lý phòng trọ / căn hộ

Công cụ nội bộ quản lý danh sách phòng trọ/căn hộ cho thuê nhiều khu (property). Không public — chỉ team dùng để tra cứu và xuất tin đăng (PDF) gửi khách.

## Chạy local

```bash
npm install
npm start
```

Mở `http://localhost:4001`

## Kiến trúc

- `server.js` — Express, phục vụ file tĩnh trong `public/` + API CRUD đọc/ghi `data/*.json`
- `data/properties.json` — danh sách khu/tòa nhà
- `data/rooms.json` — danh sách phòng, mỗi phòng có `propertyId` trỏ về property cha
- `public/index.html` + `js/app.js` — danh sách, filter, form thêm/sửa/xoá
- `public/export.html` — trang xuất PDF (theo property hoặc theo room), dùng `window.print()`, không cần thư viện PDF

## Data model

**Property**: id, name, address, ward, city, phone, promotion {text, validFrom, validTo}, amenities[], utilityFees{electricity,water,service}, nearby[], depositPolicy[], commissionPolicy[], notes

**Room**: id, propertyId (FK → Property.id), floor, code, roomType (`ban_cong` | `ben_trong`), areaM2, priceMonthly, status (`trong` | `da_thue` | `dang_giu_cho`), images[], notes

## Quy tắc nghiệp vụ

- Không xoá được property nếu còn phòng bên trong — phải xoá/chuyển phòng trước
- Xuất PDF theo property: chỉ liệt kê phòng chưa `da_thue` (ẩn phòng đã cho thuê khỏi bản gửi khách)

## Việc còn lại (chưa làm ở bản này)

- Chưa có xử lý ảnh upload thật (đang nhận link URL qua textarea)
- Chưa có đăng nhập/phân quyền — ai chạy được server đều sửa được data
- Khi deploy lên VPS: đổi `data/*.json` sang SQLite/DB thật nếu cần, giữ nguyên API contract nên frontend không cần sửa
