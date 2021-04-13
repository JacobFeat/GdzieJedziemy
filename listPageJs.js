const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".list-of-suggestions");
const lookupIcon = document.querySelector(".lookup-icon");
const lookupAndMap = document.querySelector(".lookup-and-map");
const spotsList = document.querySelector(".list-of-spots");
const placeDistanceAll = document.querySelectorAll(".place-distance");
const suggestionsCity = suggestionsList.children;

const myPlaceArray = [{
    name: 'Kamieniołom Liban',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    lat: 50.04,
    lng: 19.96
  },
  {
    name: 'Pustynia Błędowska',
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    lat: 50.36,
    lng: 19.52
  },
  {
    name: 'Zakrzówek',
    description: "Volutpat maecenas volutpat blandit aliquam etiam.",
    lat: 50.04,
    lng: 19.91
  },
  {
    name: 'Kopiec Krakusa',
    description: "Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit.",
    lat: 50.03,
    lng: 19.96
  },
  {
    name: 'Kopiec Kościuszki',
    description: "Tempus iaculis urna id volutpat lacus laoreet. Ac feugiat sed lectus vestibulum mattis.",
    lat: 50.05,
    lng: 19.89
  },
  {
    name: 'Zamek Tenczyn',
    description: "Tempus iaculis urna id volutpat lacus laoreet. Ac feugiat sed lectus vestibulum mattis.",
    lat: 50.10,
    lng: 19.58
  },
  {
    name: 'Góra Żar',
    description: "Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit.",
    lat: 49.79,
    lng: 19.22
  },
  {
    name: 'Góra Świętego Marcina',
    description: "Tempus iaculis urna id volutpat lacus laoreet. Ac feugiat sed lectus vestibulum mattis.",
    lat: 49.99,
    lng: 21.01
  },
  {
    name: 'Wieża widokowa w Siekowie',
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    lat: 52.06,
    lng: 16.37
  },
  {
    name: 'Kaszubskie Oko',
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    lat: 54.72,
    lng: 18.05
  }
]

let mySortedArray = [];

document.addEventListener('mouseover', (e) => {
  e.target.className === "search" ? searchInput.classList.add("search-hover") : searchInput.classList.remove("search-hover");
});

document.addEventListener('click', (e) => {
  //expand and collapse search input
  if (e.target.classList.contains('search')) {
    searchInput.classList.add('search-active');
    lookupIcon.classList.add('lookup-icon-active');
  } else {
    searchInput.classList.remove('search-active');
    lookupIcon.classList.remove('lookup-icon-active');

  }

  if (e.target.closest('li')) {
    // TODO: add popup feature about particular object
  }

  if (e.target.classList.contains('name')) {
    // add main-color bullet to clicked suggested name
    let dotForLi = document.createElement('span');
    dotForLi.setAttribute('class', 'dot-for-li');
    e.target.appendChild(dotForLi);
    //replace search input value by clicked suggested name
    searchInput.value = e.target.textContent;
    const currentName = e.target.textContent;

    //leave just one active suggested city feature
    const suggestionsCityArray = Array.from(suggestionsCity);

    if (e.target.textContent == currentName) {
      // make a function which return new array with name of cities
      function findMyCity(place) {
        return place = searchInput.value;
      }
      const showMyCity = suggestionsCityArray.filter(findMyCity)
        .map(place => {
          return place.innerText;
        });
      const myCurrentCityIndex = showMyCity.indexOf(currentName);
      for (let i = 0; i < 3; i++) {
        if (suggestionsCity[i]) {
          suggestionsCity[i].style.display = "none";
          suggestionsCity[myCurrentCityIndex].style.display = "inline-block";
        }
      }
    }
    sendCordi(myPlaceArray);

    //sort li by distance
    function sortList(ul) {
      Array.from(ul.querySelectorAll(".li-card"))
        .sort((a, b) => {
          return Number(a.lastElementChild.innerHTML.replace(' km', '')) - Number(b.lastElementChild.innerHTML.replace(' km', ''))
        })
        .forEach(li => ul.appendChild(li));
    }
    sortList(spotsList);

    //display just 5 elements of spotsList
    // const lisOfSpotsList = spotsList.querySelectorAll(".li-card");
    // for(let i=5; i<spotsList.childElementCount; i++){
    //   lisOfSpotsList[i].style.display = "none";
    // }

  }
}, false);

//search city function
let cities = [];

fetch('pl.json')
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(cityToSearch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(cityToSearch, 'gi');
    return place.city.match(regex);
  })
};

function displayMatches() {
  const matchCities = findMatches(this.value, cities);
  const html = matchCities.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, this.value);

    return `
    <li>
      <span class = "name">${cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase()}</span>
    </li>
    `;
  }).join("");
  suggestionsList.innerHTML = html;

  //display just 3 suggested cities
  for (let i = 3; i < suggestionsList.childElementCount; i++) {
    if (suggestionsCity[i]) {
      suggestionsCity[i].style.display = "none";
    }
  }
}

searchInput.addEventListener('keyup', displayMatches);
// searchInput.addEventListener('change', displayMatches);

// sending name of city and values of position
function sendCordi(object) {
  function findCity(place) {
    const regex = new RegExp(searchInput.value, 'gi');
    return place.city.match(regex);
  }

  function mapCity(place) {
    return `${place.lat}, ${place.lng}`;
  }

  const foundCity = cities.filter(findCity)
    .map(mapCity);


  for (let i = 0; i < 3; i++) {
    if (suggestionsCity[i]) {
      suggestionsCity[i].addEventListener('click', () => {
        const foundCity = cities.filter(findCity)
          .map(mapCity);
        // const [lat, lng] = foundCity[0].split(", ");
        // const changed = changeCordi(lat, lng, object);

      })
    }
  }
  const [lat, lng] = foundCity[0].split(", ");

  const calculated = calculateCordi(lat, lng, object);

}

//changing string result to number result
function calculateCordi(latValue, lngValue, object) {

  //
  const html = myPlaceArray.map(place => {

    return `
    <li>
      <span class="li-card">
      <span class = "place">${place.name}</span>
      <span class = "place-description">${place.description}</span>
      <img class="path-img" src="../images/finish.svg" alt="">
      <span class="place-distance"></span>
      </span>
    </li>
    `;
  }).join("");
  spotsList.innerHTML = html;
  for (let i = 0; i < object.length; i++) {
    const latAsNumber = parseFloat(latValue);
    const lngAsNumber = parseFloat(lngValue);
    const latToKm = latAsNumber * 110.574;
    const earthRadius = 6371e3; // metres
    const latitude1 = latAsNumber * Math.PI / 180;
    const latitude2 = object[i].lat * Math.PI / 180;
    const deltaLatitude = (object[i].lat - latAsNumber) * Math.PI / 180;
    const deltaLongitude = (object[i].lng - lngAsNumber) * Math.PI / 180;

    const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.cos(latitude1) * Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c * 0.001; //kilometres
    let roundDistance = 0;
    if (distance > 10) {
      roundDistance = Math.round(distance);
    } else {
      roundDistance = Math.round(distance * 100) / 100;
    }
    spotsList.querySelectorAll('.li-card')[i].querySelector('.place-distance').innerHTML = roundDistance + " km";


  }

}
