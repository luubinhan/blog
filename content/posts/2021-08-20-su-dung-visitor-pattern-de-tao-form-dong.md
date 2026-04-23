---
slug: "/2021-08-20-su-dung-visitor-pattern-de-tao-form-dong"
date: "2021-08-20"
title: "Ứng dụng Visitor Pattern để làm configure UI driven"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "hoc-thuat", "hard"]
---


Vấn đề chúng ta cần giải quyết: chúng ta cần render form với các loại field phổ biến như `date`, `number`, `dropdown`, `text`, với điều kiện là những field này user có thể **config** được, giống như google form

> Visitor pattern là 1 phương pháp thiết kế trong OOP, cách làm là chúng ta sẽ có một object với cấu trúc định sẵn, sử dụng object này để thực hiện những xử lý chúng mong muốn

**object với cấu trúc định sẵn** thường được gọi là `schema`, trong bài toán của chúng ta thì schema cần những property sau

- `fieldType`: ví dụ dropdown, textbox, date, number
- `label`: ví dụ first name, birthday
- `name`: field name dùng để submit form
- `required`: thuộc tính có bắt buộc không

```js
const schema = [
  {
    label: "First Name",
    name: "firstName",
    required: true,
    fieldType: "Text",
  },
  {
    label: "Birthdate",
    name: "birthdate",
    required: true,
    fieldType: "Date",
  },
  {
    label: "Number of Pets",
    name: "numPets",
    required: false,
    fieldType: "Number",
  },
]
```

Để render form dựa trên `schema` này, giải pháp xuất hiện ngay trong đầu sẽ là

```jsx
function Form({ schema }) {
  return schema.map((field) => {
    switch (field.fieldType) {
      case "Text":
        return <input type="text" /> 
      case "Date":
        return <input type="date" />
      case "Number":
        return <input type="number" />
      default:
        return null
    }
  })
}
```

Tuy nhiên, đây chưa phải là visitor pattern, để có thể customize *sâu và rộng* schema, mà không cần cập nhập lại `Form`

```js
const defaultComponents = {
    Text: () => <input type="text" />,
  	Date: () => <input type="date" />,
  	Number: () => <input type="number" />
}
    
function ViewGenerator({ schema, components }) {
	const mergedComponents = {
        // highlight-next-line
		...defaultComponents,
        // highlight-next-line
		...components
	}
	
	return schema.map((field) => {
		return mergedComponents[field.fieldType](field)
	})
}
```

`ViewGenerator` cũng chung một công dụng như `Form` ở trên, ở đây chúng ta chỉ làm thêm việc, 1 là đưa phần khai báo component ra `defaultComponent` và bổ sung tham số `components` để khi có nhu cầu mở rộng, override các component default thì truyền thêm. Quá generic!

```jsx
const data = {
  firstName: "John",
  birthdate: "1992-02-01",
  numPets: 2
}

const profileViewComponents = {
  Text: ({ label, name }) => (
    <div>
      <p>{label}</p>
      <p>{data[name]}</p>
    </div>
  ),
  Date: ({ label, name }) => (
    <div>
      <p>{label}</p>
      <p>{data[name]}</p>
    </div>
  ),
  Number: ({ label, name }) => (
    <div>
      <p>{label}</p>
      <p>{data[name]}</p>
    </div>
  )
}

function ProfileView({ schema }) {
  return (
    <ViewGenerator
      schema={schema}
      components={profileViewComponents}
    />
  )
}
```

Giờ nếu các field được group vào kiểu cha-con thì sao? Một cách (mình cũng không thích lắm) là thêm `children` 

```js
const schema = [
  {
    label: "Personal Details",
    fieldType: "Section",
    children: [
      {
        label: "First Name",
        fieldType: "Text",
      },
      {
        label: "Birthdate",
        fieldType: "Date",
      },
    ],
  },
  {
    label: "Favorites",  
    fieldType: "Section",
    children: [
      {
        label: "Favorite Movie",
        fieldType: "Text",
      },
    ],
  },
]
```

Với một cấp duy nhất thì schema này ok, nhưng nếu lồng nhiều hơn một cấp thì đây không phải cách mình sẽ làm, anyway để đơn giản hóa chúng ta chỉ dùng một cấp. Phần `ViewGenerator` cần được cập nhập để render thêm các children

```jsx
function ViewGenerator({ schema, components }) {
  const mergedComponents = {
    ...defaultComponents,
    ...components,
  }

  return schema.map((field) => {
    // highlight-next-line
    const children = field.children ? (
      <ViewGenerator
        schema={field.children}
        components={mergedComponents}
      />
    ) : null

    // highlight-next-line
    return mergedComponents[field.fieldType]({ ...field, children });
  })
}
```

Đệ quy như vậy chưa hẳn là giải pháp hoàn hảo, hy vọng các bạn nào có giải pháp nào tốt hơn thì góp ý thêm.

Khi nghĩ về visitor pattern, chúng ta nghĩ đến

1. Configure Object đứng độc lập
2. UI đứng độc lập
3. Hàm trung gian dùng để map configure object và UI tương ứng

https://www.arahansen.com/react-design-patterns-generating-user-configured-ui-using-the-visitor-pattern
