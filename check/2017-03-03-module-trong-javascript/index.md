---
path: "/2017-03-03-module-trong-javascript"
date: "2017-07-14T03:49:16.408Z"
title: "Module trong Javascript"
desc: "Với những người quen với cách viết hướng đối tượng, module trong javascript có thể gọi là class, đống gói toàn bộ đoạn code lại trong một "cục", state, biến và các phương thức bên trong module sẽ không bị ảnh hưởng bởi module khác, nếu muốn sử dụng các hàm bên trong module, return hàm đó về một public object thay vì một function."
tags: ["javascript"]
---

Với những người quen với cách viết hướng đối tượng, module trong javascript có thể gọi là class, đống gói toàn bộ đoạn code lại trong một "cục", state, biến và các phương thức bên trong module sẽ không bị ảnh hưởng bởi module khác, nếu muốn sử dụng các hàm bên trong module, return hàm đó về một public object thay vì một function.

```javascript
(function(){
 // declare private variables and/or functions
return{
 // declare public variables and/or functions
}
})
```

Một kiểu viết khác của của module là Revealing Module Pattern. Mục đích là vẫn giữ tiêu chí chỉ cho phép gọi các function bên trong module thông qua một object, cho phép thêm việc truy cập đến biến bên trong module

```javascript
var Exposer = (function() {
  var privateVariable = 10;

  var privateMethod = function() {
    console.log('Inside a private method!');
    privateVariable++;
  }

  var methodToExpose = function() {
    console.log('This is a method I want to expose!');
  }

  var otherMethodIWantToExpose = function() {
    privateMethod();
  }

  return {
      first: methodToExpose,
      second: otherMethodIWantToExpose
  };
})();

Exposer.first();        // Output: This is a method I want to expose!
Exposer.second();       // Output: Inside a private method!
Exposer.methodToExpose; // undefined
```

# Prototype

Một trường hợp hay sử dụng là một dev khai báo một object với những phương thức A,B,C, nếu muốn extend thêm một function D cho object đó, đưa cho một anh dev khác viết thì hãy nghĩ đến prototype

```javascript
var TeslaModelS = function() {
  this.numWheels    = 4;
  this.manufacturer = 'Tesla';
  this.make         = 'Model S';
}

TeslaModelS.prototype.go = function() {
  // Rotate wheels
}

TeslaModelS.prototype.stop = function() {
  // Apply brake pads
}
```