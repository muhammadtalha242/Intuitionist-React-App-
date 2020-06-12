var express = require('express');
var app = express();
var router = express.Router();
const jwt = require('jsonwebtoken')
const Sequelize = require("sequelize");
const connection = require('../../src/config/dbConfig').sequelize;        //Data connection
const User = require('../../models/User')(connection, Sequelize)

//zara
const bcrypt = require('bcrypt')
const cors = require("cors");

router.use(cors())
process.env.SECRET_KEY = 'secret'


router.post('/register', (req, res) => {
    const userInput = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(userInput.password, 10, (err, hash) => {
                    userInput.password = hash
                    User.create(userInput)
                        .then(user => {

                            res.json({ status: user.email + ' registered' })
                            // let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            //     expiresIn: 1440
                            // })
                            // res.json({
                            //     token: token
                            // })
                            // res.send({ message: 'logged in as: ' + req.body.email })
                        })
                        .catch(err => {
                            res.send('error' + err)
                        })
                })
            }
            else {
                res.json({ error: "User already exists" })
            }
        })

        .catch(err => {
            res.send("error :" + err)
        })
})

router.post('/login', (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {

                console.log(req.body.password)
                console.log(user.password)
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    console.log('b')
                    if (result) {
                        console.log('login successful')
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        // res.json({ token: token })
                        res.send(token)
                    }
                    else {
                        res.status(400).json({
                            error: "User doesnot exist"
                        })
                    }
                })
            }
        }
        )
        .catch(err => {
            res.send("error :" + err)
        })
})

module.exports = router;