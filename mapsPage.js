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

function initMap() {
  const options = {
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
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#bdbdbd"
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
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      }
    ],
  };

  const map = new google.maps.Map(document.getElementById("map"), options);
  const locationButton = document.querySelector('.my-location-btn');
  const infoWindow = new google.maps.InfoWindow();

  //declare a object that we use get a result for our request
  var directionsService = new google.maps.DirectionsService();
  //declare a object that allow us to display route on the map
  var directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);
  const onChangeHandler = function() {
    calcRoute(directionsService, directionsRenderer);
  };
  document.querySelector('.route-btn').addEventListener('click', onChangeHandler);



  // const svgMarker = {
  //   path: 'M17.7459 0C7.96076 0 0 7.96076 0 17.7458C0 29.8893 15.8808 47.7168 16.557 48.4698C17.1921 49.1771 18.3009 49.1759 18.9348 48.4698C19.611 47.7168 35.4918 29.8893 35.4918 17.7458C35.4916 7.96076 27.5309 0 17.7459 0ZM17.7459 26.6742C12.8228 26.6742 8.81758 22.6689 8.81758 17.7458C8.81758 12.8227 12.8228 8.81749 17.7459 8.81749C22.6689 8.81749 26.6741 12.8228 26.6741 17.7459C26.6741 22.669 22.6689 26.6742 17.7459 26.6742Z',
  // }

  // const marker = new google.maps.Marker({
  //   position: libiaz,
  //   map: map,
  //   icon: 'images/mint-marker-shadow.svg',
  // });

  //Listen for click
  // google.maps.event.addListener(map, 'click', function(event) {
  //   //add marker
  //   addMarker({
  //     coords: event.latLng
  //   })
  // });

  //array of our places
  const arrayOfPlaces = [{
      coords: {
        lat: 50.104,
        lng: 19.316
      },
      content: "<h3>Poczta</h3> It\'s my first place"
    },
    {
      coords: {
        lat: 50.112,
        lng: 19.323
      },
      content: "<div class='map-box'><h3 class='customH'>Kolejowa</h3> It\'s my second place</div>"
    }
  ];

  myPlaceArray.forEach(place => {
    addMarker(place)
  });

  arrayOfPlaces.forEach(place => {
    // addMarker(place);
  });

  //add marker on the map
  function addMarker(city) {
    const marker = new google.maps.Marker({
      position: city.coords,
      map: map,
      icon: 'images/mint-marker-shadow.svg',
    });

    const cityContent = `
    <img class="place-img" src="/images/${city.imgSource}" alt="image of place">
    <p class="place">${city.name}</p>
    <button class="place-btn">Jak dojechać</button>
    `;
    if (city.name) {
      const infoWindow = new google.maps.InfoWindow({
        content: cityContent
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      })
    }
  }

  //find my location
  locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // infoWindow.setPosition(pos);
          // infoWindow.setContent(`${pos.lat}`);
          // infoWindow.open(map);
          map.setCenter(pos);
          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: 'images/hereV2-bigger.svg',
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
}

//active hamburger
document.addEventListener('click', (e)=>{

  if(e.target.closest('.hamburger')){
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
    "Error: The Geolocation service failed." :
    "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

//show route to the place
function calcRoute(directionsService, directionsRenderer) {
  var request = {
    origin: libiaz,
    destination: krakow,
    travelMode: 'DRIVING',
  };
  directionsService.route(request, (result, status) => {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}
