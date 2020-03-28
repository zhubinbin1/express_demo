
let express = require("express")
//调用router方法可以得到路由的实例中间件
let router = express.Router();
//当客户端通过get请求访问/路径通过相应函数处理
router.get("/",function(req,res){
    // res.send("首页")
    //路由相对路径,相对模板根目录eg:views下 会传递给views/index.html
    res.render("index",{title:"首页"})
});

module.exports = router;