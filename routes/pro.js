const express = require('express');
const pool=require('../pool.js');
//创建路由器
let router = express.Router();

//添加路由
//1.用户登录
router.get("/v1/login/:uname&:upwd",(req,res)=>{
	let $uname = req.params.uname;
	let $upwd = req.params.upwd;
	let sql = "select * from xz_user where uname = ? and upwd = ?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0) {
			res.send("1");
		}else{
			res.send("0");
		}
	})
});
//2.用户列表查询
router.get("/v1/userlist",(req,res)=>{
	let sql = "select * from xz_user ";
	pool.query(sql,(err,result)=>{
		console.log(result)
		if(err) throw err;
		res.send(result);
	})
});
//3.删除用户(根据id)
router.delete("/v1/delUser/:uid",(req,res)=>{
	let $uid = req.params.uid;
	let sql = "delete from xz_user where uid = ?";
	pool.query(sql,[$uid],(err,result)=>{
		console.log(result)
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//4.根据uid查询用户
router.get("/v1/searchUser/:uid",(req,res)=>{
    let $uid = req.params.uid;
    let sql = "select * from xz_user where uid = ? ";
    pool.query(sql,[$uid],(err,result)=>{
    	console.log(result)
        if(err) throw err;
        if(result.length>0){
            res.send(result[0]);
        }
    })
});
//5.根据uid修改用户
router.put("/v1/updateUser",(req,res)=>{
	var obj=req.body;
	var sql = "update xz_user set ? where uid = ?";
	pool.query(sql,[obj,obj.uid],(err,result)=>{
		console.log(obj);
		console.log(result);
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1")
		}else {
			res.send("0");
		}
	});
});
//6.根据uname查询用户
router.get("/v1/queryUser/:uname",(req,res)=>{
	let $uname = req.params.uname;
	let sql="select * from xz_user where uname = ?";
	pool.query(sql,[$uname],(err,result)=>{
		console.log(result);
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
});
//7.注册接口
router.post("/v1/reg",(req,res)=>{
	let obj = req.body;
	let sql = "insert into xz_user set ?";
	pool.query(sql,[obj],(err,result)=>{
		console.log(result);
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
});
//导出路由器
module.exports=router;


















