
let express = require("express")
let { Article } = require("../model")
//调用router方法可以得到路由的实例中间件
let router = express.Router();
//当客户端通过get请求访问/路径通过相应函数处理
router.get("/", function (req, res) {
    let {keyword} = req.query
    let query = {}
    if (keyword) {
        // query.title = new RegExp(keyword);// /b/
        query["$or"] = [{ title: new RegExp(keyword) }, { content: new RegExp(keyword) }];
    }
    let pageNum = isNaN(req.query.pageNum)?1:parseInt(req.query.pageNum)
    let pageSize = isNaN(req.query.pageSize)?3:parseInt(req.query.pageSize)
    // res.send("首页")
    //路由相对路径,相对模板根目录eg:views下 会传递给views/index.html
    // res.render("index",{title:"首页"})
    //populate user转换对象
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
   
    // Article.find({},function(err,articles){
    //     console.log(articles)
    //     res.render("index",{title:"首页",articles})
    // })
});

module.exports = router;