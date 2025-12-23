require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function (req, res) {
  const originalUrl = req.body.url
  let count = 0;
  console.log(originalUrl)
  let hostName = new URL(originalUrl).hostname;
  dns.lookup(hostName, (err, address) => {
    if (err) {
      res.json({
        error: 'invalid url'
      })
    } else {
      res.json({
        "original_url": originalUrl,
        "short-url": ++count
      })
    }
  })

  // logger();
})

// const logger = function(req,res,next){
//   console.log(req.body.url)
//   next();
// }
// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});