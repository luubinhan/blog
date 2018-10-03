---
slug: "/2018-10-02-huong-dan-su-dung-tabindex-de-di-chuyen"
date: "2018-10-02"
title: "Sử dụng tabindex"
desc: "Mặc định thứ tự tab theo vị trí của DOM rất hữu dụng, tuy nhiên có trường hợp chúng ta sẽ muốn thay đổi thứ tự tab này. Cùng nghiên cứu attribute tabindex để set thứ tự tab"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

`tabindex` có thể sử dụng trong bất kỳ thẻ html nào

**`tabindex="0"`**: element sẽ có thứ tự tab theo mặc định (theo vị trí DOM), nó có thể được focus bằng cách ấn phím **Tab**, hoặc gọi phương thức `focus()`

```html
<button tabindex="0">Press Tab to Focus Me!</button>
```

**`tabindex="-1"`**: sẽ bỏ qua element này khi nhấn tab, vẫn có thể focus bằng cách gọi `focus()`

```html
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
```

**`tabindex="5"`**: nếu là giá trị lớn hơn 0, nó sẽ được ưu tiên cao hơn khi nhấn tab so với các element có `tabindex="0"`. Nếu có nhiều tabindex lớn hơn 0, nó sẽ đi theo thứ tự **bắt đầu từ giá trị nhỏ nhất (nhưng vẫn lớn hơn 0 nhé) đến giá trị cao hơn.**

```html
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
```

Đặc biệt đúng cho các trường hợp đặt tab cao hơn cho các element như header, image, tiêu đề article. Luôn khuyến khích tổ chức DOM theo logic như thứ tự tab mong muốn. Nếu bạn muốn dùng `tabindex`, thì chỉ giới hạn cho các đối tượng có thể tương tác như button, tab, dropdown, text field.

# Quản lý focus trên trang

Đây là trường hợp mà `tabindex` không chỉ hữu ích mà còn cần thiết. Bạn build một trang single page chứa các section khác nhau, nó không hiển thị đồng thời nhiều section trên cùng viewport được. Click vào thanh navigation để di chuyển giữa các section. Lúc đó, chúng ta sẽ có được section đang hiển thị trên viewport, đặt giá trị `tabindex="-1"` để tách nó khỏi thứ tự tab mặc định và gọi `focus()`.

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

# Modal và keyboard trap

Có tình huống focus sẽ lặp mãi mãi, như cái autocomplete nó sẽ bắt sự kiện focus và tab, không cho user ra khỏi element đó nếu dùng phím. Nó được gọi là **keyboard trap**, nó được đề cập cụ thẻ [trong đây](http://webaim.org/standards/wcag/checklist#sc2.1.2). 

Tình huống hay gặp nhất là cái modal, một khi modal được hiển thị, chúng ta không cho user truy cập đến các phần khác bên dưới, nhưng nếu dùng phím vẫn có thể di chuyển qua các phần tử bên dưới.

Bằng cách cho keyboard trap tạm thời trên modal để user không di chuyển ra khỏi modal này nếu dùng phím tab, nhớ trả lại bình thường sau khi modal đóng lại.

Chi tiết về cách làm [tham khảo source code](https://github.com/udacity/ud891/tree/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution) và [demo ở đây](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html)

[Link bài gốc](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex)