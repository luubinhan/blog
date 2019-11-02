---
slug: "/2019-11-02-gioi-thieu-thuat-toan-quicksort"
date: "2019-11-02"
title: "Thuật toán QuickSort"
desc: "Một thuật toán rất phổ biến mà chúng ta phải nắm thật chắc và hình dung được cách hiện thực nó ngay khi được nhắc tới."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "javascript"]
---


## Một chút lịch sử

Thuật toán *chia để trị* phổ biến nhất mà tất cả anh em lập trình đều được học qua thời mài đích trường đại học. Được tạo ra bởi Tony Hoare năm 1959

![Thuật toán Quicksort](https://res.cloudinary.com/practicaldev/image/fetch/s--k1SblSX1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.coderscat.com/wp-content/uploads/2019/10/2019_10_09_quick_sort.org_20191009_203646.png)

Trên là hình ông Tony Hoare trình làng thuật toán QuickSort năm 1960 tại Moscow.

Để mô tả thuật toán này, nó bao gồm các bước chính như sau:

1. Nếu chỉ còn một phần tử hoặc không còn phần tử nào để sort, nghĩa là **KẾT THÚC**
2. Mỗi lần gọi sort chúng ta chọn một phần tử làm **CHỐT ĐỂ SO SÁNH**
3. So sánh tất cả các phần tử còn lại với **CHỐT ĐỂ SO SÁNH**, nhỏ hơn đưa vào một **nhóm nhỏ hơn**, lớn hơn đưa qua **nhóm lớn hơn**
4. (Đệ quy) thực hiện đúng những bước đã làm với các phần tử thuộc 2 nhóm mới có

Độ phức tạp của nó là O(NlogN), trường hợp xấu nhất là O(N2). Đại khái nó là một trong những phương pháp sort mảng hiệu quả nhất.

Để hiểu độ phức tạp của thuật toán, các bạn [đọc bài này](http://vuilaptrinh.com/2019-10-28-gioi-thieu-ve-do-phuc-tap-cua-thuat-toan)

## Hiện thực bằng Javascript

Trong javascript đã có sẵn hàm `sort` vậy tại sao chúng ta lại quan tâm tới thuật toán QuickSort?

```js
let items = [5,3,7,6,2,9];
console.log(items.sort());
// [2, 3, 5, 6, 7, 9]
```

Hàm `sort()` của javascript sẽ tùy thuộc vào engine trình duyệt, **insertion sort** cho Chrome và **merge sort** cho Firefox và Safari

Nó **không phù hợp khi phải sort số lượng dữ liệu lớn**, hay là một mảng object, dạng `[{order: 1}, {order: 4}, {order: 2}]`

Hiện thực cho mảng bình thường, phần mảng là object các bạn chỉ cần thay điều kiện so sánh

```js
function quickSort(unsortedArray = []) {
    let smaller = []; let larger = [];
    if (unsortedArray.length <= 1)
        return unsortedArray;
    
    for (var i = 1; i < unsortedArray.length; i++) { 
        if (unsortedArray[i] < unsortedArray[0])
            smaller.push(unsortedArray[i]); 
        if (unsortedArray[i] >= unsortedArray[0]) 
            larger.push(unsortedArray[i]); 
    }
    return quickSort(smaller).concat(unsortedArray[0], quickSort(larger));
}
```
