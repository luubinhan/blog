---
slug: "/2019-10-17-viet-test-js"
date: "2019-10-17"
title: "Tổng quát về viết unit test cho FE"
desc: "Cái nhìn tổng quát để bạn có thể bắt đầu làm quen với test, những khái niệm, vấn đề gặp thường xuyên khi viết test"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Spy một function](#spy-m%E1%BB%99t-function)
- [Test các đoạn code bất đồng bộ](#test-c%C3%A1c-%C4%91o%E1%BA%A1n-code-b%E1%BA%A5t-%C4%91%E1%BB%93ng-b%E1%BB%99)

<!-- /TOC -->

Tại sao chúng ta phải viết test, trong khi code của chúng chạy đang ngon? Câu trả lời rất đơn giản, nó khiến chúng ta suy nghĩ cách chúng ta đang code, code như theo kiểu này hay kiểu kia thì hợp lý hơn, code sẽ *sạch* hơn, dễ bảo trì hơn

Với một pure function siêu đơn giản

```js
const add = (x, y) => (x + y);
```

*Lỡ đâu*, giá trị truyền vào của x và y là `string`, chứ không phải `number`, *lỡ đâu* chỉ có 1 tham số được truyền vào, *lỡ đâu* có 1 function khác phụ thuộc vào kết quả trả về của hàm này.

Nếu bạn đặt được những câu hỏi *lỡ đâu* như thế thì code của bạn đã trở nên tốt hơn. Và để đặt được các câu hỏi *lỡ đâu* như thế, chỉ khi bạn bắt đầu nghĩ đến chuyện test function của mình.

Một số kiểu test, bạn tưởng tượng vào thanh tra một nhà máy

- **Unit test**: kiểm tra từng nhân viên có làm đúng nhiệm vụ, trách nhiệm được giao trong giờ làm việc không, có giao nhầm hợp đồng tình ái cho khách hàng đang cần hợp đồng dự án?
- **Integration test**: kiểm tra một tổ sản xuất làm việc với nhau có hợp ru hợp rạ không, ông này có đi nói xấu ông kia, làm ảnh hưởng chất lượng của cả team
- **Acceptance test**: các tổ sản xuất khi phối hợp vận hành có vấn đề gì không, trong môi trường thực tế, team marketing có đàn áp bóc lột đội sản xuất làm việc OT sấp mặt lờ, khiến team sản xuất chơi lại team marketing bằng cách làm việc đối phó không.

Ở mức dev chúng ta chỉ cần quan tâm đến unit test là được, để chúng ta đảm bảo được rằng, một function (một nhân viên) thực hiện đúng nhiệm vụ chúng ta giao cho nó.

Có nhiều thư viện để test, điểm chung các thư viện điều cho chúng ta những function, truyền vào *cái gì cũng được*, nó sẽ **so sánh** với một đối tượng khác

```js
it("should...", () => {
	expect("something truthy").toExist();
})
it("should...", () => {
	expect(myObj).toEqual({a:5, b: 10});
})
it("should...", () => {
	expect(block).toThrow([error], [message]);
})
```

Những cái chúng ta **expect** từ output của một hàm, một object, một giá trị như vậy gọi là **test case**

Một khái niệm khác nữa trong test là **test suite**, giới phần mềm khoái đặt thêm lắm ngôn ngữ thật, có thể hiểu nó là một thư mục để gom các **test case** mà chúng ta thấy nó nếu không họ hàng gần thì cũng bà con xa.

```js
// đây là một test suite
describe("Wallet", function(){
	var wallet;
	var five, ten, twenty, hundred;
	// trước khi chạy 1 test case, nó gọi hàm này trước
	beforeEach(function(){
	   wallet = [];
	   five = 5, ten = 10, twenty = 20, hundred = 100;
	})
	// test case 1
	it("should be able to add bills", function(){
		wallet.push(five, ten, twenty)
		expect(wallet).toEqual([5, 10, 20])
	})
	// test case 2
	it("should be able to remove one bill", function(){
	    wallet.push(five, ten, twenty)
	    wallet.splice(wallet.indexOf(5), 1)
	    expect(wallet).toEqual([ 10, 20 ])
	})
	// test case 3
	it("should be able to calculate total", function(){
	    wallet.push(five, ten, twenty, hundred, twenty, five)
	    total = wallet.reduce((a,b) => a + b)
	    expect(total).toEqual(160)
   })
})
```

## Spy một function

Chúng ta có thể đặt chế độ theo dõi một anh nhân viên nào đó, để xem một ngày anh đi toilet bao nhiêu lần, đi xung quanh tán gái công ty bao nhiêu đứa

```js
// function để test
function add(a, b, c) {
   return a + b + c
}
// test suite
describe("Add", function() {
    var addSpy, result
    beforeEach(function() {
	    // cử gián điệp theo dõi nhất cử lưỡng động của nhân viên tên **add**
	    addSpy = spyOn(window, "add").and.callThrough()
	    result = addSpy(8, 5, 7)
	})
	// tình hình nhân viên "add" đã có manh động
	it("the function has been called", function() {
	   expect(addSpy).toHaveBeenCalled()
	})
	// kiểm tra kết quả
	it("can evaluate function execution", function() {
	    expect(result).toEqual(20)
	})
	// anh này có đi qua giới hạn không, hành động 2 lần là túm lại
	it("will only be executed once", function() {
	    expect(addSpy.calls.count()).toBe(1)
	})
})
```

## Test các đoạn code bất đồng bộ

Muốn test các đoạn code chạy bất đồng bộ, những nhân viên thường xuyên phải làm việc ngoài đường như đội sale, kế toán, đôi khi họ ra ngoài một thời gian không xác định, khi nào họ mới về lại công ty? Các thư viện test sẽ dùng đến một thiết bị *chip* định vị `done()`, nó sẽ báo cho chúng ta anh ấy đã về tới công ty sao khoản thời gian cafe ngoài đường.

```js
// Nhân viên này có việc cần đường đi khách
function getUserInfo(username) {
   return fetch("https://api.github.com/users/" + username)
}
describe("getUserInfo", function() {
	it("return the correct name", function(done) {
      getUserInfo("luckyluu").then(function(data) {
	      console.log(data)
	      expect(data.name).toBe("anluu")
	      // đặt chip ở đây
	      done();
     })
   })
})
```

Hy vọng các bạn học được nhiều điều hay ho từ bài viết này.

Happy testing!
