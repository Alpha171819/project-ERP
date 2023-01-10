var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017";

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log(req.query)
    mongoClient.connect(dburl, (error, client) => {


        if (error) {
            console.log("error while connecting db")
        } else {

            var db = client.db("classRoomReservation");
            var collection = db.collection("rooms");
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



    mongoClient.connect(dburl, (error, client) => {


        if (error) {
            console.log("error while connecting db")
        } else {

            var db = client.db("classRoomReservation");
            var collection = db.collection("rooms");
            collection.deleteMany((error) => {
                if (error) {
                    console.log("error in deleting collection");
                } else {
                    console.log("data deleted");

                }

                client.close();

            });



        }





    });


});



module.exports = router;