---
slug: "/2018-07-20-tao-animation-cho-component-voi-react"
date: "2018-07-20"
title: "Tạo một animation cho component trong React"
desc: "Sử dụng React, styled-components, react-flip-toolkit để tạo animation giống như mên trên trang chủ của Stripe"
cover: ""
type: "post"
lesson: 2
chapter: 1
tags: ["react", "javascript", "html-css"]
---


<!-- TOC -->

- [Phân tích](#phân-tích)
- [Dựng component thô chưa có animate](#dựng-component-thô-chưa-có-animate)
- [Animate với Flip technique](#animate-với-flip-technique)
- [Chăm chúc](#chăm-chúc)
- [Background animation](#background-animation)

<!-- /TOC -->

# Phân tích

<p data-height="265" data-theme-id="0" data-slug-hash="PaYXEZ" data-default-tab="js,result" data-user="aholachek" data-embed-version="2" data-pen-title="React Stripe Menu" class="codepen">See the Pen <a href="https://codepen.io/aholachek/pen/PaYXEZ/">React Stripe Menu</a> by Alex (<a href="https://codepen.io/aholachek">@aholachek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Trước tiên phân tích cái animation này ra thành nhiều phần để dể hình dung. Có thể xem dạng slow motion trên Codepen để xem nhé.

- container dropdown màu trắng sẽ thay đổi kích thước và vị trí
- background màu xám ở phía dưới của dropdown transition độ cao
- Khi di chuyển chuột khỏi dropdown, fade out nội dung trước đó đi và chuyển vị trí nó sang element mới, sau đó đưa nội dung mới lên.

Một vài lưu ý khi làm animation với React, cứ để browser quản lý layout. Thay vì sử dụng các dropdown khác nhau, chúng ta dùng 1 dropdown và thay đổi vị trí của nó, dùng [Flip technique](https://css-tricks.com/animating-layouts-with-the-flip-technique/) để giả lập như có 3 dropdown khác nhau.

# Dựng component thô chưa có animate

<p data-height="265" data-theme-id="0" data-slug-hash="OELrzN" data-default-tab="js,result" data-user="aholachek" data-embed-version="2" data-pen-title="React Stripe Menu Before Animation" class="codepen">See the Pen <a href="https://codepen.io/aholachek/pen/OELrzN/">React Stripe Menu Before Animation</a> by Alex (<a href="https://codepen.io/aholachek">@aholachek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Để bắt đầu ta dựng một component `navbar` sử dụng `styled-component`

Ở đây thì chưa thêm phần gray background ở dưới dropdown, cái này nó sẽ nằm `absolute`

# Animate với Flip technique

Chúng ta sẽ sử dụng [react-flip-toolkit](https://github.com/aholachek/react-flip-toolkit) để thay đổi kích thước và vị trí dropdown.

```jsx
<Flipper flipKey={currentIndex}>
  <Navbar>
    {navbar.Config.map((n, index) => {
      // render navbar items
    })}
  </Navbar>
</Flipper>
```

Ở `DropdownContainer` component, đưa các element sẽ animate vào bên trong `Flipped` component, nhớ giá trị `flipId` phải khác nhau

```jsx
<DropdownRoot>
  <Flipped flipId='dropdown-caret'>
    <Caret />
  </Flipped>
  <Flipped flipId='dropdown'>
    <DropdownBackground>
      {children}
    </DropdownBackground>
  </Flipped>
</DropdownRoot>
```

Làm 2 cái animate trên `<Caret/>` và `<DropdownBackground/>` riêng biệt, để thuộc tính `overflow: hidden` set trên `<DropdownBackground />` không ảnh hưởng tới `<Caret/>`

Giờ có 1 vấn đề nhỏ là nội dung bên trong dropdown lúc xuất hiện bị stretch một cách kỳ cục, lý do là thuộc tính `transforms: scale` nó áp luôn trên children. Xử lý cái này bằng cách đưa nội dung này vào trong `<Flipped/>` kèm giá trị cho props `inverseFlipId`, lúc này children sẽ không bị effect từ thằng cha nữa, đồng thời xác định luôn là ko muốn áp thằng `scale`

<p data-height="265" data-theme-id="0" data-slug-hash="MXgZxG" data-default-tab="js,result" data-user="aholachek" data-embed-version="2" data-pen-title="React Stripe Menu -- Error #1: no scale adjustment" class="codepen">See the Pen <a href="https://codepen.io/aholachek/pen/MXgZxG/">React Stripe Menu -- Error #1: no scale adjustment</a> by Alex (<a href="https://codepen.io/aholachek">@aholachek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

```jsx
<DropdownRoot>
  <Flipped flipId="dropdown-caret">
    <Caret />
  </Flipped>
  <Flipped flipId="dropdown">
    <DropdownBackground>
      <Flipped inverseFlipId="dropdown" scale>
        {children}
      </Flipped>
    </DropdownBackground>
  </Flipped>
</DropdownRoot>
```

# Chăm chúc

Cũng gần được rồi, chúng ta cần để ý thêm vào những chi tiết nhỏ nhất để animate nhìn cool hơn

Styled-components hổ trợ rất tốt việc [thay đổi keyframe animation](https://www.styled-components.com/docs/basics#animations). Chúng ta sẽ sử dụng tính năng này để làm animation lúc enter và cross-fade nội dung dropdown khi thay đổi ví trí chuột.

```jsx
const getFadeContainerKeyFrame = ({ animatingOut, direction }) => {
  if (!direction) return;
  return keyframes`
    from {
      transform: translateX(${
        animatingOut ? 0 : direction === 'left' ? 20 : -20
      }px);
    }
    to {
      transform: translateX(${
        !animatingOut ? 0 : direction === 'left' ? -20 : 20
      }px);
      opacity: ${animatingOut ? 0 : 1};
    }
  `;
};

const FadeContainer = styled.div`
  animation-name: ${getFadeContainerKeyFrame};
  animation-duration: ${props => props.duration * 0.5}ms;
  animation-fill-mode: forwards;
  position: ${props => (props.animatingOut ? "absolute" : "relative")};
  opacity: ${props => (props.direction && !props.animatingOut ? 0 : 1)};
  animation-timing-function: linear;
  top: 0;
  left: 0;
`
```

<p data-height="265" data-theme-id="0" data-slug-hash="NzPpwG" data-default-tab="js,result" data-user="aholachek" data-embed-version="2" data-pen-title="React Stripe Menu -- Simple FLIP" class="codepen">See the Pen <a href="https://codepen.io/aholachek/pen/NzPpwG/">React Stripe Menu -- Simple FLIP</a> by Alex (<a href="https://codepen.io/aholachek">@aholachek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Khi user đưa chuột lên menu mới, chúng ta ko chỉ đưa vào dropdown hiện tại mà con dropdown trước đó như children cho `DropdownContainer`, cùng với những thông tin về hướng di chuột của user. Sau đó `DropdonwContainer` sẽ wrap hết tất cả children của nó trong một component mới, `FadeContents`, thằng này sẽ sử dụng keyframe animation code ở trên để thêm animation tương ứng

# Background animation

Cuối cùng chúng ta thêm gray background

```jsx
const updateAltBackground = ({
  altBackground,
  prevDropdown,
  currentDropdown
}) => {
  const prevHeight = getFirstDropdownSectionHeight(prevDropdown)
  const currentHeight = getFirstDropdownSectionHeight(currentDropdown)
  
  // we'll use this function when we want a change 
  // to happen immediately, without CSS transitions
  const immediateSetTranslateY = (el, translateY) => {
    el.style.transform = `translateY(${translateY}px)`
    el.style.transition = "transform 0s"
    requestAnimationFrame(() => (el.style.transitionDuration = ""))
  }

  if (prevHeight) {
    // transition the grey ("alt") background from its previous height
    // to its current height
    immediateSetTranslateY(altBackground, prevHeight)
    requestAnimationFrame(() => {
      altBackground.style.transform = `translateY(${currentHeight}px)`
    })
  } else {
    // immediately set the background to the appropriate height
    // since we don't have a stored value
    immediateSetTranslateY(altBackground, currentHeight)
  }
}
```

<p data-height="265" data-theme-id="0" data-slug-hash="qKRWBe" data-default-tab="js,result" data-user="aholachek" data-embed-version="2" data-pen-title="React Stripe Menu -- Animated Background" class="codepen">See the Pen <a href="https://codepen.io/aholachek/pen/qKRWBe/">React Stripe Menu -- Animated Background</a> by Alex (<a href="https://codepen.io/aholachek">@aholachek</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Source: https://github.com/aholachek/react-stripe-menu

[Link bài gốc của tác giả](https://css-tricks.com/building-a-complex-ui-animation-in-react-simply/)