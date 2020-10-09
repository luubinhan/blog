Bài viết không phù hợp cho các bạn đã là cao thủ javascript, những thuật toán được đề cập tương đối mẫu giáo

## Kiểm tra số nguyên tố (prime number)

```js
> isPrime(137);
  = true
> isPrime(237);
  = false
```

> Số nguyên tố là số **chỉ** chia hết cho một và chính nó

```js
function isPrime(n) {
    var divisor = 2;
    while (n > divisor){
        if(n % divisor == 0){
        	return false; 
        }
        else
          divisor++;
    }
	return true;
}
```

*Có thể cải thiện nó tốt hơn không?*

Có,  lúc đầu chúng ta tăng giá trị divisor lên 1, sau lần thứ 3, chúng ta có thể tăng divisor lên 2. Lý do? Tất cả những số nào chia hết cho số chẵn thì nó cũng chia hết cho 2

## Tìm hệ số nguyên tố (Prime factor)

```js
> primeFactors(69);
  = [3, 23]
```

> Hệ số nguyên tố của một số x, là số mà khi nhân với x sẽ cho ra một số nguyên tố

```js
function primeFactors(n) {
    let factors = [],
        divisor = 2;
    
    while(n > 2) {
    	if (n % divisor === 0) {
            factors.push(divisor);
            n = n / divisor;
        } else {
            divisor++;
        }
    }
    
    return factors;
}
```

*Độ phức tạp là bao nhiêu? Làm tốt hơn được ko*

Độ phức tạp O(n). Có thể tăng giá trị `divisor` từ 2 sang 3. Tương tự số đã chia hết cho số chẵn thì chia hết cho 2. Ngoài ra nếu là số chẵn thì không cần tính làm gì. Tiếp nữa là chúng ta sẽ không bao giờ có hệ số nguyên tố nào lớn hơn n/2 (n là input cần tìm)

## Fibonacci

```js
> fibonacci(12);
  = 144
```

> Fibonacci là dãy các số, mà tổng 2 số bên trái bằng số liền kề bên phải

```js
function fibonacci(n) {
    let fibo = [0, 1];
    
    if (n < 2) return 1;
    
    for (var i = 2; i <= n; i++) {
        fibo[i] = fibo[i-1] + fibo[i-2];
    }
    return fibo[n];
}

> fibonacci(12);
  = 144       
```

Độ phức tạp O(n), có thể viết dạng đệ quy (O(2n))

```js
function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n-1) + fibonacci(n-2);
    }
}         
```

http://www.thatjsdude.com/interview/js1.html

## Tìm bội số chung lớn nhất

```js
> greatestCommonDivisor(14, 21);
  = 7 
> greatestCommonDivisor(69, 169);
  = 1
```



> Bội số chung là số mà cả 2 cùng chia hết

```js
function greatestCommonDivisor(a, b) {
    let divisor = 2,
        greatestDivisor = 1;
    
    // assume sẽ không xử lý số âm
    if (a < 2 || b < 2) return 1;
    
    while (a >= divisor && b >= divisor) {
        if (a % divisor === 0 && b % divisor === 0) {
            greatestDivisor = divisor;
        }
        divisor++;
    }
    return greatestDivisor;
}
```

Áp dụng thuật toán *fancy*, cái này mình không thể giải thích được, vì chưa hiểu, giải thuật này là của thầy hướng dẫn chỉ, học sinh ngoan chăm chỉ sẽ biết copy nội dung thầy dạy

```js
function greatestCommonDivisor(a,b) {
    if (b === 0) return a;
    else return greatestCommonDivisor(b, a % b);
}
```

## Xóa các phần tử lặp lại trong mảng

```js
> removeDuplicate([1,3,3,3,1,5,6,7,8,1]);
  = [1, 3, 5, 6, 7, 8]
```



Tất nhiên giờ đây bạn đã có `Set` trong javascript, mọi việc vô cùng thuận tiện, nếu không bạn phải hiện thực nó như sau

```js
function removeDuplicate(arr){
  var exists ={},
      outArr = [], 
      elm;

  for(var i =0; i<arr.length; i++){
    elm = arr[i];
    if(!exists[elm]){
      outArr.push(elm);
      exists[elm] = true;
   }
  }
    
  return outArr;
}
```

