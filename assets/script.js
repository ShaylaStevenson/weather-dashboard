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

                 //display the weather icon
                 var iconCode = data.weather[0].icon;
                 console.log('iconCode value ' + iconCode);
                 var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
                 var imgEl = $('<img>').attr('src', iconUrl);
                 currentResults.append(imgEl);
 
             })
 
                 //clear current-results for new content
                 currentResults.empty();
 
                 //create html elements
                 var titleEl = $('<h3>');
                 var cardEl = $('<div>');
                 var cardBodyEL = $('<div>');
                 var windEl = $('<p>');
                 var humidityEl = $('<p>');
                 var tempEl = $('<p>');
                 var imgEl = $('<img>');
                //clear current-results for new content
                currentResults.empty();

               
    
    
        
        //clear input field
        $('#city-input').val("");
    }
       
    


    searchBtn.on("click", buttonHandel);


  
        

    

   










//End Script HERE
})



