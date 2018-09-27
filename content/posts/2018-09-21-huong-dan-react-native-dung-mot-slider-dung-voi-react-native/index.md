---
slug: "/2018-09-21-huong-dan-react-native-dung-mot-slider-dung-voi-react-native"
date: "2018-09-21"
title: "Tạo slider component trong React Native bằng PanResponder"
desc: "Tuts này sẽ hướng dẫn các bạn tạo một slider component đơn giản trong React Native bằng PanResponder"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react-native"]
---

Đây là cái chúng ta sẽ tạo

![](https://blog.bam.tech/hs-fs/hubfs/slider.gif?t=1537455804760&width=1122&name=slider.gif)

Phân tích một chút, chúng ta có thể chọn 1 trong 2 cách

- Xử lý gesture bằng React Native Gesture Responder System
- Xử lý gesture mằng một thư viện native khác, cho phép chúng ta can thiệp nhiều dạng gesture phức tạp hơn như xoay, chụm ngón tay (pinch), nhấn và dữ lâu.

Với các marker như hình trên, chúng ta chỉ cần dùng React-Native Gesture Responder là đủ.

Nếu muốn dùng thư viện, bạn có thể tìm hiểu [React Native Gesture Handler](https://kmagiera.github.io/react-native-gesture-handler/)

# Dựng static UI

```jsx
import React from 'react';
import styled from 'styled-components';

type StateType = {
  barHeight: number | null,
  deltaValue: number,
  value: number
};

const initialValue = 0;
const CIRCLE_DIAMETER = 50;

export default class Slider extends React.Component<{}, StateType> {
  render() {
    return (
      <PageContainer>
        <Value>
          {Math.floor(initialValue)}
        </Value>
        <Container>
          <BarContainer>
            <Bar onLayout={this.onBarLayout} />
            <Circile bottomOffset={0} />
          </BarContainer>
        </Container>
      </PageContainer>
    )
  }
}

const PageContainer = styled.View`
  background-color: black;
  flex-grow: 1;
  align-self: stretch;
  align-items: center;
  padding-vertical: 20;
`;

const Container = styled.View`
  flex-grow: 1;
  align-self: stretch;
  justify-content: center;
  flex-direction: row;
`;
const Value = styled.Text`
  color: white;
`;

const BarContainer = styled.View`
  width: ${CIRCLE_DIAMETER};
  align-items: center;
  padding-vertical: ${CIRCLE_DIAMETER / 2};
  margin-horizontal: 20;
`;
const Bar = styled.View`
  width: 2;
  background-color: white;
  flex-grow: 1;
`;

const Circle = styled.View`
  border-radius: ${CIRCLE_DIAMETER / 2};
  width: ${CIRCLE_DIAMETER};
  height: ${CIRCLE_DIAMETER};
  background-color: white;
  position: absolute;
  bottom: ${props => props.bottomOffset};
`;
```

Kết quả

![](https://blog.bam.tech/hs-fs/hubfs/image2.png?t=1537535876886&width=1098&name=image2.png)

Chúng ta muốn lấy được giá trị và đặt cái nút tròn đúng vị trí theo giá trị này. Hàm `getBottomOffsetFromValue` sẽ đảm nhiệm chuyển đổi giá trị offset bottom sang giá trị tương ứng.

```jsx
//...
export default class Slider extends React.Component<{}, StateType> {
  state = {
    barHeight: null
  };
  onBarLayout = (event: LayoutChangeEvent) => {
    const {height: barHeight} = event.nativeEvent.layout;
    this.setState({ barHeight });
  };
  getBottomOffsetValue = (
    value: number,
    rangeMin: number,
    rangeMax: number,
    barHeight: number | null
  ) => {
    if (barHeight === null) return 0;
    const valueOffset = value - rangeMin;
    const totalRange = rangeMax - rangeMin;
    const percentage = valueOffset /  totalRange;
    return barHeight *  percentage;
  }
  render() {
    const {barHeight} = this.state;
    const bottomOffset = this.getBottomOffsetFromValue(initialValue, min, max, barHeight);
    return (
      // ...
      <Bar onLayout={this.onBarLayout} />
      <Circle bottomOffset={bottomOffset} />
      // ...
    )
  }
}
//...
```

Để cái marker có thể di chuyển được, chúng ta dùng `PanResponder`

```jsx
import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState
} from 'react-native';

// ....
export default class Slider extends React.Component({}, StateType) {
  state = {
    barHeight: null,
    defaultValue: 0,
    value: initialValue
  }
  // ....
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => this.onMove(gestureState),
    onPanResponderRelease: () => this.onEndMove()
  });
  onMove(gestureState: PanResponderGestureState) {
    const {barHeight} = this.state;
    const newDeltaValue = this.getValueFromBottomOffset(
      -gestureState.dy,
      barHeight,
      min,
      max
    );
    this.setState({
      deltaValue: newDeltaValue
    });
  }
  onEndMove() {
    const {value, deltaValue} = this.state;
    this.setState({value: value + deltaValue, deltaValue: 0});
  }
  capValueWithinRange = (value: number, range: number[]) => {
    if (value < range[0]) return range[0];
    if (value > range[1]) return range[1];
    return value;
  };
  render() {
    const {value, deltaValue, barHeight} = this.state;
    const cappedValue = this.capValueWithinRange(value + deltaValue, [min, max]);
    const bottomOffset = this.getBottomOffsetFromValue(
      cappedValue,
      min,
      max,
      barHeight
    );
    return (
      //...
      <Circle
        bottomOffset={bottomOffset}
        {...this.panResponder.panHandlers}
      />
      //...
    )
  }
}
```

Hàm `capValueWithinRange` được dùng để lấy giá trị của cái nút tròn so với độ cao của slider

Khi di chuyển marker, callback truyền cho `onPanResponderMove` sẽ được gọi, nó nhận vào 2 giá trị

- native event: chứa những thuộc tính như vị trí user đã touch,...
- gestureState: đây là cái chúng ta đang dùng để truyền cho hàm `onMove`

Tất cả giá trị của gestureState

![](https://blog.bam.tech/hs-fs/hubfs/image1.png?t=1537535876886&width=1640&name=image1.png)


Khi user buông tay ra, dừng sự kiện **kéo rê**, thì callback truyền cho hàm `onPanResponderRelease` sẽ được gọi, cũng nhận tương tự 2 giá trị như trên: native event và gesture state

Xong, chủ yếu để làm cái này chúng ta chỉ cần nắm cách làm việc với `PanResponder` trong react-native

[Toàn bộ source code](https://gist.github.com/jfaverie/d98d8f60a510e3b68abeffb43a77d47a)


[Link bài gốc](https://blog.bam.tech/developper-news/create-vertical-slider-with-react-native-panresponder)