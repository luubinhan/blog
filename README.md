Hi guys 😊

Chào mừng bạn đã ghé vào _nhà mình_, mong muốn được chia sẽ kiến thức với những bạn yêu thích frontend và lựa chọn frontend như _con đường kiếm cơm_, mình cho ra đời cái **blog** này.

Lại ông đi qua, lại dì đi lại, nếu thấy blog mình hữu ích, tiện tay bấm cái like cho lên tinh thần đóng góp.

# Note

Work with node@12.19.0

## Nếu bị lỗi 

> Error: 'darwin-x64' binaries cannot be used on the 'darwin-arm64v8' platform. Please remove the 'node_modules/sharp' directory and run 'npm install' on the 'darwin-arm64v8' platform.

rm -rf node_modules/sharp
npm cache clean --force
npm install