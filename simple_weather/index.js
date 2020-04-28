var express = require('express')
const request = require("request-promise")

var app = express() 
app.use(express.json({limit: '1mb'}));
app.set('view engine', 'ejs')



var apiKey = 'ca85f1f467fc420f8e4191305202804'
var coords

// function showError(error) {
//     switch(error.code) {
//       case error.PERMISSION_DENIED:
//         loc_err = "User denied the request for Geolocation."
//         break;
//       case error.POSITION_UNAVAILABLE:
//         loc_error = "Location information is unavailable."
//         break;
//       case error.TIMEOUT:
//         loc_error = "The request to get user location timed out."
//         break;
//       case error.UNKNOWN_ERROR:
//         loc_error = "An unknown error occurred."
//         break;
//     }
// }

app.post('/coords', async function (req, res) {
    var data = req.body
    var weather
    lat = data.lat
    long = data.long
    coords = lat.toString() + "," + long.toString()
    let url = 'http://api.weatherapi.com/v1/current.json?key=ca85f1f467fc420f8e4191305202804&q='+coords

    var options = {
        uri: url,

        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    request(options)
        .then(function (weather) {
    
            let location = weather['location'].name
            let region = weather['location'].region
            let country = weather['location'].country
            let datetime = weather['location'].localtime
            let temperature = weather['current'].temp_f
            console.log(weather)
            result = "The weather in " + location + ", " + region + ", " + country + "is " + temperature + " degrees farenheit. " + "Time and Date is " + datetime
            res.json({
                status: "Success",
                message: result
            }); 
            
        })

        .catch(function (err) {
            console.log(err)
     });
})


//GET request for '/'
app.get('/', function(req, res) {
    res.render('index');
});


app.listen(3000, function() {
    console.log("Listening on port 3000")

});
