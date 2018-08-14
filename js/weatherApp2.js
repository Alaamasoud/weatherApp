let cityNames;
let apiKey = "a8a52e1569215c7eb8d5af010713b946";
let mainContainer = document.getElementById('wheatherBlock');
let searchField = document.getElementById('search');

function getWeather() {
    
    let textContainer = document.getElementById('cityName');
    let tempContainer = document.getElementById('temp');
    let descripContainer = document.getElementById('descrip');
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
            
            textContainer.innerHTML = cityName;
            tempContainer.innerHTML = cityTemp;
            descripContainer.innerHTML = cityWeather[0].description;
            iconImg.setAttribute('src', weatherIconUrl);
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


if (matchMedia('(max-width: 900px)').matches) {
    function GETbg() {
        let cityNameSearch = searchField.value.split(' ').join('-');


        if (cityNameSearch == 'damascus') {
            mainContainer.style.backgroundImage = 'url("icons/damascus.jpg")';
        }

        let xhr = new XMLHttpRequest(); // creat a request    
        let cityBgUrl = "https://api.teleport.org/api/urban_areas/slug:" + cityNameSearch + "/images/"
        xhr.open("GET", cityBgUrl); // GET the request

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) { //check if status = 200 && statusText = OK
                cityBgUrlData = JSON.parse(xhr.response)

                let cityBg = cityBgUrlData.photos[0].image.mobile;
                let bgUrl = 'url(' + cityBg + ')';
                mainContainer.style.backgroundImage = bgUrl;
                console.log(cityBgUrlData);
            }
        }

        xhr.send(null);
    }
}

function getTime() {
    let hours = new Date().getHours();
    let mainContainer = document.getElementById('wheatherBlock');

    if(hours >= 1 && hours <= 12){
            mainContainer.classList.toggle('morning');
        }else if(hours >= 12 && hours <= 16){
            mainContainer.classList.toggle('noon');
        }else if(hours >= 16 && hours <= 24){
            mainContainer.classList.toggle('night');
        }
}

//Enter Key

searchField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("getBtn").click();
    }
});
