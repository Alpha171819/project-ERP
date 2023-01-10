var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017";


router.post('/', function(req, res, next) {



    mongoClient.connect(dburl, (error, client) => {


        if (error) {
            console.log("error while connecting db")
        } else {

            var db = client.db("classRoomReservation");
            var collection = db.collection("rooms");
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