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
> 安装nodemon 
nodemon可以不用多次重启
1,执行nodemon server.js,启动服务
```
nodemon server.js
```
2,浏览器中 访问 http://localhost:8080/
3,如果链接不上数据库,执行 mongo
如果需要指定路径 需要mongod --dbpath “绝对路径”

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
//依赖session功能,放在app.use(session)一下,赋值req.flash(type,msg) 取req.flash(type)
app.use(flash());
res.locals.success = req.flash("success").toString();


# 上传图片
form增加
enctype="multipart/form-data"
let multer = require("multer")//上传图片,如何使用看node-modules 的readme
let upload = multer({dest:'public/uploads'})

req.file=>
{"fieldname":"avatar","originalname":"icon_Choice_0 Copy 2@3x.png","encoding":"7bit","mimetype":"image/png","destination":"public/uploads","filename":"d32ac9d3e71ba9a4c9f74f29d354393f","path":"public/uploads/d32ac9d3e71ba9a4c9f74f29d354393f","size":2331}

# 发表文章

//定义用户模型,
let User =mongoose.model('user',UserSchema);
let ArticleSchema = new mongoose.Schema({
    title:String,//标题
    content:String,//内容
    createAt:{type:Date,default:Date.now},//创建时间
    user:{type:ObjectId,ref:'User'},//外键,文章作者用户表主键(_id)
});

router.post("/add", checkLogin, function (req, res) {
    let article = req.body
    article.user = req.session.user._id;//文章作者,当前登陆用户
    Article.create(article, function (err, doc) {
        if (err) {
            req.flash("error", err);
            res.redirect('back')
        } else {
            req.flash("success", "发表成功");
            res.redirect('/')
        }
    })
})


# 文章列表
查关联库 populate user是与ref对应   user:{type:ObjectId,ref:'user'}
```
    Article.find().populate('user').exec(function(err,articles){
        // console.log(articles,err)
        res.render("index",{title:"首页",articles})
    })
```

## 删除文章
```
router.get("/delete/:_id",function(req, res){
    let _id = req.params._id;//获取
    Article.remove({_id},function(err,article){
        if(err){
            req.flash("error", err);
            res.redirect('back')
        }else{
            req.flash("success", "删除成功");
            res.redirect("/");
        }
    })
})
```
如果有值并且userid相同
```
    <%if(user && article.user==user._id){%>
        <a href="/article/delete/<%=article._id%>" class="btn btn-danger">删除</a>
    <%
    }
    %>
```
更新post, Article.update
```
Article.update({_id},article,function(err,result){
        if(err){
            req.flash("error", err);
            res.redirect('back')
        }else{
            req.flash("success", "更新成功");
            res.redirect("/article/detail/"+_id)
        }
    })
```

## 搜索
form action="/" 增加action .所有提交都在/路径下
数据库查找,title or content有一个满足即可
 query["$or"] = [{ title: new RegExp(keyword) }, { content: new RegExp(keyword) };

 ## 分页

    Article.count(query,function(err,count){
        Article.find(query).populate('user').sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).exec(function (err, articles) {
            res.render("index", {
            title: "首页", 
            articles ,//页码内容
            pageNum,//当前页码
            pageSize,//每页数量
            totalPages:Math.ceil(count/pageSize),//总页数
            keyword})//关键字
        })
    })
    最后需要在index.html 中布局page页码
let MongoStore = require("connect-mongo")(session)
  store:new MongoStore({
        url:require("./config").dbUrl
        //数据持久化,将配置文件放入数据库中,数据库中会多sessions
        //否则启动服务就会再次需要登陆
    })



# 其他问题深入

mongodb 
ejs
mongoose 
epress use ...第三方插件等使用
form表单等h5相关标签
