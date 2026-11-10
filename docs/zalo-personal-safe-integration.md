# Kết nối Zalo cá nhân — phương án an toàn (10/11/2026)

## Kết luận nghiên cứu
- Zalo Developers công bố OpenAPI hội thoại dành cho Zalo Official Account (OA), không cung cấp API công khai tương đương để đọc/gửi toàn bộ hội thoại của Zalo cá nhân.
- Người dùng yêu cầu giữ nguyên tài khoản Zalo cá nhân, không chuyển sang OA.
- Không triển khai thư viện mô phỏng giao thức Zalo, lấy cookie, token, QR đăng nhập, điều khiển ngầm Zalo PC, hay tự động gửi tin từ tài khoản cá nhân khi chưa có cơ chế được nhà cung cấp hỗ trợ.

Nguồn:
- https://developers.zalo.me/
- https://docs.zaloplatforms.com/docs/OA/tin-nhan/quan-ly-tin-nhan/lay-thong-tin-tin-nhan-trong-mot-hoi-thoai
- https://github.com/minhkhoa0502/zalo-personal-mcp (dự án không chính thức, tự cảnh báo nguy cơ khóa tài khoản)

## Luồng khả thi ngay
1. Khách gửi tin đến Zalo cá nhân trên ứng dụng Zalo chính thức.
2. Người vận hành sao chép nội dung hoặc sử dụng chức năng chia sẻ hợp lệ trên thiết bị.
3. Dán vào ô nhập CUNCUN hiện có; chọn bảng giá/khách và kiểm tra trước khi xác nhận.
4. Trả lời khách qua ứng dụng Zalo chính thức; không giả định tin đã được gửi.
5. Không nhập tài khoản, mật khẩu, mã OTP, cookie hoặc QR phiên đăng nhập Zalo vào demo.

## Ranh giới triển khai
- Repo này chỉ là bản demo giao diện, không phải Zalo thật, không có mạng hay lưu trữ tin nhắn.
- Không sửa production CUNCUN hoặc Supabase/VPS.
- Muốn nhập trực tiếp vào CUNCUN cần thiết kế giao diện và quyền trên nhánh thử nghiệm riêng, xác nhận người dùng trước khi đưa lên production.
- Mọi tin nhắn được dán vào hệ thống phải được xử lý theo chính sách bảo mật và thời hạn lưu dữ liệu của CUNCUN.
