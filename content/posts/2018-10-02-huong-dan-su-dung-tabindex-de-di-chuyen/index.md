---
slug: "/2018-10-02-huong-dan-su-dung-tabindex-de-di-chuyen"
date: "2018-10-02"
title: "Sử dụng tabindex"
desc: "Mặc định thứ tự tab theo vị trí của DOM rất hữu dụng, tuy nhiên có trường hợp chúng ta sẽ muốn thay đổi thứ tự tab này. Cùng nghiên cứu tabindex để set thứ tự tab"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["ux-ui", "mobile-web-specialist"]
---

`tabindex` có thể sử dụng trong bất kỳ thẻ html nào

**`tabindex="0"`**: element sẽ có thứ tự tab theo mặc định (theo vị trí DOM), nó có thể được focus bằng cách ấn phím **Tab**, hoặc gọi phương thức `focus()`

```html
<button tabindex="0">Press Tab to Focus Me!</button>
```

Các element có thể focus như thẻ `a`, `button`, `select`, `input`, `textarea` thì đã có sẵn `tabindex=0`, trừ khi chúng ta dùng một thẻ `div` như `button` thì phải đặt `tabindex=0`, để user có thể tab tới đó mà.

**`tabindex="-1"`**: sẽ bỏ qua element này khi nhấn tab, vẫn có thể focus bằng cách gọi `focus()`

```html
<button id="foo" tabindex="-1">Chớ bao giờ tab được anh đâu</button>
<button onclick="foo.focus();">Focus vào thằng ở trên</button>
```

**`tabindex="5"`**: nếu là giá trị lớn hơn 0, nó sẽ được ưu tiên cao hơn. Nếu có nhiều tabindex lớn hơn 0, nó sẽ đi theo thứ tự **bắt đầu từ giá trị nhỏ nhất (nhưng vẫn lớn hơn 0 nhé) đến giá trị cao hơn.**

```html
<button>Anh trước</button>
<button>Chú sau</button>
<button tabindex="5">Chị có bầu, phải được ưu tiên em ơi</button>
```

Sử dụng đúng nhất cho các trường hợp cần được ưu tiên cao hơn như header, navigation. Khuyến khích tổ chức DOM theo logic như thứ tự tab mong muốn. Nếu bạn muốn dùng `tabindex`

# Quản lý focus trên trang

> Tip: kiểm tra element đang được focus: `document.activeElement`

Đây là trường hợp mà `tabindex` không chỉ hữu ích mà còn cần thiết. Bạn có  trang single page chứa các section khác nhau, nó không hiển thị đồng thời nhiều section trên cùng viewport được. Click vào thanh navigation để di chuyển giữa các section. Lúc đó, chúng ta sẽ có được section đang hiển thị trên viewport, đặt giá trị `tabindex="-1"` để tách nó khỏi thứ tự tab mặc định và gọi `focus()`.

# Quản lý tab trên component

Lấy ví dụ thẻ `<select />`, khi được focus, user có thể dùng các phím mũi tên để chọn các option. Nếu đang build một `<select />` custom bằng `<ul />` chẳng hạn, user phải có kiểu hoạt động tương tự như vậy

Để tham khảo thêm chi tiết keyboard nào cho element nào, đọc bài [Accessible Rich Internet Applications (ARIA) Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)

```html
<radio-group>
  // Giả dụ user nhấn phím mũi tên đi xuống, chúng ta gọi focus vào đứa tiếp theo
  <radio-button tabindex="-1">Water</radio-button>
  <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
  <radio-button tabindex="-1">Tea</radio-button>
  <radio-button tabindex="-1">Cola</radio-button>
  <radio-button tabindex="-1">Ginger Ale</radio-button>
</radio-group>
```

# Vấn đề với Modal và keyboard

Có tình huống focus sẽ lặp mãi mãi, như cái autocomplete nó sẽ bắt sự kiện focus và tab, không cho user ra khỏi element đó nếu dùng phím. Nó được đề cập cụ thể [trong đây](http://webaim.org/standards/wcag/checklist#sc2.1.2). 

Tình huống khác cũng hay gặp là cái modal, khi modal hiển thị, chúng ta không cho user truy cập đến các phần khác bên dưới, nhưng nếu dùng phím vẫn có thể di chuyển qua các phần tử bên dưới.

Bằng cách cho keyboard tạm thời *khóa* trên modal để user không di chuyển ra khỏi modal này nếu dùng phím tab, nhớ trả lại bình thường sau khi modal đóng lại.

- Chi tiết về cách làm [tham khảo source code](https://github.com/udacity/ud891/tree/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution) và [demo ở đây](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html)

- [Dịch từ Google Web Fundamentals](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex)

- [Course hay của Udacity về Web Accessibility](https://www.udacity.com/course/web-accessibility--ud891)