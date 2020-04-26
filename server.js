const express = require("express")
const app = express()
const sql = require('mssql')
//const hostname = 'localhost'
const hostname = '10.199.14.46';
const port = 8028;

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, *");
  next()
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const config = {
    user: 'sa',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000159'
}

var executeQuery = function(res, query, model, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        model.forEach(function(m)
        {
          request.input(m.name, m.sqltype, m.value)
        })
      }
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          // console.log(response.recordset)
          res.send(response.recordset)
        }
     })
    }
  })
}

////////////////////////\\\\\\\\\\\\\\\\\\\\\\\
///////////////////Data Dasar\\\\\\\\\\\\\\\\\\

//Select
app.get("/api/datadasar/", function(req, res)
{
   var query = "select * from DataDasar"
   executeQuery(res, query, null, 0)
})

app.get("/api/datadasar/nama", function(req, res)
{
   var query = 'select id,nama as name from DataDasar'
   executeQuery(res, query, null, 0)
})

app.get("/api/datadasar/:id",function(req, res)
{
   var query = "select * from DataDasar where id=" + req.params.id
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/datadasar/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date )' + 'values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date )'
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/datadasar/:id", function(req, res) {
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = 'update DataDasar set nama = @nama, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date where id = @id'
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/datadasar/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
   ]

   var query = "delete from DataDasar where id = @id"
   executeQuery(res, query, model, 1)
})

//Jenis SatKer 

app.get("/api/jenissatker/", function(req, res)
{
    var query = "select * from JenisSatker"
    executeQuery(res, query, null, 0)
})

app.post("/api/jenissatker/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into JenisSatker ( id, nama, create_date, last_update, expired_date ) values( @id, @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date ))'
  executeQuery(res, query, model, 1)
})

app.put("/api/jenissatker/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = "update JenisSatker set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id" 
  executeQuery(res, query, model, 1)
})

app.delete("/api/jenissatker/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.params.id }
  ]

  var query = "delete from Jenis_Satker where id = @id" 
  executeQuery(res, query, model, 1)
})

//Periode

app.get("/api/periode/", function(req, res)
{
    var query = "select * from Periode"
    executeQuery(res, query, null, 0)
})

app.post("/api/periode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = "insert into Periode values ( @id, @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP"
  executeQuery(res, query, model, 1)
})

app.put("/api/periode/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "update Periode set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id" 
  executeQuery(res, query, model, 1)
})

app.delete("/api/periode/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.params.id }
  ]

  var query = "delete from Periode where id = @id"
  executeQuery(res, query, model, 1)
})

//Master Indikator

app.get("/api/masterindikator/", function(req, res)
{
  var query = "select * from MasterIndikator"
  executeQuery(res, query, null, 0)
})

app.post("/api/masterindikator/", function(req, res)
{
  var param = [
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
    { name: 'create_date', sqltype: sql.DateTime, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.DateTime, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into MasterIndikator ( id_penyebut, id_pembilang, nama, deskripsi, default_bobot, create_date, last_update, expired_date ) values( @id_penyebut, @id_pembilang, @nama, @deskripsi, @default_bobot, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put("/api/masterindikator/:id", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
    { name: 'create_date', sqltype: sql.DateTime, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.DateTime, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = "update MasterIndikator set id_penyebut = @id_penyebut, id_pembilang = @id_pembilang, nama = @nama, deskripsi = @deskripsi, default_bobot = @default_bobot, create_date = CURRENT_TIMESTAMP, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
})

app.delete("/api/masterindikator/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.params.id }
  ]
  
  var query = "delete from MasterIndikator where id = @id"
  executeQuery(res, query, model, 1)
})

//Indikator Periode

app.get("/api/indikatorperiode", function(req, res)
{
  var query = "select * from Indikator_Periode"
  executeQuery(res, query, null, 0)
})

app.post("/api/indikatorperiode", function(req, res)
{
  var model = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
  ]

  var query = "insert into Indikator_Periode values( @id_master, @id_periode, @bobot )"
  executeQuery(res, query, model, 1)
})

app.put("/api/indikatorperiode/:id&id2", function(req, res)
{
  var model = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'id', sqltype: sql.Int, value: req.params.id },
    { name: 'ide2', sqltype: sql.Numeric, value: req.params.id2 }
  ]

  var query = "update Indikator_Periode set id_master = @id_master, id_periode = @id_periode, bobot = @bobot where id_master = @id and id_peiode = @id2"
  executeQuery(res, query, model, 1)
})

