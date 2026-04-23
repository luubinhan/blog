---
slug: "2022-10-30-debug-dien-thoai-tu-chrome"
date: "2022-10-30"
title: "Kết nối và debug bằng điện thoại Android"
desc: "Các bước thực hiện kết nối với điện thoại và debug trên máy tính"
tags: ["chrome","thu-thuat"]
canonical_url: false
---

## Bước 1: Thiết đặt cần thiết trên điện thoại Android

1. Bật chế độ **Developer Options** trên điện thoại, tùy vào phiên bản Android đang sử dụng, cách bật xem [ở đây](https://developer.android.com/studio/debug/dev-options.html)
2. Chọn **Enable USB Debugging**
3. Mở trình duyệt Chrome trên máy tính và truy cập địa chỉ `chrome://inspect#devices`
4. Đảm bảo đang chọn **Discover USB devices**
![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/4P4G0Hmt3CbDkqMoTOiY.png?auto=format&w=845)
5. Kết nối điện thoại với máy tính bằng cáp USB, danh sách điện thoại đã kết nối thành công sẽ hiện ở trong cửa sổ này
![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/7Iy1yVH62Xz40tbiwgRg.png?auto=format&w=845)

## Bước 2: Thực hiện debug

1. Nhập vào địa chỉ trang web muốn debug từ cửa sổ thiết bị đã kết nối
![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/JaZPnZlDhAywdFkn8vNm.png?auto=format&w=8450)
2. Click vào **open** sau đó trang web sẽ được mở trên điện thoại
3. Trên máy tính sẽ mở debug tool của Chrome và chúng ta có thể debug như mình bình thường bằng *inspect element* ![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/y9AaD4jeSmPRG4sQSylM.png?auto=format&w=42)
4. Click vào icon ![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/A5AtRECWSgsdtMZkI6g5.png?auto=format&w=44) kế bên nút inspect element để xem trực tiếp trên máy tính, song song với điện thoại

[Tham khảo](https://developer.chrome.com/docs/devtools/remote-debugging/)
