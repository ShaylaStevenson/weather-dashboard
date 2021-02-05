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
    var searchBtn = $('#search-btn');
    var historyList = $('#history-list');
    var currentResults = $('#current-results');
    var forcastResults = $('#forcast-results');


    //get the value of the city search
    function buttonHandel(event) {
        event.preventDefault();
        var city = $('#city-input').val();

        searchCurrentApi(city);
    }

    //or if list item is clicked, run that value through search
    $(document).on("click", "li", function() {
        var pastCity = $(this);
        searchCurrentApi(pastCity.text());
    })

    //function to generate data used for the current weather display
    function searchCurrentApi(city, uvEl) {
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

                //will be used to find uv index
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                //clear current-results for new content
                currentResults.empty();

                //get current date from momentjs
                var currentDate = moment().format('MM[/]DD[/]YY');
                console.log(currentDate);

                //create html elements for current weather section
                var card = $('<div>').addClass('card');
                var cardBody = $('<div>').addClass('card-body p-1');

                var titleEl = $('<h3>').addClass('card-title');
                titleEl.text(data.name + ' ' + currentDate);
                //var cardEl = $('<div>').classList.add("");
                //var cardBodyEL = $('<div>');
                var windEl = $('<p>').addClass("card-text");
                windEl.text('Wind Speed: ' + data.wind.speed + ' mph');
        
                var humidityEl = $('<p>').addClass("card-text");
                humidityEl.text('Humidity: ' + data.main.humidity + '%');

                var tempEl = $('<p>').addClass("card-text");
                tempEl.text('Temperature: ' + data.main.temp + '\xB0F');

                //display the weather icon
                var iconCode = data.weather[0].icon;
                console.log('iconCode value ' + iconCode);
                var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
                var imgEl = $('<img>').attr('src', iconUrl);
                
                //append
                cardBody.append(titleEl);
                titleEl.append(imgEl);
                cardBody.append(windEl, humidityEl, tempEl, uvEl);
                card.append(cardBody);
                currentResults.append(card);
                
                searchForcastApi(city)
                saveCity(city);
                findUv(lat, lon, cardBody);
                
            })
    }

    //function to generate data to be used in the forcast weather section
    function searchForcastApi(city) {
        console.log('forcast: ' + city);

        //clear current-results for new content
        forcastResults.empty();

        var requestForcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=e3171896dd984662b81687f80e4b2acd';
        //fetch with new customized url
        fetch(requestForcastUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                //I need to select only one time array per day: noon 
                for (var i = 2; i < data.list.length; i += 8) {
                    
                    console.log('date ' + data.list[i].dt_txt);
                    console.log('icon ' + data.list[i].weather[0].icon);
                    console.log('temp ' + data.list[i].main.temp + '\xB0F');
                    console.log('humidity ' + data.list[i].main.humidity);

                    //display the weather icon
                    var forcastIcon = data.list[i].weather[0].icon;
                    console.log('iconCode value ' + forcastIcon);
                    var forcastIconUrl = 'https://openweathermap.org/img/w/' + forcastIcon + '.png';
                    var forcastImageEl = $('<img>').attr('src', forcastIconUrl);
                    
                    
                        //create html elements for forcast section
                        var colEl = $('<div>').addClass('col-md-2 mb-1 p-0');

                        var cardEl = $('<div>').addClass('card');
                        var cardBodyEl = $('<div>').addClass('card-body p-1');

                        var dateEl = $('<h4>').addClass('card-title');
                        dateEl.text(new Date(data.list[i].dt_txt).toLocaleDateString());

                        var tempEl = $('<p>').addClass('card-text');
                        tempEl.text('Temp: ' + data.list[i].main.temp + '\xB0F');

                        var humidEl = $('<p>').addClass('card-text');
                        humidEl.text('Humidity: ' + data.list[i].main.humidity + '%');

                        colEl.append(cardEl);
                        cardEl.append(cardBodyEl);
                        cardBodyEl.append(dateEl);
                        dateEl.append(forcastImageEl);
                        cardBodyEl.append(tempEl, humidEl);
                        forcastResults.append(colEl);
                         
                }

            })

        
    }


    //for uv index 
    function findUv(lat, lon, cardBody) {
        console.log('lat ' + lat);
        console.log('lon' + lon);

        //new customized url
        var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3171896dd984662b81687f80e4b2acd';
    
        fetch(uvUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log('uvi' + data.value);

            //create uv element
            var uvEl = $('<p>').addClass('card-text');
            uvEl.text('UV Index: ' + data.value);

            console.log('uvel ' + uvEl);
            console.log(typeof uvEl);

            cardBody.append(uvEl);

            
            //console.log claims this is not a function....:(
            //var label = $('<span>').addClass('label label-success');
            //uvEl.insertAdjacentElement('afterend', label);
            
            //label to alert uv status and append 
            var label = $('<span>').addClass('label');

            if (data.value < 3) {
                label.addClass('label-success bg-success').text(' low ');
                uvEl.append(label);
            } else if (data.value < 5) {
                label.addClass('label-warning bg-warning').text(' moderate ');
                uvEl.append(label);
            } else {
                label.addClass('label-danger bg-danger').text(' high ');
                uvEl.append(label);
            }

        })
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




    //run it! 
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
