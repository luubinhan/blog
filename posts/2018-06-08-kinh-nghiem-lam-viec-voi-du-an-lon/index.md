---
path: "/2018-06-08-kinh-nghiem-lam-viec-voi-du-an-lon"
date: "2018-06-08T13:35:13.234Z"
title: "Kinh nghiệm tổ chức file và thư mục React project"
desc: "Có bao giờ cảm thấy lạc lối trong đóng code ngày càng lúc bự ra, một vài tip từ người có kinh nghiệm"
tags: ["react"]
---

Cách tổ chức project thì không phải là rule, mỗi người mỗi kiểu, chỉ là một vài cân nhắc để quản lý code tốt hơn.

## Thư mục

Đây là thư mục project hiện tại của tác giả bài viết này

![](https://cdn-images-1.medium.com/max/600/1*vStBUv5egjAAb1XNWeVSRA.png)

Giải thích của tác giả về cách tổ chức này

### /api

Nơi chứa những functions đảm nhiệm chuyện gọi API

### /assets

Nơi chứa external resource

### components

Tất cả component được sử dụng từ 2 lần trở lên sẽ nằm ở đây. Mỗi component là một thư mục bao gồm `index.js` để export, `styles.module.scss` stylesheet kèm theo của component, ở đây quan điểm của mình là nên có một file là `ExampleComponent.js`, lý do để lúc code mình có thể trỏ ngay đến tên file theo cách đặt tên component = tên file như vậy, nếu component nào cũng `index.js` thì mở chừng chục file `index.js` như vậy trên VSCode sẽ chẳng thể biết đang sửa thằng nào.

### /lang

Thư mục này chỉ có khi ứng dụng của mình hỗ trợ đa ngôn ngữ. Tác giả đang sử dụng i18n-js cho đa ngôn ngữ, vì nó dễ xài

File `index.js` của lang

```jsx
import i18n from 'i18n-js'

import en from './locales/en'
import es from './locales/es'
import pt from './locales/pt'

i18n.translations = {
  en,
  es,
  pt,
}

i18n.fallbacks = true

export default i18n.t

export * from './locales/keys'
```


![Giống hình trên thôi, đỡ phải scroll lên](https://cdn-images-1.medium.com/max/600/1*vStBUv5egjAAb1XNWeVSRA.png)

### /lib

Chứa những file helper, utils, validation,...

### /store

Dành cho người xài Redux, chưa sử dụng MobX nhiều, có thể sẽ khác. Bên trong này sẽ có những thư mục con

- **/actions** chứa action creators
- **/definitions** hay **/actionTypes**
- **/reducers** trong đây mỗi reducer sẽ là 1 file riêng biệt, file index.js sẽ combine tất cả export lại. Hoặc **/sagas** nếu dùng redux saga

File `index.js` của thư mục store

```jsx
import { createStore, applyMiddleware } from 'redux'

import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger'

import combinedReducer from 'src/store/reducers'
import rootSaga from 'src/store/sagas'

const sagaMiddleware = createSagaMiddleware()
sagaMiddleware.run(rootSaga)

export default createStore(
  combinedReducer,
  applyMiddleware(
    sagaMiddleware,
    loggerMiddleware,
  ),
)
```

### /styles

Chứa common style

### /view

Trong component thì ta để mấy component để hiển thị, pure component, thư mục view này thì chứa container component.

File `index.js` của thư mục này chúng ta sẽ export toàn bộ mấy cái view để ta đưa nó vô `router`


```jsx
import React from 'react'
import {
  BrowserRouter,
  Route,
} from 'react-router-dom'

import Home from './Home'
import Settings from './Settings'

export default () => (
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/settings" component={Settings} />
    </React.Fragment>
  </BrowserRouter>
)
```

## Cuộc chiến với CSS

Có tới cả trăm bài viết và tranh luận xung quanh sử dụng CSS trong React. Tác giả bài viết này thích CSS module, chưa thấy được lý do tại sao dùng Styled Components.

Lý do thích CSS module? Tuy không phải lúc nào cũng giải quyết được mọi vấn đề với CSS module, nên việc sử dụng kết hợp giữa CSS module và global import style là sự lựa chọn của tác giả

Đây là cách config SASS trong webpack
```jsx
{
  test: /(?<!\.module)\.scss$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: require.resolve('sass-loader'),
    },
  ],
},
{
  test: /\.module\.scss$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[local]__[hash:base64:5]',
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: require.resolve('sass-loader'),
    },
  ],
},
```

Sử dụng css module trong component

```jsx
import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.scss'

export default ({ negative = false, name, surname }) => (
  <div
    className={classNames(
      styles['name-container'],
      negative && styles['name-negative'],
    )}
  >
    <p className={styles['name-content']}>Hello, {name}.</p>
    <p>Or should I refer to you by {surname}?</p>
  </div>
)
```

Để tìm hiểu thêm về CSS Module trong React, [đọc bài này](https://blog.pusher.com/css-modules-react/)



[Link bài gốc: Tips on React for large scale projects](https://hackernoon.com/tips-on-react-for-large-scale-projects-3f9ece85983d)
Tác giả: Luis Felipe Zaguini