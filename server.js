/**
 * Created by Mortoni on 19/11/13.
 */
var config = require('./config.js');
var request = require('request');
var express = require('express');
var cors = require('cors');
var app = express();
var fs = require("fs");
var http = require('http').Server(app);
var io = require('socket.io')(http);

var portNo = config.port;

var bodyParser = require("body-parser");

//=======================
// web server
//
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// web port
var PORT = process.env.PORT || config.port; 

//=======================
// read data
//
var myVar = setInterval(function(){ myTimer() },  config.polltime * 1000);


//
//=======================
// Initialize the app.
//
    var server = app.listen(PORT, function () {
        console.log("App now running on port", PORT);
    });

    // io.sockets.on('connection', function (socket) {
    //     socket.emit('news', { hello: 'world' });
    //     socket.on('dataIn', function (data) {
    //         console.log(data);
    //     /*
    //     Handle commands here...
    //     */
    //     });
    // });

function myTimer() {
    feed = config.feeds[0];

    request({
        url: feed.url, //URL to hit
        qs: {from: 'feed example', time: +new Date()}, //Query string data
        method: 'GET', //Specify the method
        headers: { //We can define headers too
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value'
        }
    }, function(error, response, body){
        // console.log("...returned", error);
        if(error) {
            console.log("Feed err: ", error);
        } else {
            if (response.statusCode !== 200) {
                console.log("Status code: ", response.statusCode);
            } else {
                var feed = JSON.parse(body);
                var nevernodata = {
                    date: new Date(),
                    tweets: []
                }
           //     console.log("?", Object.keys(feed.entries).length);
                count = Object.keys(feed.entries).length;
                for(var key in feed.entries) {
                    var tweet = {};
                    tweet.full_name = feed.entries[key].full_name;
                    tweet.nickname = feed.entries[key].nickname;
                    tweet.message = feed.entries[key].message;
                    tweet.profile_image = feed.entries[key].profile_image;
                    nevernodata.tweets.push(tweet);
                }
                fs.writeFile('./public/tweets.json', JSON.stringify(nevernodata), function (err) {
                    if (err) return console.log(err);
                });  

              // write to file
                fs.writeFile('./public/neverno.json', body, function (err) {
                    if (err) return console.log(err);
                });

            }
        }
    });
};
