'use strict';

const functions = require('firebase-functions');
const request = require('request');
const express = require('express');
const cors = require('cors');
const app = express();

// var issue2options = {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

// app.options('*', cors(issue2options))

// app.use(function (req, res, next) {
//     console.log("in da app");
    
//     res.header("Access-Control-Allow-Origin", "https://giphy-96d84.firebaseapp.com");
//     // res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Max-Age", "3600");

//     next();
// });

app.get('*', function (req, res){
  
    // var url = 'https://api.giphy.com/v1/gifs/search?api_key=0fnyoCvqyVDJ2ZYwpVxiwY7Nz30NbOCp&q=peaches&limit=5&offset=0&rating=R&lang=en';
    // var url ='https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD7MnBy2zwOaAae-t7pyI2fbgR1aTiMuAs';

    // request
    // .get(url)
    // .on('response', function(response) {
    //   console.log(response.statusCode) // 200
    //   console.log(response.headers['content-type']) // 'image/png'
    //   console.log(response);
    //   console.log("response.body");
    //   console.log(response.body);
    // })
    res.send("response");
});

exports.hello = functions.https.onRequest(app);