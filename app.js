const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const router = require('./routes/router')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use('/', router)
app.use((req, res) => {
    res.status(404)
    res.send(`<h1>404</h1> <p>Page Not Found</p>`)
})

app.listen(port, () => {
    console.log(`listen to port ${port}`);
})