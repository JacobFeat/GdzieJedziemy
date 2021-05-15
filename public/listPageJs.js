

const searchInput = document.querySelector(".search");
let suggestionsList = document.querySelector(".list-of-suggestions");
const lookupIcon = document.querySelector(".lookup-icon");
const lookupAndMap = document.querySelector(".lookup-and-map");
const mapBtn = document.querySelector('.map-icon-link');
const spotsList = document.querySelector(".list-of-spots");
const spotsListLi = spotsList.querySelectorAll(".card-container");
const frontCardAll = document.querySelectorAll(".front-card");
const placeDistanceAll = document.querySelectorAll(".place-distance");
const closeBackCard = document.querySelector(".close-back-card");
const frontCardDot = document.querySelectorAll(".front-card-dot");
let suggestionsCity = suggestionsList.children;

const mediaQuery = window.matchMedia('(max-width: 768px)');

console.log(document.querySelector('.logo-link').getBoundingClientRect().top);


window.addEventListener('resize', ()=>{
  // handleResChange(mediaQuery);
  console.log(window.innerWidth);
  if(window.innerWidth<500){
  }
})



let myPlaceArray = [];

fetch('myPlaceArray.json')
  .then(blob => blob.json())
  .then(data => myPlaceArray.push(...data));

let mySortedArray = [];
const atLeastOneExpanded = (element) => {
  element.classList.contains('li-active');
};
document.addEventListener('mouseover', (e) => {
  e.target.className === "search" ? searchInput.classList.add("search-hover") : searchInput.classList.remove("search-hover");

});

window.addEventListener('load', e => {
  handleResChange(mediaQuery);

  const mySentCity = window.localStorage.getItem('mySentCity');
  searchInput.value = mySentCity;
  window.localStorage.setItem('originPlace', searchInput.value);
  setTimeout(function(){
    //display list of suggested cities
    displayMatches();
    //fill first suggested city by name of city from input value
    document.querySelectorAll('.name')[0].innerText = searchInput.value;
    //hide others suggested city and show just first one
    for (let i = 0; i < 3; i++) {
      if (suggestionsCity[i]) {
        suggestionsCity[i].style.display = "none";
        suggestionsCity[0].style.display = "inline-block";
      }
    }
    //add active dot to first suggested city
    let dotForLi = document.createElement('span');
    dotForLi.setAttribute('class', 'dot-for-li');
    document.querySelectorAll('.name')[0].appendChild(dotForLi);
  }, 300);

  setTimeout(sendCordi.bind(null, myPlaceArray, cities), 300);
  // suggestionsCity[0].style.display = "inline-block";
  // suggestionsCity[0].innerHTML = "<span class='name'>" + searchInput.value + "<span class='dot-for-li'></span></span>";
});

searchInput.addEventListener('keyup', () => {
  if (searchInput.value != "") {
    document.querySelector('.close-search').classList.add('close-search-active');
  } else {
    document.querySelector('.close-search').classList.remove('close-search-active');
  }
  suggestionsList.style.display="flex";

});

