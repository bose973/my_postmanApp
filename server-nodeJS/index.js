const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs =require("fs");
const path =require("path");
const http = require('http');


http.globalAgent.options.ca = fs.readFileSync(
  "C:/Users/AL03988/OneDrive - Elevance Health/Desktop/usecase/server-nodeJS/certs/root.pem"
);
// const dbo = require('./db/conn')



const app = express();
app.use(express.json({ limit: "25mb" }));

app.use(cors({ origin: '*' }))

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/py', function(req, res) {
  const msg ={"info":"this is /py API"}
  res.json(msg.info)     
});

app.get('/python', function(req, res) {
  const msg ={"info":"this is /python API"}
  res.json(msg.info) 
});

app.post('/test',function(req,res){
  let obj=req.headers;
  
  
  req.headers=obj;
  request.post({
      url:'http://sl01plpchd024.wellpoint.com:4201/v2/api/eds/batch',
      // headers :JSON.stringify(req.headers),
      headers: req.headers,
      body:JSON.stringify(req.body.body)
     }, function (error, response, body) {
      console.log(error)
      console.log(body)
      // console.log(req.headers)
     
      res.json(body)
    });
})




app.post('/fordb',function(req,response){
  let db_connect=dbo.getDb("stars-dev")
  db_connect.collection("batch_api_user_coll").insertOne(req.body.body,function(err,res){
    if(err) throw err;
    response.json(res);
  })
})


app.post('/py', function(req, res) {
  request('http://127.0.0.1:5000/pyt', function (error, response, body) {
      console.error('error:', error); // Print the error
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the data received
      res.json(body); //Display the response on the website
    });      
});



app.get("/api", (req, res) => {
    value={ "message": "Hello from server!" }
    res.json(value.message);
    
  });

app.post("/bodyCheck",(req,res)=>{
  console.log(req.body)
  res.json(req.body.body)
})

app.get('/scheduler', function(req, res) {
  request('http://127.0.0.1:5000/scheduler', function (error, response, body) {
      console.error('error:', error); // Print the error
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the data received
      res.json(body); //Display the response on the website
    });      
});

const sslOptions = {
  cert: fs.readFileSync(path.resolve(__dirname, './certs/app.crt')),
  key: fs.readFileSync(path.resolve(__dirname, './certs/app.key'))
};



const server = http.createServer(sslOptions, app);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



// 'Access-Control-Allow-Origin': '*',
// app.get('/py', function(req, res) {
  // request('http://127.0.0.1:5000/py', function (error, response, body) {
  //     console.error('error:', error); // Print the error
  //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //     console.log('body:', body); // Print the data received
  //     res.json(body); //Display the response on the website
  //   });      
// });

// app.get('/python', function(req, res) {
//   request('http://127.0.0.1:5000/python', function (error, response, body) {
//       console.error('error:', error); // Print the error
//       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//       console.log('body:', body); // Print the data received
//       res.json(body); //Display the response on the website
//     });      
// });

// app.post('/test',function(req,res){
//   request.post({
//       url:'https://sit-dsmbrsvc.anthem.com/dsstarsai/v2/api/eds/batch',
//       headers :{ 
//         "Content-Type":"application/json",
//         "requesterId":"abrasion_medicare"
//       },
//       body:JSON.stringify(req.body.body)
//      }, function (error, response, body) {
//       console.log(error)
//       console.log(body)
//       console.log(req.body.body)
//       res.json(body)
//     });
// })

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", `${window.location.protocol}//${window.location.hostname}`); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
