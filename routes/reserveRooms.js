var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017";

/* GET home page. */
router.get('/', function(req, res, next) {
    var clsinfo = req.query;
    console.log(clsinfo);


    mongoClient.connect(dburl, (error, client) => {


        if (error) {
            console.log("error while connecting db")
        } else {

            var db = client.db("checkRooms");
            var collection = db.collection("waiting");
            collection.insertOne(req.query, (error) => {
                if (error) {
                    console.log("error in collection");
                } else {
                    console.log("data inserted");

                }
                collection.find().toArray((error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                    }
                    client.close();
                    res.send(result);

                });




            })



        }





    });


});
router.post('/', function(req, res, next) {



    mongoClient.connect(dburl, (error, client) => {


        if (error) {
            console.log("error while connecting db")
        } else {

            var db = client.db("checkRooms");
            var collection = db.collection("waiting");
            collection.find().toArray((error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result)
                }
                client.close();
                res.send(result);



            });



        }





    });


});


module.exports = router;