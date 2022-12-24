const express = require('express')
const port =  3000
const fetch = require('node-fetch');
const app = express();
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded());
app.use(express.static('public'))

app.get('/form',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/saved',(req,res)=>{
  res.sendFile(__dirname + '/public/save.html')
})
app.post('/response', (req, res)=>{
console.log(req.body)
res.sendFile(__dirname + '/public/response.html')
    const webhookURL = `${req.body.webhook}`;
const data = JSON.stringify({

        "cardsV2": [
          {
            "cardId": "unique-card-id",
            "card": {
              "header": {
                "title": `${req.body.header}`,
                "subtitle": `${req.body.sub}`,
                "imageUrl":
                `${req.body.image}`,
                "imageType": "SQUARE",
              },
              "sections": [
                {
                  "header": "Message",
                  "collapsible": false,
                  "uncollapsibleWidgetsCount": 1,
                  "widgets": [
                    {
                      "decoratedText": {
                        "startIcon": {
                          "knownIcon": "DESCRIPTION",
                        },
                        "text": `${req.body.message}`,
                      }
                    },
                  ],
                },
              ]
            },  
          },
        ],
      
  });
  
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data,
  })
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)


    
})