Dùng `Set`

```js
function removeDuplicate(arr) {
    return [...new Set(arr)]
}
```

## Merge 2 mạng đã sắp xếp

```js
> mergeSortedArray([2,5,6,9], [1,2,3,29]);
 = [1, 2, 2, 3, 5, 6, 9, 29]
```



```js
function mergeSortedArray(a,b) {
    let merged = [],
        aElm = a[0],
        bElm = b[0],
        i = 1,
        j = 1;
    
    // edge case
    if (a.length === 0) return b;
    if (b.length === 0) return a;
    
    while (aElm || bElm) {
    	if ((aElm && !bElm) || aElm < bElm) {
            merged.push(aElm);
            aElm = a[i++];
        } else {
            // trường hợp 2 phần tử ở index đó = nhau
            // cứ lấy một thằng nhét vào trước
            // thằng còn lại sẽ được nhét vào trong lần chạy tiếp theo
            merged.push(bElm);
            bElm = b[j++];
        }
    }
    return merged;
}
```

Chúng ta duyệt qua từng phần tử một trong cả 2 mảng, lấy phần tử nhỏ hơn chèn vào trước, tiếp tục lặp lại cho tới khi đã duyệt qua tất cả các phần của 2 mảng.

## Swap 2 số mà không được dùng một biến tạm

```js
function swapNumb(a,b) {
    console.log('before swap: ','a: ', a, 'b: ', b);
    b = b - a;
    a = a + b;
    b = a - b;
    console.log('after swap: ','a: ', a, 'b: ', b);  
}
> swapNumb(2, 3);
   = before swap:  a:  2 b:  3
   = after swap:  a:  3 b:  2 
```

## Reverse string

```js
> reverse('you are a nice dude');
  = "edud ecin a era uoy"
```



Tất nhiên là đã có prototype `.reverse`, nhưng nếu bạn không có thì sao

```js
function reverse(str) {
    var returnString = '';
    for (let i = str.length - 1; i >= 0; i--) {
        returnString += str[i];
    }
    return returnString;
}
```

Việc nối chuỗi `returnString += str[i];` sẽ không có tốc độ tốt trên một số trình duyệt cũ như IE8, đây là cách khác tối ưu hơn

```js
function reverse(str) {
    let returnString = [];
    if (!str || typeof str != 'string' || str.length < 2) return str;
    
    for (let i = str.length - 1; i >= 0; i--) {
        returnString.push(str[i]);
    }
    
    return returnString.join('');
}
```

Độ phức tạp O(n), có thể làm tốt hơn nữa

```js
function reverse(str) {
    str = str.split('');
    let len = str.length,
        halfIndex = Math.floor(len / 2) - 1,
        revStr;
    for (var i = 0; i <= halfIndex; i++) {
        revStr = str[len - i - 1];
        str[len - i - 1] = str[i];
        str[i] = revStr;
    }
    return str.join('');
}
```

Cũng được, hơi khó đọc, khó hiểu, vậy làm đệ quy thử

```js
function reverse (str) {
    if (str === '') return '';
    else return reverse(str.substr(1)) + str.charAt(0);
}
```

Thêm nó thành một `prototype` cho String luôn thì sao?

```js
String.prototype.reverse = function() {
   if (!this || this.length < 2) return this;
    
   return this.split('').reverse().join('');
}
> 'abc'.reverse();
  = 'cba'
```

## Reverse word

Nên hỏi kỹ là giữa các word(từ) có trường hợp nhiều hơn 1 khoảng trắng không

```js
function reverseWord(str) {
    let rev = [],
        wordLen = 0;
    
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] == ' ' || i === 0) {
            rev.push(str.substr(i, wordLen+1));
            wordLen = 0;
        } else wordLen++;
    }
    
    return rev.join(' ');
}
```

Thật ra JS có sẵn các phương thức cần thiết để làm việc này

```js
function reverseWord(str) {
    return str.split(' ').reverse().join(' ');
}
```

## Reverse từ trong câu, nhưng không reverse cả câu

