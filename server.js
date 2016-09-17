/* global process */
"use strict";

var express = require('express');
var app = express();

app.use(express.static('dist'));

app.listen(8080, function() {
    console.log("FRONTEND started on port " + 8080);
});
