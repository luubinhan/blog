---
path: "/2017-08-08-react-forms"
date: "2017-08-08T13:35:13.234Z"
title: "React Forms"
desc: "MobX là một một thư viện độc lập để quản lý state, phần lớn nó được sử dụng chung với React"
tags: ["javascript", "react"]
---

**HTML form elements** hoạt động hơi khác một chút so với các DOM element trong React, form elements thường kèm theo một *state* đi với nó

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Với nhưng element chúng ta phải tương tác với dữ liệu nhập vào từ người dùng như *input*, *select*, *textarea* như trên, chúng ta sẽ muốn lấy giá trị đó, cách làm cho những element như thế gọi là *controlled component*