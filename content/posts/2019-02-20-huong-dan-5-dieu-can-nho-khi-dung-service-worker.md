---
slug: "/2019-02-20-huong-dan-5-dieu-can-nho-khi-dung-service-worker"
date: "2019-02-20"
title: "5 điều cần nhớ khi làm việc với service worker"
desc: "Năm điều nhỏ nhỏ, nhưng rất hay ho cần thiết, cần biết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---



Nếu chưa biết [Service worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) là gì, bạn hãy vào đọc lại link mình đã gắn sẵn

## Đặt file service worker trong thư mục root

![5 điều cần nhớ khi làm việc với service worker](https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/rootdir.jpg)

Đừng thấy file service worker là js mà bạn đi bỏ nào trong thư mục *js* hay *scripts*, bởi vì file service worker bỏ vào thư mục nó sẽ bị giới hạn hoạt động ở trong thư mục *js* đó thôi. Nghĩa là nó chỉ can thiệp được khi user truy cập `www.yoursite.com/js/`, tất cả request từ `www.yoursite.com` hay `www.yoursite.com/news` nó sẽ cho qua.

Tuy nhiên, chúng ta có thể thay đổi scope này

```js
navigator.serviceWorker.register('/sw.js', {
 scope: '/'
});
```

Nhưng thật lòng mà nói, bỏ luôn trong thư mục root có phải dễ chịu không, nó tự động handle toàn bộ request ở cả site luôn cho khỏe

## Sử dụng Panel Application trên Chrome Dev Tools

![5 điều cần nhớ khi làm việc với service worker](https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/applicationstab.jpg)

Trên tab này chúng ta sẽ biết được mình đã đăng ký file service worker thành công chưa, giả lập offline, bypass cái service worker hoặc gỡ bỏ luôn.

## Không sử dụng Hard Reload

![5 điều cần nhớ khi làm việc với service worker](https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/donthardreload.jpg)

Một trong những thói quen của chúng ta là dùng "Hard Reload" hay "Empty Cache and Hard Reload" trên trình duyệt để xem những thay đổi mới nhất. Tuy nhiên là khi có service worker rồi, nó sẽ tự động bypass vụ "Hard Reload" này. Tip tiếp theo sẽ chỉ bạn cách làm ngay thôi

## Bật "Update on Reload"

![5 điều cần nhớ khi làm việc với service worker](https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/updateonreload.jpg)

Để đảm bảo luôn luôn lấy file mới nhất, trên tab **Application** check vào ô **Update on Reload** là xong. Như vậy thì khi thực hiện reload trang (reload bình thường luôn ấy) trình duyệt tự động update cái service worker luôn.

Còn muốn thực hiện manual, click vào link **Update** bên dưới màn hình này.

## Inspect và manual delete cache

Cuối cùng, cũng hay, là trên tab **Application** cho phép chúng ta xóa chỉ định **cụ thể** file cache nào muốn xóa. Cột bên trái, mục **Cache Storage**, click nút expand, bạn sẽ thấy danh sách cache object đang được lưu trên trang này

![5 điều cần nhớ khi làm việc với service worker](https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/inspectcache.jpg)

Muốn xóa? Đơn giản click phải chọn **Delete**

![5 điều cần nhớ khi làm việc với service worker](https://cms-assets.tutsplus.com/uploads/users/53/posts/31424/image/manuallydeletecache.jpg)



<a target="_blank" rel="noopener noreferrer" href="https://webdesign.tutsplus.com/tutorials/5-essential-tips-for-service-worker-development--cms-31424">5 Essential Tips for Service Worker Development</a>