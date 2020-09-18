const express=require('express');
const userRouter=require('./routes/user.js');
const proRouter=require('./routes/pro.js');
const bodyParser=require('body-parser');
//创建web服务器
let app=express();
//监听8080端口
app.listen(8080);

//托管静态资源到public
app.use(express.static('public'));
app.use(express.static('pro'));
//使用body-parser中间件
app.use(bodyParser.urlencoded({
    extended:false   //false表示不使用扩展的qs模块,而是使用querystring模块
}));

//把路由器挂载到服务器下,添加前缀 /user
app.use('/user',userRouter);
app.use('/pro',proRouter);
