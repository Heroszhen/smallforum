const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
var url = 'mongodb://localhost:27017';


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/',router);
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
});


app.post('/logup',function(req,res){
	var query = req.body;
	query.myphoto = "";
	mongoClient.connect(url,function(err,client){
		if(err){return;}
		else{
			var db = client.db("smallforum");
			var query2 = {
				"email":query.email
			};
			db.collection("user").findOne(query2,function(err,result){
				if(result != null){
					res.send({"response":"no"});
				}else{
					db.collection("user").insertOne(query,function(err,result){
						if(err)console.log(err);
						else res.send({"response":"done"});
					});
				}
			});
		}
	});
	//res.send(query);
});

app.post('/login',function(req,res){
	var query = req.body;
	mongoClient.connect(url,function(err,client){
		if(err){return;}
		else{
			var db = client.db("smallforum");
			db.collection("user").findOne(query,function(err,result){
				if(result == null){
					res.send({"response":"no"});
				}else{
					delete result.pwd;
					//console.log(result);
					res.send({"response":"done","data":result});
				}
			});
		}
	});
	//res.send(query);
});

app.get('/getallsubjects',function(req,res){
	mongoClient.connect(url,{ useNewUrlParser: true }, { useUnifiedTopology: true },function(err,client){
		if(err)return;
		else{
			var db = client.db("smallforum");
			var mysort = { created: -1 };//-1:décroissant,1:croissant
			db.collection('subject').find().sort(mysort).toArray(function(err, result) {
				if (err) throw err;
				else{
					if(result.length == 0)res.send({"response":"no"});
					else res.send({"response":"done","data":result});
				}
			  });
		}
	});
});

app.post('/createonesubject',function(req,res){
	var query = req.body;
	query.created = new Date();
	mongoClient.connect(url,{ useNewUrlParser: true }, { useUnifiedTopology: true },function(err,client){
		if(err)return;
		else{
			var db = client.db("smallforum");
			db.collection('subject').insertOne(query,function(err,result){
				var mysort = { created: -1 };//-1:décroissant,1:croissant
				db.collection('subject').find().sort(mysort).toArray(function(err, result) {
					if (err) throw err;
					else{
						if(result.length == 0)res.send({"response":"no"});
						else res.send({"response":"done","data":result});
					}
				});
			});
		}
	});
});

app.get('/getonesubject/:id',function(req,res){
	var params = req.params;
	var id = params.id;
	mongoClient.connect(url,function(err,client){
		if(err){return;}
		else{
			var db = client.db("smallforum");
			var oid = new mongo.ObjectID(id);
			var query = {"_id":oid};
			db.collection("subject").findOne(query,function(err,result){
				var result1 = result;
				if(result == null){
					res.send({"response":"no"});
				}else{
					var subjectid = result._id;
					var query2 = {"subjectid":subjectid};
					var mysort = { created: 1 };
					db.collection('response').find({},query2).sort(mysort).toArray(function(err, result) {
						if (err) throw err;
						else{
							if(result.length == 0)res.send({"response":"done","data":result1});
							else res.send({"response":"done","data":result1,"data2":result});
						}
					});
				}
			});
		}
	});
});

app.post('/addoneresponse',function(req,res){
	var query = req.body;
	query.created = new Date();
	mongoClient.connect(url,{ useNewUrlParser: true }, { useUnifiedTopology: true },function(err,client){
		if(err)return;
		else{
			var db = client.db("smallforum");
			db.collection('response').insertOne(query,function(err,result){
				var mysort = { created: 1 };//-1:décroissant,1:croissant
				var query2 = {"subjectid":query.subjectid};
				db.collection('response').find(query2).sort(mysort).toArray(function(err, result) {
					if (err) throw err;
					else{console.log(result);
						if(result.length == 0)res.send({"response":"no"});
						else res.send({"response":"done","data":result});
					}
				});
			});
		}
	});
});

app.listen(3333);
