var APIKey = "6bf41dfabf2736b1e0d2f81ada2c6044";
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=" + APIKey;

var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=" + APIKey;
var searches = [];

console.log(searches)
// console.log(queryCity)
// console.log(queryURL)
// console.log(queryURL2)


function displayWeather() {

    var queryCity = searches[searches.length - 1];
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $(".today").empty();


        // Create CODE HERE to Log the queryURL
        console.log(queryURL)
        // Create CODE HERE to log the resulting object
        console.log(response)

        var cityDisplay = $("<h1>")
        cityDisplay.text(response.name);
        $(".today").append(cityDisplay);
        var temperatureDisplay = $("<p>")
        var temperature = (response.main.temp - 273.15) * 1.8 + 32;
        temperatureDisplay.text("Temperature: " + temperature.toFixed(1) + "° F");
        $(".today").append(temperatureDisplay);
        var humidityDisplay = $("<p>");
        var humidity = response.main.humidity
        humidityDisplay.text("Humidity: " + humidity.toFixed(1) + "%");
        $(".today").append(humidityDisplay);
        var windDisplay = $("<p>");
        var wind = response.wind.speed * 2.23694
        windDisplay.text("Wind Speed: " + wind.toFixed(2) + " miles per hour");
        $(".today").append(windDisplay);


        var latitude = response.coord.lat
        var longitude = response.coord.lat
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log("uv stuff " + response)
            var uvDisplay = $("<p>");
            var UV = response.value;
            uvDisplay.text("UV Index: " + UV);
            $(".today").append(uvDisplay);
        })
        var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + queryCity + "&appid=" + APIKey;
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

        });

    });
}

// function renderSearches() {
//     var cityList = $("<li>")
//     cityList.text(city)
//     $("ul").prepend(cityList)


// }


$("#add-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#weather-search").val().trim();
    searches.push(city)
    console.log(city)
    console.log(searches)
    displayWeather();
    var cityList = $("<li>")
    cityList.text(city)
    $("ul").prepend(cityList)

})

