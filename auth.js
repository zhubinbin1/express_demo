
//进入路由判定是否登陆,登陆跳回首页,未登陆,继续访问路由
 exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        res.redirect("/")
    }else{
        next();
    }
};

//如果登陆,继续访问,未登陆跳回登陆页面
exports.checkLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect("/user/signin");
    }
}