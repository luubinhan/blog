---
slug: "/2018-12-12-setstate-chay-nhu-the-nao"
date: "2018-12-12"
title: "this.setState trong React chạy như thế nào"
desc: "Giải đáp thắc mắc vì sao this.setState có thể update DOM, chạy được trên mobile, chạy được trên bất kỳ môi trường nào"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---


Update lại DOM nghe có vẻ là công việc của React DOM, tuy nhiên chúng ta gọi `this.setState()` bên trong một React Component,  nó sẽ không liên quan tới React DOM, React.Component sẽ xử lý.

Vậy làm sao `setState()` bên trong React.Component update được DOM? Bạn có thể nghĩ là bên trong React.Component chứa logic để update DOM. Nhưng tại sao chúng ta vẫn có thể gọi `this.setState()` trên các môi trường khác, ví dụ như sử dụng trên React Native, nó cũng là extends của `React.Component`. Và React Native thì làm việc được trên cả Android iOS, cái View đó thì ko dựng bằng DOM.

Nếu bạn đã sử dụng qua React Test Renderer hoặc Shallow Renderer. Cả 2 cách test này đều cho phép render một component bình thường và gọi `this.setState` bên trong nó. Và cả 2 thằng đó cũng ko liên quan gì tới DOM.

Như vậy là `React.Component` được giao nhiệm vụ update state thì nó chạy một đoạn code chỉ định theo từng platform.

Rất nhiều người lầm tưởng có một React *engine* bên trong package `react`. Điều này không đúng.

Thực chất, kể từ phiên bản React 0.14, package `react` đã được tách hẳn ra cung cấp các API để khai báo *component*. Hầu hết code được thực hiện ở các **renderers**

`react-dom`, `react-dom/server`, `react-native`, `react-test-renderer`, `react-art` là những **renderers` như vậy. Và bạn cũng có thể tự build một cái  luôn.

Đó là lý do tại sao package `react` rất là hữu dụng dù bạn đang sử dụng trên bất kỳ platform nào. Tất cả những gì nó export, như `React.Component`, `React.createElement`, `React.Children` và thậm chị là *Hook*, độc lập hoàn toàn với platform. Và khi dùng chung với React DOM, React DOM server, React Native, các component của chúng ta vẫn import và sử dụng như nhau.

Những thằng renderer sẽ có các API như `ReactDOM.render()` cho phép mount cấu trúc React Component vào DOM node. Mỗi thằng renderer sẽ cung cấp các API tương tự như vậy trên platform của nó. Tất cả các component khi được khai báo không cần import bất cứ gì từ renderer, như vậy để nó portable.
Như vậy bạn có thể hiểu là tại sao khi cập nhập thì chúng ta cần cập nhập cả 2 package `react` và `react-dom` cùng lúc. Ví dụ khi React 16.3 ra API context, `React.createContext()`, cái này `react` chưa có implement, mà được implement trong renderer như  React DOM, và React DOM Server sẽ có 2 cách implement khác nhau, React DOM có thể track context một chiều, nhưng React DOM Server sẽ track theo kiểu khác.

Vẫn chưa trả lời được câu hỏi ban đầu, làm sao `setState()` bên trong `React.Component` **nói chuyện** với đúng renderer nó cần.

Câu trả lời là các renderer set một field đặc biệt trong lúc create class. Field này gọi là `updater`, giá trị này bạn phải set, mà là công việc của React DOM, React DOM server, React Native set ngay sau khi tạo 1 instance của class.

```js
// Bên trong React DOM
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMUpdater;

// Bên trong React DOM Server
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMServerUpdater;

// Bên trong React Native
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactNativeUpdater;
```
Bên trong React, nó chỉ delegate lại công việc cho các renderer

```js
// ví dụ đã được cắt bớt các phần khác.
setState(partialState, callback) {
  // Sử dụng field `updater`
  this.updater.enqueueSetState(this, partialState, callback);
}
```
Hy vọng bạn đã hiểu tại sao `this.setState()` có thể update được DOM



<a target="_blank" rel="noopener noreferrer" href="https://overreacted.io/how-does-setstate-know-what-to-do/">How does setstate know what to do</a>