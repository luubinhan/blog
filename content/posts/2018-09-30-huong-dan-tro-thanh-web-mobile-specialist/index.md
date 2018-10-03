---
slug: "/2018-09-30-huong-dan-tro-thanh-web-moblie-specialist"
date: "2018-09-30"
title: "Bộ kiến thức của google để được gọi là chuẩn Web Mobile Developer"
desc: "Mình bắt đầu một series mới, đây là bài đầu tiên tổng hợp tất cả những chủ đề sẽ điểm qua trong series này, nắm hết các kiến thức này, các bạn có thể tự tin lấy chứng chỉ Web Mobile Specialist của Google"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Website layout and styling](#website-layout-and-styling)
- [Network](#network)
- [Accessibility](#accessibility)
- [Progressive Web Apps](#progressive-web-apps)
- [Performance Optimization và Caching](#performance-optimization-và-caching)
- [Testing và Debugging](#testing-và-debugging)
- [Khái niệm ES2015 và cú pháp](#khái-niệm-es2015-và-cú-pháp)
- [Mobile Web Forms](#mobile-web-forms)

<!-- /TOC -->

# Website layout and styling

Cần nắm

- Chỉ sử dụng javascript để truy cập và thao tác trên DOM mà không dùng thư viện jQuery
- Khai báo document type, viewport tag phù hợp
- Responsive grid-base sử dụng CSS
- Media queries để tạo break point trên các kích thước màn hình
- Multimedia tag để hiển thị video và audio
- Responsive image theo từng resolution và hướng màn hình (ngang hay đứng) trên bất kỳ thiết bị mobile nào
- Cách bắt Sự kiện Touch và mouse

Nguồn tham khảo ( mình sẽ viết từ từ )

- Responsive Web Design
- A Complete Guide to Flexbox
- Using media queries
- [Video and audio content](https://developer.mozilla.org/vi/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content), bài này mình dịch nếu sai chổ nào các bạn sữa giúp
- Responsive Images by Google
- Supporting both TouchEvent and MouseEvent
- [Touch events](https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent)

# Network

- Request data sử dụng `fetch()`
- Kiểm trả response status, sau đó `parse` dữ liệu này về thành data có thể sử dụng
- Render dữ liệu lên trang
- Cấu hình POST request với tham số `method` và `body`
- Sử dụng đúng cách cấu hình CORS ( cross-origin resource sharing protocol ) với fetch request, tùy thuộc vào header trả về từ server
- Xử lý error bằng promise trong fetch request
- Phân tích lỗi network sử dụng các công cụ debug

Nguồn tham khảo ( mình sẽ viết từ từ )

- [Giới thiệu fetch() của javascript](2018-10-01-huong-dan-gioi-thieu-fetch-javascript)
- Using fetch
- David Walsh's blog on fetch
- Jake Archibald's blog on fetch
- JavaScript Promises: an Introduction
- HTTP access control (CORS)

# Accessibility

- Cách đặt tab order để di chuyển bằng tab
- Sử dụng skip navigation link để bypass
- Tránh sử dụng nội dung ẩn làm cản trở việc di chuyển bằng tab
- Sử dụng thẻ head phù hợp để dựng cấu trúc trang
- Sử dụng các thẻ `alt`, `label`, `aria-label` và `aria-labelledby`
- Áp dụng độ tương phản thích hợp tuân theo quy ước chung
- Gởi thông báo khẩn cấp sử dụng `aria-live`
- Sử dụng semantic markup để giữ nội dung chính và các element khác riêng biệt

Nguồn tham khảo ( mình sẽ viết từ từ )

- Web Fundamentals – Accessibility
- Web Accessibility
- Mobile Accessibility
- [Sử dụng tabindex](2018-10-02-huong-dan-su-dung-tabindex-de-di-chuyen/)
- Focus
- Skip Navigation Links
- ARIA

# Progressive Web Apps

- Tạo web app có thể sử dụng offline, cache các element bằng cách đưa request về service worker
- Lưu những giá trị hiện thị mặc định như màu sắc, icon (nút thêm vào màn hình chính trên điện thoại) và splash screen trong web application manifest ( hoặc dùng meta tag )
- Tách các tính năng quan trọng và UI để có thể load độc lập nội dung

Nguồn tham khảo ( mình sẽ viết từ từ )

- Progressive Web Apps
- Progressive Web Apps Training
- Web Fundamentals - The App Shell Model
- Your First Progressive Web App
- Using Service Workers

# Performance Optimization và Caching

- Tránh khóa thread chính (web app chạy trên một single threat thôi) bằng web worker phù hợp
- Tối ưu render bằng cách sử dụng hợp lý
  - Compressed và minified javascript, HTML, CSS
  - Inline CSS cho một số trang nhất định, load bất đồng bộ một số stylesheet khác nếu cần
  - Inline javascript trong lúc khởi chạy render  những chổ cần thiết (hoặc đánh dấu deferred, async)
  - Đặt thứ tự load phù hợp, các phần nào bắt buộc thì cho load trước, những resource khác cho nằm sau cùng
  - Hạn chế tạo DOM nhiều tầng lớp
  - Sử dụng trình duyệt để phân tích lỗi trên mobile
- Load lại file khi nó available
- Lưu lại dữ liệu xuống client
  - [Quản lý session](2018-09-17-huong-dan-luu-token-o-dau)
  - Cache asset nào tốn thời gian để load
  - Sử dụng IndexedDB để lưu dữ liệu động trong lúc chạy offline

Nguồn tham khảo ( mình sẽ viết từ từ )

- Using Web Workers
- Offline Web Applications by Google
- Web Fundamentals - Performance
- The Offline Cookbook
- Cache - MDN
- Storage
- Local Storage And How To Use It On Websites
- IndexedDB API
- Get Started with Analyzing Network Performance in Chrome DevTools

# Testing và Debugging

- Viết unit test để kiểm tra function
- Đặt breakpoint bên trong các function phức tạp để xác định chính xác luồn chạy có đúng không
- Sử dụng `console` để log thông tin
- Re-produce và fix bug dựa trên report của user

Nguồn tham khảo ( mình sẽ viết từ từ )

- Get Started with Debugging JavaScript in Chrome DevTools
- [Làm việc với console trong javascript](2018-06-24-huong-dan-lam-viec-voi-console-trong-javascript/)
- Debugging Service Workers

# Khái niệm ES2015 và cú pháp

- Cú pháp Promise để tạo hàm bất tuần tự và xử lý lỗi
- Biến có thể sử dụng với block scope, function scope, và cách làm cho nó không thay đổi theo **context** sử dụng `let`, `var`, `const`
- String literal
- Arrow function
- Default parameter cho function
- `for...of` để loop và object và chạy một custom function
- Map
- Set

Nguồn tham khảo ( mình sẽ viết từ từ )

- [JavaScript Promises](2017-10-12-javascript-promise/)
- [Template literals](2016-11-19-phan-5-es6-can-ban-template-literals)
- Arrow Functions
- Default parameters
- For...of
- Map
- Set

# Mobile Web Forms

- Sử dụng thẻ `label` cho input
- Input với giá trị `type`, `name`, `autocomplete` phù hợp
- Sử dụng input có kích thước phù hợp cho việc touch
- Suggestion cho user bằng `datalist`
- Validate các input ở FrontEnd ( ví dụ pattern, maxlength, required)
  - Kiểm tra validate ngay lặp tức bằng **pseudo-classes** trên input
  - Thực hiện validate khi submit

Nguồn tham khảo ( mình sẽ viết từ từ )

- Create Amazing Forms
- Constraint Validation
- Client-Side Form Validation with HTML5
- Data form validation
- HTML Forms

[Tham khảo cách lấy chứng chỉ Web Mobile Specialist](
https://developers.google.com/training/certification/mobile-web-specialist/)