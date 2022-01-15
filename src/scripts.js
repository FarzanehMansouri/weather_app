
// function show_date_time(){
//   let date = new Date();
//   let day = date.getDay();
//   let week_days = new Array( "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" );
//   let hour = date.getHours()+' : '+date.getMinutes();
//   document.querySelector('.date-time').innerHTML = week_days[day]+"&nbsp;&nbsp;"+hour;
//   document.querySelector(".cel").style.textDecoration = "underline"; 
// }
let temp = "";
let apiKey = "350ba39f1ebe33ca73c995004955f157";

function getImageSrc(desc){
  if(desc=='clouds')
    return "images/cloudy.gif";
  else if(desc=='snow')
    return "images/snow.gif";  
  else if(desc=='rain')
    return "images/rainy.gif";
  else 
    return "images/sunny.gif";  
}

function getDay(time){
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function showNextForcasts(data){
  let next_forcast_row = "";    
  let i = 0;
  while( i < 6 ){
    let imgSrc = getImageSrc(data.daily[i].weather[0].main.toLowerCase());
    next_forcast_row += `
      <div class="col-2 next-forcast">
        <p class="next-forcast-day">${getDay(data.daily[i].dt)}</p>
        <p>
          <img class="next-forcast-image" src="${imgSrc}" alt="" />
        </p>
        <p>
          <span class="next-forcast-max">${Math.round(data.daily[i].temp.max)}° &nbsp;&nbsp;</span>
          <span class="next-forcast-min">${Math.round(data.daily[i].temp.min)}°</span>
        </p>
      </div>`;
      i++;
  }
  document.querySelector(".next-forcast-row").innerHTML = next_forcast_row;
}

function canl(url){
    axios.get(url).then( response => {  
      temp = Math.round(response.data.main.temp);
      document.querySelector(".degree").innerHTML = temp;
      document.querySelector(".cel").style.textDecoration = "underline";
      let weatherStatus =  response.data.weather[0].main.toLowerCase(); 
      if(weatherStatus === "clouds"){
        document.querySelector(".today-weather-icon").src = "images/cloudy.gif";
        document.querySelector(".description").innerHTML = weatherStatus;
        document.querySelector(".wind").innerHTML = "Wind: "+Math.round(response.data.wind.speed)+" km/h";                                      
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity+" %";
        document.querySelector(".illustarion").src = "images/cloudy2.jpg";      
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Don't forget: Beautiful sunsets need cloudy Skies";       
      }else if(weatherStatus === "snow"){
        document.querySelector(".today-weather-icon").src = "images/snow.gif";
        document.querySelector(".description").innerHTML = weatherStatus;
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity+" %";
        document.querySelector(".wind").innerHTML = "Wind: "+Math.round(response.data.wind.speed)+" km/h";
        document.querySelector(".illustarion").src = "images/snow2.jpg";      
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Kindness is like snow- It beautifies everything it covers"; 
      }
      else if(weatherStatus === "rain"){
        document.querySelector(".today-weather-icon").src = "images/rainy.gif";
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity+" %";
        document.querySelector(".wind").innerHTML = "Wind: "+Math.round(response.data.wind.speed)+" km/h";
        document.querySelector(".description").innerHTML = weatherStatus;
        document.querySelector(".illustarion").src = "images/rain2.png";      
        document.querySelector(".glow").innerHTML = "The rainy day presents itself as a gift for those in love";       
      }else{
        document.querySelector(".today-weather-icon").src = "images/sunny.gif";
        document.querySelector(".humidity").innerHTML = "Humidity: "+Math.round(response.data.main.humidity)+" %";
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";
        document.querySelector(".description").innerHTML = weatherStatus;
        document.querySelector(".illustarion").src = "images/sunny2.jpg";   
        document.querySelector(".today-weather-icon").style.width = "160px ";   
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Be like the sun; never let the opinions of those who hate you dull your shine."; 
      }
      document.querySelector("#search-text").value = "";
      let city = response.data.name;
      document.querySelector(".city-name").innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`).then( responseNextForcast => {
        showNextForcasts(responseNextForcast.data);
      });
  }).catch(error => {
      document.querySelector("#search-text").value = "";
      alert("City not found!");
  });
}

let search_weather_form = document.querySelector("#search_weather_form");
search_weather_form.addEventListener("submit",function(event){
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  canl(url);
  
});

let magnifier_form = document.querySelector("#magnifier");
magnifier_form.addEventListener("click",function(event){
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  canl(url);
  
});

let location_form = document.querySelector("#location");
location_form.addEventListener("click",function(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        canl(url);
      });  
});

canl(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);




