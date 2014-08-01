var express = require('express');
var app = express();
app.set('port', process.env.PORT || 5567);

app.get('/', function(req, res){
  res.send('Server is alive');
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});

var GameStop = require('./GameStop.js');
var Steam = require('./Steam.js');
var WebsiteTagSearch = [GameStop,Steam];

var SearchAll = function(name,callback)
{
	var Result = [];

	 for (var i = 0; i < WebsiteTagSearch.length; i++) 
	 {
	  	WebsiteTagSearch[i].SearchTag(name,function(data)
	  	{
	  		Result.push(data);
	  		if(Result.length == WebsiteTagSearch.length)
	  		{
	  			callback(Result);
	  		}
	  	})
	 };
}


app.get('/TagSearch/:name/:detail', function(req, res)
{
	SearchAll(req.params.name,function(data)
	{
		console.log("detail:"+req.params.detail);

		if(req.params.detail=="true")
		{
			res.send(JSON.stringify(data));
		}
		else
		{
			var set = {};
			for (var i = 0; i < data.length; i++) {
				result = data[i];

				for(var j=0;j<result.tag.length;j++)
				{
					var thisTag = result.tag[j];
					set[thisTag] = true;
				}
			};

			res.send(JSON.stringify(set));
		}
	});
});

app.get('/TagSearch/:name', function(req, res)
{
	SearchAll(req.params.name,function(data)
	{
		res.send(JSON.stringify(data));
	});
});

