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
  res.sendFile(__dirname + '/index.html')
});

////////\\\\\\\
/////Abmas\\\\\
app.get("/api/Abmas", function(req, res)
{
  var query = "select * from Abmas";
  executeQuery(res, query, null, 0);
});

////////\\\\\\\
/////Dosen\\\\\
app.get("/api/Dosen", function(req, res)
{
  var query = "select * from Dosen";
  executeQuery(res, query, null, 0);
});

////////\\\\\\\\\\\
/////Penelitian\\\\\
app.get("/api/Penelitian", function(req, res)
{
  var query = "select * from Penelitian";
  executeQuery(res, query, null, 0);
});

////////\\\\\\\\\\
/////Publikasi\\\\\
app.get("/api/Publikasi", function(req, res)
{
  var query = "select * from Publikasi";
  executeQuery(res, query, null, 0);
});

////////\\\\\\\\\\
/////Aspek\\\\\\\\
app.get("/api/Aspek", function(req, res)
{
  var query = "select * from Aspek";
  executeQuery(res, query, null, 0);
});

app.post("/api/Aspek", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
  ]

  var query = 'insert into Aspek ( aspek, komponen_aspek ) values( @aspek, @komponen_aspek )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Aspek/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
  ]

  var query = "update Aspek set aspek = @aspek, komponen_aspek = @komponen_aspek WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Aspek/:id", function(req, res)
{
  var query = "delete from Aspek where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

////////\\\\\\\\\\\\\
/////DataDasar\\\\\\\\
app.get("/api/DataDasar", function(req, res)
{
  var query = "select * from DataDasar";
  executeQuery(res, query, null, 0);
});

app.post("/api/DataDasar", function(req, res)
{
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.VarChar, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.VarChar, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date ) values( @nama, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/DataDasar/:id',function(req,res){
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = "update DataDasar set nama = @nama, create_date = @create_date, last_update = @last_update, expired_date = @expired_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/DataDasar/:id", function(req, res)
{
  var query = "delete from DataDasar where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\
/////MasterIndikator\\\\\\\\
app.get("/api/MasterIndikator", function(req, res)
{
  var query = "select * from MasterIndikator";
  executeQuery(res, query, null, 0);
});

app.post("/api/MasterIndikator", function(req, res)
{
  var param = [
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = 'insert into MasterIndikator ( id_aspek, id_penyebut, id_pembilang, nama, deskripsi, default_bobot, create_date, last_update, expired_date ) values( @id_aspek, @id_penyebut, @id_pembilang, @nama, @deskripsi, @default_bobot, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/MasterIndikator/:id',function(req,res){
  var param = [
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = "update MasterIndikator set id_aspek = @id_aspek, id_penyebut = @id_penyebut, id_pembilang = @id_pembilang, nama = @nama, deskripsi = @deskripsi, default_bobot = @default_bobot, create_date = @create_date, last_update = @last_update, expired_date = @expired_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/MasterIndikator/:id", function(req, res)
{
  var query = "delete from MasterIndikator where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\
/////CapaianUnit\\\\\\\\\\\
app.get("/api/Capaian_Unit", function(req, res)
{
  var query = "select * from Capaian_Unit";
  executeQuery(res, query, null, 0);
});

app.post("/api/Capaian_Unit", function(req, res)
{
  var param = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'waktu', sqltype: sql.Char, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capai },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = 'insert into Capaian_Unit ( id_satker, id_datadasar, waktu, capaian ) values( @id_satker, @id_datadasar, @waktu, @capaian )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Capaian_Unit/:id',function(req,res){
  var param = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'waktu', sqltype: sql.Char, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capai },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = "update Capaian_Unit set id_satker = @id_satker, id_datadasar = @id_datadasar, waktu = @waktu, capaian = @capaian WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Capaian_Unit/:id", function(req, res)
{
  var query = "delete from Capaian_Unit where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\
//////////Periode\\\\\\\\\\
app.get("/api/Periode", function(req, res)
{
  var query = "select * from Periode";
  executeQuery(res, query, null, 0);
});

app.post("/api/Periode", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update }
  ]

  var query = 'insert into Periode ( nama, create_date, last_update ) values( @nama, @create_date, @last_update )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Periode/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update }
  ]

  var query = "update Periode set nama = @nama, create_date = @create_date, last_update = @last_update WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Periode/:id", function(req, res)
{
  var query = "delete from Periode where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\\\\\\\\\
//////////IndikatorPeriode\\\\\\\\\\
app.get("/api/Indikator_Periode", function(req, res)
{
  var query = "select * from Indikator_Periode";
  executeQuery(res, query, null, 0);
});

app.post("/api/Indikator_Periode", function(req, res)
{
  var param = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobo },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = 'insert into Indikator_Periode ( id_master, id_periode, bobot) values( @id_master, @id_periode, @bobot)';
  executeQuery(res, query, param, 1)
})

app.put('/api/Indikator_Periode/:id',function(req,res){
  var param = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]
  
  var query = "update Indikator_Periode set id_master = @id_master, id_periode = @id_periode, bobot = @bobot WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Indikator_Periode/:id", function(req, res)
{
  var query = "delete from Indikator_Periode where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\\\\\\\\\
//////////IndikatorSatker\\\\\\\\\\
app.get("/api/Indikator_SatuanKerja", function(req, res)
{
  var query = "select * from Indikator_SatuanKerja";
  executeQuery(res, query, null, 0);
});

app.get("/api/Indikator_SatuanKerja/:id", function(req, res)
{
    var query = "select * from Indikator_SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

app.post("/api/Indikator_SatuanKerja", function(req, res)
{
  var param = [
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bob },
    { name: 'target', sqltype: sql.Float, value: req.body.tar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.cap },
    { name: 'last_update', sqltype: sql.VarChar, value: req.body.last_update },
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'persentase', value: req.body.persentase }
  ]

  var query = 'insert into Indikator_SatuanKerja ( id_indikator_periode, id_satker, bobot, target, capaian, last_update, persentase ) values( @id_indikator_periode, @id_satker, @bobot, @target, @capaian, @last_update, @persentase )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Indikator_SatuanKerja/:id',function(req,res){
  var param = [
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'target', sqltype: sql.Float, value: req.body.target },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'persentase', value: req.body.persentase }
  ]
  
  var query = "update Indikator_SatuanKerja set id_indikator_periode = @id_indikator_periode, id_satker = @id_satker, bobot = @bobot, target = @target, capaian = @capaian, last_update = @last_update, persentase = @persentase WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Indikator_SatuanKerja/:id", function(req, res)
{
  var query = "delete from Indikator_SatuanKerja where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\\\\\\\\\
//////////IndikatorSatkerLog\\\\\\\\\\
app.get("/api/Indikator_SatuanKerja_Log", function(req, res)
{
  var query = "select * from Indikator_SatuanKerja_Log";
  executeQuery(res, query, null, 0);
});

app.post("/api/Indikator_SatuanKerja_Log", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capai },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create }
  ]

  var query = 'insert into Indikator_SatuanKerja_Log ( id_satker, id_master, id_periode, capaian, create_date ) values( @id_satker, @id_master, @id_periode, @capaian, @create_date )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Indikator_SatuanKerja_Log/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capai },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create }
  ]

  var query = "update Indikator_SatuanKerja_Log set id_satker = @id_satker, id_master = @id_master, id_periode = @id_periode, capaian = @capaian, create_date = @create_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Indikator_SatuanKerja_Log/:id", function(req, res)
{
  var query = "delete from Indikator_SatuanKerja_Log where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\\\\\\\\\
//////////JenisSatker\\\\\\\\\\\\\\
app.get("/api/JenisSatker", function(req, res)
{
  var query = "select * from JenisSatker";
  executeQuery(res, query, null, 0);
});

app.post("/api/JenisSatker", function(req, res)
{
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]
  
  var query = 'insert into JenisSatker ( nama, create_date, last_update, expired_date ) values( @nama, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/JenisSatker/:id',function(req,res){
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date },
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = "update JenisSatker set nama = @nama, create_date= @create_date, last_update = @last_update, expired_date = @expired_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/JenisSatker/:id", function(req, res)
{
  var query = "delete from JenisSatker where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\\\\\\\\\
//////////SatuanKerja\\\\\\\\\\\\\\
app.get("/api/SatuanKerja", function(req, res)
{
  var query = "select * from SatuanKerja";
  executeQuery(res, query, null, 0);
});

app.get("/api/SatuanKerja/nama", function(req, res)
{
  var query = "SELECT distinct SatuanKerja.id,SatuanKerja.nama from SatuanKerja inner join Indikator_SatuanKerja on SatuanKerja.id=Indikator_SatuanKerja.id_satker"
  executeQuery(res, query, null, 0);
});

app.get("/api/SatuanKerja/nama/:id", function(req, res)
{
    var query = "SELECT distinct sk1.id,sk1.nama from SatuanKerja as sk1 inner join Indikator_SatuanKerja on sk1.id=Indikator_SatuanKerja.id_satker WHERE sk1.id='" + req.params.id + "' OR sk1.id_induk_satker='" + req.params.id + "'"
    executeQuery(res, query, null, 0);
});

app.get("/api/SatuanKerja/:id", function(req, res)
{
    var query = "select * from SatuanKerja where id='" + req.params.id + "'";
    executeQuery(res, query, null, 0);
});

app.post("/api/SatuanKerja", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.VarChar, value: req.body.id },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'level_unit', sqltype: sql.Int, value: req.body.level_unit },
    { name: 'create_date', sqltype: sql.VarChar, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.VarChar, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'id_sk', sqltype: sql.Int, value: req.body.id_sk }
  ]
  
  var query = 'insert into SatuanKerja ( id, id_jns_satker, id_induk_satker, nama, level_unit, create_date, last_update, expired_date, email ) values( @id, @id_jns_satker, @id_induk_satker, @nama, @level_unit, @create_date, @last_update, @expired_date, @email )';
  executeQuery(res, query, param, 1)
})

app.put('/api/SatuanKerja/:id_sk',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.VarChar, value: req.body.id },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'level_unit', sqltype: sql.VarChar, value: req.body.level_unit },
    { name: 'create_date', sqltype: sql.VarChar, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.VarChar, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'id_sk', sqltype: sql.Int, value: req.body.id_sk }
  ]

  var query = "update SatuanKerja set id = @id, id_jns_satker = @id_jns_satker, id_induk_satker = @id_induk_satker, nama = @nama, level_unit = @level_unit, create_date = @create_date, last_update = @last_update, expired_date = @expired_date, email = @email WHERE id_sk ='" + req.params.id_sk + "'";
  executeQuery(res,query, param, 1);
});

app.delete("/api/SatuanKerja/:id_sk", function(req, res)
{
  var query = "delete from SatuanKerja where id_sk='" + req.params.id_sk + "'";
  executeQuery(res, query, null, 0);
})

//////////////\\\\\\\\\\\\\\\\\\\\\
//////////KonKin\\\\\\\\\\\\\\\\\\\
app.get("/api/konkin/:id", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot, isk.target, isk.capaian, isk.persentase as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id where isk.id_satker='"+req.params.id+"'";
    executeQuery(res, query, null, 0);
});

app.get("/api/konkin/", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot, isk.target, isk.capaian, isk.persentase as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id";
    executeQuery(res, query, null, 0);
});

app.get("/api/konkin/special/:id", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot, isk.target, isk.capaian, isk.persentase as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id INNER JOIN SatuanKerja AS sk ON sk.id=isk.id_satker where isk.id_satker='"+req.params.id+"' OR sk.id_induk_satker='"+req.params.id+"'";
    executeQuery(res, query, null, 0);
});

//////////////\\\\\\\\\\\\\\\\\\\\\
//////////Login\\\\\\\\\\\\\\\\\\\
app.get('/auth/login/:email', function(req, res)
{
  var model = [
    { name: 'email', sqltype: sql.VarChar, value: req.params.email }
  ]
  var query = 'select id, nama, email from SatuanKerja where email = @email'

  executeQuery(res, query, model, 1)
})

app.listen(port, function () {
    var message = "Server runnning on Port: " + port;
    console.log(message);
  });