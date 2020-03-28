let express = require("express")
let router = express.Router();
router.get("/signup",function(req,res){
    // res.send("用户注册")
    res.render("user/signup",{title:"注册"})
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