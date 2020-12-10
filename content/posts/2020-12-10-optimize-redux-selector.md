Khác nhau giữa `useSelector` và `mapState`

- Khi một action được `dispatch`, `useSelector` sẽ thực hiện một phép so sánh giữa kết quả trước đó và kết quả hiện tại, nếu khác, component bị force để re-render.
- `useSelector` sử dụng phép so sánh `===` chứ không dùng phương pháp so sánh **shallow** (dịch vui là so sánh "nhẹ")

Lý do sử dụng selector

- Sử dụng lại, một selector có thể sử dụng ở nhiều nơi, nhiều component khác nhau
- Tinh gọn, ví dụ chúng ta có *entity* `user`  chứa `lastname`, `fullname`, `email`, nhưng chúng ta chỉ muốn lấy `email`, một selector `getUserEmail` sẽ rất rõ ràng tinh gọn

Tối ưu khi sử dụng

Vì `useSelector` dùng phép so sánh `===` nên nếu hàm selector trả về mảng (dùng `.map`, `.filter`, destructuring `...`)