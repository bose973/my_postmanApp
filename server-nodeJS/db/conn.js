const { MongoClient } = require("mongodb")
const path = require("path")
const username= encodeURIComponent("srcStarsRW")
const password=encodeURIComponent("JTurM/BBykqlkYc7dmXmaA==")
const URL = `mongodb://${username}:${password}@va33dlvmdb347.wellpoint.com:37043/?ssl=true&ssl_ca_certs=${path.resolve(
  __dirname,
  '../certs/root.pem'
)}`;

var _db
const mongo = new MongoClient(URL, {
  retryWrites: false,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports= {
    connectToServer: function (callback) {
      mongo.connect(function (err, db) {
        // Verify we got a good "db" object
        if (db)
        {
          _db = db.db("stars-dev");
          console.log("Successfully connected to MongoDB."); 
        }
        return callback(err);
           });
    },
   
    getDb: function () {
      return _db;
    }
  };

