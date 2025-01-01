const express = require('express')
const { mongo } = require('mongoose')
const env = require("dotenv").config()
const cors = require('cors')
const session = require("express-session")
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(session({
    secret: "1234567890qwertyuiopasdfghjkl;zxcvbnm,.",
    resave: false,
    saveUninitialized: false
}))

// data base Schema
const { Accounts } = require('./Schema/Schema')
// modules
const { Hash, Compare } = require("./modules/Hash")

app.post('/', authenticateToken)

app.post("/registration", async (req, res) => {
    const { username, password } = req.body
    try {
        const account = await Accounts.create({
            username,
            password: Hash(password)
        })
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(401).json({ success: false })
    }
})

app.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const month = 30 * 24 * 60 * 60 * 1000
    try {
        const account = await Accounts.findOne({ username })
        if (account) {
            if (Compare(password, account.password)) {
                const accessToken = jwt.sign({ account }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }) //, { expiresIn: '1d' }
                res.cookie("token", accessToken, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000
                });
                req.userId = account
                res.status(201).json({ account, message: "User logged in successfully", success: true });
                next()
            } else {
                res.send("wrong password or email").status(404)
            }
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(false)
    }
})


app.get('/logout', (req, res, next) => {
    console.log('logged out')
    try {
        res.clearCookie('token').status(200).json({ success: true, message: 'User logged out successfully' })
    } catch (err) {
        res.status(403).json({ success: false, message: 'User logged out failed' })
        console.log(err)
    }
})

function authenticateToken(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(403)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.clearCookie('token').status(400)
        }
        res.json(user)
        next()
    })
}
// Routes
const Capsule_route = require('./Routes/Capsule')
const API = require('./Routes/API')
app.use('/capsule', Capsule_route)
app.use('/API', API)


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
        .then(res => {
            console.log("connected")
        })
        .catch(e => {
            console.log(e)
        })
})