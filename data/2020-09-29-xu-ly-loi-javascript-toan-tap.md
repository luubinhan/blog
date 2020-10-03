# Xử lý lỗi trong JavaScript toàn tập

### Một vài lý thuyết căn bản

Tuy theo tình huống, khi gặp lỗi có thể chúng ta sẽ **stop luôn ứng dụng**, hoặc **thông báo đến user về lỗi đó**, ví dụ như lỗi về

- Mở một file không tồn tại
- Lỗi mạng
- Người dùng nhập giá trị không hợp lệ

Trong Javascript cái gì cũng có thể quy về `object`, lỗi cũng vậy, chúng ta có thể khởi tạo một object error với các thông tin cần thiết, rồi `throw` nó trong code

```js
const err = new Error("Có lỗi rồi ba má ơi");

// hoặc không cần new luôn
const err = Error("Có lỗi nữa nè");
```

Object được khởi tạo này sẽ có 3 thuộc tính 

- `message`: string mang nội dung lỗi
- `name`: kiểu lỗi
- `stack`: một *stack* để trace các hàm đã thực thi trước đó

Tạo mỗi lỗi với `name` là `TypeError`

```js
const wrongType = TypeError("Wrong Type rồi");

wrongType.message; // "Wrong Type rồi"
wrongType.name; // "TypeError"
```

Nói về error **type** chúng ta có các kiểu sau

- Error
- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

Phần lớn khi chúng ta code chỉ hay sử dụng 2 loại phổ biến nhất là `Error` và `TypeError`

```js
const name = "Jules";
name = "Caty";

// TypeError: Assignment to constant variable.
```

```js
function wrong(){
    await 99;
}

wrong();

// SyntaxError: await is only valid in async function
```

### Exception

Phần lớn chúng ta vẫn nghĩ error và exception là một. Nhưng thực tế nó là 2, **một object error chỉ trở thành một exception khi chúng ta `throw` nó**

```js
const wrongType = TypeError("Wrong type given, expected number");

throw wrongType;

// Viết tắt
throw TypeError("Wrong type given, expected number");

// hoặc
throw new TypeError("Wrong type given, expected number");
```

Trong JS chúng ta có thể throw gần như mọi thứ chứ không riêng gì object error

```js
throw Symbol();
throw 33;
throw "Error!";
throw null;
```

**Tuy nhiên không khuyến khích làm vậy**, chỉ nên throw object Error cho đúng bài

 Khi một exception được `throw` nó sẽ đi theo cơ chế *bong bóng bay*  (bubble up hay propagate, elevator, tùy cách gọi từng người), chỉ khi nào ở tầng trên có ai đó catch lại thì nó sẽ dừng không thì cứ bây lên tiếp

