var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'toko'
});

db.connect();

app.get('/karyawan', (req, res) => {
    var sqlget = 'SELECT * FROM karyawan';
    db.query(sqlget, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});


app.post('/karyawan', (req, res) => {
    var tanggal = new Date();
    var year = tanggal.getFullYear();

    var datadump = {
        nama: req.body.nama,
        tglLahir: req.body.tglLahir
    }
    var name = datadump.nama
    var tgl = datadump.tglLahir.split("-")


    function zodiacSign(day, month) {

        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            var bintang = "capricorn"
            return bintang;
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            var bintang = "aquarius"
            return bintang;
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            var bintang = "pisces"
            return bintang;
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            var bintang = "aries"
            return bintang;
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            var bintang = "taurus"
            return bintang;
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            var bintang = "gemini"
            return bintang;
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            var bintang = "cancer"
            return bintang;
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            var bintang = "leo"
            return bintang;
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            var bintang = "virgo"
            return bintang;
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            var bintang = "libra"
            return bintang;
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            var bintang = "scorpio"
            return bintang;
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            var bintang = "sagittarius"
            return bintang;
        }
    }

    var birtday = year - tgl[2];

    var data1 = {
        nama: name,
        hari: tgl[0],
        bulan: tgl[1],
        tahun: tgl[2],
        zodiak: zodiacSign(tgl[0], tgl[1]),
        usia: birtday
    }
    var sqlup = 'insert into karyawan set ?';
    db.query(sqlup, data1, (err, result) => {
        if (err) throw err;
        console.log(data1);
        res.send({
            status: 'Post berhasil',
            nama: name,
            hari: tgl[0],
            bulan: tgl[1],
            tahun: tgl[2],
            zodiak: zodiacSign(tgl[0], tgl[1]),
            usia: birtday
        })
    });
});


app.listen(3000, () => {
    console.log('Server @port 3000')
});