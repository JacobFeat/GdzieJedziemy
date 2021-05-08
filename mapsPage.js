const libiaz = {
  lat: 50.104,
  lng: 19.316
};

const krakow = {
  lat: 50.049683,
  lng: 19.944544
}

const center = {
  lat: 51.957540,
  lng: 18.986491
}

let myPlaceArray = [];

fetch('myPlaceArray.json')
  .then(blob => blob.json())
  .then(data => myPlaceArray.push(...data));

const markers = [];
let counter = 1;
const originPlaceBtn = document.querySelector('.lookup-icon');
const originInput = document.querySelector('.origin-input');
const closeSearch = document.querySelector('.close-search');
const carModeBtn = document.querySelector('.car-mode');
const bikeModeBtn = document.querySelector('.bike-mode');
const walkModeBtn = document.querySelector('.walk-mode');
const distanceField = document.querySelector('.distance-display');



//add delete's input button when input is filling
originInput.addEventListener('keyup', () => {
  if (originInput.value != "") {
    closeSearch.classList.add('close-search-active');
  } else {
    closeSearch.classList.remove('close-search-active');
  }
});
//
// originInput.addEventListener('focusin', () => {
//     closeSearch.classList.add('close-search-active');
// });
// originInput.addEventListener('focusout', () => {
//     closeSearch.classList.remove('close-search-active');
// });

closeSearch.addEventListener('click', () => {
  originInput.value = "";
  closeSearch.classList.remove('close-search-active');
  originInput.focus();
});

