const http = require("http");
const {getUsers} = require('./users')
const moment = require('moment')

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");

const url = req.url
if (url === '/about'){
  res.write(JSON.stringify({
    status: 'success',
    message: 'response success',
    description : 'Excercise #2',
    date: moment().format()
  }))
}
else if (url === '/users'){
  res.write(JSON.stringify(getUsers))
}
else{
  res.statusCode = 200
  res.write('This is homepage')
}
  res.end();
});

const hostname = "127.0.0.1";
const port = 3000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)});
