const express = require('express');
bodyParser = require('body-parser');  
const path = require('path');
const app = express();
const port = 3000;  
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

const cwd = path.resolve(path.dirname (''));
app.use(express.static(cwd));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//app.use(express.bodyParser())
app.post('/here', (req, res) => {
  console.log("REQUEST : " + req.body.content);
  var input = req.body.content;
  res.send(JSON.stringify({"input": input}));
})