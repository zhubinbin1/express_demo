express 



```
 npm init -y  
```
>创建package.json 文件
```
npm install body-parser cookie-parser debug ejs express morgan serve-favicon express-session connect-mongo mongoose connect-flash multer async bootstrap -S
```
>安装相应的依赖

npm install body-parser cookie-parser debug ejs express morgan serve-favicon express-session connect-mongo mongoose connect-flash multer async -S
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

 # 引用模板引擎
 > 创建views目录 public/lib 静态目录,cs js 
 ```
 //设置模板引擎,指定模板后缀以html为结尾
app.set('view engine','html');
//指定模板路径 指定根目录
app.set('views',path.resolve(__dirname,"views"));
//指定html类型模板用egs方法渲染
app.engine('html',require("ejs").__express);
 ```
> app.use(express.static(path.resolve("node_modules")))

指定引用静态文件目录
```
//此静态文件中间件会拦截客户端对于静态文件的请求,如boostap.css 
//,然后在当前目录的node_modules下寻找此文件,如果找到,返回客户端,并结束请求 <%=title%>
app.use(express.static(path.resolve("node_modules")))
```

header.html footer.html 分开
`ejs的include语法:`
 
```
<%- include('include/header.html')%>
 首页
<%- include('include/footer.html')%>
```



# 创建mongodb
```
let mongoose = require("mongoose")
//链接数据库
let DB_URL = 'mongodb://localhost:27017/201701blog'
mongoose.connect(DB_URL);
```
# session 处理

>包括session会话

```
//请求对象上增加req.session, 存放内存
app.use(session({
    resave:true,//每次客户端请求服务器保存session
    secret:"zhubin",//加密cookie
    saveUninitialized:true,//保存初始化session
}));
```







