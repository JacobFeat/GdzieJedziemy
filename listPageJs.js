const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".list-of-suggestions");
const lookupIcon = document.querySelector(".lookup-icon");
const lookupAndMap = document.querySelector(".lookup-and-map");
const spotsList = document.querySelector(".list-of-spots");
const spotsListLi = spotsList.querySelectorAll(".card-container");
const frontCardAll = document.querySelectorAll(".li-card");
const placeDistanceAll = document.querySelectorAll(".place-distance");
const suggestionsCity = suggestionsList.children;

const myPlaceArray = [
  {
    name: 'Kamieniołom Liban',
    description: "Maecenas accumsan lacus vel facilisis. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Bibendum arcu vitae elementum curabitur vitae nunc sed. Sit amet massa vitae tortor condimentum lacinia quis vel. Sagittis eu volutpat odio facilisis mauris sit amet. Ultrices neque ornare aenean euismod elementum nisi quis. Diam volutpat commodo sed egestas. ",
    lat: 50.04,
    lng: 19.96,
    imgSource: "img1.jpg"
  },
  {
    name: 'Pustynia Błędowska',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Blandit turpis cursus in hac habitasse platea.",
    lat: 50.36,
    lng: 19.52,
    imgSource: "img2.jpg"
  },
  {
    name: 'Zakrzówek',
    description: "Lacus laoreet non curabitur gravida arcu ac. Tincidunt arcu non sodales neque sodales ut. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Facilisis gravida neque convallis a cras semper.",
    lat: 50.04,
    lng: 19.91,
    imgSource: "img3.jpg"
  },
  {
    name: 'Kopiec Krakusa',
    description: "Proin fermentum leo vel orci porta. Tincidunt eget nullam non nisi est sit amet facilisis. Lobortis elementum nibh tellus molestie nunc. Bibendum enim facilisis gravida neque convallis.",
    lat: 50.03,
    lng: 19.96,
    imgSource: "img4.jpg"
  },
  {
    name: 'Kopiec Kościuszki',
    description: "Vitae justo eget magna fermentum iaculis eu. Id donec ultrices tincidunt arcu non sodales neque. Sem et tortor consequat id porta nibh venenatis.",
    lat: 50.05,
    lng: 19.89,
    imgSource: "img5.jpg"

  },
  {
    name: 'Zamek Tenczyn',
    description: "Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Velit sed ullamcorper morbi tincidunt. Nunc id cursus metus aliquam. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Accumsan tortor posuere ac ut consequat semper.",
    lat: 50.10,
    lng: 19.58,
    imgSource: "img6.jpg"

  },
  {
    name: 'Góra Żar',
    description: "Sed augue lacus viverra vitae congue eu. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Amet dictum sit amet justo donec.",
    lat: 49.79,
    lng: 19.22,
    imgSource: "img7.jpg"
  },
  {
    name: 'Góra Świętego Marcina',
    description: "Nisl purus in mollis nunc sed. Tortor aliquam nulla facilisi cras fermentum. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit.",
    lat: 49.99,
    lng: 21.01,
    imgSource: "img8.jpg"
  },
  {
    name: 'Wieża widokowa w Siekowie',
    description: "Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. A iaculis at erat pellentesque adipiscing commodo elit at. Pretium viverra suspendisse potenti nullam ac tortor vitae.",
    lat: 52.06,
    lng: 16.37,
    imgSource: "img9.jpg"
  },
  {
    name: 'Kaszubskie Oko',
    description: "Ultricies integer quis auctor elit sed vulputate mi sit amet. Ultrices in iaculis nunc sed augue. Ut porttitor leo a diam sollicitudin tempor id. Id velit ut tortor pretium viverra suspendisse potenti.",
    lat: 54.72,
    lng: 18.05,
    imgSource: "img10.jpg"
  }
]

let mySortedArray = [];
const atLeastOneExpanded = (element) => {
  element.classList.contains('li-active');
};
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

  //add margin bottom to expanded card
  if(e.target.closest('.li-card')){
    // console.log(e.target.closest('.card-container'));
    e.target.closest('.li-card').style.marginBottom = "364px";
    // console.log(Array.from(spotsList).some(atLeastOneExpanded));
    e.target.closest('.card-container').classList.add('li-active');
    if(e.target.closest('.card-container').classList.contains('li-active')){
      console.log("work");
      document.querySelectorAll('.card-container').forEach(li => {
        li.classList.remove('li-active');
        li.querySelector('.li-card').style.marginBottom = "20px";
        e.target.closest('.li-card').style.marginBottom = "364px";
      });
      e.target.closest('.card-container').classList.add('li-active');

    }
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

    // sort li by distance
    function sortList(ul) {
      Array.from(ul.querySelectorAll(".card-container"))
        .sort((a, b) => {
          return Number(a.firstElementChild.lastElementChild.innerHTML.replace(' km', '')) - Number(b.firstElementChild.lastElementChild.innerHTML.replace(' km', ''))
        })
        .forEach(li => ul.appendChild(li));
    }
    sortList(spotsList);

    // display just 5 elements of spotsList
    const listOfSpotsList = Array.from(spotsList.querySelectorAll(".card-container"));
    for(let i=5; i<listOfSpotsList.length; i++){
      listOfSpotsList[i].style.display = "none";
    }

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
    <li class="card-container">
      <span class="li-card">
      <span class = "place">${place.name}</span>
      <span class = "place-description">${place.description.slice(0,90)+"..."}</span>
      <img class="path-img" src="../images/finish.svg" alt="">
      <span class="place-distance"></span>
      </span>
      <span class="back-card">
      <img class="card-img" src="/images/${place.imgSource}" alt="image of place">
      <div class="card-content">
      <span class="content-start">
        <p class="place-back">${place.name}</p>
        <p class="place-description-back">${place.description}</p>
        </span>
        <span class="content-end">
        <p class="how-to-reach">Jak dojechać?</p>
        <button type="button" class="how-to-reach-button">Sprawdź</button>
        </span>
      </div>
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