function initMap() {
  const optionsMap = {
    // mapId: "8e0a97af9386fef",
    zoom: 7,
    center: center,
    fullscreenControl: false,
    mapTypeControl: false,
    // mapTypeId: "satellite",
    minZoom: 3,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#616161"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f5f5"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#bdbdbd"
        }]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#757575"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#757575"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dadada"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#616161"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c9c9c9"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      }
    ]
  };

  const map = new google.maps.Map(document.getElementById("map"), optionsMap);
  const locationButton = document.querySelector('.my-location-btn');

  //add autocomplete feature
  const optionAutocomplete = {
    types: ['(cities)'],
    componentRestrictions: {
      country: "pl"
    },
  }
  const autocomplete = new google.maps.places.Autocomplete(originInput, optionAutocomplete);

  const infoWindow = new google.maps.InfoWindow();

  //set DRIVING as a default travel mode
  window.localStorage.setItem('currentTravelMode', 'DRIVING');
  carModeBtn.classList.add('drive-mode-active');

  //declare a object that we use get a result for our request
  var directionsService = new google.maps.DirectionsService();
  //declare a object that allow us to display route on the map
  var directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  //declare a object that we use to change coords to name of place
  const geocoder = new google.maps.Geocoder;


  // const onChangeHandler = function() {
  //   calcRoute(directionsService, directionsRenderer, krakow, 'DRIVING');
  // };

  // document.querySelector('.route-btn').addEventListener('click', onChangeHandler);
  //
  setTimeout(function(){
    myPlaceArray.forEach(place => {
      setTimeout(function(){addMarker(place);},counter*200);
      counter++;
    });
  }, 100);


  //make array where all infoWindows will be stored
  const infoWindows = [];

  //add marker on the map
  function addMarker(city) {
    const marker = new google.maps.Marker({
      position: city.coords,
      map: map,
      icon: 'images/mint-marker-shadow.svg',
    });

    markers.push(marker);
    marker.setAnimation(google.maps.Animation.DROP);

    //add content to infoWindow
    const cityContent = `
    <img class="place-img" src="/images/${city.imgSource}" alt="image of place">
    <p class="place">${city.name}</p>
    <button class="place-btn">Jak dojechać</button>
    `;

    if (city.name) {
      const infoWindow = new google.maps.InfoWindow({
        content: cityContent
      });

      //display infoWindow
      marker.addListener('click', function(e) {
        infoWindows.push(infoWindow);
        //close all infoWindow
        infoWindows.forEach(infoWindow => {
          infoWindow.close();
        });
        //open just one infoWindow
        infoWindow.open(map, marker);
        setTimeout(function() {
          map.panTo(city.coords);
          var placeBtn = document.querySelector('.place-btn');
          placeBtn.addEventListener('click', () => {

            //take coords of choosen place
            const destinationCoords = `{"lat": ${city.coords.lat}, "lng": ${city.coords.lng}}`;
            //json parse them to the object
            const jsonDestinationCoords = JSON.parse(destinationCoords);
            if(window.localStorage.getItem('originPlace')){
              //get travel mode from localStorage and put to the calcRoute
              const travelMode = window.localStorage.getItem('currentTravelMode');
              const originPlace = window.localStorage.getItem('originPlace');

              calcRoute(directionsService, directionsRenderer, originPlace, jsonDestinationCoords, travelMode);
              infoWindow.close();
            }
            else{
              alert('Wybierz miejsce początkowe...')
            }

            //save coords to localStorage
            window.localStorage.setItem('currentDestination', destinationCoords);
          });
        }, 100);
      })
    }
  }

  function setMapOnAll(map){
    for(let i=0; i<markers.length; i++){
      markers[i].setMap(map);
    }
  }

  function clearMarkers(){
    setMapOnAll(null);
  }


  window.addEventListener('load', e => {
    //get origin place on load
    const originPlace = window.localStorage.getItem('originPlace');
    originInput.value = originPlace;
    //if coordinates are in input value, don't show them
    // if(originInput.value.includes("object")){
    //   originInput.value = "Moja lokalizacja";
    // }
    closeSearch.classList.add('close-search-active');

    //when page is loading and place's route button was clicked, show route
    if (window.localStorage.getItem('currentDestination')) {
      const currentDestination = window.localStorage.getItem('currentDestination');
      const jsonDestinationCoords = JSON.parse(currentDestination);
      calcRoute(directionsService, directionsRenderer, originInput.value, jsonDestinationCoords, 'DRIVING');
      // localStorage.removeItem('buttonCurrentDestination');

      // setTimeout(calcRoute.bind(null, directionsService, directionsRenderer, originInput.value, jsonDestinationCoords, 'DRIVING'), 150);
      // setTimeout(function(){localStorage.removeItem('button, CurrentDestination');}, 300);
    }

  });

  //find my location
  locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          const infoWindowContent = `
          <div class="my-position-box">

          <button type="button" class="my-position-btn">Stąd ruszam</button>
          </div>
          `;
          infoWindow.setContent(infoWindowContent);
          // infoWindow.open(map);
          map.setZoom(15);
          map.panTo(pos);
          // if(typeof marker !== 'undefined') {
          //   marker.setMap(null)
          // };

          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            // animation: google.maps.Animation.BOUNCE,
            icon: 'images/hereStrokeBlack.svg',
          });
          // setTimeout(function(){marker.setAnimation(google.maps.Animation.DROP);}, 200);
          marker.addListener('click', (e) => {
            infoWindow.open(map);
            //style infoWindow
            setTimeout(styleInfoWindow, 0);
            function styleInfoWindow() {
              const closeBtn = document.querySelector('.my-position-box').parentElement.parentElement.parentElement.querySelector('.gm-ui-hover-effect');
              const myPositionBtn = document.querySelector('.my-position-btn');
              closeBtn.style.transform = "scale(0.7)";
              closeBtn.style.transition = "0.2s";
              document.querySelector('.my-position-box').parentElement.parentElement.parentElement.parentElement.style.top = "-70px";

              //set my position as a origin place
              myPositionBtn.addEventListener('click', () => {
                geocodeLatLng(pos);
                const travelMode = window.localStorage.getItem('currentTravelMode');
                infoWindow.close(map);
                //if destination is not chosen, first choose
                if(!window.localStorage.getItem('currentDestination')){
                  alert('Wybierz miejsce docelowe z mapy...');
                  map.setZoom(9);
                }
                //if destination is chosen, show route from your current position
                else{
                  const currentDestination = window.localStorage.getItem('currentDestination');
                  const jsonDestinationCoords = JSON.parse(currentDestination);
                  calcRoute(directionsService, directionsRenderer, originInput.value, jsonDestinationCoords, travelMode);
                }
              })
            }
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  //click listener for each travel mode button
  carModeBtn.addEventListener('click', () => {
    carModeBtn.classList.add('drive-mode-active');
    bikeModeBtn.classList.remove('drive-mode-active');
    walkModeBtn.classList.remove('drive-mode-active');
    window.localStorage.setItem('currentTravelMode', 'DRIVING');
    const mode = 'DRIVING';
    changeTravelMode(mode);
  });
  bikeModeBtn.addEventListener('click', () => {
    setTimeout(function() {
      bikeModeBtn.classList.add('drive-mode-active');
      carModeBtn.classList.remove('drive-mode-active');
      walkModeBtn.classList.remove('drive-mode-active');
      window.localStorage.setItem('currentTravelMode', 'BICYCLING');
      const mode = 'BICYCLING';
      changeTravelMode(mode);
    }, 0);
  });
  walkModeBtn.addEventListener('click', () => {
    walkModeBtn.classList.add('drive-mode-active');
    carModeBtn.classList.remove('drive-mode-active');
    bikeModeBtn.classList.remove('drive-mode-active');
    window.localStorage.setItem('currentTravelMode', 'WALKING');
    const mode = 'WALKING';
    changeTravelMode(mode);
  });

  //set input value as a origin place
  originPlaceBtn.addEventListener('click', () => {
    window.localStorage.setItem('originPlace', originInput.value);
    if(!window.localStorage.getItem('originPlace') || originInput.value == "")
      alert('Wybierz miejsce początkowe...');
    else {
      if(!window.localStorage.getItem('currentDestination'))
        alert('Wybierz miejsce docelowe z mapy...');
      else
        providePlaces();
        //close all infoWindows
        infoWindows.forEach(infoWindow => {
          infoWindow.close();
        });
    }
  });

  //start calcRoute() when you press Enter while typing city
  originInput.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
      providePlaces();
    };
  });

  //function that change our coords to name of place
  function geocodeLatLng(latlng) {
    geocoder.geocode({
      'location': latlng
    }, function(results, status) {
      if (status == 'OK') {
        if (results[0]) {
          originInput.value = results[0].formatted_address;
          window.localStorage.setItem('originPlace', results[0].formatted_address);
        } else {
          window.alert('Nie znaleziono');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };

  //function which change travel mode
  function changeTravelMode(mode) {
    window.localStorage.setItem('currentTravelMode', mode);
    if (!distanceField.innerHTML.includes("...")) {
      const currentDestination = window.localStorage.getItem('currentDestination');
      const jsonDestinationCoords = JSON.parse(currentDestination);
      const originPlace = window.localStorage.getItem('originPlace');
      calcRoute(directionsService, directionsRenderer, originPlace, jsonDestinationCoords, mode);

    }
  }

  //function which provides origin and destination places to calcRoute()
  function providePlaces() {
    const originPlace = originInput.value;
    const currentDestination = window.localStorage.getItem('currentDestination');
    const travelMode = window.localStorage.getItem('currentTravelMode');
    const jsonDestinationCoords = JSON.parse(currentDestination);
    window.localStorage.setItem('originPlace', originPlace);
    calcRoute(directionsService, directionsRenderer, originPlace, jsonDestinationCoords, travelMode);
  }

//group markers together if they are very close each other
setTimeout(function(){
  const markerCluster = new MarkerClusterer(map, markers, {
    imagePath: `../images/clusters/m`
  });
}, 2000);

  //end of initMap()
}


//active hamburger
document.addEventListener('click', (e) => {

  if (e.target.closest('.hamburger')) {
    document.querySelectorAll(".hamburger span")[0].classList.toggle("span-active-first");
    document.querySelectorAll(".hamburger span")[1].classList.toggle("span-active-second");
    document.querySelectorAll(".hamburger span")[2].classList.toggle("span-active-third");
    document.querySelector(".hamburger-bg").classList.toggle("hamburger-bg-active");
  };
});



//error if your browser fail with geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation ?
    "Błąd: Usługa geolokalizacyjna zawiodła." :
    "Błąd: Twoja przeglądarka nie wspiera geolokalizacji."
  );
  infoWindow.open(map);
}

//show route to the place
function calcRoute(directionsService, directionsRenderer, originPlace, destinationPlace, travelMode) {
  var request = {
    origin: originPlace,
    destination: destinationPlace,
    travelMode: travelMode,
  };
  directionsService.route(request, (result, status) => {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
      const distanceField = document.querySelector('.distance-display');
      const timeField = document.querySelector('.time-display');
      distanceField.innerHTML = `Odległość: ${result.routes[0].legs[0].distance.text}`;
      timeField.innerHTML = `Czas: ${result.routes[0].legs[0].duration.text}`;
      // distanceField.classList.toggle('distance-display-active');
    }
  });
}
