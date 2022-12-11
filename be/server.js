const express = require('express');
bodyParser = require('body-parser');  
const path = require('path');
const app = express();
const port = 3000;  
app.use(bodyParser.json());

const feDir = path.join(__dirname, '../fe')
app.use(express.static(feDir));

app.get('/', (req, res) => {
  res.sendFile(`${feDir}/index.html`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//app.use(express.bodyParser())
app.post('/here', (req, res) => {
  console.log("REQUEST : " + req.body.content);
  var input = req.body.content;
  res.send(JSON.stringify({"input": input}));
});

app.post('/special-pt-mihai', (req, res) => {
  console.log("REQUEST : " + req.body.content);
  var mihai = req.body.content;
  res.send(JSON.stringify({"input": mihai}));
});