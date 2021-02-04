//Todos
//Use form inputs to create HTML page
//Display current and future conditions
//Search history list
//Current weather includes: city name, date, icon, temperature, humidity, windspeed, uv index
//uv index changes color for favorable, moderate, severe
//future weather includes: 5 days, date, icon, temp, humidity
//When I click on search history item, get current and future weather

$(document).ready(function() {


    //universal variables
    var apiKey = 'e3171896dd984662b81687f80e4b2acd';
    var searchBtn = $('#search-btn');
    var searchEl = $('#search-el');
    var historyList = $('#history-list');
    var currentResults = $('#current-results');
    var forcastResults = $('#forcast-results');


    //get the value of the city search
    function buttonHandel(event) {
        event.preventDefault();
        var city = $('#city-input').val();
        searchCurrentApi(city);
    }

    //function to generate data used for the current weather display
    function searchCurrentApi(city) {
        console.log(city);
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=e3171896dd984662b81687f80e4b2acd';
        //fetch with customized url
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //just checking up on things :)
                console.log(data); 
                console.log('name/title ' + data.name);
                console.log('wind speed ' + data.wind.speed);
                console.log('humidity ' + data.main.humidity);
                console.log('temp ' + data.main.temp); 
                console.log('longitude ' + data.coord.lon);
                console.log('latitude ' + data.coord.lat);

                //clear current-results for new content
                currentResults.empty();

                //get current date from momentjs
                var currentDate = moment().format('MM[/]DD[/]YY');
                console.log(currentDate);

                //create html elements for current weather section
                var titleEl = $('<h3>').addClass("card-title");
                titleEl.text(data.name + ' ' + currentDate);
                //var cardEl = $('<div>').classList.add("");
                //var cardBodyEL = $('<div>');
                var windEl = $('<p>').addClass("card-text");
                windEl.text('Wind Speed: ' + data.wind.speed + ' mph');
        
                var humidityEl = $('<p>').addClass("card-text");
                humidityEl.text('Humidity: ' + data.main.humidity);

                var tempEl = $('<p>').addClass("card-text");
                tempEl.text('Temperature :' + data.main.temp + '&#176 ' + 'F');

                //display the weather icon
                var iconCode = data.weather[0].icon;
                console.log('iconCode value ' + iconCode);
                var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
                var imgEl = $('<img>').attr('src', iconUrl);
                
                //append to the card-body class
                currentResults.append(titleEl, windEl, humidityEl, tempEl, imgEl);
                
                searchForcastApi(city)
                saveCity(city);
                
            })
    }

    //function to generate data to be used in the forcast weather section
    function searchForcastApi(city) {
        console.log('forcast: ' + city);
        //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    }

    
    //Function to save city to localStorage
    function saveCity(city) {
        var existingCities = JSON.parse(localStorage.getItem('allCities'));
        if (existingCities == null) {   
            existingCities = [];
        }
         //
         var historyObj = {"city": city};
         localStorage.setItem('historyObj', JSON.stringify(historyObj));
         existingCities.unshift(historyObj);
         localStorage.setItem('allCities', JSON.stringify(existingCities));
         console.log(existingCities);
         //console.log(allCities);
         //console.log(typeof allCities);
         //
        displayHistory(existingCities, city);
    };   

    
    //function to create and append history items
    function displayHistory(existingCities, city) {     
        console.log(typeof existingCities);

        for (var i = 0; i < existingCities.length; i++) {
            var cityHistory = $('<li>').text(city).addClass('history-item').attr('value', 'existingCities[i]');
            historyList.append(cityHistory[i]);
         }

        // $.each(existingCities, function(index, value) {
        //     var cityHistory = $('<li>').text(value).addClass('history-item').attr('value', 'existingCities[i]');
        //     historyList.append(cityHistory);
        // })

        
        
        //clear input field
        $('#city-input').val("");
    }
       
    


    searchBtn.on("click", buttonHandel);


  
        

    

   










//End Script HERE
})


//gets the "current api"
// var requestCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
// var currentResultsEl = $('#current-results');

//history list

//create html elements for display
// function printResults(resultObj) {
//     console.log(resultObj);

//     var resultCard = $("<div>");
//     resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

//     var resultBody = $("<div>");
//     resultBody.classList.add('card-body');
//     resultCard.append(resultBody);

//     var titleEl = $('<h3>');
//     titleEl.textContent = resultObj.city;

//     var bodyContentEl = $('<p>');
//     bodyContentEl.innerHTML +=
//         '<strong> Date: ' + resultObj.date + '</strong><br/>';
// }

        //not complete
