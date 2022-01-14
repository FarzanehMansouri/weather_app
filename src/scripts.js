
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

function canl(url){
    axios.get(url).then( response => {  
      temp = Math.round(response.data.main.temp);
      document.querySelector(".degree").innerHTML = temp;
      document.querySelector(".cel").style.textDecoration = "underline";
      let weatherStatus =  response.data.weather[0].main.toLowerCase(); 
      if(weatherStatus === "Clouds"){
        document.querySelector(".today-weather-icon").src = "images/cloudy.gif";
        document.querySelector(".description").innerHTML = weatherStatus;
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";                                      
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
        document.querySelector(".illustarion").src = "images/cloudy2.jpg";      
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Don't forget: Beautiful sunsets need cloudy Skies";       
      }else if(weatherStatus === "snow"){
        document.querySelector(".today-weather-icon").src = "images/snow.gif";
        document.querySelector(".description").innerHTML = weatherStatus;
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";
        document.querySelector(".illustarion").src = "images/snow2.jpg";      
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Kindness is like snow- It beautifies everything it covers"; 
      }
      else if(weatherStatus === "rain"){
        document.querySelector(".today-weather-icon").src = "images/rainy.gif";
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";
        document.querySelector(".description").innerHTML = weatherStatus;
        document.querySelector(".illustarion").src = "images/rain2.png";      
        document.querySelector(".glow").innerHTML = "The rainy day presents itself as a gift for those in love";       
      }else{
        document.querySelector(".today-weather-icon").src = "images/sunny.gif";
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
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

let far = document.querySelector(".far");
far.addEventListener("click",function(event){
  let degree = document.querySelector(".degree");
  let degree_far = Math.round( temp *  9/5 + 32);
  degree.innerHTML = degree_far;
  document.querySelector(".far").style.textDecoration = "underline"; 
  document.querySelector(".far").style.color = "blue";
  document.querySelector(".far").style.cursor = "default";
  document.querySelector(".cel").style.textDecoration = "none"; 
  document.querySelector(".cel").style.color = "black";
  document.querySelector(".cel").style.cursor = "pointer";
});

let cel = document.querySelector(".cel");
cel.addEventListener("click",function(event){
  let degree = document.querySelector(".degree");
  degree.innerHTML = temp;
  document.querySelector(".cel").style.textDecoration = "underline"; 
  document.querySelector(".cel").style.color = "blue";
  document.querySelector(".cel").style.cursor = "default";
  document.querySelector(".far").style.textDecoration = "none"; 
  document.querySelector(".far").style.color = "black";
  document.querySelector(".far").style.cursor = "pointer";
});

