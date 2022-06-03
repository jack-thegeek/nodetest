const express = require("express");
const router = express.Router();
const User = require("../../module/users");
const bcrypt = require("bcrypt-nodejs")
// 测试路由功能
router.get("/test", (req, res) => {
    res.json({ msg: "route works" })
})

// 测试连接MongoDB的路由并post数据到数据库
router.post('/register', (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ email: "邮箱已被注册！" })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                // 密码加密
                newUser.save()
                    .then(user => { res.json(user), console.log(newUser) })
                    .catch(err => console.log(err))

            }
        })
})

module.exports = router;