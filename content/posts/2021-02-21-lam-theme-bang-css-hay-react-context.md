---
slug: "2021-02-21-lam-theme-bang-css-hay-react-context"
date: "2021-02-21"
title: "Làm tính năng Theme trong React?"
desc: "Sẽ có nhiều tiếp cận để làm theme cho trang web, mổ xẻ 2 cách phổ biến hiện nay trong React, chọn cách nào cho nó đơn giản nhưng mang lại hiệu quả cao"
tags: ["js","react","css", "medium"]
canonical_url: false
---

Để hỗ trợ tính năng *Theme*, cho phép người dùng lựa chọn kiểu giao diện mà họ thích, trong React, bạn sẽ có thể tiếp cận 1 trong 2 cách dùng CSS-in-JS hoặc dùng CSS variable (tất nhiên không có hỗ trợ với IE)

Nếu dùng CSS-in-JS bạn sẽ có thể làm được nhiều *thứ* hơn, bạn có một bộ công cụ đủ các **đạo cụ** để mua mai trong JS. Bài viết này sẽ chỉ ra tại sao bạn nên dùng CSS variable cho nhu cầu làm theme

Nếu dùng CSS-in-JS, trong React bạn sẽ tổ chức một `ThemeProvider` bằng React Context, dùng hook `useTheme`  để lấy giá trị trong `ThemeProvider`, sẽ như thế này

```jsx
import * as React from 'react'
import styled from '@emotion/styled'
import {ThemeProvider} from 'emotion-theming'

const themes = {
  light: {
    colors: {
      primary: 'deeppink',
      background: 'white',
    },
  },
  dark: {
    colors: {
      primary: 'lightpink',
      background: 'black',
    },
  },
}

const PrimaryText = styled.div(({theme}) => ({
  padding: 20,
  color: theme.colors.primary,
  backgroundColor: theme.colors.background,
}))

function ThemeToggler({theme, onClick}) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return (
    <button onClick={() => onClick(nextTheme)}>
      Change to {nextTheme} mode
    </button>
  )
}

function App() {
  const [theme, setTheme] = React.useState('light')
  return (
    <ThemeProvider theme={themes[theme]}>
      <PrimaryText>This text is the primary color</PrimaryText>
      <ThemeToggler
        theme={theme}
        onClick={(nextTheme) => setTheme(nextTheme)}
      />
    </ThemeProvider>
  )
}

export default App
```

Nếu dùng CSS variable, chúng ta khai bao một bộ các biến cần dùng, rồi chèn thêm `data-theme` cho thẻ `body`

CSS

```css
body[data-theme='light'] {
  --colors-primary: deeppink;
  --colors-background: white;
}
body[data-theme='dark'] {
  --colors-primary: lightpink;
  --colors-background: black;
}
```

Phần implement của React component lúc này sửa lại

```jsx
import * as React from 'react'
import './css-vars.css'
import styled from '@emotion/styled'

const PrimaryText = styled.div({
  padding: 20,
  color: 'var(--colors-primary)',
  backgroundColor: 'var(--colors-background)',
})

function ThemeToggler() {
  const [theme, setTheme] = React.useState('light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])
  return (
    <button onClick={() => setTheme(nextTheme)}>
      Change to {nextTheme} mode
    </button>
  )
}

function App() {
  return (
    <div>
      <PrimaryText>This text is the primary color</PrimaryText>
      <ThemeToggler />
    </div>
  )
}

export default App
```

Thẳng thắn mà nói, cả 2 cách làm này đều cho kết quả như nhau về mặt trãi nghiệm sử dụng, dùng CSS-in-JS sẽ có chút cảm giác hơi quá đà kỹ thuật, từ chuyên ngành là over-engineering.

<iframe src="https://codesandbox.io/embed/css-variables-vs-themeprovider-df90h?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="CSS Variables vs ThemeProvider"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Về hiệu năng thì sao?

ThemeProvider

![Profiling session showing everything rendered](https://d33wubrfki0l68.cloudfront.net/b903d3908c2f09f6139573d3da3ce48d0e831885/2cc29/static/e25d5f73f3fffe0fed8586eea95892df/e7448/theme-provider.png)

CSS variable

![Profiling session showing only one component rendered](https://d33wubrfki0l68.cloudfront.net/e737a004afce33b75c4c0b07e42c58a3ff1aaeec/21d3b/static/47d22cd6f96a31f50329ff658f18af39/e7448/css-vars.png)

Cũng không nhất thiết phải nhìn vào con số mili giây phải tốn cho việc render, vì simple này khá là bé. Bạn cứ hình dùng nếu một cây React Component với hàng trăm component con lồng ghép nhau, khi thay đổi giá trị trong ThemeProvider, tất cả những component đều bị render lại thì sẽ như thế nào? Việc dùng CSS variable sẽ mang lại hiệu quả hơn nhiều vì trình duyệt không phải làm quá nhiều thứ như cách 1.

Có một lý do mà mình cho là hơi ngụy biện khi khăng khăng đòi dùng JS-in-CSS theo mình đoán là các bạn thật sự chưa đủ tự tin cũng như "trình" để viết CSS hiện đại, bạn chuyên tâm nâng tầm JS của mình mà quên mất việc nâng tầm CSS, vón đã phát triển rất xa từ cái thời bạn dùng `float`

[Use CSS Variables instead of React Context](https://epicreact.dev/css-variables/)