Ví dụ input là `vui lap trinh`, output mong muốn là `iuv pal hnirt`

```js
function reverseInPlace(str) {
    return str.split(' ').reverse().join(' ').split('').reverse().join('');
}
```

## Tìm ký tự đầu tiên không lặp lại

```js
> firstNonRepeatChar('the quick brown fox jumps then quickly blow air');
 = "f"
```



Tìm trong một ký tự (đầu tiên) trong string không bị lặp lại

- Nên quan tâm có phân biệt hoa thường hay không
- String nhập vào có dài không, nếu quá dài sẽ giải quyết theo hướng tìm trong 26 ký tự tiếng anh, chứ ko loop qua toàn bộ string để tiết kiệm thời gian tính toán

```js
function firstNonRepeatChar(str) {
    let len = str.length,
        char,
        charCount = {};
    
    for (let i = 0; i < len; i++) {
        char = str[i];
        if (charCount[char]) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    }
    
    for (let j in charCount) {
        if (charCount[j] === 1) return j;
    }
}


```

## Xóa các ký tự lặp lại trong chuỗi

```js
> removeDuplicateChar('Learn more javascript dude');
  = 'Lnmojvsciptu'
```



Cũng làm tương tự như trên, khác một chút xử lý

```js
function removeDuplicateChar(str){
  var len = str.length,
      char, 
      charCount = {}, 
      newStr = [];
  for(var i =0; i<len; i++){
    char = str[i];
    if(charCount[char]){
      charCount[char]++;
    }
    else
      charCount[char] = 1;
  }
  for (var j in charCount){
    if (charCount[j]==1)
       newStr.push(j);
  }
  return newStr.join('');
}
```

## Tạo các số ngẫu nhiên từ 5 đến 7

Nếu có một hàm tạo ngẫu nhiên từ 1 -> 5, và một hàm tạo ngẫu nhiên từ 1 -> 7, làm sao để tạo ngẫu nhiên từ 5 -> 7

```js
function rand5() {
    return 1 + Math.random() * 4;
}

function rand7() {
    return 5 + rand5() / 5 * 2;
}
```

## Tìm số bị thiếu

Từ một danh sách chưa sắp xếp các số từ 1 đến 100, bị thiếu mất một số, làm sao để tìm được số đó?

```js
input: [5, 2, 6, 1, 3]
output: 4
```



Giải thuật ở đây khá đơn giản, nếu có dãy số từ 1 đến n, thì tổng giá trị của nó sẽ là **n * (n+1) / 2**

```js
function missingNumber(arr) {
  let n = arr.length + 1,
      sum = 0,
      // mấu chốt là ở đây
      expectedSum = n * (n+1) / 2;
    
   for (let i = 0; i < arr.length; i++) {
       sum += arr[i];
   }
    
   return expectedSum - sum;
}
```

## Tổng của 2 số

Từ một mảng chưa sắp xếp, có hay không 2 phần tử trong mảng có giá trị cộng lại bằng một số chỉ định.

```js
input: [6,4,3,2,1,7], 9
output: true
input: [6,4,3,2,1,7], 2
output: false
```

Dễ nhất quả đất

```js
function sumFinder(arr, sum) {
    let len = arr.length;
    
    for (let i = 0; i < len - 1; i++) {
        for (let j = i+1; j < len; j++) {
            if (arr[i] + arr[j] === sum) return true;
        }
    }
    return false;
}
```

Độ phức tạp: O(n2). Có thể làm tốt hơn, khử 2 vòng lặp, đưa về một vòng lặp bằng cách lưu giá trị cần tìm vào một object, ví dụ sum = 10 => phần từ đang kiểm tra là 2 => chúng ta cần tìm phần tử = 8 trong mảng.

```js
function sumFinder(arr, sum) {
    let differ = {},
        len = arr.length,
        lookfor;
    
    for (let i = 0; i < len; i++) {
        lookfor = sum - arr[i];
        if (differ[lookfor]) {
            // có giá trị cần tìm
            return true;
        } else {
            // lưa giá trị hiện tại vào deffer
            deffer[arr[i]] = true;
        }
    }
    
    return false;
}
```

