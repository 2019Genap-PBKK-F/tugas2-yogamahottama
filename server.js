const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = '10.199.14.46';
const port = 8028;

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
app.use(bodyParser.json())

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

app.get("/",function(req, res)
{
  res.end('Hello World');
});

app.get("/api/Mahasiswa", function(req, res)
{
  var query = "select * from Mahasiswa";
  executeQuery(res, query, null, 0);
});

app.get("/api/DataDasar", function(req, res)
{
  var query = "select * from DataDasar";
  executeQuery(res, query, null, 0);
});

app.get("/api/KategoriUnit", function(req, res)
{
  var query = "select * from KategoriUnit";
  executeQuery(res, query, null, 0);
});

app.get("/api/Unit", function(req, res)
{
  var query = "select * from Unit";
  executeQuery(res, query, null, 0);
});

app.get("/api/Capaian_Unit", function(req, res)
{
  var query = "select * from Capaian_Unit";
  executeQuery(res, query, null, 0);
});

app.post("/api/Mahasiswa", function(req, res)
{
  var param = [
    { name: 'NRP', sqltype: sql.VarChar, value: req.body.NRP },
    { name: 'Nama', sqltype: sql.VarChar, value: req.body.Nama },
    { name: 'Tgl_lahir', sqltype: sql.Char, value: req.body.Tgl_lahir }
  ]

  var query = 'insert into Mahasiswa ( NRP, Nama, Tgl_lahir ) values( @NRP, @Nama, @Tgl_lahir)';
  executeQuery(res, query, param, 1)
})

app.post("/api/DataDasar", function(req, res)
{
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'insert into DataDasar ( nama ) values( @nama )';
  executeQuery(res, query, param, 1)
})

app.post("/api/KategoriUnit", function(req, res)
{
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'insert into KategoriUnit ( nama ) values( @nama )';
  executeQuery(res, query, param, 1)
})

app.post("/api/Unit", function(req, res)
{
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id }
  ]

  var query = 'insert into Unit ( nama, KategoriUnit_id ) values( @nama, @KategoriUnit_id )';
  executeQuery(res, query, param, 1)
})

app.post("/api/Capaian_Unit", function(req, res)
{
  var param = [
    { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
    { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = 'insert into Capaian_Unit ( DataDasar_id, Unit_id, waktu, capaian ) values( @DataDasar_id, @Unit_id, @waktu, @capaian )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Mahasiswa/:Id',function(req,res){
  var param = [
    { name: 'Id', sqltype: sql.Int, value: req.body.Id }, 
    { name: 'NRP', sqltype: sql.VarChar, value: req.body.NRP },
    { name: 'Nama', sqltype: sql.VarChar, value: req.body.Nama },
    { name: 'Tgl_lahir', sqltype: sql.Char, value: req.body.Tgl_lahir }
  ]

  var query = "update Mahasiswa set NRP = @NRP, Nama = @Nama, Tgl_lahir = @Tgl_lahir WHERE Id =" + req.params.Id;
  executeQuery(res,query, param, 1);
});

app.put('/api/DataDasar/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id }, 
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "update DataDasar set nama = @nama WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.put('/api/KategoriUnit/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id }, 
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "update KategoriUnit set nama = @nama WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.put('/api/Unit/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id }, 
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id }
  ]

  var query = "update Unit set nama = @nama, KategoriUnit_id = @KategoriUnit_id WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.put('/api/Capaian_Unit/:DataDasar_id&Unit_id',function(req,res){
  var param = [
    { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
    { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu }, 
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "update Capaian_Unit set DataDasar_id = @DataDasar_id, Unit_id = @Unit_id, waktu = @waktu, capaian = @capaian WHERE DataDasar_id =" + req.params.DataDasar_id + " AND Unit_id = " +req.params.Unit_id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Mahasiswa/:Id", function(req, res)
{
  var query = "delete from Mahasiswa where Id=" + req.params.Id;
  executeQuery(res, query, null, 0);
})

app.delete("/api/DataDasar/:id", function(req, res)
{
  var query = "delete from DataDasar where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

app.delete("/api/KategoriUnit/:id", function(req, res)
{
  var query = "delete from KategoriUnit where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

app.delete("/api/Unit/:id", function(req, res)
{
  var query = "delete from Unit where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

app.delete("/api/Capaian_Unit/:DataDasar_id&Unit_id", function(req, res)
{
  var query = "delete from Capaian_Unit where DataDasar_id =" + req.params.DataDasar_id + "AND Unit_id =" + req.params.Unit_id;;
  executeQuery(res, query, null, 0);
})

app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});