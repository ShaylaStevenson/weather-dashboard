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
               
                //clear current-results for new content
                currentResults.empty();

               
    
    
        
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





