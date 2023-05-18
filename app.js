const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const db = require('./db');
const {encrypt, decrypt} = require("./db/crypto");
const User = db.user;
const Crypto = db.crypto;

const httpServer = http.createServer( (req, res) => {
    console.log(`req: ${req.url}`);
    if (req.url === '/'){
        sendRes('index.html', 'text/html', res);
    }
    else if (req.url === '/reg-user'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            writeToDb(body, res);
        })
    }
    else if (req.url === '/login-user'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            getDb(body, res);
        })
    }
    else if (req.url === '/login-check'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            getLogin(body, res);
        })
    }
    else if (req.url === '/email-check'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            getEmail(body, res);
        })
    }
    else {
        sendRes(req.url, getContentType(req.url), res);
    }
}).listen(3000);

function sendRes(url, contentType, res){
    let file = path.join(__dirname+'/'+url);
    fs.readFile(file, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.write('File not found...');
            res.end();
            console.log(`error ${file}`);
        }
        else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(content);
            res.end();
        }
    })
}

function getContentType(url) {
    switch (path.extname(url)) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".png":
            return "image/png";1
    }
}

function writeToDb(data, res) {
    data = JSON.parse(data, true);
    password = encrypt(data['password'])
    User.create({
        login: data['login'],
        email: data['email'],
        password: password.iv + password.content,
    })
        .then(result => {
            console.log(result)
            res.end('Successfully registered!');
        }).catch(err => {
            console.log(err);
            res.end('error');
    })
}

function getDb(data, res) {
    data = JSON.parse(data, true);
    User.findAll({
        where: {
            login: data['login'],
        }
    })
        .then(result => {
            console.log(result)
            console.log(result.user)
            if (result != null) {
                res.end('ok');
            }
            else {
                res.end('not');
            }
        }).catch(err => {
        console.log(err);
        res.end('error');
    })
}

function getLogin(data, res) {
    console.log(data)
    User.findOne({
        where: {
            login: data,
        }
    })
        .then(result => {
            console.log(result)
            if (result != null) {
                res.end('ok');
            }
            else {
                res.end('not');
            }
        }).catch(err => {
        console.log(err);
        res.end('error');
    })
}

function getEmail(data, res) {
    console.log(data)
    User.findOne({
        where: {
            email: data,
        }
    })
        .then(result => {
            console.log(result)
            if (result != null) {
                res.end('ok');
            }
            else {
                res.end('not');
            }
        }).catch(err => {
        console.log(err);
        res.end('error');
    })
}

text = 'huesosi'
text1 = encrypt(text)
console.log(text1)
text = text1.iv + text1.content
console.log(text)
text2 = {
    iv: text.slice(0, 32),
    content: text.slice(32)
}
console.log(text2)

