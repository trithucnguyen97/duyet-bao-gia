# Duyệt Báo Giá — extension Chrome cho CRM Đại Dương & Hải Âu

Phân tích báo giá ngay trên CRM https://quanly.baobidaiduong.com/bao-gia và https://crm.bangkeohaiau.com/bao-gia
(giá vốn / NVL theo PO, lợi nhuận từ giá mốc, % deal, cờ cần xử lý, công cụ chỉnh giá, so giá khách bằng OCR).

Phần phân tích hiện tại: **v2.0.3** · phần vỏ: **v2.0.0**

## Cài đặt (làm 1 lần trên mỗi máy)

1. **Tải gói cài**: [install/DuyetBaoGia.zip](https://github.com/trithucnguyen97/duyet-bao-gia/raw/main/install/DuyetBaoGia.zip) → giải nén, được thư mục `DuyetBaoGia`.
   Để thư mục này ở chỗ cố định (VD `Documents\DuyetBaoGia`), **không xóa** sau khi cài.
2. Mở Chrome, vào địa chỉ `chrome://extensions`.
3. Bật **Chế độ dành cho nhà phát triển** (Developer mode) ở góc phải trên.
4. Bấm **Tải tiện ích đã giải nén** (Load unpacked) → chọn thư mục `DuyetBaoGia`.
5. Ở thẻ extension "Duyệt Báo Giá" vừa hiện, bấm **Chi tiết** (Details) → bật **Cho phép tập lệnh người dùng** (Allow User Scripts).
6. Mở trang báo giá của CRM và đăng nhập như bình thường. Thanh **📊 Phân tích báo giá** sẽ hiện trên trang
   (lần đầu có thể cần tải lại trang 1 lần).

## Cập nhật

**Tự động.** Mỗi khi mở CRM (và 15 phút một lần), extension kiểm tra bản mới trên GitHub, kiểm chữ ký rồi tự nạp:
- trang danh sách báo giá tự tải lại;
- trang chi tiết báo giá hiện nút **"Tải lại trang"** (để không mất giá đang sửa dở — bấm "Cập nhật" lưu trước nếu cần).

Số phiên bản đang chạy hiện cạnh tiêu đề "📊 Phân tích báo giá" (VD `v2.0.3`).

Chỉ khi có thông báo **"Phần vỏ extension đã cũ"** mới cần làm lại bước 1 (tải zip mới, giải nén **đè** vào thư mục cũ) rồi bấm nút tải lại (↻) ở thẻ extension trong `chrome://extensions`.

## Gặp sự cố

| Hiện tượng | Cách xử lý |
|---|---|
| Thông báo "cần bật Cho phép tập lệnh người dùng" | Làm bước 5, rồi tải lại trang CRM |
| Không thấy thanh phân tích | Tải lại trang (F5); kiểm tra extension đang bật trong `chrome://extensions` |
| "Chưa tải được phần phân tích" | Kiểm tra mạng, bấm "Thử lại" trên thông báo |

## An toàn

Phần phân tích tải từ kho này được **ký số**; extension chỉ chạy bản có chữ ký đúng (khóa riêng chỉ nằm trên máy người phát hành).
Extension không gửi dữ liệu CRM ra ngoài: chỉ đọc API của chính CRM bằng phiên đăng nhập của bạn, OCR chạy ngay trên máy.

---

# Push giá tấm nhỏ vào Ghi chú (extension riêng, cùng CRM Đại Dương)

Lấy "Tấm nhỏ" từ cột Đơn giá tấm → đẩy vào cột Ghi chú trên CRM. Phần chính hiện tại: **v2.0.0** · phần vỏ: **v2.0.0**

Cài đặt giống Duyệt Báo Giá, chỉ khác gói cài: [install/PushGhiChu.zip](https://github.com/trithucnguyen97/duyet-bao-gia/raw/main/install/PushGhiChu.zip)
→ giải nén (thư mục `PushGhiChu`, để cố định) → `chrome://extensions` → Developer mode → Load unpacked → chọn `PushGhiChu`
→ Chi tiết → bật **Cho phép tập lệnh người dùng** (Allow User Scripts) → tải lại trang CRM.
Cập nhật tự động như Duyệt Báo Giá (phần chính đặt ở thư mục `push-ghi-chu/` của kho này, đã ký số).
