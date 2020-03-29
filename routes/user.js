let express = require("express")
let router = express.Router();
let {User} = require("../model/index");
let {checkNotLogin,checkLogin} = require("../auth")
/***
 * 绘制注册模版(username password email)
 * 提交注册路由 post/user/signup
 * 路由中获取请求体,保持数据库,跳转登陆页面
 */
router.get("/signup",checkNotLogin,function(req,res){
    res.render("user/signup",{title:"注册"})
});
router.post("/signup",checkNotLogin,function(req,res){
    let user =req.body// 请求体对象,username pw email
    // console.log(JSON.stringify(user))
    User.create(user,function(err,doc){//_id __v
        if(err){
            //消息类型是error, 内容是失败,存放的是数组
            req.flash('error',"注册失败");
            res.redirect('back')
        }else{
            req.flash('success',"注册成功");
            res.redirect("/user/signin")
        }
    });
});
//登陆
router.get("/signin",checkNotLogin,function(req,res){
    res.render("user/signin",{title:"登陆"})
});
router.post("/signin",checkNotLogin,function(req,res){
    let user =req.body// 请求体对象,username pw email,提交用户登陆保单
    // console.log(JSON.stringify(user))
    User.findOne(user,function(err,doc){
        console.log(JSON.stringify(doc))
        if(err){
            req.flash('error',"操作数据库失败");
            res.redirect('back');
        }else if(doc){
            req.flash('success',"登陆成功");
            //向会话对象中写入属性user=doc
            req.session.user=doc;
            // req.session.user 取值
            res.redirect('/');
        }else{
            req.flash('error',"登陆失败,用户名或者密码不对");
            res.redirect('back');
        }
    })
    // res.render("user/signup",{title:"注册"})
});
//用户退出登陆
router.get("/signout",checkLogin,function(req,res){
    req.session.user = null
    req.flash('success',"退出成功");
    res.redirect('/user/signin');
    // res.send("用户退出")
    // res.render("user/signout",{title:"用户退出"})
});

//module 模块  model 模型
module.exports = router;