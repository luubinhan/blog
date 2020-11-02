Khi ES6 giới thiệu `class` chúng ta nghĩ nó đã giải quyết tất cả những vấn đề của hàm `constructor` trong JS, thật sự nó đã thay thế được **factory function** hay chưa, cùng tìm hiểu.

Xem qua ví dụ, để tạo một `object` với các *method* và *data* dựng sẵn, chúng ta có các phương pháp để làm trong JS là:

```js
// class
class ClassCar {
    drive() {
        console.log('GOOO');
    }
}

const car1 = new ClassCar();
console.log(car1.drive());

// constructor function
function ConstructorCar() {}

ConstructorCar.prototype.drive = function() {
    console.log('GOOO');
}

const car2 = new ConstructorCar();
console.log(car2.drive());

// factory
const proto = {
    drive() {
        console.log('GOOO');
    }
};

const factoryCar = () => Object.create(proto);

const car3 = factoryCar();
console.log(car3.drive());
```

Về tính năng, thì cả 3 là như nhau, và có thể dùng thay thế cho nhau được.

> Có thể bạn chưa biết: Trong JS, bất cứ function nào trả về một object, mà không phải là `constructor function` hay `class`, thì được gọi là factory function

## Vài so sánh giữa Factory và Constructor

>  Constructor bắt buột phải khởi tạo bằng keyword `new`. Factory thì không.

Vậy thì keyword `new` của Contructor và Class nó làm gì?

1. Khởi tạo một object mới và `bind` giá trị của từ khóa `this`
2. Bind `instance.__proto__` vào `Constructor.prototype`
3. Bind `instance.__proto__.constructor` vào `Constructor`
4. Ngầm trả về `this` (refer vào giá trị `instance`)

**Về mặt lợi ích khi sử dụng Constructor và Class**

- Dễ tiếp cận với những người có xuất phát điểm từ những ngôn ngữ lập trình mà có hổ trợ `class`
- `this` luôn prefer đến một object mới
- Nhiều người thích cách viết `myFoo = new Foo()`

**Nhược điểm của Constructor và Class**

- Bắt buột phải dùng từ khóa `new` để khởi tạo
- Tất cả những thằng sử dụng đều dùng chung một constructor, rất khó nếu muốn thay đổi hiện thực biên trong constructor từ bên ngoài.
- Không đáp ứng dụng nguyên tắc `open/closed`: API chỉ cho phép *extend*, nhưng không cho phép *modify*
- Kết thừa class và các vấn đề mà nó sinh ra là câu chuyện không mới khi các bạn viết object oriented (có thể tra cứu google bằng các từ khóa sau: the fragile base class problem, the gorilla banana problem, the duplication by necessity problem)

**Lợi ích việc sử dụng Factory**

- **Linh động** hơn class và constructor function
- Bạn sẽ không bao giờ đụng vô từ khóa `extend` vốn là một con đường đã gây ra đau khổ bấy năm nay.
- Không còn cần dùng từ khóa `new`, không còn loằn ngoằn rối rắm với từ khóa `this`
- Nhiều người thích đọc code dạng này `myFoo = createFoo()`

**Nhược điểm của Factory**

- Không thể check `instanceof`, do không có liên kết giữa instance và `Factory.prototype`
- `this` không còn refer vào object mới tạo (`this` cũng có ưu nhược điểm của nó chứ không phải toàn nhược điểm)
- **Có thể** chậm hơn một chút. Thật ra cũng không cần quá bận tâm việc này, vì chưa ai chứng minh được nó ảnh hưởng đến tốc độ, hiệu năng của ứng dụng, lý thuyết là chậm hơn *xíu xiu* nhưng máy tính giờ nhanh lắm rồi.

[JavaScript Factory Functions vs Constructor Functions vs Classes](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e)