//    function to get userIP
    function getIP() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", "https://api.ipify.org?format=json", true);
            request.onload = () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.stausText);
                }
            }
            request.onerror = () => {
                reject(request.stausText);
            }
            request.send();
        })
    }
    
//    function to get user location [ lat and long ] depending on user ip
 function getLoc(ipAddress) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", "http://api.ipstack.com/" + ipAddress.ip + "?access_key=f61df83c087f3c7f8fa2e3bb66d5711a", true);
            request.onload = () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.statusText);
                }
            }
            request.onerror = () => {
                reject(request.statusText);
            }
            request.send();
        })
    }  
    
//  function to get user weather status from his location.

    function getWeatherLoc(locationData) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + locationData.latitude +  "&lon=" + locationData.longitude + "&APPID=" + apiKey, true);
            request.onload = () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.statusText);
                }
            }
            request.onerror = () => {
                reject(request.statusText);
            }
            request.send();
        })
    }

//  function to get user city background
    function getCityBG(weatherstatus) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest;
            request.open("GET", "https://api.teleport.org/api/urban_areas/slug:" + weatherstatus.name.toLowerCase() + "/images/", true);
            request.onload = () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.statusText);
                }
            }
            request.onerror = () => {
                reject(request.statusText);
            }
            request.send();
        })
    }


function getUserLocation() {
    getIP().then(function(ipAddress){
        return getLoc(ipAddress);
    }).then(function(locationData) {
        return getWeatherLoc(locationData);
    }).then(function(weatherstatus) {
        let tempContainer = document.getElementById('temp');
        let descripContainer = document.getElementById('descrip');
        let textContainer = document.getElementById('cityName');
        let iconImg = document.getElementById('icon');
        
        let cityTemp = Math.round(weatherstatus.main.temp - 273.15) + '°C';
        let cityWeather = weatherstatus.weather;
        let cityName = weatherstatus.name;
        let countryFlag = weatherstatus.sys.country;
        let weatherIcon = cityWeather[0].icon;
        let weatherIconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
        
        
        textContainer.innerHTML = cityName;
        tempContainer.innerHTML = cityTemp;
        descripContainer.innerHTML = cityWeather[0].description;
        iconImg.setAttribute('src', weatherIconUrl);
        
        return getCityBG(weatherstatus);
    }).then(function(cityBgUrlLink) {
        
        if (matchMedia('(max-width: 900px)').matches) {
                let cityBg = cityBgUrlLink.photos[0].image.mobile;
                let bgUrl = 'url(' + cityBg + ')';
                mainContainer.style.backgroundImage = bgUrl;
        }
        
    }).catch(function(error) {
        console.log(error);
    });
}
