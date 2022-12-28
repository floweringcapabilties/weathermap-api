const express = require("express");
const https = require("https");
const app = express();

app.get('/', function(req, res){
	const url = "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=7c0316d54b5621aeed8c006867927d88&units=imperial";
	https.get(url, function(response){
		console.log(response.statusCode);
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			console.log(description);
		})
	})
	res.send("Server is up and running");
})

app.listen(3000, function(){
	console.log("Server is running on Port 3000");
})