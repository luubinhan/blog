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