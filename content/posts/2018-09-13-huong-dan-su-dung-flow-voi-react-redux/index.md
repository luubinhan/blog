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

playerActions.js 
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

Với những function thế này, chúng ta phải chỉ định kiểu params truyền vào và kiểu return, mỗi một method chúng ta định nghĩa ra một custom type để sử dụng

```js
export type PlayerAction = {
  type: string;
  track?: Track;
}
```

Có thể thấy Track cũng là một custom type khác mà chúng ta định nghĩa ở đâu đó rồi import vào như một module

```js
export type Track = {
  id: number;
  artistId: number;
  title: string;
  key: string;
  bucket: string;
}
```

Chúng ta sửa lại cái playerActions.js ở trên với Flow

```js
/* @flow */

import {
  PLAY,
  PAUSE,
  STOP,
  BACKWARD,
  FORWARD,
  UPDATE_TIME,
  SELECT_TRACK,
} from 'constants/actionTypes';

export type PlayerAction = {
  type: string;
  currentTime?: number;
  track?: Track;
}

// Import Track type from player, defines the properties a Track object
// can have.
import type { Track } from 'reducers/player';

export function play() : PlayerAction{
  return { type: PLAY };
}

export function pause(): PlayerAction {
  return { type: PAUSE };
}

export function stop(): PlayerAction {
  return { type: STOP };
}

export function backward(): PlayerAction {
  return { type: BACKWARD };
}

export function forward(): PlayerAction {
  return { type: FORWARD };
}

export function updateTime(): PlayerAction {
  return { type: UPDATE_TIME };
}

export function selectTrack(track: Track): PlayerAction {
  return { type: SELECT_TRACK, track };
}
```

# Reducer

Một khi đã quen thuộc với cách định nghĩa type cho hàm như trên thì chúng ta sẽ dễ dàng chỉnh sửa lại reducer thôi, vì nó cũng tương tự.

```js
/* @flow */

import {
  PLAY,
  PAUSE,
  STOP,
  BACKWARD,
  FORWARD,
  UPDATE_TIME,
  SELECT_TRACK,
} from 'constants/actionTypes';

// Import the PlayerAction type form the actions/playerActions.js file, much
// like we imported the Track type into our action previously.
import type { PlayerAction } from 'actions/playerActions';

export type Track = {
  id: number;
  artistId: number;
  title: string;
  key: string;
  bucket: string;
};

// Create a type alias called Dictionary. This will allow us to define data
// that follows the model, a bit superfluous for this example, but good to
// understand how it works:
// {
//   key: value
// }
type Dictionary<K,T> = {[key: K]: T};

// In our PlayerState definition we're also going to
// define an instance of the Dictionary type
// where the key int he object is a number, and
// the value is of type Track.
export type PlayerState = {
  tracks: Dictonary<number, Track>;
  currentTrackId: ?number;
  currentTime: number;
  playing: boolean;
};

// Declare our initial player state which follows our PlayerState type.
const initialState: PlayerState = {
  tracks: {},
  currentTrackId: null,
  currentTime: 0,
  playing: false,
};

// This helper method will return the id of the next track
// in our playlist. It receives a track dictionary from
// the state, and the current track id. It maps out the
// data to an array, and finds the next sequential index.
function getNextTrackId(
  tracks: Dictonary<Track, number>,
  currentTrackId: number
): number {
  const trackIds = Object.keys(tracks);
  const nextTrackIndex = trackIds.indexOf(currentTrackId) + 1;

  if (nextTrackIndex >= tracks.length) {
    nextTrackIndex = 0;
  }

  return tracksIds[nextTrackIndex];
}

// This helper method will return the id of the
// previous track in our playlist. It works exactly
// like the previous helper function.
function getPreviousTrackId(
  tracks: Dictonary<Track, number>,
  currentTrackId: number
): number {
  const trackIds = Object.keys(tracks);
  const nextTrackIndex = trackIds.indexOf(currentTrackId) - 1;

  if (nextTrackIndex < 0) {
    nextTrackIndex = trackIds.length - 1;
  }

  return trackIds[nextTrackIndex];
}

// This is our reducer. There's nothing special to call out
// here except that we are declaring our two input types
// of PlayerState and PlayerAction, and that we must
// return a valid instance of PlayerState.
export default function player(
  state: PlayerState = initialState,
  action: PlayerAction
): PlayerState {
  switch (action.type) {
  case PLAY:
    return {
      ...state,
      playing: true,
    };
  case PAUSE:
    return {
      ...state,
      playing: false,
    };
  case STOP:
    return {
      ...state,
      playing: false,
      currentTime: 0,
    };
  case BACKWARD:
    return {
      ...state,
      currentTime: 0,
      currentTrackId: getPreviousTrackId(state.tracks, state.currentTrackId),
    };
  case FORWARD:
    return {
      ...state,
      currentTime: 0,
      currentTrackId: getNextTrackId(state.tracks, state.currentTrackId),
    };
  case UPDATE_TIME:
    return {
      ...state,
      currentTime: action.currentTime,
    };
  case SELECT_TRACK:
    return {
      ...state,
      currentTime: 0,
      currentTrackId: action.track.id,
    };
  default:
    return state;
  }
}
```

Một lợi ích của việc define type mà mình rất thích là nó sẽ có cái hint trên IDE mỗi khi mình dùng gọi đến hàm hay params đó.

[Link bài gốc](https://medium.com/@cdebotton/redux-and-flowtype-69ff1dd09036)