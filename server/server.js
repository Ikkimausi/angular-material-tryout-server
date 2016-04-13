'use strict'

let http = require('http');
let express = require('express');
let app = express();

app.listen(process.env.PORT || 3001);

let mongoUtil = require("./util/mongoUtil");
mongoUtil.connect();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
	next();
});

app.use('/api/cats', require('./cats/catRoute'));