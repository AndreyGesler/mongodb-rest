const express = require('express');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://kassandra_api:kassandra_api@172.16.3.37/kassandra_api';

MongoClient.connect(url, function (err, db) {

    console.log("[MongoClient.connect.insertOne]");

    db.db().collection('logins').insertOne({
        login: "login1",
        password: "password"
    });

    // let cursor = db.collection('logins').find();
    //
    // cursor.each(function(err, doc) {
    //
    //     console.log(doc);
    //
    // });
});

const app = express();

app.route('/login').get(async function (req, res) {
    console.log("res");
    let login = null
    MongoClient.connect(url, function (err, db) {

        if (err) throw err;

        console.log("[MongoClient.connect.find]");

        login = db.db().collection('logins').findOne(
            {
                login: "login1"
            }
        ).then(function (result) {
            if (result) {

                res.json({
                    code: "OK",
                    one: result
                });
            }
        });

        console.log(login.login);

    });
});

let server = app.listen(8081, function () {
    console.log("listen on http://localhost:8081/login");
});