## Tìm tổng lớn nhất của 2 phần tử trong mảng

Input: [1,2,3,4,7]

Output: 4+7 = 11

Giải pháp khá đơn giản, tìm 2 số lớn nhất trong mảng là xong

```js
function topSum(arr) {
    let biggest = arr[0],
        second = arr[1],
        len = arr.length,
        i = 2;
    // edge case
    if (len < 2) return null;
    
    if (biggest < second) {
        //swap
        biggest = arr[1];
        second = arr[0];
    }
    
    for (; i < len; i++) {
        if (arr[i] > biggest) {
            // swap
            second = biggest;
      		biggest = arr[i];
        } else if (arr[i] > second) {
            second = arr[i];
        }
    }
    
    return biggest + second;
}
```

## Điếm số `0`

Điếm xem có bao nhiêu số 0 từ 1 đến n

```js
input: 100
output: 11
input: 2014
output: 223
```

Số 0 xuất hiện trong 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100. Để ý là 100 có 2 số 0, tưởng dễ nhưng khá lắc léo đấy.

Nếu ở đây là từ 1 đến 90, thì kết quả là 9, tức bằng 90/10. 100 thì sẽ là 11, cách tính là 100/10 = 10 và 10/10

```js
function countZero(n) {
    let count = 0;
    while (n > 0) {
        // Math.floor trả về số interger gần nhất
        count += Math.floor(n/10);
        n = n / 10;
    }
    return count;
}
```

## Lấy substring

Trả về index tìm thấy của một substring

```js
input: 'abbcdabbbbbck', 'ab'
output: 0
input: 'abbcdabbbbbck', 'bck'
output: 9
```

```js
function subStringFinder(str, subStr) {
    let idx = 0,
        i = 0,
        j = 0,
        len = str.length,
        subLen = subStr.length;
    
    for (; i < len; i++) {
        // match ký tự đầu tiên
        // kiểm tra tiếp các ký tự tiếp theo
        if (str[i] === subStr[j]) j++;
        // reset lại nếu đã không match
        else j = 0
        
        // chưa kiểm tra hết
        // lưu tạm, check tiếp
        if (j = 0) idx = i;
        // đã match toàn bộ
        else if (j === subLen)
            return idx;
    }
    
    return -1;
}
```

## Permutation

Thứ nhất hoán vị (Permutation) là gì? nếu cho một mảng các chữ cái [A, B, C, D, E], chúng ta có thể có tất cả 20 hoán vị là  AB, BA, AC, CA, AD, DA, AE, EA, BC, CB, BD, DB, BE, EB, CD, DC, CE, EC, DE, ED

Tổ hợp là gì? tương tự như trên nếu là phép tổ hợp thì chúng ta có 10 tổ hợp từ mảng đã cho AB, AC, AD, AE, BC, BD, BE, CD, CE và DE.

```js
input: 'abcde'
out: tất cả các hoán vị có thể tạo ra
```



```js
function permutations(str) {
    let arr = str.split(''),
        len = arr.length,
        perms = [],
        rest,
        picked,
        restPerms,
        next;
    
    if (len === 0) return [str];
    
    for (let i = 0; i < len; i++) {
        // tạo một bản sao của mảng
        // trước khi xử lý
    	rest = [...arr];
        // lấy phần tử tại i
        // đồng thời xóa luôn nó khỏi rest
        picked = rest.splice(i, 1);
        
        // đệ quy để lấy tất cả tổ hợp
        // của các phần tử còn lại
        restPerms = permutations(rest.join(''));
        
        for (let j = 0, jLen = restPerms.length; j < jLen; j++) {
            next = picked.concat(restPerms[j]);
            perms.push(next.join(''));
        }
    }
    
    return perms;
}
```

Ý tưởng rất là đơn giản, đầu tiên convert string về array, lấy một ký tự trong array này rồi đem ghép cặp với tất cả các ký tự còn lại,  sau khi có được tổ hợp của tất cả các ký tự còn lại, chúng ta lại merge nó với ký tự đang được chọn bằng `concat`

http://www.thatjsdude.com/interview/js1.html