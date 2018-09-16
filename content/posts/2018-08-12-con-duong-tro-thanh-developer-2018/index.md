---
slug: "/2018-08-12-huong-dan-con-duong-tro-thanh-developer-2018"
date: "2018-08-12"
title: "Con đường để trở thành React developer ( phiên bản 2018)"
desc: "Hướng dẫn, soi sáng cho các bạn muốn trở thành FrontEnd Developer. Nếu đã chọn FrontEnd làm nghiệp, React làm món ăn mỗi sáng, mà chưa biết cần học cái gì, hy vọng bài viết này sẽ có ích cho các bạn còn đang ko biết học cái gì"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [Bắt buộc phải học](#bắt-buộc-phải-học)
- [Kỹ năng Development](#kỹ-năng-development)
- [React và hệ sinh thái (nghe kêu ghê chưa)](#react-và-hệ-sinh-thái-nghe-kêu-ghê-chưa)
  - [CSS](#css)
  - [Build tools](#build-tools)
  - [State management](#state-management)
  - [Type Checkers](#type-checkers)
  - [Routing](#routing)
  - [API clients](#api-clients)
  - [Thư viện tiện ích](#thư-viện-tiện-ích)
  - [Testing](#testing)
  - [Static Site Generator](#static-site-generator)
  - [i18n](#i18n)
  - [Server Side Rendering](#server-side-rendering)

<!-- /TOC -->

Cái nào **in đậm** là bắt buộc, *để nghiêng* biết thì tốt, <del>gạch ngang</del> là ko cần học luôn

# Bắt buộc phải học

- **HTML**: căn bản html, cách viết semantic html, cách structure DOM, tập trung nhiều vào cách structure
- **CSS**: học CSS căn bản, Flexbox, Responsive Web Design, Media Queries
- **JS căn bản**: Hoisting, Event Bubbling, Prototyping, AJAX (XHR), thao tác trên DOM, ECMA 6
  - [learn-js.org](http://www.learn-js.org/)
  - [Mozilla developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - [Microsoft’s Virtual Academy](https://channel9.msdn.com/Series/Javascript-Fundamentals-Development-for-Absolute-Beginners)
- <del>jQuery</del>: có thể bỏ qua không cần học

# Kỹ năng Development

- **GIT, Github, Bitbucket, Gitlab**
- **HTTP/HTTPS**
- **Kỹ năng search google**
- **Dùng terminal**
- **Data structure và Algorithms**
- **Design pattern**

# React và hệ sinh thái (nghe kêu ghê chưa)

## CSS
- CSS Preprocessor
  - **Sass/SCSS, PostCSS**
  - <del>less</del>
  - <del>stylus</del>
- CSS Framworks: **Bootstrap**, *Semantic UI*
- CSS Architecture
  - **BEM**
  - *CSS modules*
- **CSS in JS**
  - *styled components*

## Build tools

- package manager
  - **npm**
  - *yarn*
- **webpack**
- task runner: chỉ cần nghiên cứu **npm scripts**

## State management

- **Component state / context**
- **Redux**
  - async actions: **redux thunk**, *redux saga, redux observable*
  - helpers: *rematch, reselect*
  - Form helpers
    - *redux form*
    - *formik*
- *Mobx*

## Type Checkers

Bắt buộc: **PropTypes**, biết thì tốt: *TypeScript*, *Flow*

## Routing

Chỉ có **React-Router** là bắt buộc

## API clients

- **REST**
  - **fetch** (cái này của browser)
  - *axios*
- GraphQL (có thể trong tương lai sẽ phổ biến hơn, giờ chưa bắt buộc)

## Thư viện tiện ích

- **Lodash**
- **Moment**
- **Classnames**
- *Numeral*
- *RxJS*

## Testing

- Unit testing
  - **Jest**
  - **Enzyme**
  - **Sinon**
  - *Macha*
  - *Chai*

## Static Site Generator

Hiện giờ chỉ có *Gatsby*


## i18n

- **React Intl**
- *React i18next*

## Server Side Rendering

- *Next.js*

Đấy chỉ có bấy nhiếu thôi, nếu đã xong hết thì làm tiếp luôn cái React Native và hệ sinh thái của nó nữa là ngon lành. :Đ

[Link file gốc của tác giả Adam Golab](https://raw.githubusercontent.com/adam-golab/react-developer-roadmap/master/roadmap.png)