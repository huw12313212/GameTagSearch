var GameStop = require('./GameStop.js');
var Steam = require('./Steam.js');
var WebsiteTagSearch = [GameStop,Steam];
var WebSiteTagSearcher = {};

module.exports = WebSiteTagSearcher;

WebSiteTagSearcher.IsKindOf = function(name,tag,callback)
{
	WebSiteTagSearcher.SearchTag(name,"false",function(result)
	{
		callback(result.indexOf(tag.toString())!=-1);
	});
}

WebSiteTagSearcher.SearchTag = function(name,detail,callback)
{
	WebSiteTagSearcher.SearchTagFromAllWebsite(name,function(data)
	{
		if(detail=="true")
		{
			callback(data);
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
			callback(Object.keys(set));
		}
	});	
}

WebSiteTagSearcher.SearchTagFromAllWebsite = function(name,callback)
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

/*
var APIURL = "https://www.kimonolabs.com/api/a8hycat0?apikey=K6kvrvbl2kx4SWejctwwTYBxqaTPiGaW";
var request = require('request');*/

/*
request(APIURL, function (error, response, body) 
{
	var result = JSON.parse(body);
	var entries = result.results.collection1;
	var GameTag = "Casual";

	var AllCasualGames = [];

	RecursiveSearch(entries,0,GameTag,AllCasualGames,function(CasualGames)
	{
		console.log(CasualGames);
	});
	
});*/


var Parse = require('parse').Parse;
var CasualGameEntry = Parse.Object.extend("CasualGameEntry");
Parse.initialize("9N81cNmxX9gZ2tAPjccjphesn5g1N5omkODE3vXw", "I9SUJSnGPe9khCvXluDSvpJpxo9Y0TU4NxgUIpnN");

var RecursiveSearch = function(Entries,index,GameTag,AllCasualGames,callback)
{
		var Data = {};
		var entry = Entries[index];
		Data.name = entry.Game.text;
		Data.platform = entry.Platform.text;
		Data.url = entry.Game.href;
		Data.sold = parseFloat(entry.Global)* 1000000
		Data.rank = {"country":"united-states","rank":AllCasualGames.length+1,"type":"casual"};
		Data.soldDetail = {"NorthAmerica":parseFloat(entry.NorthAmerica)*1000000,
		"Europe":parseFloat(entry.Europe)*1000000,
		"Japan":parseFloat(entry.Japan)*1000000,
		"RestOfWorld":parseFloat(entry.ResetOfWorld)*1000000,
		"Global":parseFloat(entry.Global)*1000000};
		Data.crawlDate = new Date();

		//sleep(2000);
		//console.log("Ask:"+Data.name);
		WebSiteTagSearcher.IsKindOf(Data.name,GameTag,function(result)
		{
			if(result)
			{
				console.log("["+index+"]"+Data.name +" is kind of "+GameTag);
				AllCasualGames.push(Data);

				var casualGameEntry = new CasualGameEntry();
	  			casualGameEntry.save(Data).then(function(object)
	  			{
  				//console.log(visitEntry);
  					console.log("["+index+"]save:"+Data);
				});




				//console.log(Data);
			}
			else
			{
				console.log("["+index+"]"+Data.name +" is not kind of "+GameTag);
			}

			index++;

			if(index == Entries.length)
			{
				callback(AllCasualGames);
			}
			else
			{
				RecursiveSearch(Entries,index,GameTag,AllCasualGames,callback);
			}

		});
}


