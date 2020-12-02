var express = require('express');
var app = new express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');

// express middlewares
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.use('/resources', express.static(__dirname + '/dist/resources'));
app.use('/favicon', express.static(__dirname + '/dist/favicon'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/dist/" + "index.html");
});

app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + "/dist/" + "index.js");
});

app.listen( process.env.PORT || 5000, () => {
    console.log('listening on 5000');
});