document.addEventListener('click', (e) => {
  //find index of picked card
  const myCardArray = [];
  for (let i = 0; i < 5; i++) {
    myCardArray.push(document.querySelectorAll('.card-container')[i]);
  }
  const currentIndex = myCardArray.indexOf(e.target.closest('.card-container'));

  //expand and collapse search input, display and hide close-search button
  if (e.target.classList.contains('search') || e.target.classList.contains('close-search')) {
    searchInput.classList.add('search-active');
    lookupIcon.classList.add('lookup-icon-active');
    if (searchInput.value != "") {
      document.querySelector('.close-search').classList.add('close-search-active');
    }
  } else {
    searchInput.classList.remove('search-active');
    lookupIcon.classList.remove('lookup-icon-active');
    document.querySelector('.close-search').classList.remove('close-search-active');
  }

  if (e.target.classList.contains('close-search')) {
    searchInput.value = "";
    suggestionsList.style.display="none";
    document.querySelector('.close-search').classList.remove('close-search-active');
  }



  //expand card and add margin bottom to expanded card
  if (e.target.closest('.front-card')) {
    //scroll to picked card

    // function scrollToCertainPoint(index) {
    //   scrollTo(0, (124 + index * 114), );
    // }
    // setTimeout(scrollToCertainPoint.bind(null, currentIndex), 150);

    SmoothVerticalScrolling(e.target, 200, "top");


    console.log(currentIndex);
    e.target.closest('.front-card').style.marginBottom = "364px";
    e.target.closest('.card-container').classList.add('li-active');

    if (e.target.closest('.card-container').classList.contains('li-active')) {
      document.querySelectorAll('.card-container').forEach(li => {
        li.classList.remove('li-active');
        //display green dot
        li.querySelector('.front-card-dot').style.display = "inline-block";
        li.querySelector('.front-card').style.marginBottom = "20px";
        e.target.closest('.front-card').style.marginBottom = "364px";
      });
      e.target.closest('.card-container').classList.add('li-active');
    }
    //hide green dot
    document.querySelectorAll('.front-card-dot')[currentIndex].style.display="none";
  }

  //close expanded card
  if (e.target.classList.contains('close-back-card')) {
    e.target.parentElement.classList.remove('li-active');
    document.querySelectorAll('.card-container').forEach(li => li.classList.remove('li-active'));
    document.querySelectorAll('.front-card').forEach(li => li.style.marginBottom = "20px");
    e.target.parentElement.parentElement.parentElement.querySelector('.front-card-dot').style.display = "inline-block"; //display green dot
  }

  if(e.target.classList.contains('how-to-reach-button')){
    const placeName = e.target.parentElement.parentElement.parentElement.querySelector('.place-back').textContent;
    const searchPlace = myPlaceArray.filter(place => place.name == placeName)
                                    .map(keys => `{"lat": ${keys.coords.lat}, "lng": ${keys.coords.lng}}`)

    window.localStorage.setItem('currentDestination', searchPlace[0]);
    console.log(  window.localStorage.getItem('currentDestination'));

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
      //display just active city, others -> hidden
      for (let i = 0; i < 3; i++) {
        if (suggestionsCity[i]) {
          suggestionsCity[i].style.display = "none";
          suggestionsCity[myCurrentCityIndex].style.display = "inline-block";
        }
      }
      //Set current city as a local storage's origin place when you click suggestion city
      window.localStorage.setItem('originPlace',suggestionsCity[myCurrentCityIndex].innerText);
    }
    sendCordi(myPlaceArray, cities);

  }

  //if mapBtn is clicked, remove destination and show the plain map without any route
  if(e.target.closest('.map-icon-link')){
    window.localStorage.setItem('originPlace', searchInput.value);
    window.localStorage.removeItem('currentDestination');
  }

  function SmoothVerticalScrolling(e, time, where) {
  var eTop = e.getBoundingClientRect().top;
  var eAmt = eTop / 100;
  var curTime = 0;
  while (curTime <= time) {
      window.setTimeout(SVS_B, curTime, eAmt, where);
      curTime += time / 100;
  }
}

function SVS_B(eAmt, where) {
  if(where == "center" || where == "")
      window.scrollBy(0, eAmt / 2);
  if (where == "top")
      window.scrollBy(0, eAmt);
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
function sendCordi(object, arrayOfCities) {
  function findCity(place) {
    const regex = new RegExp(searchInput.value, 'gi');
    return place.city.match(regex);
  }

  function mapCity(place) {
    return `${place.lat}, ${place.lng}`;
  }

  const foundCity = arrayOfCities.filter(findCity)
    .map(mapCity);


  for (let i = 0; i < 3; i++) {
    if (suggestionsCity[i]) {
      suggestionsCity[i].addEventListener('click', () => {
        const foundCity = arrayOfCities.filter(findCity)
          .map(mapCity);
      })
    }
  }

  if(foundCity[0]){
    const [lat, lng] = foundCity[0].split(", ");
    const calculated = calculateCordi(lat, lng, object);
  }

  // sort li by distance
  function sortList(ul) {
    Array.from(ul.querySelectorAll(".card-container"))
      .sort((a, b) => {
        return Number(a.firstElementChild.lastElementChild.innerHTML.replace(' km', '')) - Number(b.firstElementChild.lastElementChild.innerHTML.replace(' km', ''))
      })
      .forEach(li => ul.appendChild(li));
  }
  sortList(spotsList);

}

//short place description on resize
function handleResChange(e){
  if(e.matches){
    // console.log("Res changed");
    // console.log(window.innerWidth);
    const placeDescriptionAll = document.querySelectorAll('.place-description');
    placeDescriptionAll.forEach(place => {
      place.innerText = place.innerText.slice(0, 30) + "...";
    })
  }
}

//changing string result to number result
function calculateCordi(latValue, lngValue, object) {

  //
  const html = myPlaceArray.map(place => {

    return `
    <li class="card-container">
      <span class="front-card">
      <div class="front-card-dot"></div>
      <span class = "place">${place.name}</span>
      <span class = "place-description">${place.description.slice(0,90)+"..."}</span>
      <img class="path-img" src="../images/finish.svg" alt="">
      <span class="place-distance"></span>
      </span>
      <span class="back-card">
      <img class="card-img" src="/images/${place.imgSource}" alt="image of place">
      <div class="card-content">
      <div class="close-back-card"></div>
      <span class="content-start">
        <p class="place-back">${place.name}</p>
        <p class="place-description-back">${place.description}</p>
        </span>
        <span class="content-end">
        <p class="how-to-reach">Jak dojechać?</p>
        <a class="how-to-reach-link" href="/mapsPage"><button type="button" class="how-to-reach-button">Sprawdź</button></a>
        </span>
      </div>
      </span>
    </li>
    `;
  }).join("");
  spotsList.innerHTML = html;
  //calculate lat and lng to km
  for (let i = 0; i < object.length; i++) {
    const latAsNumber = parseFloat(latValue);
    const lngAsNumber = parseFloat(lngValue);
    const latToKm = latAsNumber * 110.574;
    const earthRadius = 6371e3; // metres
    const latitude1 = latAsNumber * Math.PI / 180;
    const latitude2 = object[i].coords.lat * Math.PI / 180;
    const deltaLatitude = (object[i].coords.lat - latAsNumber) * Math.PI / 180;
    const deltaLongitude = (object[i].coords.lng - lngAsNumber) * Math.PI / 180;

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
    //send distance to proper cards/cities
    spotsList.querySelectorAll('.front-card')[i].querySelector('.place-distance').innerHTML = `${roundDistance}  km`;
  }

}

function gitNew(){

};
