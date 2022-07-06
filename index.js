require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const https = require('https')
const fs = require('fs')

const appointments = require('./route/appointments')
const reserve = require('./route/reserve')

const app = express()

if(process.env.ENVIRONMENT === 'prod'){
    var server = https.createServer({
        key: fs.readFileSync('c0d4b_12d6b_2b2bf5b4f1f881468dd2c4ff58e1ef58.key', 'utf8'),
        cert: fs.readFileSync('_wildcard__kenisbarbershop_hu_c0d4b_12d6b_1632348761_d183f1424bdb56fcb46650ed991ec4d7.crt', 'utf8')
    }, app)
}

const server2 = http.createServer(app)
const path = __dirname + '/build'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path))

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        connectSrc: ["'self'", "https://kenisbarbershop.hu"],
        frameSrc: ["'self'", "https://maps.google.com"]
    }
}))
app.use(cors())

app.use(appointments)
app.use(reserve)

app.get('*', (req, res) => {
    res.sendFile(path + '/index.html')
})

if(process.env.ENVIRONMENT === 'prod'){
    server.listen(4000, () => {
        console.log('HTTPS Online!')
    })
}

server2.listen(8080, () => {
    console.log('HTTP Online')
})