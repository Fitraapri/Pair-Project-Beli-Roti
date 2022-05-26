const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const router = require('./routes/router')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'TEST',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use('/', router)


app.listen(port, () => {
    console.log(`listen to port ${port}`);
})