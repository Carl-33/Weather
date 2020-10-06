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
        cityDisplay.text(response.name + " " + moment().format('l')); 
        $(".today").append(cityDisplay);
        var icon = $("<img>")
        icon.attr("src", "http://openweathermap.org/img/wn/"+ response.weather[0].icon +"@2x.png")
        cityDisplay.append(icon);    
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
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude +"&lon=" + longitude + "&exclude=minutely,hourly,alerts&appid=" + APIKey; 
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            $(".forecast").empty();
            for (let i = 1; i < 6; i++) {
                console.log(response.daily[i]);
                var forecastBox = $("<div>");
                forecastBox.addClass("card col-lg-2.5 col-md-2.5 col-sm-2.5 col-2.5");
                var forecastCard = $("<div>");
                forecastCard.addClass("card-body text-white bg-primary");
                forecastBox.append(forecastCard);

                var forecastDate = $("<h4>")
                forecastDate.text(moment().add(i, 'days').format('l'));
                forecastCard.append(forecastDate);

                var forecastIcon = $("<img>")
                forecastIcon.attr("src", "http://openweathermap.org/img/wn/"+ response.daily[i].weather[0].icon +"@2x.png")
                forecastCard.append(forecastIcon);

                var forecastTemperatureDisplay = $("<p>");
                var forecastTemperature = (response.daily[i].temp.day - 273.15) * 1.8 + 32;
                forecastTemperatureDisplay.text("Temp: " + forecastTemperature.toFixed(1) + "° F");
                forecastCard.append(forecastTemperatureDisplay);
                var forecastHumidityDisplay = $("<p>");
                var forecastHumidity = response.daily[i].humidity
                forecastHumidityDisplay.text("Humidity: " + forecastHumidity.toFixed(1) + "%");
                forecastCard.append(forecastHumidityDisplay);
                
                
                $(".forecast").append(forecastBox)

                
            }

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
    var cityList = $("<button>")
    cityList.text(city)
    cityList.attr("city-name", city)
    cityList.addClass("past-search-button btn btn-light btn-lg btn-block")
    $("#past-searches").prepend(cityList)

})

$(document).on("click", ".past-search-button", function(){

    var city = $(this).attr("city-name")
    searches.push(city)
    displayWeather();
})

