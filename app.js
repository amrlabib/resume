var express = require('express');
var app = new express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');


app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//express middlewares
app.use('/resources', express.static(__dirname + '/dist/resources'));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/dist/" + "index.html");
});



// Start Node server on Port 3000
app.listen( process.env.PORT || 5000, () => {
    console.log('listening on 5000');
});
