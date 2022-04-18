let express = require('express');
let app = express();
let port = 3000;
const fs = require('fs');
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

let dataUser = require('./db/dataUser.json'); //db json
// const { json } = require('express/lib/response');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.json());

app.get('/login', (req, res) => {
    // res.send('login');
    res.render('login.ejs')
});

app.post('/log', urlencodedParser, (req, res) => {
    // res.send('login');

    const user = req.body.user;
    const pass = req.body.pass;
    console.log(user)
    console.log(pass)

    fs.readFile('./db/dataUser.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        let dat = JSON.parse(data);
        console.log(dat[0]['key']);

        for (let a = 0; a < dat.length; a++) {
            if (user == dat[a]['user']) {
                if (pass == dat[a]['key']) {
                    // console.log("sama")
                    res.redirect('http://localhost:3000/home');
                }
            }
        }

    })
});

app.get('/home', (req, res) => {
    //res.send('home');
    res.render('home.ejs')
});

app.get('/game', (req, res) => {
    // res.send('game');
    res.render('game.ejs')
});

//baca data user
app.get('/read', (req, res) => {
    res.status(200).json(dataUser);
});

//tambah user baru
app.post('/posts/:user/:key', (req, res) => {

    const user = req.params.user;
    const key = req.params.key;

    const id = dataUser[dataUser.length - 1].id + 1
    const post = {
        id,
        user,
        key
    }

    // dataUser.push(post);
    // res.status(200).json(post);

    fs.readFile('./db/dataUser.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        let dat = JSON.parse(data);
        
        //cek apakah user telah digunakan atau belum
        for (let a = 0; a < dat.length; a++) {
            if (user == dat[a]['user']) {
                res.send("username telah digunakan");
                break;
            }else if(a == dat.length -1){
                dataUser.push(post);
                //untuk menyimpan ke file json
                fs.writeFile("./db/dataUser.json", JSON.stringify(dataUser), err => {
                    if (err) console.log("Error writing file:", err);
                });
                res.send("berhasil");

            }
        }

    });



});

app.put('/edit/:id', (req, res) => {
    let post = dataUser.find(i => i.id === +req.params.id)
    // Untuk menghindari parameter yang tidak kita inginkan
    const params = {
        user: req.body.user,
        key: req.body.key
    }
    post = {
        ...post,
        ...params
    }

    dataUser = dataUser.map(i => i.id === post.id ? post : i);
    res.status(200).json(post);

    //untuk menyimpan ke file json hasil edit data
    fs.writeFile("./db/dataUser.json", JSON.stringify(dataUser), err => {
        if (err) console.log("Error writing file:", err);
    });
});

//hapus data di db json
app.delete('/hapus/:id', (req, res) => {
    dataUser = dataUser.filter(i => i.id !== +req.params.id);
    res.status(200).json({
        message: `data dengan id ${req.params.id} telah dihapus`
    })

    //untuk menyimpan ke file json hasil edit data
    fs.writeFile("./db/dataUser.json", JSON.stringify(dataUser), err => {
        if (err) console.log("Error writing file:", err);
    });
})










app.listen(port, function () {
    console.log('server online');
})