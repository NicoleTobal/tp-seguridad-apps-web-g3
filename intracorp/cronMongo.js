var exec = require("child_process").exec;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@mongo:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("admin");
  var query = {};
  dbo.collection("crons").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result)
	exec(result[0].command,function(x,y,z){});
    db.close();
  });
});
