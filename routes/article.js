let express = require("express")
let router = express.Router()
router.get("/add",function(req,res){
    // res.send("文章添加")
    res.render("article/add",{title:"发表文章"})
})
module.exports = router;