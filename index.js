// 1.引入express
const express = require("express");

// 引入mongoose
const mongoose = require("mongoose");
// 引入刚刚创建的数据库
const db = require("./config/keys").mongoURI;
// 引入body-parser，用于执行post操作
const bodyParser = require("body-parser");

//引入users
const users = require('./api/User');

// 2.创建app对象
const app = express();

// 3.设置端口
const port = process.env.PORT || 3333;

// 4.设置监听
app.listen(port, () => {
    console.log('server running on port ' + port);
})

// 5.设置路由
// app.get('/', (req, res) => {
//     // 连接mongodb

// })

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((resp) => { console.log('connected') })
    .catch(err => console.log(err));

// 使用bodyParser中间件，对应postman中Body的x-www-form-urlencoded格式
// 这两行代码要写在app.use("/api/users",users)前面，否则无法识别到从postman输入的数据，只能得到undefined
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 使用中间件
app.use("/api/users", users);