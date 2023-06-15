var express = require('express');
var mysql = require('mysql');
var http = require('http');
var app = express();
var server = http.createServer(app);
/*var fs = require("fs");*/

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

app.use(express.static('public'));

/*app.get('/index3.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index3.html" );
 })*/

// This responds with "Hello World" on the homepage
/*app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})*/

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "balcomits"
  });
  
  connectDB();


function connectDB(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Database Connected!");
      });
}


var data = [];

app.get('/ambil-data', function (req, res) {
    console.log("Get Ambil Data Called");
    
    con.query("select no, tim_regu, date_format(jadwal, '%Y-%m-%d') as 'jadwal', jam, status from jadwal_pertandingan", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });

    ///res.send(data);
 })

 app.post('/simpan-data', function (req, res) {
    var params = req.body;
     console.log("Post Simpan Data Called: " + JSON.stringify(params));

     var query = "insert into jadwal_pertandingan (tim_regu, jadwal, jam, status) values " + 
        "('" + (params.tim_regu) + "', '" + (params.jadwal) + "' , '" + (params.jam) + "', '" + (params.status) + "')";

      if(params.crud == "edit"){
        query = "update jadwal_pertandingan set " + 
          "tim_regu = '"+(params.tim_regu)+"', jadwal = '"+(params.jadwal)+"', jam = '"+(params.jam)+"', status = '"+(params.status)+"' " + 
          " where no = '"+(params.id)+"' ";
      }
     con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send({"status":1, "message":"Data Berhasil Disimpan"});
      });

      /*var d = {nrp: params.nrp, nama: params.nama};
     data.push(d);
    res.send({"status":1, "message":"Data Berhasil Disimpan"});*/
  })

 server.listen(8081, 'localhost');
 server.on('listening', function() {
     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
 });

/*var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })*/