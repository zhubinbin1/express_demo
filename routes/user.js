let express = require("express")
let router = express.Router();
router.get("/signup",function(req,res){
    res.send("用户注册")
});
router.get("/signout",function(req,res){
    res.send("用户退出")
});
router.get("/signin",function(req,res){
    res.send("用户登陆")
});
//module 模块  model 模型
module.exports = router;