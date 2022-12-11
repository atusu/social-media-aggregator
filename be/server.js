import {callTwitterAPI} from './twitter.js';
import {callRedditAPI} from './reddit.js';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';

// const express = require('express');
// bodyParser = require('body-parser');  
// const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  res.send(JSON.stringify({"input": input, "option":"alisia"}));
});

app.post('/special-pt-mihai', (req, res) => {
  console.log("REQUEST : " + req.body.content);
  var mihai = req.body.content;
  res.send(JSON.stringify({"input": "mihai", "option":"mihai"}));
});

app.post('/twitter', async (req, res) => {
  console.log("REQUEST : " + req.body.content);
  const twitterResponse = await callTwitterAPI(req.body.content);
  let twitterResponseData = twitterResponse.data;
  for(let i = 0; i <twitterResponseData.length; i++){
     twitterResponseData[i] = twitterResponseData[i].text;
  }

  res.send(JSON.stringify({"input": twitterResponseData, "option":"twitter"}));
});

app.post('/reddit', async (req, res) => {
  console.log("REQUEST : " + req.body.content);
  const redditResponse = await callRedditAPI(req.body.content);
  //let redditResponseData = redditResponse.data;
  for(let i = 0; i <redditResponse.length; i++){
    redditResponse[i] = redditResponse[i].data.selftext;
  }

  res.send(JSON.stringify({"input": redditResponse, "option":"reddit"}));
});