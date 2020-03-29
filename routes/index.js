
let express = require("express")
let { Article } = require("../model")
//调用router方法可以得到路由的实例中间件
let router = express.Router();
//当客户端通过get请求访问/路径通过相应函数处理
router.get("/", function (req, res) {
    let { keyword } = req.query
    let query = {}
    if (keyword) {
        // query.title = new RegExp(keyword);// /b/
        query["$or"] = [{ title: new RegExp(keyword) }, { content: new RegExp(keyword) }];
    }
    // res.send("首页")
    //路由相对路径,相对模板根目录eg:views下 会传递给views/index.html
    // res.render("index",{title:"首页"})
    //populate user转换对象
    Article.find(query).populate('user').exec(function (err, articles) {
        // console.log(articles,err)
        res.render("index", { title: "首页", articles ,keyword})
    })
    // Article.find({},function(err,articles){
    //     console.log(articles)
    //     res.render("index",{title:"首页",articles})
    // })
});

module.exports = router;