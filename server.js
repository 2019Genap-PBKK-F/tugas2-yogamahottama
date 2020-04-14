var express = require('express');
var app = express();
var sql = require('mssql');
//Load HTTP module
const http = require("http");
const hostname = '10.199.14.46';
//const hostname = 'localhost';
const port = 8028;

app.use(cors())
app.options('*', cors());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
  user: 'sa',
  password: 'SaSa1212',
  server: '10.199.13.253',
  database: 'nrp05111740000159'
};

var executeQuery = function(res, query, param, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        param.forEach(function(p)
        {
          request.input(p.name, p.sqltype, p.value);
        });
      }
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          res.send(response.recordset)
        }
      })
    }
  })
}

//ROOT
app.get("/",function(req, res)
{
  res.sendFile(__dirname + '/index.html')
});

//API MAHASISWA
app.get("/api/mahasiswa", function(req, res)
{
  var query = "select * from mahasiswa";
  executeQuery(res, query, null, 0);
});

app.post("/api/mahasiswa", function(req, res)
{
  var param = [
    { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
    { name: 'jk', sqltype: sql.VarChar, value: req.body.jk },
    { name: 'tgl', sqltype: sql.Char, value: req.body.tgl },
    { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
    { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif}
  ]
  var query = 'insert into mahasiswa ( nrp, nama, angkatan, jk, tgl, foto, aktif ) values ( @nrp, @nama, @angkatan, @jk, @tgl, @foto, @aktif)';
  executeQuery(res, query, param, 1)
})

app.put('/api/mahasiswa/:id',function(req,res){
    var param = [
        { name: 'id', sqltype: sql.Int, value: req.body.id }, 
        { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
        { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
        { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
        { name: 'jk', sqltype: sql.VarChar, value: req.body.jk },
        { name: 'tgl', sqltype: sql.Char, value: req.body.tgl },
        { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
        { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif }
    ]
    
    var query = "update mahasiswa set nama = @nama, nrp = @nrp, angkatan = @angkatan, jk = @jk, tgl = @tgl, foto = @foto, aktif = @aktif WHERE id = @id";
    executeQuery(res,query, param, 1);
});

app.delete("/api/mahasiswa/:id", function(req, res)
{
    var query = "delete from mahasiswa where id=" + req.params.id;
    executeQuery(res, query, null, 0);
})

//API DATADASAR
app.get("/api/DataDasar", function (req, res) {
  var qr = "select id, nama as name from DataDasar";
  query(res, qr, null);
});

app.get("/api/DataDasar/:id", cors(), function (req, res) {
  var qr = "select * from DataDasar where id = " + req.params.id;
  query(res, qr, null);
});

app.post('/api/DataDasar',function(req,res){
  var param = [
     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]
   
   var qr = "insert into DataDasar (nama) values (@nama);"
   query(res, qr, param);
})

app.put('/api/DataDasar/:id', cors(),function(req,res){
  var param = [
     { name: 'id', sqltype: sql.Int, value: req.params.id },
     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
   //console.log(param)
   var qr = "update DataDasar set nama = @nama WHERE id = @id;"
   query(res, qr, param);
})

app.delete('/api/DataDasar/:id', function (req, res, next) {
  var qr = "delete from DataDasar where id=" + req.params.id;
  query(res, qr, null);
})

//API KATEGORI UNIT
app.get("/api/KategoriUnit", function (req, res) {
  var qr = "select id, nama as name from KategoriUnit";
  query(res, qr, null);
});

app.get("/api/KategoriUnit/:id", cors(), function (req, res) {
  var qr = "select * from KategoriUnit where id = " + req.params.id;
  query(res, qr, null);
});

app.post('/api/KategoriUnit',function(req,res){
  var param = [
     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]
   var qr = "insert into KategoriUnit (nama) values (@nama);"
   query(res, qr, param);
})

app.put('/api/KategoriUnit/:id', cors(),function(req,res){
  var param = [
     { name: 'id', sqltype: sql.Int, value: req.params.id },
     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
   var qr = "update KategoriUnit set nama = @nama WHERE id = @id;"
   query(res, qr, param);
})

app.delete('/api/KategoriUnit/:id', function (req, res, next) {
  var qr = "delete from KategoriUnit where id=" + req.params.id;
  query(res, qr, null);
})

//API UNIT
app.get("/api/Unit", function (req, res) {
  var qr = "select * from Unit";
  query(res, qr, null);
});

app.get("/api/Unit/:id", cors(), function (req, res) {
  var qr = "select * from Unit where id = " + req.params.id;
  query(res, qr, null);
});

app.get("/api/NamaUnit", cors(), function (req, res) {
  var qr = "select id, nama as name from Unit";
  query(res, qr, null);
});

app.post('/api/Unit',function(req,res){
  var param = [
     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
     { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id }
  ]
   var qr = "insert into Unit (nama, KategoriUnit_id) values (@nama, @KategoriUnit_id);"
   query(res, qr, param);
})

app.put('/api/Unit/:id', cors(),function(req,res){
  var param = [
     { name: 'id', sqltype: sql.Int, value: req.params.id },
     { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
     { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id }
   ]
   var qr = "update Unit set KategoriUnit_id = @KategoriUnit_id, nama = @nama WHERE id = @id;"
   query(res, qr, param);
})

app.delete('/api/Unit/:id', function (req, res, next) {
  var qr = "delete from Unit where id=" + req.params.id;
  query(res, qr, null);
})

//API CAPAIAN UNIT
app.get("/api/Capaian_Unit", function (req, res) {
  var qr = "select * from Capaian_Unit";
  query(res, qr, null);
});

app.get("/api/Capaian_Unit/:DataDasar_id&:Unit_id", cors(), function (req, res) {
  var qr = "select * from Capaian_Unit where DataDasar_id = " + req.params.data_id + " AND Unit_id = " + req.params.unit_id;
  query(res, qr, null);
});

app.post("/api/Capaian_Unit", function(req, res)
{
  var param = [
    { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
    //{ name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = 'insert into Capaian_Unit ( DataDasar_id, Unit_id, waktu, capaian ) values( @DataDasar_id, @Unit_id, @waktu, @capaian )';
  query(res, qr, param);
})

app.put('/api/Capaian_Unit/:DataDasar_id&:Unit_id', cors(),function(req,res){
  var param = [
     { name: 'DataDasar_id_old', sqltype: sql.Int, value: req.params.data_id },
     { name: 'Unit_id_old', sqltype: sql.Int, value: req.params.unit_id },
     { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
     { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
     { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
     { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
   ]
   //console.log(param)
   var qr = "update Capaian_Unit set waktu = @waktu, capaian = @capaian, DataDasar_id = @DataDasar_id, Unit_id = @Unit_id WHERE DataDasar_id = @DataDasar_id_old AND Unit_id = @Unit_id_old ;"
   query(res, qr, param);
})

app.delete("/api/Capaian_Unit/:DataDasar_id&Unit_id", function(req, res)
{
  var query = "delete from Capaian_Unit where DataDasar_id =" + req.params.DataDasar_id + "AND Unit_id =" + req.params.Unit_id;;
  executeQuery(res, query, null, 0);
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});