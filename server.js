

let express = require("express");
let index = require("./routes/index");
let user = require("./routes/user");
let article = require("./routes/article")

let app =express();
/***
 * / 首页
 * /user/signup 注册
 * /user/signout 退出登陆
 * /user/signin 登陆
 * /article/add 发表文章
 * 
 */
app.use('/',index)
app.use('/user',user)
app.use("/article",article)

app.listen(8080);
