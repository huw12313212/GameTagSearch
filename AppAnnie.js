//grab data
var cheerio = require('cheerio');
var request = require('request');
var URLPrefix = "http://www.appannie.com";
var URLSearchPrefix1 = "/apps/google-play/top/"; //united-states/
var URLSearchPrefix2 = "/game/";//casual
var URLSearchPrefix3 = "/"; 

var Parse = require('parse').Parse;
var CasualGameEntry = Parse.Object.extend("CasualGameEntry");
Parse.initialize("9N81cNmxX9gZ2tAPjccjphesn5g1N5omkODE3vXw", "I9SUJSnGPe9khCvXluDSvpJpxo9Y0TU4NxgUIpnN");

//var URLPostfix = ",28zu0";
var WebsiteName ="AppAnnie";
var options = {
    headers: {
    	//'Accept-Encoding':'gzip,deflate,sdch',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'
       // 'Cookie':"GS.Cart=MUxkn2wnF/rdd8PjhESvW5fRX7ozjyaMOADBZntOHrXKQ1iXNCMAWQaPSDTG1PNCkGfbAHNnw4RhdveMDDXxggk3xsmi6ktOHfRWD+Wy/CHvDykeApU/lAEP7MYAcVaI6QXz4y4rdexsn+7w+d7NaEkGYEshWIV77cmRw7oGRdAPiorcA8Jf4oqeyb1tUY1NE67umn8Tn4pm5Ev6mlmnEbm2O8oiVYqwG1MqSHHKfuA8vxKKB1zoN+ZgR3NqthcWTbRcbHIZuBynFm2SYAwLQs7wSgYnfNg8D5d/sSodGzL3+c8qkU345ec8Wsuj2g2rTx2FjTA5i56fX1pnVQzA/xRYAGLTuCAZhQBBfCwJt3YCDK39/iiLgORr6gc9QIIxgJ18P7HC5NEeCV6f8oHP+YaymMK/zLysdMFOyRwCmy5gpPeSOhPbdt+PT00r1MHNd1nRaXACUu/lLlZ/kRNjYvHP5PFbafRC0H/MdCaYlc/OKafof4jNi56PhwpyMtpr; MobileDetectRedirect=UserDeviceAndPreference=NonMobile; GS.Checkout.Session=qqnqgtv0ezgjax45nzl1wc55; SearchCount=; optimizelyEndUserId=oeu1406878657997r0.4354552114382386; ReferralUrl=https://www.google.com.tw/; LandingUrl=http://www.gamestop.com/default.aspx; akamai-cookie=4090107052.20480.0000; optimizelyCustomEvents=%7B%22oeu1406878657997r0.4354552114382386%22%3A%5B%22header_(hp)%22%2C%22content_clicks%22%5D%7D; GS.AU=RHzB1WQ4rWasuNQ26XGnyvlsKLS5q4h6UeVRfvv/7Ds9yWNeEKcYdJ3p5iJJvq+dfapcTOCwtebOpSi3+rrLOoDagZGM232JCQRho0AxgLVcbvyounFKoYrqALu+5J6DrFv9nvdVBfjLFo5StM4cuEBca99p+LYnKuzd76+rLGWOrS3cYmwAezvvdVwgLqJ1zSTknEysOBciWzioQcWWTI1DXmgIv2Py7i6H6JClRpSsg0WdeHa3+AGKkIGBKHETUfoeJzZTHiMz1nlCyKT4iuwk1j3BLkeJFP3Y3yjiQBn7/09gXd7lmqCH4mvGZTQXKEoyydLSEW/z7KUj5SoMcpWWizBXBRbrMXy+SekliUcl8p/rWyAAFNVJejoJwUaBP6cuM24Gw29np+8WkP+7bC8AoaK4oFCZjpexcNI9SHY=; SearchResCount=resCount=0; CertonaArray=; optimizelySegments=%7B%22279523001%22%3A%22search%22%2C%22279543282%22%3A%22none%22%2C%22279573007%22%3A%22false%22%2C%22279585041%22%3A%22gc%22%7D; optimizelyBuckets=%7B%7D; s_pers=%20s_vnum%3D1409470658668%2526vn%253D1%7C1409470658668%3B%20ttcp%3D1406965058682%7C1406965058682%3B%20v45%3D%255B%255B'organic%252520search'%252C'1406880263876'%255D%255D%7C1564646663876%3B%20v46%3D%255B%255B'google'%252C'1406880263880'%255D%255D%7C1564646663880%3B%20pn%3D7%7C1409472891398%3B%20s_vs%3D1%7C1406884908816%3B%20gpv%3DPDP%253A%2520Tetris%2520Party%2520Deluxe%7C1406884908822%3B%20s_dl%3D1%7C1406884908833%3B%20s_invisit%3Dtrue%7C1406884908837%3B%20v38%3D1406883108841%7C1501491108841%3B%20v38_s%3DFirst%2520Visit%7C1406884908841%3B; __utma=17130671.2013334561.1406878659.1406878659.1406880264.2; __utmb=17130671.9.10.1406880264; __utmc=17130671; __utmz=17130671.1406880264.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); s_vi=[CS]v1|29EDA1DF050135E8-40000110A000E6E3[CE]; CampaignHistory=12820,12828,12061,12827,12623,12696,12684,12813,12829,12791,11901,12802,12744,12617,8314,12504,12003,11707,12805,12430,12430,8397,8397,12805,12805,12805,12805,12430,12430,8397,8397,12805,12805,12805,12805; ndcd=2.4539.125502.1406883105.2.G-JimSjN_XUX0lGSFZ9mbw,,.lntLGdtA68n4AU0m0fshuMPxlMtrmH9aMxSU0wb3nBcUduPzdHzIT5guIh4EYonxmkxYvmcbQ5Ib7t_Z2EBaV2E54PXUHEP4i2iqX6vrplsisnVIXkGz9kFOphDQB-CtAqWFkY8Xlf3ySPO2cieUZg,,.bGhZU24zV0NuOXVUVFc0WndYS0hqdy9CbDNWUDR5N0hZTlQ2VW00N1BidmF5QWJ2U0NiM05CTmpwdkFyblIrdDhUejNYNkg0NDlkc09ubktRTDFWcFczWFZ6N2hoVFlEdTROQUdnUmN6d0ZiQWNOSkJCeVBuMlVCTmk5WjZHcjMrdUVEVHgyWExGaWF0UFBFbHFCU1V2bCtCWmYwUGdWaUZreFQ4R0wzaEc4PQ,,; RES_TRACKINGID=215184833488978; RES_SESSIONID=43432611666687860; ResonanceSegment=1; s_sess=%20s_cpc%3D0%3B%20v0%3Dorganic%2520search%257Cgoogle%3B%20c4%3Dpokemon%3B%20s_cc%3Dtrue%3B%20s_sq%3D%3B%20s_ppv%3DPDP%25253A%252520Tetris%252520Party%252520Deluxe%252C15%252C15%252C561%3B; LocaleCookie=en-us; GS.Cache=OK5vtlZI3WI5372abq6+sKcPqEWg5qJfqmTqNaj3g4MVZ6y3Mh4q2zcIIPWx12MTWllC98t0OABQ0rVxZOYBqid2m8+oa3SgNa6XRjbYduGr11ReRFmRhWb3G6+oCsIt1qXe6D2yPX//HUxzVS1CLi0zRT3F0Y9YTR0WYlzzbyeehGm3qrTxNmU3y7mr32D7vtDbtsqwPidLEOQnC5UhUJu7/PnYKdQPboEMHW/jIWsuVXLAzIgF+j/m4tshfiXSv9uvPXGIaFXp9zAkXpT6oHZQRW9aIX5/23Y0YFUpyQ/jmeMwD5z3XimHZmcwUWAdyh91o0Sl/pMEP/jub5pDHFZ0jQrosqmvCWc5x7T1hv4T5FhR3enpHqmQDVL9gWTc; GS.CacheLong=irT42GRe5i+f8cQlb6Z7Wf63c3Mb8vZFoxAUR9nNsaFvk5CPgVJeB4Q4rUOpxmAVyKtCwAZzu1bIn322mtwmtBy6BGU2GSFntT3ZvmDelGHtfFyjZzkG5CZrcon26KJB+ddgpPrLs8wzidQgLSby3xbhPXJkHyirq95ZOQVEbKGx7AT651DnEEMmHf1wHLNe32z0hrI9ydOyDSJr25+Z06jW4zM8cSqQTwFGQd7VQpAQqForWueFmFFBXDaThvty1D2CXSyddt1zz5arNC9zQwU5YvaOafM8WXoIGKRWKpITb1SmTxMXx6g7PR5Kzy4VPnu63LtHFl7PLKeFHO8iNNV9UKZK3TOHp90wCPkb48fgLFjhW6R2/FQ0xRZrmga0C8EAcm4kvrFkc5xpmddaqRn4bydo3gBOW4Mv2hQP45IqJCuJOL9ubfkPHI2wKB2Lc2elEtb/kXetwZAKobHW2KASTVdPqYjMGeLN9stcCHo="
    }
};

