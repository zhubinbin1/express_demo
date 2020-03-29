let express = require("express")
let { checkLogin } = require("../auth")
let { Article } = require("../model")
let router = express.Router()
router.get("/add", checkLogin, function (req, res) {
    // res.send("文章添加")
    res.render("article/add", { title: "发表文章" })
})
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
router.get("/detail/:_id",function(req, res){
    let _id = req.params._id;//获取
    Article.findById(_id,function(err,article){
        if(err){
            req.flash("error", err);
            res.redirect('back')
        }else{
            res.render("article/detail",{title:"详情",article});
        }
    })
})
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
module.exports = router;