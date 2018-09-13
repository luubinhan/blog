---
slug: "/2018-09-13-huong-dan-su-dung-flow-voi-react-redux"
date: "2018-09-13"
title: "Sử dụng Flow để check type trong React Redux"
desc: "Chúng ta sẽ không nói nhiều cách sử dụng Redux trong bài này, các bạn có thể xem các bài trước, ở đây mình chỉ đi đến vấn đề đưa Flow vào để check type trong Redux"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript", "redux"]
---

# Constants


constants/actionTypes.js

```js
/* @flow */

export const PLAY: string = 'PLAY';
export const PAUSE: string = 'PAUSE';
export const STOP: string = 'STOP';
export const BACKWARD: string = 'BACKWARD';
export const FORWARD: string = 'FORWARD';
export const UPDATE_TIME: string = 'UPDATE_TIME';
export const SELECT_TRACK: string = 'SELECT_TRACK';
```

Chuyện này có hơi dư thừa vì chúng ta biết chắc chắn các hằng số này sẽ luôn là `string`, có bao giờ chúng ta lại đi đổi giá trị trong constants

Flow cho phép chúng ta khai báo các type sau:

- **string**
- **number**
- **boolean**
- **Function**
- **Array**
- **Object**
- **any**
- **mixed**
- **void**

Nếu biến có thể `null`, tức không bắt buộc thì thêm dấu **?** vào trước, ?string, ?number, ?boolean

# Actions

```js
import {
  PLAY,
  PAUSE,
  STOP,
  BACKWARD,
  FORWARD,
  UPDATE_TIME,
  SELECT_TRACK,
} from 'constants/actionTypes';

export function play() {
  return { type: PLAY };
}

export function pause() {
  return { type: PAUSE };
}

export function stop() {
  return { type: STOP };
}

export function backward() {
  return { type: BACKWARD };
}

export function forward() {
  return { type: FORWARD };
}

export function updateTime() {
  return { type: UPDATE_TIME };
}

export function selectTrack(track) {
  return { type: SELECT_TRACK, track };
}
```