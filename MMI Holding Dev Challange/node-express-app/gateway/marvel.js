/* global require,exports, console */
var http = require('http');
var crypto = require('crypto');

var cache = {};

var PRIV_KEY = "282de9c6d0046f232e6f6b56ba816f7a2c2c6c00";
var API_KEY = "2a37b092cc1cc3c90c1d3a0f4b7eb1a5";

//default not available image
var IMAGE_NOT_AVAIL = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

exports.getCache = function() { return cache; };

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

Object.toList = function(obj) {
    var list = [], key;
    for (key in obj) {
		if (obj.hasOwnProperty(key)) list.push(obj[key]);
    }
    return list;
};

function makeRestEndpointCall(endpoint, params, cb)
{
	var url = "http://gateway.marvel.com/v1/public" + endpoint + "?apikey="+API_KEY;
	var ts = new Date().getTime();
	var hash = crypto.createHash('md5').update(ts + PRIV_KEY + API_KEY).digest('hex');
	url += "&ts="+ts+"&hash="+hash;
	//TEMP
	//var url ="http://127.0.0.1/testingzone/html5tests/marvel/resp.json";
	
	console.log(new Date()+' '+url);
	
	http.get(url, function(res) {
		var body = "";

		res.on('data', function (chunk) {
			body += chunk;
		});
		
		res.on('end', function() {
			var result = JSON.parse(body);
			cb(result);
		});
	});
}

exports.getCharacters = function(cb, limit, offset) {

	var endPoint = "/characters";
	makeRestEndpointCall(endPoint, [], function(result){
		var cache_key;
			
			if(result.code === 200) {
				characters = [];
				console.log('num of characters '+result.data.results.length);
				for(var i=0;i<result.data.results.length;i++) {
					var character = result.data.results[i];
					//console.dir(character);
					//now cache it
					cache_key = character.id; 
					cache[cache_key] = {hits:0};
					cache[cache_key].profile = character;
					characters.push(character);
				}
				cb({result:characters});
			} else if(result.code === "RequestThrottled") {
				console.log("RequestThrottled Error");
				/*
				So don't just fail. If we have a good cache, just grab from there
				*/
				if(Object.size(cache) > 5) {
					cb({result:Object.toList(cache)});
				} else {
					cb({error:result.code});
				}
			} else {
				console.log(new Date() + ' Error: '+JSON.stringify(result));
				cb({error:result.code});
			}
			//console.log(data);
	});
};

exports.getCharacter = function(id, cb) {
	var cache_key = id;
	var character;
	if(cache_key in cache) {
		console.log('had cache for ' + cache_key);
		character = cache[cache_key].value;
		cache[cache_key].hits++;
		cb({result:character});
	} else {
		var endpoint = "/characters/"+id;
		makeRestEndpointCall(endpoint, {}, function(result) {
				if(result.code === 200) {
					character = result.data.results[0];
					cb({result:character});
				} else {
					console.log(new Date() + ' Error: '+JSON.stringify(result));
					cb({error:result.code});
				}
				//console.log(data);
		});
	}

};