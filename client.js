var express = require('express');
var app = express();
/*var fs = require("fs");*/

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));