var express = require('express');
var app = express();
app.set('port', process.env.PORT || 5567);

app.get('/', function(req, res){
  res.send('Server is alive');
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});


var WebSiteTagSearcher = require('./webSiteTagSearcher.js');

app.get('/IsKindOf/:name/:tag', function(req, res)
{
	WebSiteTagSearcher.IsKindOf(req.params.name,req.params.tag,function(result)
	{
		res.send(JSON.stringify(result));
	});
});


app.get('/TagSearch/:name/:detail', function(req, res)
{
	WebSiteTagSearcher.SearchTag(req.params.name,req.params.detail,function(result)
	{
		res.send(JSON.stringify(result));
	});
});

app.get('/TagSearch/:name', function(req, res)
{
	WebSiteTagSearcher.SearchTag(req.params.name,"true",function(result)
	{
		res.send(JSON.stringify(result));
	});
});



