
var SearchBtn = $("#searchBtn");
var cityValue = $("#cityValue");
var currentDay= $("#current");
var dayOneWeather = $("#dayOne");
var dayTwoWeather = $("#dayTwo");
var dayThreeWeather = $("#dayThree");
var dayFourWeather = $("#dayFour");
var dayFiveWeather = $("#dayFive");
var cityHistoryDiv = $("#cityHistoryDiv");
var searchCity = $("#searchCity");
var searchCityValue;
var lat;
var long;
var userInput = [];

$(document).ready(function(){

           //Daily weather function
           function dailyWeatherForcast(dayNumWeather, num, data){
            var weatherIconNum;
            var iconNum;
            var temNum;
            var windNum;
            var humidityNum;

            var forecastDate = (data.list[num].dt_txt);
            forecastDate = dayjs(forecastDate).format('MM/DD/YYYY');
            dayNumWeather.text(forecastDate);
            weatherIconNum = data.list[num].weather[0].icon;
            iconNum = $("<img>");
            iconNum.attr('src', 'http://openweathermap.org/img/w/' + weatherIconNum + '.png');
            dayNumWeather.append(iconNum);

            temNum = $('<p>');
            temNum.text('Temp: ' + data.list[num].main.temp + '℉');
            dayNumWeather.append(temNum);

            windNum = $('<p>');
            windNum.text('Wind: ' + data.list[num].wind.speed + ' MPH');
            dayNumWeather.append(windNum);

            humidityNum = $('<p>');
            humidityNum.text('Humidity: ' + data.list[num].main.humidity);
            dayNumWeather.append(humidityNum);

        }



    SearchBtn.on('click', function(event){
        event.preventDefault();

        if(searchCityValue === ""){
            alert("Please enter a valid City");
        } else {
            searchCityValue = $("#searchCity").val();
        }

        //Local Storage 
        userInput.push(searchCityValue);
        localStorage.setItem("cityNames", JSON.stringify(userInput));


        //clearing search input
        searchCity.val("");

        //fetching the geocode - latlong
        var urlGeoCode = 'http://api.openweathermap.org/geo/1.0/direct?q='+ searchCityValue +'&limit=1&appid=4c44e61b21706902de209f4f1358c84d'
    
        fetch(urlGeoCode)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);

                lat = data[0].lat;
                long = data[0].lon;

            //fecting the weather data
            var urlOpenWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ long +'&appid=4c44e61b21706902de209f4f1358c84d&units=imperial'

            fetch(urlOpenWeather)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);

                    //current weather forcast 
                    var cityName = data.city.name
                    var currentDate = data.list[0].dt_txt
                    var weatherIcon = data.list[0].weather[0].icon
                   
                    currentDay.text(cityName+' ('+ dayjs(currentDate).format('MM/DD/YYYY') +') ');

                    //Weather Icon
                    var Icon = $("<img>");
                    Icon.attr('src', 'http://openweathermap.org/img/w/' + weatherIcon + '.png');
                    currentDay.append(Icon);

                    //Temperature
                    var tempCurrent = $('<p>');
                    tempCurrent.text('Temp: ' + data.list[0].main.temp + '℉');
                    currentDay.append(tempCurrent);

                    //Wind
                    var wind = $('<p>');
                    wind.text('Wind: ' + data.list[0].wind.speed + ' MPH');
                    currentDay.append(wind);

                    //Humidity
                    var humidity = $('<p>');
                    humidity.text('Humidity: ' + data.list[0].main.humidity);
                    currentDay.append(humidity);
                    
              
                    // Day 1 Forcast
                    dailyWeatherForcast(dayOneWeather, 9, data);

                    // Day 2 Forcast
                    dailyWeatherForcast(dayTwoWeather, 17, data);

                    // Day 3 Forcast
                    dailyWeatherForcast(dayThreeWeather, 25, data);

                     // Day 4 Forcast
                     dailyWeatherForcast(dayFourWeather, 33, data);

                    // Day 5 Forcast
                    dailyWeatherForcast(dayFiveWeather, 39,data);



         //creating search history
        var cityNameArray = JSON.parse(localStorage.getItem("cityNames"));

        cityHistoryDiv.text("");

        $.each(cityNameArray, function(index, val){
                console.log(index, val)

                var cityHistoryBtn = $('<button>');
                cityHistoryBtn.text(cityNameArray[index]);
                cityHistoryBtn.addClass("btn btn-secondary mb-3");
                cityHistoryBtn.attr('id', 'HistoryBtn');
                cityHistoryDiv.append(cityHistoryBtn);

                cityHistoryBtn.click(function(event){
                event.preventDefault();

        //fetching historical geocode - latlong
        var urlGeoCode = 'http://api.openweathermap.org/geo/1.0/direct?q='+ val +'&limit=1&appid=4c44e61b21706902de209f4f1358c84d'
    
        fetch(urlGeoCode)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);


                lat = data[0].lat;
                long = data[0].lon;

            //fecting historical weather data
            var urlOpenWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ long +'&appid=4c44e61b21706902de209f4f1358c84d&units=imperial'

            fetch(urlOpenWeather)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);

                    //Historical current weather forcast 
                    var cityName = val
                    var currentDate = data.list[0].dt_txt
                    var weatherIcon = data.list[0].weather[0].icon
                    var weatherIconUrl = 'http://openweathermap.org/img/w/'

                    
                    currentDay.text(cityName+' ('+ dayjs(currentDate).format('MM/DD/YYYY') +') ');

                    //Weather Icon
                    var Icon = $("<img>");
                    Icon.attr('src', weatherIconUrl + weatherIcon + '.png');
                    currentDay.append(Icon);

                    //Temperature
                    var tempCurrent = $('<p>');
                    tempCurrent.text('Temp: ' + data.list[0].main.temp + '℉');
                    currentDay.append(tempCurrent);

                    //Wind
                    var wind = $('<p>');
                    wind.text('Wind: ' + data.list[0].wind.speed + ' MPH');
                    currentDay.append(wind);

                    //Humidity
                    var humidity = $('<p>');
                    humidity.text('Humidity: ' + data.list[0].main.humidity);
                    currentDay.append(humidity);

                // ---------------Historical Daily Forcast-------------------
                //Day One
                dailyWeatherForcast(dayOneWeather, 9, data);

                //Day Two
                dailyWeatherForcast(dayTwoWeather, 17, data);

                //Day Three
                dailyWeatherForcast(dayThreeWeather, 25, data);

                //Day Four       
                dailyWeatherForcast(dayFourWeather, 33, data);

                //Day Five
                dailyWeatherForcast(dayFiveWeather,  39, data)
                
                })

            })             

         });
                            
    })

})

})

 });

    var resetBtn = $("#resetBtn");

    resetBtn.click(function(event){
        event.preventDefault();
        localStorage.removeItem("cityNames");
        location.reload();
    })
    
});


// Open weather API Key: 4c44e61b21706902de209f4f1358c84d