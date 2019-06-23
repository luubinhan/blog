Lâu quá mới viết React, tại hổm rày cũng ít đụng vô React, chắc gần 6 tháng rồi, chỉ toàn viết Vue trong công ty. Nay lật lại kiến thức cũ nhưng chưa bao giờ vô dụng: sử dụng Refs

Là viết tắt cho `reference` nếu bạn có thắc mắc, nó là cách mà React sẽ truy cập tới DOM (dom thực, không phải dom ảo). Có nhiều lý do mà chúng ta muốn truy cập tới DOM, thí dụ như set focus vào input.

## Vấn đề của Refs

Xử lý DOM là kỹ thuật căn bản mà mọi lập trình frontend cần nắm, tuy nhiên nhiều anh em không cảm thấy hứng thú khi sử dụng refs, NHƯ MÌNH.

Với cách viết code ngày nảy ngày nay, chúng ta sẽ chuộng kiểu viết thụ động (

Thời điểm hiện tại, chúng ta có đến tận 4 cách để dùng refs !!!! (Funny image)

Dùng string (không được khuyến khích)
Dùng callback
Dùng API createRef
Dùng hook useRef

Refs đã chán này còn chán hơn khi có quá nhiều lựa chọn

## Lựa chọn giữa callback refs và createRef

Sử dụng string cho refs đã được team react cho vào bảo tàng, câu hỏi còn lại là dùng callback refs hay createRef đây

Câu trả lời ngắn gọn: dùng `createRef` là an toàn cho mọi trường hợp.

Lấy ví dụ cho tình huống phổ biến: tự động đặt set focus cho input

```js
```

1 - Định nghĩa ref, 2 - gắn cái ref mới định nghĩa cho element, 3 - gọi hàm focus trên ref

Nếu sử dụng callback ref thì đây là cách làm

```js
```

Một số anh em, không bao gồm mình, thấy viết `ref => ` nó hơi kỳ, cái ref này ở quỷ quái nào sinh ra?

```js
```

Ở đoạn code trên, chúng ta vướng phải re-render 2 lần: lần đầu tiên với giá trị `null`, lần thì hai là khi có giá trị.

Nó cũng còn có nghĩa là viết như sau sẽ bị bug, ref lúc đầu đang null nên không có gọi focus được

```js
```

Chắc tới đây anh em đã thấy không còn muốn dùng callback rè.

Tuy nhiên không có nghĩa là callback ref không còn đất dụng võ, với `createRef` anh em luôn phải tạo-rồi-gán. Nếu tình huống chúng ta phải tạo một danh sách element động

Như ví dụ này

Anh em sẽ làm như thế này phải không

```js
```

Nếu mà chúng ta dùng một biến `this.refsArray` đi, để lưu lại danh sách ref đến các element, làm vậy chúng ta phải tự quản lý cái array này. Mình lười lắm anh em ạ.



## useRef

Với function component, xét đoạn code sau

```js
```

Vẫn chạy, tuy nhiên có nhiều cái mà chỉ có class component mới làm được.

```js
```

Đoạn code trên hổng chạy được. Chúng ta cần dùng đến `forwardRef`

```js

```

Component cha chúng ta không cần thay đổi gì cả, với `forwardRef`, chúng ta có thể `ref` từ component cha xuống con

```js
```

Tổng kết lại

Đừng xài ref nhiều quá
Đừng bao giờ đụng vô string ref
Dùng callback ref khi anh em đụng đến vấn đề tạo element động
Nếu là class component, dùng `createRef` an toàn nhất
Là function component, dùng `useRef` cho hợp xu thế
Dùng `forwardRef` khi component cha cần truy cập đến component con