var AppAnnie = {};

module.exports = AppAnnie;

AppAnnie.GetTop100 = function(country,type,callback)
{
	options.url = URLPrefix+URLSearchPrefix1+country+URLSearchPrefix2+type+URLSearchPrefix3;

	var result = [];
	console.log("Try to Get:"+options.url);

	request(options, function (error, response, body) 
	{
		if (!error && response.statusCode == 200) 
		{
			$ = cheerio.load(body);

			var listRow = $('#storestats-top-table tr');

			//console.log("length:"+listRow.length);

			for (var i = 0; i < listRow.length; i++) 
			{
				var currentRow = $(listRow[i]);
				var titleInfo = $(currentRow.find('.title-info')[0]);
				var titleName = titleInfo.text().trim();
				var gameHref = titleInfo.find('a').attr('href').trim();
				console.log("["+i+"]"+titleName+":"+gameHref);

				var entry = {};
				entry["rank"] = {"country":country,"type":type,"rank":i+1};
				entry["name"] = titleName;
				entry["url"] = URLPrefix+gameHref;
				entry["crawlDate"] = new Date();
				entry["platform"] = "android";

				result.push(entry);
			};

			callback(result);
		}
	});
};

AppAnnie.GetSoldCount = function(url,callback)
{
	options.url = url;

	request(options, function (error, response, body) 
	{
		if (!error && response.statusCode == 200) 
		{
			$ = cheerio.load(body);

			var result = {};
			var listRow = $('.about_app .app-box-content p');
			var installTagP = $(listRow[5]);
			var installCountString = installTagP.text().split(":")[1];
			var splitMinMax = installCountString.split("-");
			var min = parseInt(splitMinMax[0].replace(/,/g,""));
			var max = parseInt(splitMinMax[1].replace(/,/g,""));
			result.min = min;
			result.max = max;
			result.sold = (min+max)/2;
			
			callback(result);
		}
	});
}


AppAnnie.CrawlCasualGameAndSaveToParse = function()
{
	AppAnnie.GetTop100("united-states","casual",function(result)
	{
		var doneCount = 0;

		result.map(function (gameEntry)
		{
			AppAnnie.GetSoldCount(gameEntry.url,function(soldData)
			{
				//console.log(result);
				gameEntry.sold = soldData.sold;
				gameEntry.soldDetail = soldData;
				
				doneCount++;
				console.log("done:"+doneCount);

				if(doneCount == result.length)
				{

					for (var i = 0; i < result.length; i++) {
						data = result[i];

						var casualGameEntry = new CasualGameEntry();
			  			casualGameEntry.save(data).then(function(object)
			  			{
		  				//console.log(visitEntry);
		  					console.log("["+i+"]save:"+data);
						});
					};
				}
			});
		});
	});
};