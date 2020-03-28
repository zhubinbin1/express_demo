

let express = require("express");
let index = require("./routes/index");
let user = require("./routes/user");
let article = require("./routes/article")
let path = require("path")
let bodyparser = require("body-parser")
let session = require('express-session')//绘画中间件
let app = express();
//请求对象上增加req.session
app.use(session({
    resave:true,//每次客户端请求服务器保存session
    secret:"zhubin",//加密cookie
    saveUninitialized:true,//保存初始化session
}));
//设置模板引擎,指定模板后缀以html为结尾
app.set('view engine', 'html');
//解析客户端提交过来的请求体,并转换对象给req.body
app.use(bodyparser.urlencoded({extended:true}))
//指定模板路径 指定根目录
app.set('views', path.resolve(__dirname, "views"));
//指定html类型模板用egs方法渲染
app.engine('html', require("ejs").__express);
//此静态文件中间件会拦截客户端对于静态文件的请求,如boostap.css 
//,然后在当前目录的node_modules下寻找此文件,如果找到,返回客户端,并结束请求 <%=title%>
app.use(express.static(path.resolve("node_modules")))
app.use(function(req,res,next){
    //渲染模版的req.locals. 公共变量
    res.locals.user = req.session.user;
    next();
})
/***
 * / 首页
 * /user/signup 注册
 * /user/signout 退出登陆
 * /user/signin 登陆
 * /article/add 发表文章
 * 
 */
app.use('/', index)
app.use('/user', user)
app.use("/article", article)

app.listen(8080);
