const express = require('express');
const pool=require('../pool.js');
//创建路由器
let router = express.Router();

//添加路由
//1.用户注册 post /register
router.post('/register',(req,res)=>{
	//1.1获取post请求数据
	let obj=req.body;
	console.log(obj);
	//1.2验证数据是否为空,如果为空做出响应
	if(!obj.uname){
		res.send({code:401,msg:'uname require'});
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd require'});
		return;
	}
	if(!obj.email){
		res.send({code:403,msg:'email require'});
		return;
	}
	if(!obj.phone){
		res.send({code:404,msg:'phone require'});
		return;
	}
	//插入数据
	//执行SQL语句
	pool.query("insert into xz_user set ? ",[obj],(err,result)=>{
		if(err) throw err;
		console.log(result);
		//如果数据插入成功,则响应对象
		if(result.affectedRows>0){
			res.send({code:200,msg:'register success'});
		}
	});
});
//2.用户登录 post /login
router.post("/login",(req,res)=>{
	//2.1获取post数据
	let obj = req.body;
	console.log(obj);
	//2.2数据校验
	if(!obj.uname){
		res.send({code:'401`',msg:'uname require'});
		return;
	}
	if(!obj.upwd){
		res.send({code:'402',msg:'upwd require'});
		return;
	}
	pool.query('select * from xz_user where uname = ? and upwd = ?',[obj.uname,obj.upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length==0){
			res.send({code:'301',msg:'this user do not exist'});
			return;
		}
		res.send({code:'200',msg:'login success'})
	});
});
//3.检索用户 get /detail
router.get("/detail",(req,res)=>{
	//3.1获取数据
	let obj = req.query;
	console.log(obj);
	//3.2数据校验
	if(!obj.uid){
		res.send({code:'401',msg:'uid require'});
		return;
	}
	pool.query('select * from xz_user where uid = ?',[obj.uid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send({code:200,msg:'OK',data:result[0]});
		}else{
			res.send({code:302,msg:'none exists'});
		}
	})
});
//4.修改用户 post /update
router.post('/update',(req,res)=>{
	//4.1获取数据
	let obj = req.body;
	console.log(obj);
	//4.2数据校验(循环)
	let i = 400;
	for(let key in obj){
		i++;
		if(!obj[key]){
			res.send({code:i,msg:key+" require"});
			return;
		}
	}
	pool.query('update xz_user set ? where uid = ? ',[obj,obj.uid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows==0){
			res.send({code:'301',msg:'update error'});
			return
		}
		return res.send({code:200,msg:'update success'});
	});
});
//5.用户列表 get /list
router.get('/list',(req,res)=>{
	let obj = req.query;
	console.log(obj);
	if(!obj.pno){
		obj.pno = 1;
	}
	if(!obj.count){
		obj.count = 2;
	}
	let start = (obj.pno - 1)*obj.count;
	obj.count = parseInt(obj.count);
	console.log(start,obj.count);
	pool.query('select * from xz_user limit ?,?',[start,obj.count],(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send({code:200,msg:'OK',data:result})
	})
});
//6.删除用户
router.get('/delete',(req,res)=>{
	let obj = req.query;
	console.log(obj);
	if(!obj.uid){
		res.send({code:401,msg:'uid required'});
		return
	}
	pool.query('delete from xz_user where uid = ? ',[obj.uid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows==0){
			res.send({code:301,msg:'delete error'});
			return;
		}
		res.send({code:200,msg:'delete success'});
	})
});
//导出路由器
module.exports=router;


