app.delete("/api/indikatorperiode/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_master', sqltype: sql.Int, value: req.params.id },
    { name: 'id_periode', sqltype: sql.Numeric, value: req.params.id2 },
  ]

  var query = "delete from Indikator_Periode where id_master = @id_master and id_periode = @id_periode where id_master = @id and id_periode = @id2m"
  executeQuery(res, query, model, 1)
})

//Satuan Kerja

app.get("/api/satuankerja/", function(req, res)
{
  var query = "select * from SatuanKerja"
  executeQuery(res, query, null, 0)
})

app.post("/api/satuankerja/", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.body.id },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'create_date', sqltype: sql.DateTime, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.DateTime, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into SatuanKerja ( id, id_jns_satker, id_induk_satker, nama, email, create_date, last_update, expired_date ) values( @id, @id_jns_satker, @id_induk_satker, @nama, @email, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date )';
  executeQuery(res, query, param, 1)
})

app.put("/api/satuankerja/:id", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.body.id },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = "update SatuanKerja set id_jns_satker = @id_jns_satker, id_induk_satker = @id_induk_satker, nama = @nama, email = @email, create_date = CURRENT_TIMESTAMP, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date WHERE id ='" + req.params.id + "'";
  executeQuery(res,query, param, 1);
})

app.delete("/api/satuankerja/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.params.id }
  ]

  var query = "delete from SatuanKerja where id = @id"
  executeQuery(res, query, model, 1)
})

//Capaian Unit

app.get("/api/capaianunit/",function(req, res)
{
    var query = "select * from Capaian_Unit"
    executeQuery(res, query, null, 0)
})

app.post("/api/capaianunit/", function(req, res)
{
  var param = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'waktu', sqltype: sql.Char, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = 'insert into Capaian_Unit ( id_satker, id_datadasar, waktu, capaian ) values( @id_satker, @id_datadasar, CURRENT_TIMESTAMP, @capaian )';
  executeQuery(res, query, param, 1)
})

app.put("/api/capaianunit/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.params.id },
    { name: 'id2', sqltype: sql.Int, value: req.params.id2 }
  ]

  var query = "update Capaian_Unit set id_satker = @id_satker, id_dasar = @id_dasar, capaian = @capaian where id_satker = @id and id_datadasar = @id2"
  executeQuery(res, query, model, 1)
})

app.delete("/api/capaianunit/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.params.id },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.params.id2 }
  ]

  var query = "delete from Capaian_Unit where id_satker = @id and id_datadasar = @id2"
  executeQuery(re, query, model, 1)
})

//Indikator Satuan Kerja

app.get("/api/indikatorsatuankerja/", function(req, res)
{
  var query = "select * from Indikator_SatuanKerja"
  executeQuery(res, query, null, 0)
})

app.post("/api/indikatorsatuankerja/", function(req, res)
{
  var model = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'target', sqltype: sql.Float, value: req.body.target },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "insert into Indikator_SatuanKerja values( @id_periode, @id_master, @id_satker, @bobot, @target, @capaian, CURRENT_TIMESTAMP"
  executeQuery(res, query, model, 1)
})

app.put("/api/indikatorsatuankerja/:id&:id2&:id3", function(req, res)
{
  var model = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'target', sqltype: sql.Float, value: req.body.target },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'id', sqltype: sql.Numeric, value: req.params.id },
    { name: 'id2', sqltype: sql.Int, value: req.params.id2 },
    { name: 'id3', sqltype: sql.UniqueIdentifier, value: req.params.id3 }
  ]

  var query = "update Indikator_SatuanKerja set id_periode = @id_periode, id_master = @id_master, id_satker = @id_satker, bobot = @bobot, target = @target " +
              "capaian = @capaian, last_update = CURRENT_TIMESTAMP where id_periode = @id and id_master = @id2 and id_satker = @id3"
  executeQuery(res, query, model, 1)
})

app.delete("/api/indikatorsatuankerja/:id&:id2&:id3", function(req, res)
{
  var model = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.params.id },
    { name: 'id_master', sqltype: sql.Int, value: req.params.id2 },
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.params.id3 }
  ]

  var query = "delete from Indikator_SatuanKerja where id_periode = @id_periode and id_master = @id_master and id_satker = @id_satker"
  executeQuery(res, query, model, 1)
})

//Log Indikator Satuan Kerja

app.get("/api/logindikatorsatker", function(req, res){
  var query = "select * from Indikator_SatuanKerja_Log"
  executeQuery(res, query, null, 0)
})

//  LISTEN

app.listen(port, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});