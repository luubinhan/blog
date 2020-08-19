---
slug: "/2020-08-19-tim-hieu-cac-thuat-toan-sap-xep-va-hien-thuc-bang-javascript"
date: "2020-08-19"
title: "Các thuật toán sắp xếp phổ biến và JavaScript"
desc: "Chúng ta sẽ điểm qua các thuật toán sắp xếp phổ biến được học trong trường và hiện thực nó bằng JavaScript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---


Chúng ta sẽ hiện thực các thuật toán này bằng JavaScript,.

Hàm helper để swap giá trị

```js
function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
```

Hàm để so sánh giá trị

```js
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
```

## Bubble Sort

- Tình huống tốt nhất: độ phức tạp = `O(N)` (đi qua đúng n phần tử)
- Tình huống xấu nhất: độ phức tạp = `O(N^2)` (đi qua n mũ 2 phần tử)

Cái này rất ít xài trong thực tế, chỉ để dạy và học, vì nó chậm nhất so với các thuật toán khác.

Ý tưởng là sẽ so sánh 2 phần tử liền kề, hoán đổi vị trí cho phù hợp

![](https://res.cloudinary.com/practicaldev/image/fetch/s--C0CI1OCj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ubhywp9xh8zk6on4caql.gif)

```js
function bubbleSort(arr, compare = defaultCompare) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) { // refer to note below
            if (compare(arr[j], arr[j + 1]) === Compare.BIGGER_THAN) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}
```

Để hình dung thuật toán này, bạn có thể nghiên cứu cái hình mô tả bên dưới

![](https://res.cloudinary.com/practicaldev/image/fetch/s--AIAlZIhq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/euz62qdpc74m9w4gcg09.png)

## Selection Sort

Không phân biệt tính huống tốt hay xấu gì cả, nó luôn có độ phức tạp = `O(N^2)`

![](https://res.cloudinary.com/practicaldev/image/fetch/s--musoV4Rk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vweh1mcmiap8q3onqxz8.gif)

Ý tưởng của thuật toán là tìm ra giá trị nhỏ nhất trong đám, rồi đưa nó về vị trí đầu tiên, lặp lại cho các phần tử kế tiếp.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--wJDCsONw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/mbzjewb2l897eiidkr14.gif)

```js
function selectionSort(arr, compare = defaultCompare) {
    const { length } = arr;
    let minIndex;
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;
        for (let j = i; j < length; j++) {
            if (compare(arr[minIndex], arr[j]) === Compare.BIGGER_THAN) {
                minIndex = j;
            }
        }
        if (i !== minIndex) {
            swap(arr, i, minIndex);
        }
    }
    return arr;
}
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--992IFucj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/43gibzc1hne0ie73cmp1.png)

## Insertion Sort

- Tình huống tốt nhất: độ phức tạp = `O(N)` 
- Tình huống xấu nhất: độ phức tạp = `O(N^2)`

Thuật toán này nó sẽ tạo ra mảng mới, tìm và chèn từng phần tử một vào đúng thứ tự. Sẽ như sau

1. Cứ coi như phần tử đầu tiên là đúng vị trí
2. Lấy phần tử đầu tiên này so sánh với phần tử tiếp theo, nó có 2 tình huống một là ở yên vị trí đang ở, hay là chúng ta chèn phần tử thứ 2 vào trước phần tử đầu.
3. Lặp lại tương tự

![](https://res.cloudinary.com/practicaldev/image/fetch/s---bIcRugF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/osft7ojymgp8jroekxxu.gif)

```js
function insertionSort(arr, compare = defaultCompare) {
    const { length } = arr;
    let temp;
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = arr[i];
        while (j > 0 && compare(arr[j - 1], temp) === Compare.BIGGER_THAN) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--98gGOQtF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/kdcqz1o3weeqjxwcdfpq.png)

## Merge Sort

Độ phức tạp cố định: `O(N Log N)`

Là thuật toán chia để trị, chi nhỏ các phần tử ban đầu ra thành các nhóm nhỏ hơn để dể xử lý từng cụm

![](https://res.cloudinary.com/practicaldev/image/fetch/s--A-kq2byS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/xokw1fxci67ttscu23vy.gif)

```js
function mergeSort(arr, compare = defaultCompare) {
    if (arr.length > 1) {
        const { length } = arr;
        const middle = Math.floor(length / 2);
        const left = mergeSort(arr.slice(0, middle), compare);
        const right = mergeSort(arr.slice(middle, length), compare);
        arr = merge(left, right, compare);
    }
    return arr;
}

function merge(left, right, compare) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        result.push(compare(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--iTGTEOAp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/bowug91fuof69su39fwd.png)

## Quick sort

- Tình huống tốt nhất: độ phức tạp = `O(N Log N)` 
- Tình huống xấu nhất: độ phức tạp = `O(N^2)`

Đây là thuật toán được sử dụng nhiều nhất, vẫn là phương pháp chia để trị

Có thể xem lại bài [giới thiệu về Quick Sort của mình](http://vuilaptrinh.com/2019-11-02-gioi-thieu-thuat-toan-quicksort)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--5nmg3LKx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vo2ltivrpucxtoamvdeb.gif)

```js
function quickSort(arr, compare = defaultCompare) {
    return quick(arr, 0, arr.length - 1, compare);
}

function quick(arr, left, right, compare) {
    let i;
    if (arr.length > 1) {
        i = partition(arr, left, right, compare);
        if (left < i - 1) {
            quick(arr, left, i - 1, compare);
        }
        if (i < right) {
            quick(arr, i, right, compare);
        }
    }
    return arr;
}

function partition(arr, left, right, compare) {
    const pivot = arr[Math.floor((right, left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
        while (compare(arr[i], pivot) === Compare.LESS_THAN) {
            i++;
        }
        while (compare(arr[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}
```

## Bucket Sort

- Tình huống tốt nhất: độ phức tạp = `O(N + k)` 
- Tình huống xấu nhất: độ phức tạp = `O(N^2)`

Ý tưởng là sẽ chia đôi thành 2 mảng, rồi trên từng mảng đó, áp dụng một thuật toán sắp xếp trên đó, như insertion sort

![](https://res.cloudinary.com/practicaldev/image/fetch/s--c3E8lx6w--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vdv48hfw2oomr5r3myc0.gif)

```js
function bucketSort(arr, bucketSize) {
    if (arr.length < 2) {
        return arr;
    }
    // create buckets and distribute the elements
    const buckets = createBuckets(arr, bucketSize);
    // sort the buckets using insertion sort and add all bucket elements to sorted result 
    return sortBuckets(buckets);
}

function createBuckets(arr, bucketSize) {
    // determine the bucket count
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        } else if (arr[i] > max) {
            max = arr[i];
        }
    }
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;

    // initialize each bucket (a multidimensional array)
    const buckets = [];
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = [];
    }

    // distribute elements into buckets
    for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }
    return buckets;
}

function sortBuckets(buckets) {
    const sortedArr = [];
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertionSort(buckets[i]); // quick sort is another good option
            sortedArr.push(...buckets[i]);
        }
    }
    return sortedArr;
}
```
Lưu ý bucket sort chạy tốt nhất khi có thể chia đều các phần tử cho các bucket, việc chia thành 2 bucket cũng không bắt buộc, có thể chia nhiều hơn nếu số lượng phần tử nhiều

![](https://res.cloudinary.com/practicaldev/image/fetch/s--OCRlBcCM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/m10o9xkwmpyllvarra5g.png)


[Common Sorting Algorithms in JavaScript](https://dev.to/christinamcmahon/common-sorting-algorithms-in-javascript-58a7)

[Know Thy Complexities!](https://www.bigocheatsheet.com/)

