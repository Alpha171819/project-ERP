var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017";

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query);


    mongoClient.connect(dburl, (error, client) => {


        if (error) {
            console.log("error while connecting db")
        } else {

            var db = client.db("checkRooms");
            var collection = db.collection("storeRooms");
            collection.find({ date: req.query.date, month: req.query.month, year: req.query.year, periodNumber: req.query.periodNumber, choice: req.query.choice }).toArray((error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                    var arraydata = [];
                    for (let i = 0; i < result.length; i++) {
                        let obj = result[i];
                        arraydata[i] = obj.classroom;
                    }
                }
                client.close();
                res.send(arraydata);



            });


        }
    });


});

module.exports = router;