

let mongoose = require("mongoose")
//链接数据库
let DB_URL = 'mongodb://localhost:27017/201701blog'
mongoose.connect(DB_URL);
/**
  * 连接成功
  */
 mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    
/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/runoob";
//定义用户集合骨架模型,属性和类型
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
//定义用户模型,
let User =mongoose.model('user',UserSchema);
//把用户模型挂载导出对象
// export{
//     User
// }
exports.User = User