let cityNames;
let apiKey = "a8a52e1569215c7eb8d5af010713b946";


function getWeather() {
    
    let searchField = document.getElementById('search');
    let textContainer = document.getElementById('text');
    let cityNameSearch = searchField.value;

  
    let xhr = new XMLHttpRequest(); // creat a request    
    let countryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameSearch + "&APPID=" + apiKey;
    xhr.open("GET", countryUrl); // GET the request
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) { //check if status = 200 && statusText = OK
            weatherSituation = JSON.parse(xhr.response)

            
            let cityTemp = Math.round(weatherSituation.main.temp - 273.15) + '°C';
            let cityWeather = weatherSituation.weather;
            let cityName = weatherSituation.name;
            let countryFlag = weatherSituation.sys.country;
            let countryFlagImgUrl = "https://www.countryflags.io/"+ countryFlag +"/flat/64.png"
            let flagImg = document.getElementById('flag');            
            
            let weatherIcon = cityWeather[0].icon;
            let weatherIconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
            let iconImg = document.getElementById('icon');
            
            
            textContainer.innerHTML = cityName  + " : " +  cityWeather[0].description + " Temp is : " +  cityTemp ;
            flagImg.setAttribute('src', countryFlagImgUrl);
            iconImg.setAttribute('src', weatherIconUrl);

//            console.log(xhr.status);
//            console.log(xhr.statusText); 
            console.log(weatherSituation); 
        }

        if (xhr.readyState == 4 && xhr.status == 404) {
                alert('Not Fount Please try again');
        }

    }
    
    if (cityNameSearch.length == 0) {
            alert('Pleas Enter city Name');
    } 
    
    xhr.send(null);
}



//temperature = Math.round(data.main.temp - 273.15) + '°C';
//temperature = Math.round(((data.main.temp - 273.15) * 1.8) + 32) + '°F';





function GETbg() {
    let searchField = document.getElementById('search');
    let cityNameSearch = searchField.value.split(' ').join('-');
    
    let xhr = new XMLHttpRequest(); // creat a request    
    let cityBgUrl = "https://api.teleport.org/api/urban_areas/slug:" + cityNameSearch + "/images/"
    xhr.open("GET", cityBgUrl); // GET the request
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) { //check if status = 200 && statusText = OK
            cityBgUrlData = JSON.parse(xhr.response)
            
            let cityBg = cityBgUrlData.photos[0].image.mobile;
            let cityBgElement = document.getElementById('cityBG');
            cityBgElement.setAttribute('src', cityBg);
            
            
//            console.log(xhr.status);
//            console.log(xhr.statusText); 
        }
    }

    xhr.send(null);
}
