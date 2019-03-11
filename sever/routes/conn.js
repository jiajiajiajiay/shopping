//链接mysql
const mysql=require('mysql');

//使用mysql模块的方法创建链接对象
const connection = mysql.createConnection({
    host: 'localhost', // 数据库地址
    user: 'root',  // 账号
    password: 'root' ,// 密码
    database: 'smms' ,// 数据库名
});

//执行连接
connection.connect(()=>{
    console.log("数据库链接成功！")
});

//暴露出去
module.exports = connection;