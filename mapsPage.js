function initMap() {
  const libiaz = {
    lat: 50.104,
    lng: 19.316
  };
  const options = {
    // mapId: "8e0a97af9386fef",
    zoom: 14,
    center: libiaz,
    fullscreenControl: false,
    mapTypeControl: false,
    // mapTypeId: "satellite",
    minZoom: 3,
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
],
  };

  const map = new google.maps.Map(document.getElementById("map"), options);

  // const svgMarker = {
  //   path: 'M17.7459 0C7.96076 0 0 7.96076 0 17.7458C0 29.8893 15.8808 47.7168 16.557 48.4698C17.1921 49.1771 18.3009 49.1759 18.9348 48.4698C19.611 47.7168 35.4918 29.8893 35.4918 17.7458C35.4916 7.96076 27.5309 0 17.7459 0ZM17.7459 26.6742C12.8228 26.6742 8.81758 22.6689 8.81758 17.7458C8.81758 12.8227 12.8228 8.81749 17.7459 8.81749C22.6689 8.81749 26.6741 12.8228 26.6741 17.7459C26.6741 22.669 22.6689 26.6742 17.7459 26.6742Z',
  // }

  // const marker = new google.maps.Marker({
  //   position: libiaz,
  //   map: map,
  //   icon: 'images/mint-marker-shadow.svg',
  // });

  //Listen for click
  google.maps.event.addListener(map, 'click', function(event) {
    //add marker
    addMarker({
      coords: event.latLng
    })
  });

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
      content: "<h3>Kolejowa</h3> It\'s my second place"
    }
  ];

arrayOfPlaces.forEach(place => {
  addMarker(place);
});

  function addMarker(city) {
    const marker = new google.maps.Marker({
      position: city.coords,
      map: map,
      icon: 'images/mint-marker-shadow.svg',
    });

    if (city.content) {
      const infoWindow = new google.maps.InfoWindow({
        content: city.content
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      })
    }
  }
}
