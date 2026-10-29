# Duyệt Báo Giá — extension Chrome cho CRM Đại Dương & Hải Âu

Phân tích báo giá ngay trên CRM https://quanly.baobidaiduong.com/bao-gia và https://crm.bangkeohaiau.com/bao-gia
(giá vốn / NVL theo PO, lợi nhuận từ giá mốc, % deal, cờ cần xử lý, công cụ chỉnh giá, so giá khách bằng OCR).

Phần phân tích hiện tại: **v2.0.4** · phần vỏ: **v2.0.0**

## Cài đặt (làm 1 lần trên mỗi máy)

1. **Tải gói cài**: [install/DuyetBaoGia.zip](https://github.com/trithucnguyen97/duyet-bao-gia/raw/main/install/DuyetBaoGia.zip) → giải nén, được thư mục `DuyetBaoGia`.
   Để thư mục này ở chỗ cố định (VD `Documents\DuyetBaoGia`), **không xóa** sau khi cài.
2. Mở Chrome, vào địa chỉ `chrome://extensions`.
3. Bật **Chế độ dành cho nhà phát triển** (Developer mode) ở góc phải trên.
4. Bấm **Tải tiện ích đã giải nén** (Load unpacked) → chọn thư mục `DuyetBaoGia`.
5. Ở thẻ extension "Duyệt Báo Giá" vừa hiện, bấm **Chi tiết** (Details) → bật **Cho phép tập lệnh người dùng** (Allow User Scripts).
6. Mở trang báo giá của CRM và đăng nhập như bình thường. Thanh **📊 Phân tích báo giá** sẽ hiện trên trang
   (lần đầu có thể cần tải lại trang 1 lần).

## Cài trên Safari (Mac) — qua ứng dụng Userscripts

1. Cài **Userscripts** (miễn phí) từ Mac App Store, mở ứng dụng một lần và chọn thư mục lưu script (**Change save location**, VD `Documents/Userscripts`).
2. Safari → **Cài đặt** → **Tiện ích mở rộng** → bật **Userscripts**, bấm **Sửa trang web…** → cho phép trên `quanly.baobidaiduong.com` và `crm.bangkeohaiau.com` (chọn **Cho phép**).
3. Mở bằng Safari: [safari/DuyetBaoGia.user.js](https://raw.githubusercontent.com/trithucnguyen97/duyet-bao-gia/main/safari/DuyetBaoGia.user.js) → bấm biểu tượng Userscripts trên thanh công cụ → **Install** (Cài đặt).
4. Mở trang báo giá của CRM. Thanh **📊 Phân tích báo giá** hiện như trên Chrome.

Bản Safari tự cập nhật phần phân tích giống Chrome (kiểm chữ ký số); khi có bản mới, trang hiện nút **Tải lại trang**.
Riêng **đọc ảnh bảng giá khách (OCR)** chưa có trên Safari — dùng Chrome cho việc này, hoặc gõ giá khách vào ô "Giá khách".

## Cập nhật

**Tự động.** Mỗi khi mở CRM (và 15 phút một lần), extension kiểm tra bản mới trên GitHub, kiểm chữ ký rồi tự nạp:
- trang danh sách báo giá tự tải lại;
- trang chi tiết báo giá hiện nút **"Tải lại trang"** (để không mất giá đang sửa dở — bấm "Cập nhật" lưu trước nếu cần).

Số phiên bản đang chạy hiện cạnh tiêu đề "📊 Phân tích báo giá" (VD `v2.0.4`).

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

---

# Nhanh.vn V2 (extension riêng, trên nhanh.vn)

Hiện giá nhập / lợi nhuận, công nợ, điền giá… trên Nhanh.vn. Phần chính hiện tại: **v1.0.0** · phần vỏ: **v10.0.0**

**Cài mới:** [install/NhanhV2.zip](https://github.com/trithucnguyen97/duyet-bao-gia/raw/main/install/NhanhV2.zip) → giải nén (thư mục `NhanhV2`, để cố định)
→ `chrome://extensions` → Developer mode → Load unpacked → chọn `NhanhV2` → Chi tiết → bật **Cho phép tập lệnh người dùng** (Allow User Scripts).

**Máy đang dùng bản cũ (thư mục git + update.bat):** chạy `update.bat` (Windows) / `update.command` (Mac) **lần cuối** → bấm tải lại (↻) ở thẻ extension → Chi tiết → bật **Cho phép tập lệnh người dùng**.
Từ đây phần chính tự cập nhật, không cần chạy update nữa.

**Kết nối Bảng giá (mỗi nhân viên một lần):** mở Nhanh.vn → bấm **"Kết nối Bảng giá"** trên thông báo (hoặc biểu tượng extension → Kết nối) → đăng nhập Bảng giá bằng tài khoản của bạn (mật khẩu hoặc đăng nhập Quản lý sản xuất) → bấm **Kết nối extension**.
Mỗi máy có mã riêng; quản lý / thu hồi tại https://banggia.baobidaiduong.com/ext-connect/tokens . Extension không chứa mật khẩu hay mã dùng chung nào.

