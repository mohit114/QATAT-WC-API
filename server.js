const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRouter = require('./routes/route');
const app = express();
const port = process.env.PORT || 3000
// ACCEPTING CROSS SITE REQUESTS
app.use(cors());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use('/items', itemsRouter);
app.use('/', function(req, res) {
    res.send('todo api works');
});

const server = http.createServer(app);
server.listen(port);
console.debug('Server listening on port ' + port);