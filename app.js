const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text

  reply(reply_token, msg)
  res.sendStatus(200)
})
app.listen(port)


function reply(reply_token, msg = '') {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer J6Yrd2RR0HvMTbCa1Nxk8aAu0v843Z+knVO0nc46hsVPS1ewOE+SHxO38RMUtvLfHD7pvdRwg8/WU/PceWWd7hh5XnDG5eiy29QEuJsUZ0FCqqX/81d55yZCNbROaEB/RCPt5EKeisXpLRbT3CcehwdB04t89/1O/w1cDnyilFU='
  }
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: msg != '' ? msg : 'Hello'
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
  });
}