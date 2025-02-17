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