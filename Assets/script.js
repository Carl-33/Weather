
$(document).ready(function () {

    const APIKey = config.API_KEY
    var searches = [];
    // displays the weather
    function displayWeather() {
        var localSearches = JSON.parse(localStorage.getItem("searches"))
        var queryCity = localSearches[localSearches.length - 1];
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".today").empty();
            var cityDisplay = $("<h1>")
            cityDisplay.text(response.name + " " + moment().format('l'));
            cityDisplay.addClass("text-dark")
            $(".today").append(cityDisplay);
            var icon = $("<img>")
            icon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
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
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
 
                var uvDisplay = $("<p>");
                var UV = response.value;
                if (UV <= 3 ){
                    uvDisplay.addClass("text-success")
                }
                if ( UV <= 6 && UV > 3) {
                    uvDisplay.addClass("text-warning")
                }
                if (UV > 6 ) {
                    uvDisplay.addClass("text-danger")
                }
                uvDisplay.text("UV Index: " + UV);
                $(".today").append(uvDisplay);
            })
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&appid=" + APIKey;
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (response) {

                $(".forecast").empty();
                for (let i = 1; i < 6; i++) {
 
                    var forecastBox = $("<div>");
                    forecastBox.addClass("card col-lg-2.5 col-md-2.5 col-sm-2.5 col-2.5");
                    var forecastCard = $("<div>");
                    forecastCard.addClass("card-body text-white bg-secondary");
                    forecastBox.append(forecastCard);

                    var forecastDate = $("<h4>")
                    forecastDate.text(moment().add(i, 'days').format('l'));
                    forecastCard.append(forecastDate);

                    var forecastIcon = $("<img>")
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png")
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
    // Adds a new city to the list and displays it's weather
    $("#add-city").on("click", function (event) {
        event.preventDefault();
        var city = $("#weather-search").val().trim();
        searches.push(city)
        localStorage.setItem("searches", JSON.stringify(searches))
        $("#past-searches").empty();
        displayWeather();
        for (let i = 0; i < searches.length; i++) {
            var cityList = $("<button>")
            cityList.text(searches[i])
            cityList.attr("city-name", searches[i])
            cityList.addClass("past-search-button btn btn-outline-dark btn-lg btn-block")
            $("#past-searches").prepend(cityList)
        }
    })
    // click on past searches to see weather
    $(document).on("click", ".past-search-button", function () {
        var city = $(this).attr("city-name")
        searches.push(city)
        localStorage.setItem("searches", JSON.stringify(searches))
        displayWeather();
    })
    // drawing from local storage in order to repopulatet the page with past search results
    var pastSearches = JSON.parse(localStorage.getItem("searches"))
    if (pastSearches == null) {
        return;
    } else {
        // Adds a new city to the list and displays it's weather
        for (let i = 0; i < pastSearches.length; i++) {
            var cityList = $("<button>")
            cityList.text(pastSearches[i])
            cityList.attr("city-name", pastSearches[i])
            cityList.addClass("past-search-button btn btn-outline-dark btn-lg btn-block")
            $("#past-searches").prepend(cityList)
        }
        var queryCity = pastSearches[pastSearches.length - 1];
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".today").empty();
            var cityDisplay = $("<h1>")
            cityDisplay.text(response.name + " " + moment().format('l'));
            cityDisplay.addClass("text-dark")
            $(".today").append(cityDisplay);
            var icon = $("<img>")
            icon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
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
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                var uvDisplay = $("<p>");
                var UV = response.value;
                if (UV <= 3 ){
                    uvDisplay.addClass("text-success")
                }
                if ( UV <= 6 && UV > 3) {
                    uvDisplay.addClass("text-warning")
                }
                if (UV > 6 ) {
                    uvDisplay.addClass("text-danger")
                }
                uvDisplay.text("UV Index: " + UV);
                $(".today").append(uvDisplay);
            })
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&appid=" + APIKey;
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (response) {
                $(".forecast").empty();
                for (let i = 1; i < 6; i++) {
                    var forecastBox = $("<div>");
                    forecastBox.addClass("card col-lg-2.5 col-md-2.5 col-sm-2.5 col-2.5");
                    var forecastCard = $("<div>");
                    forecastCard.addClass("card-body text-white bg-secondary");
                    forecastBox.append(forecastCard);
                    var forecastDate = $("<h4>")
                    forecastDate.text(moment().add(i, 'days').format('l'));
                    forecastCard.append(forecastDate);
                    var forecastIcon = $("<img>")
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png")
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
        })
    }
})

