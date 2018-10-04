$(document).ready(() => {
  $("#search-btn").click(getAddress);
});

function getAddress(event) {
  event.preventDefault();
  let address = $('#search-txt').val();
  getData(address);
}

function getData(address) {
  event.preventDefault();

  const url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=X0zWFGGYgpM2le8QhIXr&app_code=zneu_02aXYwVwhdfoMhlEQ&searchtext=${address}`;

  /* Acessar API com Ajax */
  $.ajax({
    type: 'GET',
    url, //nao precisa repetir o valor url pois tem o mesmo nome da chave
    success: getAddressData,
    error: erro
  });
}

function getAddressData(response) {
  let location = response.Response.View[0].Result[0].Location;

  let addressData = {
    latitude: location.DisplayPosition.Latitude,
    longitude: location.DisplayPosition.Longitude,
    cidade: location.Address.City
  }
  return addressData;
}

function erro() {
  alert('Fail :(');
}




function calculateRouteFromAtoB (platform) {
  let data = getAddressData();

  var router = platform.getRoutingService(),
    routeRequestParams = {
      mode: 'fastest;car',
      representation: 'display',
      routeattributes : 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action',
      waypoint0: '-23.5576,-46.6623',
      waypoint1: 'data.latitude,data.longitude'
    };


  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}

function onSuccess(result) {
  var route = result.response.route[0];

  addRouteShapeToMap(route);
  addManueversToMap(route);

  addWaypointsToPanel(route.waypoint);
  addManueversToPanel(route);
  addSummaryToPanel(route.summary);

}

function onError(error) {
  alert('Favor verificar o endereço cadastrado');
}




var mapContainer = document.getElementById('map');
  // routeInstructionsContainer = document.getElementById('panel');


var platform = new H.service.Platform({
  app_id: 'X0zWFGGYgpM2le8QhIXr',
  app_code: 'zneu_02aXYwVwhdfoMhlEQ',
  useHTTPS: true
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});


var map = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: {lat:-14.235, lng:-51.9253},
  zoom: 13,
  pixelRatio: pixelRatio
});

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


var ui = H.ui.UI.createDefault(map, defaultLayers);
var bubble;

function openBubble(position, text){
 if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,

      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}


function addRouteShapeToMap(route){
  var lineString = new H.geo.LineString(),
    routeShape = route.shape,
    polyline;

  routeShape.forEach(function(point) {
    var parts = point.split(',');
    lineString.pushLatLngAlt(parts[0], parts[1]);
  });

  polyline = new H.map.Polyline(lineString, {
    style: {
      lineWidth: 4,
      strokeColor: 'rgba(0, 128, 255, 0.7)'
    }
  });

  map.addObject(polyline);

  map.setViewBounds(polyline.getBounds(), true);
}


function addManueversToMap(route){
  var svgMarkup = '<svg width="18" height="18" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1"  />' +
    '</svg>',
    dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
    group = new  H.map.Group(),
    i,
    j;

  // Add a marker for each maneuver
  for (i = 0;  i < route.leg.length; i += 1) {
    for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
      // Get the next maneuver.
      maneuver = route.leg[i].maneuver[j];
      // Add a marker to the maneuvers group
      var marker =  new H.map.Marker({
        lat: maneuver.position.latitude,
        lng: maneuver.position.longitude} ,
        {icon: dotIcon});
      marker.instruction = maneuver.instruction;
      group.addObject(marker);
    }
  }

  group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getPosition());
    openBubble(
       evt.target.getPosition(), evt.target.instruction);
  }, false);


  map.addObject(group);
}



function addManueversToPanel(route){



  var nodeOL = document.createElement('ol'),
    i,
    j;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';
  nodeOL.className = 'directions';

  for (i = 0;  i < route.leg.length; i += 1) {
    for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {

      maneuver = route.leg[i].maneuver[j];

      var li = document.createElement('li'),
        spanArrow = document.createElement('span'),
        spanInstruction = document.createElement('span');

      spanArrow.className = 'arrow '  + maneuver.action;
      spanInstruction.innerHTML = maneuver.instruction;
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);
    }
  }


}

calculateRouteFromAtoB (platform);
