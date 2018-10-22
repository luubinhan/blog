
- Sử dụng whitelist để báo client cái gì cho phép, cái gì không cho phép
- Các khai báo có sẵn
- Code inline và `eval()`
- Báo với server vi phạm policy trước khi gửi

## Whitelist

Thay vì tin tưởng tất cả những gì server gửi, CSP định nghĩa trong HTTP Header: `Content-Security-Policy cho phép tạo whitelist các source tin tưởng, báo với browser chỉ thực thi hoặc render từ whitelist

```
Content-Security-Policy: script-src "self" https://apis.google.com
```

`script-src` khai báo trình duyệt có toàn quyền thực thi javascript từ **apis.google.com** và cùng origin

# Policy được áp dụng trên nhiều resource khác nhau

- `base-uri`: giới hạn các URL có thể xuất hiện trong thẻ <base>
- `child-src`: danh sách URL cho worker và embedded frame. Ví dụ: child-src https://youtube.com được phép embed các video từ Youtube, không được phép từ các origin khác
- `connect-src`: giới hạn các origin được phép kết nối (thông qua XHR, WebSocket, EventSource)
- `font-src`: chỉ định các origin cung cấp web font.
- `form-action`: danh sách
