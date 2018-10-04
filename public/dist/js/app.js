$(document).ready(function(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=sao paulo,br&APPID=fe9fa986796faa87ef8b7a803ed0197d&units=metric&lang=pt")
    .then(function(response) { return response.json(); })
    .then(function(data) {createAll(data.list) });
  
});
function createAll(weatherListData){
    
   let diaAtual = weatherListData[0].main.temp;
   let tempMin = weatherListData[0].main.temp_min;
   let tempMax = weatherListData[0].main.temp_max;
   let description = weatherListData[0].weather[0].description;
   
   
   $('#weather').append(`

  <h3>Temperatura.: ${diaAtual} °C</h3>
  <h3>Mín.: ${tempMin} °C</h3>
  <h3>Máx.: ${tempMax} °C</h3>
  <h3>  ${description}</h3>`);


}
