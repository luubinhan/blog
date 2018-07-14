---
slug: "/2017-10-27-react-children-react-clone-element"
date: "2017-10-27"
title: "React Children và React cloneElement"
desc: "Tìm hiểu cách sử dụng react Children và react cloneElement"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---


Hãy nghĩ ngay tới cặp đôi `React.Children.map` và `React.cloneElement` khi cần truyền `props` từ component cha xuống các component con mà **KHÔNG cần gọi render component bên trong component cha**

Hơi mâu thuẫn vì không `render` component con vậy sao nó hiển thị, ví dụ đi

```jsx
const ComponentChaChu = ({children}) => (
    <div>
     {
        React.Children.map(children, child => (
            React.cloneElement(child, {
                style: {
                    backgroundColor: 'green',
                    color: 'white'
                }
            })
        ))
     }
    </div>
)
const Luckyluu = ({title, posts}) => (
    <div>
        <ComponentChaChu>
            <NavBar title={title} />
        </ComponentChaChu>
        {
            posts.map(post =>(
                <Post key={post.id}>
                    <ComponentChaChu>
                        <PostHeader {...post} /> 
                    </ComponentChaChu>
                    <PostBody {...post} />
                </Post>
            ))
        }
    </div>
)
```

2 component con ở đây là `PostHeader` và `NavBar` có thể sử dụng ở bất kỳ đâu, còn `ComponentChaChu` có thể có bất kỳ đứa con nào, không cần biết sau này con nó là ai thì nó sẽ truyền hết tài sản là `backgroundColor` và `color` cho đứa con yêu dấu đó

Sẵn tiện thì nói luôn một số *function* khác của `React.Children` luôn

## `React.Children.forEach`

Giống như `React.Children.map` nhưng không trả về gì hết

## `React.Children.count`

Nhà có nhiêu đứa con ?

## `React.Children.toArray(children)`

Convert component con về `array`

## `React.Children.only`

Để áp dụng chương trình kế hoạch hóa gia đình, mỗi component cha chỉ có **1** và phải có 1 con duy nhất, quăng cái thông báo nếu không đáp ứng yêu cầu này.

```jsx
class BaBa extends React.Component {
    render() {
        return this.props.children()
    }
}
```

Nếu bắt buộc con thằng `BaBa` phải là `function`

```jsx
BaBa.propTypes = {
    children: React.propTypes.func.isRequired
}
```

Nó log ra thông báo lỗi khi truyền vào con không phải là `function`, dev lười biến có thể 'cho qua' thông báo này. Nhưng khi mình bắt buộc kiểu này

```jsx
class BaBa extends React.Component {
    render() {
        return React.Children.only(this.props.children())
    }
}
```

Nếu không có con là app chết luôn, cho các anh dev không còn lười biếng, giống kiểu mấy người xưa ko có con là không có được vây. ;)