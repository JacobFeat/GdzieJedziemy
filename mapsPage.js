const libiaz = {
  lat: 50.104,
  lng: 19.316
};

const krakow = {
  lat: 50.049683,
  lng: 19.944544
}


const myPlaceArray = [
  {
    name: 'Kamieniołom Liban',
    description: "Maecenas accumsan lacus vel facilisis. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Bibendum arcu vitae elementum curabitur vitae nunc sed. Sit amet massa vitae tortor condimentum lacinia quis vel. Sagittis eu volutpat odio facilisis mauris sit amet. Ultrices neque ornare aenean euismod elementum nisi quis. Diam volutpat commodo sed egestas. ",
    coords: {
      lat: 50.04,
      lng: 19.96,
    },
    imgSource: "img1.jpg"
  },
  {
    name: 'Pustynia Błędowska',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Blandit turpis cursus in hac habitasse platea.",
    coords: {
      lat: 50.36,
      lng: 19.52
    },
    imgSource: "img2.jpg"
  },
  {
    name: 'Zakrzówek',
    description: "Lacus laoreet non curabitur gravida arcu ac. Tincidunt arcu non sodales neque sodales ut. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Facilisis gravida neque convallis a cras semper.",
    coords: {
      lat: 50.04,
      lng: 19.91
    },
    imgSource: "img3.jpg"
  },
  {
    name: 'Kopiec Krakusa',
    description: "Proin fermentum leo vel orci porta. Tincidunt eget nullam non nisi est sit amet facilisis. Lobortis elementum nibh tellus molestie nunc. Bibendum enim facilisis gravida neque convallis.",
    coords: {
      lat: 50.03,
      lng: 19.96
    },
    imgSource: "img4.jpg"
  },
  {
    name: 'Kopiec Kościuszki',
    description: "Vitae justo eget magna fermentum iaculis eu. Id donec ultrices tincidunt arcu non sodales neque. Sem et tortor consequat id porta nibh venenatis.",
    coords: {
      lat: 50.05,
      lng: 19.89
    },
    imgSource: "img5.jpg"

  },
  {
    name: 'Zamek Tenczyn',
    description: "Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Velit sed ullamcorper morbi tincidunt. Nunc id cursus metus aliquam. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Accumsan tortor posuere ac ut consequat semper.",
    coords: {
      lat: 50.10,
      lng: 19.58
    },
    imgSource: "img6.jpg"

  },
  {
    name: 'Góra Żar',
    description: "Sed augue lacus viverra vitae congue eu. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Amet dictum sit amet justo donec.",
    coords: {
      lat: 49.79,
      lng: 19.22
    },
    imgSource: "img7.jpg"
  },
  {
    name: 'Góra Świętego Marcina',
    description: "Nisl purus in mollis nunc sed. Tortor aliquam nulla facilisi cras fermentum. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit.",
    coords: {
      lat: 49.99,
      lng: 21.01
    },
    imgSource: "img8.jpg"
  },
  {
    name: 'Wieża widokowa w Siekowie',
    description: "Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. A iaculis at erat pellentesque adipiscing commodo elit at. Pretium viverra suspendisse potenti nullam ac tortor vitae.",
    coords: {
      lat: 52.06,
      lng: 16.37
    },
    imgSource: "img9.jpg"
  },
  {
    name: 'Kaszubskie Oko',
    description: "Ultricies integer quis auctor elit sed vulputate mi sit amet. Ultrices in iaculis nunc sed augue. Ut porttitor leo a diam sollicitudin tempor id. Id velit ut tortor pretium viverra suspendisse potenti.",
    coords: {
      lat: 54.72,
      lng: 18.05
    },
    imgSource: "img10.jpg"
  }
]

const markers = [];
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
  originInput.value="";
  closeSearch.classList.remove('close-search-active');
  originInput.focus();
});

function initMap() {
  const optionsMap = {
    // mapId: "8e0a97af9386fef",
    zoom: 14,
    center: krakow,
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

  // const onChangeHandler = function() {
  //   calcRoute(directionsService, directionsRenderer, krakow, 'DRIVING');
  // };

  // document.querySelector('.route-btn').addEventListener('click', onChangeHandler);

  myPlaceArray.forEach(place => {
    addMarker(place);
  });

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
    // console.log(markers);
    // clearMarkers();
    setTimeout(function() {
      marker.setAnimation(google.maps.Animation.DROP);
    }, 50);
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
            //get travel mode from localStorage and put to the calcRoute()
            const travelMode = window.localStorage.getItem('currentTravelMode');
            const originPlace = window.localStorage.getItem('originPlace');

            calcRoute(directionsService, directionsRenderer, originPlace, jsonDestinationCoords, travelMode);
            infoWindow.close();
            //save coords to localStorage
            window.localStorage.setItem('currentDestination', destinationCoords);
          });
        }, 100);
      })
    }
  }

  window.addEventListener('load', e => {
    //get origin place on load
    const originPlace = window.localStorage.getItem('originPlace');
    originInput.value = originPlace;
    closeSearch.classList.add('close-search-active');

    //when page is loading and place's route button was clicked, show route
    if(window.localStorage.getItem('currentDestination')){
      const currentDestination = window.localStorage.getItem('currentDestination');
      const jsonDestinationCoords = JSON.parse(currentDestination);
      console.log(jsonDestinationCoords);
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
          <p>${pos.lat}</p>
          <button>
          `;
          infoWindow.setContent(infoWindowContent);
          // infoWindow.open(map);
          map.panTo(pos);
          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: 'images/hereStrokeBlack.svg',
          });
          marker.addListener('click', (e) => {
            infoWindow.open(map);

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
      // console.log(this);
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
    // console.log(originInput.value);
    providePlaces();
  });

  //start calcRoute() when you press Enter while typing city
  originInput.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
      providePlaces();
    };
  });

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


  //end of initMap()
}


//active hamburger
document.addEventListener('click', (e) => {

  if (e.target.closest('.hamburger')) {
    // console.log("work");
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

//clear all markers
function cleanMarkers() {

}
