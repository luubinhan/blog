---
slug: "2022-05-01-tat-ca-nhung-gi-can-biet-de-lam-viec-voi-avatar-trong-react"
date: "2022-05-01"
title: "Tất cả những gì bạn cần biết khi làm user avatar trong React"
desc: ""
tags: ["javascript", "beginner", "thu-thuat", "react"]
---

Tất cả những gì bạn cần biết khi làm user avatar trong React
## Tạo avatar mặc định
Trong trường hợp user chưa upload avatar, chúng ta sẽ hiển thị một avatar mặc định, sử dụng [jdenticon](https://www.npmjs.com/package/jdenticon) nó sẽ cho chúng ta bộ hình sau
![](https://res.cloudinary.com/practicaldev/image/fetch/s--kYzqAMFa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jrn6svy3k9b3qznrgkla.png)

```tsx
import { ComponentProps, FC, useState } from 'react';

export const AutoAvatar: FC<
  ComponentProps<'img'> & { userId: number; size: number }
> = ({ userId, size, ...imgProps }) => {
  const [base64, setBase64] = useState(undefined as string | undefined);

  // dùng dynamic import để tối ưu
  import('jdenticon').then(({ toSvg }) => {
    const svgString = toSvg(userId, size);
    const base64 = Buffer.from(svgString).toString('base64');
    setBase64(base64);
  });

  return base64 ? (
    <div style={{ backgroundColor: 'rgb(225,225,225)', display: 'flex' }}>
      <img
        {...imgProps}
        src={`data:image/svg+xml;base64,${base64}`}
        alt={'User Avatar'}
      />
    </div>
  ) : (
    <div style={{ width: size, height: size, display: 'inline-block' }}>
      Loading...
    </div>
  );
};
```
Thư viện này khoản 45kb, để webpack dynamic load khi cần thiết cho tiết kiệm
Giá trị **base64** trả về chúng ta có thể gán cho `src` của thẻ `<img />`

## Cho user upload avatar

Nếu chỉ dùng `<input type="file" />` UI nó sẽ khá xấu, chúng ta *dấu* nó đi và thay bằng một `<button />` để dễ chỉnh CSS hơn. Sử dụng `ref` để trigger sự kiện *click* trên `input`

```tsx
import React, {createRef} from "react";

export const ImageSelect = () => {
  const fileRef = createRef<HTMLInputElement>();

  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target?.files?.[0]);
  }

  return (
    <>
      <input
        type="file"
        style={{display: 'none'}}
        ref={fileRef}
        onChange={onFileInputChange}
        accept="image/png,image/jpeg,image/gif"
      />
      <button
        onClick={() => fileRef.current?.click()}
      >Cool Button
      </button>
    </>
  )
}
```

## Crop ảnh

Trước khi gửi ảnh xuống backend dể lưu lại, chúng ta sẽ cho phép user `crop` ảnh bằng [cropper.js](https://fengyuanchen.github.io/cropperjs/) và [react-cropper](https://www.npmjs.com/package/react-cropper)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--B3T2HPu8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rmvn8upi2y1onvpsvclt.gif)

```tsx
import React, {createRef} from "react";
import {Cropper, ReactCropperElement} from "react-cropper";
import 'cropperjs/dist/cropper.css';

export const ImageCrop = () => {
  const cropperRef = createRef<ReactCropperElement>();

  return (
    <Cropper
      src="<the iamge src>"
      style={{height: 400, width: 400}}
      autoCropArea={1}
      aspectRatio={1}
      viewMode={3}
      guides={false}
      ref={cropperRef}
    />
  )
}
```

Một số thiết đặt
- `autoCropArea = 1` mặc định là chọn toàn bộ hình
- `aspectRatio = 1` tỉ lệ crop mong muốn, chọn 1:1, vuông
- `viewMode = 3` không cho phép chọn vào vùng nằm ngoài hình
- `guides = false` không hiển thị mấy đường *grid*

```tsx
import React, {createRef, useState} from "react";
import {Cropper, ReactCropperElement} from "react-cropper";
import 'cropperjs/dist/cropper.css';

export const ImageCrop = () => {
  const cropperRef = createRef<ReactCropperElement>();
  const [cropped, setCropped] = useState(null as string | null);

  const onSaveClick = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    setCropped(cropper.getCroppedCanvas().toDataURL())
  }

  return (
    <>
      <Cropper
        src={"https://picsum.photos/500/300"}
        style={{height: 400, width: 400}}
        autoCropArea={1}
        aspectRatio={1}
        viewMode={3}
        guides={false}
        ref={cropperRef}
      />
      <button onClick={onSaveClick}>Crop</button>
      {cropped &&
        <img src={cropped} alt={"It's cropped"}/>
      }
    </>
  )
}
```

Để lấy image cho việc upload, sử dụng `blob`. Còn nếu chỉ cần hiển thị thì dùng `dataUrl` như ở trên

```js
cropper.getCroppedCanvas().toBlob()
```

## Toàn bộ source code

```tsx
import React, {createRef, useState} from 'react';
import './App.css';
import {Cropper, ReactCropperElement} from "react-cropper";
import 'cropperjs/dist/cropper.css';
import './roundedCropper.css';

// chuyển file qua base64
const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
  });
};

const App = () => {
  // ref đến file input
  const fileRef = createRef<HTMLInputElement>();

  // hình được chọn
  const [uploaded, setUploaded] = useState(null as string | null);

  // kết quả của image sau khi crop
  const [cropped, setCropped] = useState(null as string | null);

  // ref đến crop element
  const cropperRef = createRef<ReactCropperElement>();

  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      file2Base64(file).then((base64) => {
        setUploaded(base64);
      });
    }
  }

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    setCropped(cropper.getCroppedCanvas().toDataURL())
  }

  return (
    <>
      <div className="App">
        {
          uploaded ?
            <div>
              <Cropper
                src={uploaded}
                style={{height: 400, width: 400}}
                autoCropArea={1}
                aspectRatio={1}
                viewMode={3}
                guides={false}
                ref={cropperRef}
              />
              <button onClick={onCrop}>Crop</button>
              {cropped && <img src={cropped} alt="Cropped!"/>}
            </div>
            :
            <>
              <input
                type="file"
                style={{display: 'none'}}
                ref={fileRef}
                onChange={onFileInputChange}
                accept="image/png,image/jpeg,image/gif"
              />
              <button
                onClick={() => fileRef.current?.click()}
              >Upload something!
              </button>
            </>}
      </div>
    </>
  );
}

export default App;
```

- [All you need to know to deal with user avatars 👤 in React](https://tolgee.io/blog/manage-user-avatar)

