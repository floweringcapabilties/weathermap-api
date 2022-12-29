const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res){
	let city = req.body.cityName;

	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7c0316d54b5621aeed8c006867927d88&units=imperial";
	
	https.get(url, function(response){
		console.log(response.statusCode);
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			res.set('Content-Type', 'text/html');
			const iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
			res.write(`<img src='${iconurl}'>`);
			res.write(`<h1>The weather is currently ${description}</h1>`)
			res.write(`<h1>The Temperature in ${city} is ${temp}</h1>`);
			res.send();
		})
	
	})
})


app.listen(3000, function(){
	console.log("Server is running on Port 3000");
})