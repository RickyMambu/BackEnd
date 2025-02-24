const express = require('express')
const routers = express.Router()


//Routing
routers.get('/', (req, res) => res.send('Hello World!'))

routers.get('/contoh', (req, res) => {
    res.send('request dengan method POST')
})
routers.get('/about',(req,res) => res.status(200).json({
    status: 'success',
    message: 'About page',
    data: []
}))

routers.post('/contoh', (req, res) => {
    res.send('request dengan method POST')
})

routers.put('/contoh', (req, res) => {
    res.send('request dengan method PUT')
})

routers.delete('/contoh', (req, res) => {
    res.send('request dengan method DELETE')
})

routers.patch('/contoh', (req, res) => {
    res.send('request dengan method PATCH')
})

module.exports = routers;
