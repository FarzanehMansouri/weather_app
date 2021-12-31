
// function show_date_time(){
//   let date = new Date();
//   let day = date.getDay();
//   let week_days = new Array( "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" );
//   let hour = date.getHours()+' : '+date.getMinutes();
//   document.querySelector('.date-time').innerHTML = week_days[day]+"&nbsp;&nbsp;"+hour;
//   document.querySelector(".cel").style.textDecoration = "underline"; 
// }

function canl(url){
    axios.get(url).then( response => {  
      document.querySelector(".degree").innerHTML = Math.round(response.data.main.temp);
      document.querySelector(".cel").style.textDecoration = "underline";
      if(response.data.weather[0].main === "Clouds"){
        document.querySelector(".image").src = "images/cloudy.gif";
        document.querySelector(".description").innerHTML = response.data.weather[0].main;
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
        document.querySelector(".illustarion").src = "images/cloudy2.jpg";      
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Don't forget: Beautiful sunsets need cloudy Skies";       
      }else if(response.data.weather[0].main === "snow"){
        document.querySelector(".image").src = "images/snow.gif";
        document.querySelector(".description").innerHTML = response.data.weather[0].main;
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";
        document.querySelector(".illustarion").src = "images/snow2.jpg";      
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Time for making a snowman"; 
      }
      else if(response.data.weather[0].main === "rain"){
        document.querySelector(".image").src = "images/rainy.gif";
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";
        document.querySelector(".description").innerHTML = response.data.weather[0].main;
        document.querySelector(".illustarion").src = "images/rain2.png";      
        document.querySelector(".glow").innerHTML = "The rainy day presents itself as a gift for those in love";       
      }else{
        document.querySelector(".image").src = "images/sunny.gif";
        document.querySelector(".humidity").innerHTML = "Humidity: "+response.data.main.humidity;
        document.querySelector(".wind").innerHTML = "Wind: "+response.data.wind.speed+" km/h";
        document.querySelector(".description").innerHTML = response.data.weather[0].main;
        document.querySelector(".illustarion").src = "images/sunny2.jpg";   
        document.querySelector(".image").style.width = "160px ";   
        document.querySelector(".illustarion").style.width = "315px"; 
        document.querySelector(".glow").innerHTML = "Be like the sun; never let the opinions of those who hate you dull your shine."; 
      }
      document.querySelector("#selectedPlace").value = "";
      let city = response.data.name;
      document.querySelector(".city").innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
  }).catch(error => {
      document.querySelector("#selectedPlace").value = "";
      alert("City not found!");
  });
}

let search_weather_form = document.querySelector("#search_weather_form");
search_weather_form.addEventListener("submit",function(event){
  event.preventDefault();
  let city = document.querySelector("#selectedPlace").value;
  let apiKey = "350ba39f1ebe33ca73c995004955f157";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  canl(url);
  
});

let magnifier_form = document.querySelector("#magnifier");
magnifier_form.addEventListener("click",function(event){
  event.preventDefault();
  let city = document.querySelector("#selectedPlace").value;
  let apiKey = "350ba39f1ebe33ca73c995004955f157";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  canl(url);
  
});

let location_form = document.querySelector("#location");
location_form.addEventListener("click",function(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let apiKey = "350ba39f1ebe33ca73c995004955f157";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        canl(url);
      });  
});

let far = document.querySelector(".far");
far.addEventListener("click",function(event){
  let degree = document.querySelector(".degree");
  let degree_far = Math.round( degree.innerHTML *  9/5 + 32);
  degree.innerHTML = degree_far;
  document.querySelector(".far").style.textDecoration = "underline"; 
  document.querySelector(".cel").style.textDecoration = ""; 
});

let cel = document.querySelector(".cel");
cel.addEventListener("click",function(event){
  let degree = document.querySelector(".degree");
  let degree_cel = Math.round( (degree.innerHTML - 32) * 5/9);
  degree.innerHTML = degree_cel;
  document.querySelector(".cel").style.textDecoration = "underline"; 
  document.querySelector(".far").style.textDecoration = ""; 
});

