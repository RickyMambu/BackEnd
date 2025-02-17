const http = require('http')
const express = require ('express')
const app = express()
const moment = require('moment')
const morgan = require('morgan')
const errorhandler = require('errorhandler')


//Middleware
const log = (req, res, next) => {
    console.log(moment().format("MMMM Do YYYY, h:mm:ss a") 
    + " " + req.originalUrl + " " + req.ip);
    next()
}
//Middleware using morgan
app.use(morgan('tiny'))

//errorhandler
app.use(errorhandler)




//Routing
app.get('/', (req, res) => res.send('Hello World!'))

//Method
app.get('/contoh', (req, res) => {
    res.send('request dengan method POST')
})
app.get('/about',(req,res) => res.status(200).json({
    status: 'success',
    message: 'About page',
    data: []
}))

app.post('/contoh', (req, res) => {
    res.send('request dengan method POST')
})

app.put('/contoh', (req, res) => {
    res.send('request dengan method PUT')
})

app.delete('/contoh', (req, res) => {
    res.send('request dengan method DELETE')
})

app.patch('/contoh', (req, res) => {
    res.send('request dengan method PATCH')
})



//Routing Dinamis
//1. Menggunakan params
app.get('/post/:id', (req,res) => res.send(`Artikel ke - ${req.params.id}`))
//2. Query String - bukan : tapi ?
app.get('/post', (req,res) => {
    const {page} = req.query
    res.send(`Query yang didapatkan adalah: ${page}`)
})

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'resource tidak ditemukan',

    })
})

const hostname = "127.0.0.1"
const port = 3000
app.listen(port, () => {console.log(`Server running at http://${hostname}:${port}/`)})

