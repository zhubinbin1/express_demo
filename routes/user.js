let express = require("express")
let router = express.Router();
let {User} = require("../model/index");
/***
 * 绘制注册模版(username password email)
 * 提交注册路由 post/user/signup
 * 路由中获取请求体,保持数据库,跳转登陆页面
 */
router.get("/signup",function(req,res){
    res.render("user/signup",{title:"注册"})
});
router.post("/signup",function(req,res){
    let user =req.body// 请求体对象,username pw email
    console.log(JSON.stringify(user))
    User.create(user,function(err,doc){//_id __v
        if(err){
            res.redirect('back')
        }else{
            res.redirect("/user/signin")
        }
    });
    //
    // res.render("user/signup",{title:"注册"})
});
router.get("/signout",function(req,res){
    res.send("用户退出")
    // res.render("user/s",{title:"用户退出"})
});
router.get("/signin",function(req,res){
    // res.send("用户登陆")
    res.render("user/signin",{title:"登陆"})
});
//module 模块  model 模型
module.exports = router;