---
slug: "2023-01-14-tuong-tac-voi-docker-container"
date: "2023-01-14"
title: "Dùng lệnh docker exec để thực thi một lệnh trong Docker Container"
desc: "Tìm hiểu cách tương tác với một docker container đang chạy"
tags: ["docker","hoc-thuat","beginner"]
---

<!-- TOC -->

- [Dựng một Docker container để thực hành](#dựng-một-docker-container-để-thực-hành)
- [Tìm tên của Docker container](#tìm-tên-của-docker-container)
- [Chạy shell trong Docker container](#chạy-shell-trong-docker-container)
- [Thực thi command trong Docker container không dùng shell](#thực-thi-command-trong-docker-container-không-dùng-shell)
- [Thực thi một command ở một thư mục trong Docker container](#thực-thi-một-command-ở-một-thư-mục-trong-docker-container)
- [Chạy command bằng một user khác trong Docker container](#chạy-command-bằng-một-user-khác-trong-docker-container)
- [Truyền biến môi trường vào Docker container](#truyền-biến-môi-trường-vào-docker-container)
- [Lỗi thường gặp](#lỗi-thường-gặp)

<!-- /TOC -->

Khi làm việc với Docker chúng ta sẽ có nhu cầu tương tác bên trong container, để debug, inspect, kiểm tra trạng thái hiện của ứng dụng. Để thực thi một lệnh bên trong một container đang chạy, chúng ta sẽ dùng đến câu lệnh `docker exec`

## Dựng một Docker container để thực hành

Chúng ta sẽ dùng `alpipe` image để dựng một container với mục đích thực hành lệnh `docker exec`

```bash
docker run -d --name container-name alpine watch "date >> /var/log/date.log"
```

> `-d` để chạy chế độ *detach*, nó sẽ chạy nền và không chiếm lấy terminal

`watch "date >> /var/log/date.log"` là command mà chúng ta muốn chạy bên trong container, lệnh `watch` sẽ chạy lặp lại sau mỗi 2 giây (thời gian mặc định), trong trường hợp này, câu lệnh `date >> /var/log/date.log` sẽ in thời gian hiện tại vào file `date.log` sau mỗi 2 giây. Cái file nó sẽ như thế này

```
Sat Jan 14 01:35:11 UTC 2023
Sat Jan 14 01:35:13 UTC 2023
Sat Jan 14 01:35:15 UTC 2023
```

## Tìm tên của Docker container

Trong trường hợp container đang chạy rồi, chúng ta lại không biết tên của nó là gì, chúng ta sẽ liệt kê toàn bộ docker đang chạy

```bash
docker ps
```

kết quả trả về

```
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
76aded7112d4   alpine    "watch 'date >> /var…"   11 seconds ago   Up 10 seconds             container-name
```

Dùng container name hoặc container id để nói với `docker exec` container nào sử dụng. Nếu muốn rename 

```bash
docker rename container-name new-name
```

## Chạy shell trong Docker container

Để chạy *shell* bên trong container, dùng `docker exec` với flag `-i` `-t` (viết gọp lại thành `-it`)

```bash
docker exec -it container-name sh
```

Sau câu lệnh này, chúng ta sẽ đứng ở *shell* terminal bên trong container, để thoát khỏi terminal này, gõ lệnh `exit` và nhấn `ENTER`

```bash
/ # exit
```

Nếu không dùng `shell` mà cần đến những tính năng chỉ có trong `bash`, thay `sh` ở câu lệnh trên bằng `bash`


## Thực thi command trong Docker container không dùng shell

Nếu cần thị thi một lệnh bên trong container, nhưng không cần mở *shell* để tương tác, gọi `docker exec` không thêm bất kỳ flag nào

```bash
docker exec container-name tail /var/log/date.log
```

Nó sẽ chạy lệnh `tail /var/log/date.log` và in ra kết quả, mặc định lệnh `tail` sẽ in ra mười dòng cuối cùng trong file

```
Sat Jan 14 01:35:11 UTC 2023
Sat Jan 14 01:35:13 UTC 2023
Sat Jan 14 01:35:15 UTC 2023
Sat Jan 14 01:35:17 UTC 2023
Sat Jan 14 01:35:19 UTC 2023
Sat Jan 14 01:35:21 UTC 2023
Sat Jan 14 01:35:23 UTC 2023
Sat Jan 14 01:35:25 UTC 2023
Sat Jan 14 01:35:27 UTC 2023
Sat Jan 14 01:35:29 UTC 2023
```

## Thực thi một command ở một thư mục trong Docker container

Để thực thi một lệnh bên trong một thư mục cụ thể, sử dụng flag `--workdir` để chỉ định thư mục

```bash
docker exec --workdir /tmp container-name pwd
```

Câu lệnh trên, chỉ định thư mục `/tmp` là thư mục mà lệnh sẽ đứng ở vị trí đó để thực thi, `pwd` sẽ in ra thư mục hiện tại, kết quả là

```
/tmp
```

## Chạy command bằng một user khác trong Docker container

Sử dụng flag `--user` nếu muốn thực thì bằng một user khác

```bash
docker exec --user guest container-name whoami
```

Kết quả của câu lệnh `whoami` sẽ trả về user đang gọi lệnh

```
guest
```

## Truyền biến môi trường vào Docker container

Đôi khi chúng ta sẽ có nhu cầu truyền thêm biến môi trường vào trong container để chạy. Flag `-e` sẽ cho phép chỉ định biến môi trường

```bash
docker exec -e TEST=binhan container-name env
```

Lệnh này sẽ khai báo một biến môi trường tên `TEST` với giá trị `binhan`. Lệnh `env` sẽ in toàn bộ biến môi trường bên trong container

```
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=2191b2d508e9
TEST=binhan
HOME=/root
```

Nếu cần khai báo thêm biến môi trường thứ 2

```bash
docker exec -e TEST=binhan -e ENVIROMENT=prod container-name env
```

Nếu mà nhiều biến hơn, chúng ta dùng file `.env`, `--env-file` để truyền file chưa biến môi trường

```bash
docker exec --env-file .env container-name env
```

Kết quả

```
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=76aded7112d4
TEST=binhan
ENVIRONMENT=prod
HOME=/root
```

## Lỗi thường gặp

Khi sử dụng `docker exec`, có thể chúng ta sẽ gặp một số lỗi như:

```
Error: No such container: container-name
```

Kiểm tra lại xem có sai chữ nào không, chạy `docker ps` để kiểm tra lần nữa, tốt nhất là copy tên từ lệnh `docker ps`

```
Error response from daemon: Container 2a94aae70ea5dc92a12e30b13d0613dd6ca5919174d73e62e29cb0f79db6e4ab is not running
```

Cái này là do container chưa chạy thôi, chỉ cần `docker start container-name` để dựng nó lên

```
Error response from daemon: Container container-name is paused, unpause the container before exec
```

Container đang tạm dừng, khá rõ ràng là chúng ta cần `docker unpause container-name` trước khi muốn làm gì tiếp

[How To Use docker exec to Run Commands in a Docker Container](https://www.digitalocean.com/community/tutorials/how-to-use-docker-exec-to-run-commands-in-a-docker-container)

