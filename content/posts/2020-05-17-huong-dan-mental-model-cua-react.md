---
slug: "/2020-05-17-huong-dan-mental-model-cua-react"
date: "2020-05-17"
title: "Mental model trong React"
desc: "Nếu lập trình đủ lâu, bạn sẽ ít nhiều nghe đến khái niệm mental model, và nếu bạn đã và đang viết React, bạn càng thấy thuật ngữ này xuất hiện rất nhiều. Đây là một khái niệm không chỉ trong hữu dụng trong React, mà nó còn là chìa khóa để bạn tự tin khi làm việc với những thư viện như React."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

<!-- TOC -->

- [Mental model là gì](#mental-model-là-gì)
- [Hình dung cách React vận hành như thế nào](#hình-dung-cách-react-vận-hành-như-thế-nào)
  - [Tất cả đều là function](#tất-cả-đều-là-function)
  - [Component: một function trả về JSX](#component-một-function-trả-về-jsx)
  - [Prop: tham số của function](#prop-tham-số-của-function)
  - [Hình dung về một function](#hình-dung-về-một-function)
- [Hình dung cách React render](#hình-dung-cách-react-render)

<!-- /TOC -->

## Mental model là gì

Một chữ rất khó tìm được một từ tiếng việt gói gọn để mô tả nó. Một cách dài dòng thì nó **là cách mà chúng ta hình dung một vấn đề trong đầu**, một bước **mapping** một hệ thống ở bên ngoài vào trong đầu trong ta, hình dung nó cách vận hành.

![Mental model trong React](https://obedparla.com/static/d3c5f4f4adcb11d610da2a9dd9b38ce5/601b1/mental-models-representation.webp)

Một ví dụ điển hình của mental model là _internet_: một hệ thống phức tạp gồm nhiều phần kết nối lại với nhau, nhưng hãy nghĩ đến cái mà bạn hình dung về nó. Tôi sẽ nghĩ nó là một hệ thống các máy tính kết nối lẫn nhau thông qua rất nhiều server, một vài _điều hướng viên_ giúp định hướng đường đi của thông tin.

Nó không phải là một hệ thống mô tả đầy đủ chi tiết về internet, nhưng ít nhất với cái hình dung này, tôi có thể xử lý nhiều thứ liên quan, thí dụ như nếu tôi cần mạng thì tôi cần có máy tính thiết bị đầu cuối và nối vào một đường truyền của nhà mạng.

**Tại sao quan trọng?**

Nếu chúng ta hình dung được mọi thứ sẽ vận hành ra làm sao, nếu gặp một vấn đề, chúng ta có thể làm việc với nó trơn tru hơn.

## Hình dung cách React vận hành như thế nào

React giúp chúng ta xây dựng nhưng hệ thống UI phức tạp, với tùm lum thứ tương tác qua lại với nhau dễ dàng hơn trước đây rất nhiều. Nó cũng định hướng chúng ta viết code theo một cách rất cụ thể, giống như nó thể thơ "lục bát", khi bạn viết thì phải tuân thủ những nguyên tắc nhất định.

Ý tưởng chính của React: **đóng gói** những logic và UI giống nhau của ứng dụng thành **một khối**, React đảm bảo phần đóng gói này luôn cập nhập.

### Tất cả đều là function

1. React component: là một function
2. Một component chứa một component khác: một function gọi đến một function khác
3. Prop: tham số của một function

Khi viết bằng JSX, bạn có thể tưởng nhầm component, prop là gì đó cao siêu. Nếu bỏ hết những gì của JSX đi, React là những function gọi qua gọi lại.

### Component: một function trả về JSX

React sử dụng JSX - Javascript XML - một cách viết _nhét_ HTML vào trong javascript.

Hãy bỏ qua class component và chỉ tập trung vào functional component đang trở nên phổ biến hơn. Một function component sẽ hoạt động y như một javascript function thông thường. React component luôn trả về JSX -> sau đó sẽ được thực thi và trả về kết quả cuối cùng là HTML

```jsx
const Li = (props) => <li {...props}>{props.children}</li>;

export const RickRoll = () => (
  <div>
    <div className="wrapper">
      <ul>
        <Li color={"red"}>Never give you up</Li>
      </ul>
    </div>
  </div>
);
```

Sẽ được đưa về Javascript như sau

```jsx
const Li = (props) => React.createElement("li", props, props.children);

export const RickRoll = () =>
  React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      {
        className: "wrapper"
      },
      React.createElement(
        "ul",
        null,
        React.createElement(
          Li,
          {
            color: "red"
          },
          "Never give you up"
        )
      )
    )
  );
```

Trong React, cũng như trong HTML và đời sống, con thì chỉ có một mẹ, không đứa con nào của thể do 2 người mẹ sinh ra, mỗi component cũng chỉ có một _mẹ_, component _mẹ_ thì có thể có nhiều con.

### Prop: tham số của function

Prop (properties) chẳng qua là _một cách gọi khác_ cho tham số truyền vào trong function, còn về mọi thứ còn lại nó hoàn toàn giống nhau, React có _nhét_ thêm một số tham số của riêng nó như `children`.

### Hình dung về một function

Bạn có thể hình dung function/component như những chiếc hộp, thằng này bọc thằng kia

![Mental model trong React](https://obedparla.com/static/cf7892f6a3db2815d6c502fe74538e4a/1f85e/box-inside-box.webp)

**Những chiếc hộp này tương tác với nhau như thế nào?**

Bạn có thể hình dung trong đời sống thực ông bà có câu nói **tài sản của cha/mẹ là của con, tài sản của con là của con**, Javascript người ta đặt tên cho kiểu kế thừa đó gọi là **closure**.

Đây là cách mà các function cha-con tương tác với nhau, bạn sử dụng function, bạn đã sử dụng closure.

![Mental model trong React](https://obedparla.com/static/96f403cd585425c1057214447165bbbe/ffce4/data-flow.webp)

Nghĩa là trong React, là cha mẹ chúng ta có thể truyền prop xuống cho con, nhưng _tài sản_ của con thì chúng ta không đụng vào được

```jsx
const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      The count is {count}
      <div>
        <ChildButtons onClick={setCount} count={count} />
      </div>
    </div>
  );
};

const ChildButtons = (props) => (
  <div>
    <button onClick={() => props.onClick(props.count + 1)}>
      Increase count
    </button>
    <button onClick={() => props.onClick(props.count - 1)}>
      Decrease count
    </button>
  </div>
);
```

## Hình dung cách React render

Render có thể xem là phần gây _khó dễ_ nhất của React để mà hình dung. Có những thứ nhìn vào code chúng ta sẽ không thấy được cơ chế khi render chuyện gì xảy ra và không xảy ra.

Tưởng tượng nó như một cái hộp có thể _tái chế_, lần render đầu tiền là lúc sản xuất ra chiếc hộp này, các lần re-render tiếp theo, hay _tái chế_, phần lớn mọi thứ sẽ được đập đi làm lại, nhưng những phần như `state` sẽ được _tái sử dụng_

```jsx
const Thumbnail = (props) => (
  <div>
    {props.withIcon && <AmazingIcon />}
    <img src={props.imgUrl} alt={props.alt} />
  </div>
);
```

![Mental model trong React](https://obedparla.com/static/78de62863da9bd4c40c588c294167031/ffce4/react-rendering-mental-model.webp)

Việc của React phải làm với `state` là đảm bảo nó consistent giữa các lần render.

Khi một chiếc hộp được tái chế, toàn bộ các hộp con bên trong cũng được tái chế - re-render bởi các `state` và `prop` lúc này đã thay đổi.

![Mental model trong React](https://obedparla.com/static/267768646d810a0032728d222c3f13a5/ffce4/react-rendering-mental-model-full.webp)

Hy vọng qua bài viết kiểu này các bạn đã có thể làm việc với React Component một cách _nhẹ nhàng_ không cay cú.

[https://obedparla.com/code/a-visual-guide-to-react-mental-models/](https://obedparla.com/code/a-visual-guide-to-react-mental-models/)
