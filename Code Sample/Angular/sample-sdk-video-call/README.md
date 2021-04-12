# SampleSdkVideoCall

Sample đã tích hợp sẵn SDK Video Call. File SDK nằm trong đường dẫn `src/assets/js/videocall/VideoCall.js`

## Development server
- Chạy lệnh npm install để cài các thư viện cần thiết trước khi sử dụng.
- Chạy lệnh `ng serve` sau đó điều hướng đến đường dẫn `http://localhost:4200/` để mở ứng dụng.

## How to use
- Bật notification ở mỗi trình duyệt lúc sử dụng.
- Sau khi mở ứng dụng, nhấn vào nút  `Login as admin` nếu bạn đóng vai admin.
- Mở một trình duyệt thứ hai và điều hướng đến địa chỉ localhost như trên và nhấn vào nút `Login as user` nếu bạn đóng vai user.
- Ở trình duyệt admin chúng ta gọi một trong hai user ở phía dưới và chuyển qua trình duyệt user. Lúc này một hộp thoại sẽ xuất hiện với 2 options là `Đồng ý` và `Hủy`. Nếu đồng ý một cửa sổ dành để video call sẽ xuất hiện bên trình duyệt user, lưu ý chúng ta phải chuyển qua lại trình duyệt admin để SDK tự động bật cửa sổ video call nếu demo cùng một máy.
- Khi logout chúng ta cần login lại để thực hiện demo lại luồng phía trên


