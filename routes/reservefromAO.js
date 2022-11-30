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
            var collection = db.collection("storeRooms");
            collection.insertOne(req.query, (error) => {
                if (error) {
                    console.log("error in collection");
                } else {
                    console.log("data inserted");

                }

                client.close();

            })


        }





    });


});
router.post('/', function(req, res, next) {
    var clsinfo = req.body;
    console.log(clsinfo);


    mongoClient.connect(dburl, (error, client) => {


        if (error) {
            console.log("error while connecting db")
        } else {

            var db = client.db("checkRooms");
            var collection = db.collection("waiting");
            collection.deleteOne({ date: req.body.date, month: req.body.month, year: req.body.year, periodNumber: req.body.periodNumber, choice: req.body.choice }, (error) => {
                if (error) {
                    console.log("error in deleting data");
                } else {
                    console.log("data deleted");

                }

                client.close();

            })


        }





    });


});

module.exports = router;