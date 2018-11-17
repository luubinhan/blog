
## Content Security Policy (CSP)


## Cross-Origin Resource Sharing (CORS)

CORS là một cơ chế sử dụng HTTP header để báo với trình duyệt, ứng dụng chạy trên một tên miền này có quyền truy cập đến resource từ server khác, domain khác, port khác, protocol khác với chổ nó được host (gọi chung là Origin)

Ví dụ ứng dụng trên địa chỉ domain-a.com sử dụng `fetch()` đến domain-b.com/data.json

Mặc định trình duyệt ngăn chặn duyệt truy cập như vậy trừ khi được cho phép từ phía API, server. Theo nguyên tắc chung

- Response trả về từ GET thì có thể cho phép cross-origin
- PUT/DELETE luôn không cho phép cross-origin
- POST thì hạn chế trên từng field

Rất nhiều Server Side Framework hổ trợ cấu hình CORS, tìm hiểu cái bạn đang xài và nắm thật rõ nguyên tắc của nó.