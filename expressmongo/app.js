const express = require('express');
const app = express();

var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://admin:12345@localhost:27017/expmongo';

const os = require('os');

app.get('/data', (req,res)=>{
    mongodb.connect(url, (err,db)=>{
        var collection = db.collection('user');
        collection.find({}).toArray((err, docs)=>{
            console.log(docs);
            res.send(docs);
        });
    });
});

app.post('/data', (req, res) => {
    mongodb.connect(url, (err, db) => {
        var nCPU = os.hostname();
        var osTipe = os.type();
        var osPlatform = os.platform();
        var osRilis = os.release();
        var Sisa = os.freemem();
        var Total = os.totalmem();
        var data = {
            namacpu: nCPU,
            tipe: osTipe,
            platform: osPlatform,
            rilis: osRilis,
            ramSisa: Sisa,
            ramTotal: Total
        };
        var collec = db.collection('user');
        collec.insert(data, (err, docs) => {
            console.log(docs);
            res.send({
                status: 'Post berhasil',
                namacpu: nCPU,
                tipe: osTipe,
                platform: osPlatform,
                rilis: osRilis,
                ramSisa: Sisa,
                ramTotal: Total

            });
        });
    });
});

app.listen(3000, () => {
    console.log('Server @port 3000')
});