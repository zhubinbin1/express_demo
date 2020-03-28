express 



```
 npm init -y  
```
>创建package.json 文件
```
npm install body-parser cookie-parser debug ejs express morgan serve-favicon express-session connect-mongo mongose connect-flash multer async -S
```
>安装相应的依赖

npm install body-parser cookie-parser debug ejs express morgan serve-favicon express-session connect-mongo mongose connect-flash multer async -S
- --save-dev = -D
- --save =-S

# 创建并初始化git
```
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:zhubinbin1/express_demo.git
git push -u origin master
```
# 创建服务

- server.js +mongodb
```
let express = require("express");
let app =express();
app.listen(8080);
```

# 跑通路由
> 创建routes 目录

增加如下页面
 * / 首页
 * /user/signup 注册
 * /user/signout 退出登陆
 * /user/signin 登陆
 * /article/add 发表文章






