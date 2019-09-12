```js
fetch('/api/some-url')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Lỗi, mã lỗi ' + response.status);
        return;
      }
      // parse response data
      response.json().then(data => {
        console.log(data);
      })
    }
  )
  .catch(err => {
    console.log('Error :-S', err)
  });
```


# Post

```js
fetch(url, {
  method: 'POST',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  body: 'foo=bar&lorem=ipsum'
})
.then(json)
.then(data => {
  console.log('Request succeeded with JSON response', data);
})
.catch(error => {
  console.log('Request failed', error);
  });
})
Gửi lên dữ liệu dạng JSON

var data = {username: 'example'};

fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data), 
  headers:{
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error))
```

Gửi kèm authen

```js
fetch(url, {
  crendentials: 'same-origin'
})
```