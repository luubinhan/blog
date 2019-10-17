---
slug: "/2019-10-13-viet-cau-dieu-kien-trong-javascript"
date: "2019-10-13"
title: "Viết câu điều kiện tốt hơn trong javascript"
desc: "Xem xét một trong những câu lệnh được sử dụng nhiều nhất trong lập trình: câu điều kiện"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Một trong những **món ăn** mà anh em lập trình chúng ta phải nhai đi nhai lại trong suốt cuộc đời, dù là bạn đang viết ngôn ngữ gì là **C U ĐIỀU KIỆN**. Nếu không khéo trong lúc **nấu code**, thì món ngon đó đôi khi trở thành món dỡ ẹt, người sau vào ăn không thấy ngon, chúng ta tự ăn cũng không thấy ngon.

*Bài này được viết trong một chiều chủ nhật đang đói bụng*

## Điều kiện lồng vào nhau

```js
❌ Tạm, chưa ngon
let result;
if(condition) {
} else if(condition2) {
} else {
}
return result;
```

Có vẻ không vấn đề nhỉ? Nhưng thật ra nó sẽ chạy y chang khi chúng ta viết thế này

```js
❌ Không ngon
let result;
if(condition) {
} else {
   if(condition2) {
   } else {
   }
}
return result;
```

Du là thế nào đi nữa, gặp lồng câu điều kiện `else...if...`  là phải tìm cách khử liền

```js
✅ Chuẩn cơm mẹ nấu
if (condition){
}
if(condition2) {
}
```

## Array.includes

```js
❌ Không ngon
if ( animal == 'dog' || animal == 'cat' || animal == 'turtle')

✅ Chuẩn cơm mẹ nấu
['cat', 'dog', 'turtle'].includes(animal)
hoặc
['cat', 'dog', 'turtle'].indexOf(animal) !== -1
```

## return

```js
❌ Không ngon
const printAnimalDetails = animal => {
  let result;
  if (animal) {
    if (animal.type) {
      if (animal.name) {
        if (animal.gender) {
          result = `${animal.name} is a ${animal.gender} ${animal.type};`;
        } else {
          result = "No animal gender";
        }
      } else {
        result = "No animal name";
      }
    } else {
      result = "No animal type";
    }
  } else {
    result = "No animal";
  }
  return result;
};
```

Nếu bạn vẫn viết code thế này thì mình cũng lại!

```js
✅ Chuẩn cơm mẹ nấu
const printAnimalDetails = ({type, name, gender } = {}) => {
  if(!type) return 'No animal type';
  if(!name) return 'No animal name';
  if(!gender) return 'No animal gender';

  return `${animal.name} is a ${animal.gender} ${animal.type}`;
}
```

## Dùng Object thay cho switch...case

Đoạn code return loại trái cây có màu sắc như điều kiện truyền vào

```js
❌ Không ngon
function printFruits(color) {
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}
```

Code như trên không sai, mà nếu dùng object làm thì sẽ ngon hơn nhiều

```js
✅ Chuẩn cơm mẹ nấu
function printFruits(color) {
    const fruitColor = {
      red: ['apple', 'strawberry'],
      yellow: ['banana', 'pineapple'],
      purple: ['grape', 'plum']
    };
    return fruitColor[color] || [];
}
```

## params mặc định và destructuring

```js
❌ Không ngon
function printVegetableName(vegetable) { 
   if (vegetable && vegetable.name) {
    console.log (vegetable.name);
  } else {
   console.log('unknown');
  }
}
```

```js
✅ Chuẩn cơm mẹ nấu
function printVegetableName({ name } = {}) {
  console.log (name || 'unknown');
}
```

## Array.every, Array.some

Đoạn code kiểm tra tất cả trái cây có màu đó

```js
❌ Không ngon
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];
function test() {
  let isAllRed = true;

  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}
```

Thay vì dùng vòng lặp for, có thể dùng `Array.every`

```js
function test() {
  const isAllRed = fruits.every(f => f.color == 'red');
  console.log(isAllRed); // false
}
```

Chỉ cần vài item trong đó thỏa điều kiện là được, ta dùng `Array.some`

```js
const isAllRed = fruits.some(f => f.color == 'red');
```


<a target="_blank" rel="noopener noreferrer" href="https://dev.to/hellomeghna/tips-to-write-better-conditionals-in-javascript-2189">📜 Tips to write better Conditionals in JavaScript</a>
