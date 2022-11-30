var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017";

/* GET home page. */
router.get('/', function(req, res, next) {


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
                    // var arraydata = [];
                    // for (let i = 0; i < result.length; i++) {
                    //     let obj = result[i];
                    //     // console.log(obj.classroom);
                    //     arraydata[i] = obj.classroom;

                    // }


                }
                client.close();
                res.send(result);



            });


        }
    });


});

module.exports = router;