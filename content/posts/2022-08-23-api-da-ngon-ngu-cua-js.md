---
slug: "2022-08-23-api-da-ngon-ngu-cua-js"
date: "2022-08-23"
title: "API đa ngôn ngữ của Javascript"
desc: "Cùng tìm hiểu những API rất hữu ích trong JS giúp xử lý đa ngôn ngữ"
tags: ["javascript", "cheatsheet"]
canonical_url: false
---

Bản thân Javascript có một số API để làm việc với các vấn đề liên quan đến đa ngôn ngữ rất hữu ích, chúng ta không cần cài thêm bất kỳ package nào, tất nhiên nó sẽ ở mức cơ bản, nếu cần những tính năng tương đối cao cấp hơn vẫn cần thêm một package độc lập

## Sắp xếp chuỗi

```js
// chuỗi tiếng Đức
console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('de').compare));
// ["a", "ä", "z", "Z"]
```

## Tìm kiếm

```js
const words = ['Congrès', 'congres', 'Assemblée', 'poison']
const searchTerm = 'congres'

const collator = new Intl.Collator('fr', {
	usage: 'search',
	sensitivity: 'base'
})

const matches = words.filter(word => collator.compare(word, searchTerm) === 0)

console.log(matches)
// 'Congrès', 'congres'
```

## Định dạng relative time

```js
const rtf = new Intl.RelativeTimeFormat('en', {
	localeMatcher: 'best fit', // giá trị khác 'lockup'
	numeric: 'always', // hoặc 'auto'
	style: 'long', // hoặc 'sort', 'narrow'
})

// định dạng relative time bằng giá trị âm
rtf.format(-1, 'day')
// '1 day ago'

// định dạng relative time bằng giá trị dương
rtf.format(1, 'day')
// 'in 1 day'
```

Sử dụng `numeric: auto` để hiển thị *yesterday, today, tommorrow*

```js
const rtf = new Intl.RelativeTimeFormat('en',
	{
		numeric: 'auto'
	})

rtf.format(-1, 'day')
// => yesterday

rtf.format(0, 'day')
// => today

rft.format(1, 'day')
// => tomorrow
```

## Định dạng số

```js
const number = 123456.789

new Intl.NumberFormat('de-DE',
	{ style: 'currency', currency: 'EUR' }).format(number)
// => 123.456,79 €

new Intl.NumberFormat('ja-JP',
	{ style: 'currency', currency: 'JPY' }).format(number)
// => ¥123457

new Intl.NumberFormat('en-IN',
	{ maximumSignificantDigits: 3 }).format(number)
// => 1,23,0000
```

Định dạng số thập phân và phần trăm

```js
let amount = 3500

new Intl.NumberFormat('en-US', { style: 'decimal' }).format(amount)
// => 3,500

new Intl.NumberFormat('en-US', { style: 'percent' }).format(amount)
// => 350,000%

new Intl.NumberFormat('en-US', {
	style: 'percent',
	signDisplay: 'exceptZero'
}).format(0.55)
// => +55%
```

Các đơn vị đo lường

```js
let amount = 3500

new Intl.NumberFormat('en-US', { style: 'unit', unit: 'liter' })
	.format(amount)
// => 3,500 L

new Intl.NumberFormat('en-US', { style: 'unit', unit: 'liter', unitDisplay: 'long' })
	.format(amount)
// => 3,500 liters
```

Để định dạng tất cả các giá trị trong mảng

```js
const numbers = [123456.789, 987654.321, 456789.123]
const numberFormat = new Intl.NumberFormat('es-ES')
const formatted = numbers.map(n => numberFormat.format(n))

formatted.join('; ')
// => 123.456,789; 987.654,321; 456.789,123 
```

## Danh sách

```js
const vehicles = ['Motorcycle', 'Bus', 'Car']
new Intl.ListFormat('en', {
	style: 'long',
	type: 'conjunction'
}).format(vehicles)
// => Motocycle, Bus, and Car

new Intl.ListFormat('de', {
	style: 'short',
	type: 'disjunction'
}).format(vehicles)
// => Motocycle, Bus oder Car
```

## Tên ngôn ngữ dựa trên mã code

```js
let lgNames = new Intl.DisplayNames(['en'], { type: 'language' })

lgNames.of('fr') // => French
lgNames.of('zh-Hant') // => Traditional Chinese

let lgNames2 = new Intl.DisplayNames(['zh-Hant'], { type: 'language' })
lgNames2.of('fr') // => 法文
lgNames2.of('zh-Hant') // => 繁體中文
```

## Ngày tháng

```js
const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
const date1 = new Date(2012, 5)

const dateTimeFormat1 = new Intl.DateTimeFormat('sr-RS', options1)
console.log(dateTimeFormat1.format(date1))
// => петак, 1. јун 2012.

const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options1)
console.log(dateTimeFormat2.format(date1))
// => Friday, 1 June 2012
```

Sử dụng `timeStyle` và `dateStyle`

```js
let dtf = new Intl.DateTimeFormat('en', {
	timeStyle: 'short'
})
console.log(dtf.format(Date.now()))
// => 13:31 AM

dtf = new Intl.DateTimeFormat('en', {
	dateStyle: 'short'
})
console.log(dtf.format(Date.now()))
// => 07/07/20

dtf = new Intl.DateTimeFormat('en', {
	timeStyle: 'medium',
	dateStyle: 'short'
})
console.log(dtf.format(Date.now()))
// => 07/07/20, 13:31:55 AM
```

## Số nhiều

```js
new Intl.PluralRules('ar-EG').select(0)
// => zero
new Intl.PluralRules('ar-EG').select(1)
// => one
new Intl.PluralRules('ar-EG').select(2)
// => two
new Intl.PluralRules('ar-EG').select(6)
// => few
new Intl.PluralRules('ar-EG').select(18)
// => many
```

```js
const pluralRules = new Intl.PluralRules('en-US')
const pluralize = (count, singular, plural) => {
	const grammaticalNumber = pluralRules.select(count);
	switch (grammaticalNumber ) {
		case 'one':
			return count + ' ' + singular
		case 'other':
			return count + ' ' + plural
		default:
			throw new Error('Unknow: ' + grammaticalNumber )
	}
}

const report = count => {
	return `${pluralize(count, 'file was', 'files were')} changed`
}

report(0) // 0 files were changed
report(1) // 1 file was changed
report(2) // 2 files ware changed
```

Hy vọng các bạn đã có được ít nhiều API để sử dụng trong các công việc liên quan