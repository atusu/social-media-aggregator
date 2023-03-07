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

app.post('/twitter', async (req, res) => {
  console.log("REQUEST : " + req.body.content);
  const twitterResponse = await callTwitterAPI(req.body.content);
  //--------------------------------------------------------------------
  res.send(JSON.stringify({"input": twitterResponse.posts.text, "id": twitterResponse.posts.id,  "status": twitterResponse.status, "error":twitterResponse.error, "error-message":twitterResponse["error-message"]}));
});

app.post('/reddit', async (req, res) => {
  console.log("REQUEST : " + req.body.content);
  let redditResponse = await callRedditAPI(req.body.content);
  //-------------------------------------------------------------------
  res.send(JSON.stringify({"input": redditResponse.posts, "status": redditResponse.status, "error":redditResponse.error, "error-message":redditResponse["error-message"]}));
});