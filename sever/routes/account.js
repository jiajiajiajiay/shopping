//账号管理的路由

const express = require('express');
const router = express.Router();

//链接到数据库模块
const connection=require('./conn');

//拦截所有请求
router.all(`*`,(req,res,next)=>{
    //解决响应头跨域问题
    res.header("Access-Control-Allow-Origin","*");
    //放行
    next()

})

//接收添加账号请求：/accunttadd
router.post('/accountadd',(req,res)=>{
    //接收前端参数
    let { account,password,userGroup}=req.body;

    //把数据传入数据库
    //写sql语句
    const sqlStr=`insert into account(account,password,usergroup) values('${account}','${password}','${userGroup}')`;
   console.log(sqlStr)
    //执行sql语句
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
    //    判断如果受影响行数大于0 就是成功 否则就是失败
        if(data.affectedRows>0){
        //    返回成功提示
            res.send({code:0,reason:"添加账号成功"});
        }else{
        //    返回失败提示
            res.send({code:1,reason:"添加账号失败"});
        }

    })

})

//接收账号列表请求：/accountlist
router.get('/accountlist',(req,res)=>{
    //去数据库查询所有数据
    const sqlStr=`select * from account order by ctime desc`;

    //执行sql语句
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        res.send(data);
    })


})

//接收账号删除请求：/accountdel
router.get('/accountdel',(req,res)=>{
    //  接收id
    const {id}=req.query;
    //  写sql语句
    const sqlStr=`delete from account where id=${id}`
    //执行sql语句
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
    //    判断
        if(data.affectedRows>0){
            res.send({code:0,reason:"添加账号成功"})
        }else{
            res.send({code:0,resaon:"添加账号失败"})
        }
    })
})

//接收账号修改请求：/accountedit
router.get('/accountedit',(req,res)=>{
    //接收请求
    const { id }=req.query;
    //写sql语句
    const sqlStr=`select * from account where id=${id}`

    //执行sql语句
    connection.query(sqlStr,(err,data)=>{
        //    判断
       if(err)throw err;
       res.send(data[0])

    })

})

//接收账号修改保存请求
router.post('/accounteditsave',(req,res)=>{
    //接收新数据和原来的id
    let{ account,usergroup,id }=req.body;

    //写sql语句
    const sqlStr = `update account set account='${account}', usergroup='${usergroup}' where id=${id}`;
    //执行sql语句
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        //    判断
        if(data.affectedRows>0){
            res.send({code:0,reason:"修改账号成功"})
        }else{
            res.send({code:0,resaon:"修改账号失败"})
        }

    })

})


//暴露出去
module.exports = router;