var express = require('express');
var app = express();
var fs = require('fs');
app.set('view engine','ejs');
var mbodyparser = require('body-parser');
var urlencodedParser = mbodyparser.urlencoded({extended:false});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/',function(req,res){
	res.send('homepage');
});
app.get('/app1',function(req,res){
	res.render('app1');
});
app.get('/app1/response',function(req,res){
	var dir='./7598620563/abc.json';
	var obj = JSON.parse(fs.readFileSync(dir, 'utf8'));
	console.log(obj.emergency_response);
	res.send(obj);
});
app.get('/app2/response',function(req,res){
	var dir='./abc/7598620563.json';
	var obj = JSON.parse(fs.readFileSync(dir, 'utf8'));
	console.log(obj.emergency_response);
	res.send(obj);
});
app.get('/app2',function(req,res){
	res.render('app2');
});
app.post('/app1',urlencodedParser,function(req,res){
	var request={
			cellno:req.body.cellno,
			hospital:req.body.hospital,
			emergency:req.body.emergency
	};
	var dir='./'+req.body.hospital;
	if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir);
	}
	var path=dir+'/'+req.body.cellno+'.json'
	console.log(path)
	var data = JSON.stringify(request);
	console.log(data);
	fs.writeFileSync(path, data);
});
app.post('/app2',urlencodedParser,function(req,res){
	var response={
			cellno:req.body.cellno,
			hospital:req.body.hospital,
			response:req.body.emergency
	};
	var dir='./'+req.body.cellno;
	var path=dir+'/'+req.body.hospital+'.json'
	if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir);
	}
	var data = JSON.stringify(response);
	console.log(data);
	fs.writeFileSync(path, data);
});
console.log('listening on 3000');
app.listen(3000);