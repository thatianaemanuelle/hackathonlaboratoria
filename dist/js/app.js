$(document).ready(function(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=campinas,br&APPID=fe9fa986796faa87ef8b7a803ed0197d&units=metric&lang=pt")
    .then(function(response) { return response.json(); })
    .then(function(data) { createAll(weathers.list) });



  function createAll(weatherList) {
      $('#weather').html('');

         $.each(weatherArray, function( weathers){
             $('<img>')
             .attr('', weathers.list)
             .attr('', weathers[0])
             .addClass(weatherToday)
             .appendTo('#weather');
         })

  }

    return createAll(weatherList);

});