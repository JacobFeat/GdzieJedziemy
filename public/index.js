const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".list-of-suggestions");
const subBtn = document.querySelector(".submit-button");
const subBtnArrow = document.querySelector(".submit-button-arrow");
const logo = document.querySelector(".logo");
let suggestionsCity = suggestionsList.children;
const alertBox = document.querySelector('.alert-box');
const alertBoxClose = document.querySelector('.alert-box-close');
const layout = document.querySelector('.layout');

window.addEventListener('load', () => {
  window.localStorage.removeItem('currentDestination');
  window.localStorage.removeItem('originPlace');
});

window.addEventListener('resize', () =>{
  console.log("Height: " + window.innerHeight);
  console.log("Width: " + window.innerWidth);
});

const myPlace = {
  lat: 49.092
}

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
    const cityName = place.city.replace(regex, `<span class="change-city-color">${this.value}</span>`);
    // <span class="change-city-color">
    // console.log(cityName);
    return `
        <li>
          <span class = "name">${cityName}</span>
        </li>
      `;
  }).join("");
  suggestionsList.innerHTML = html;

  // test
  for (let i = 0; i < 3; i++) {
    if (suggestionsCity[i]) {
      suggestionsCity[i].addEventListener('click', () => {
        const foundSuggestion = suggestionsCity[i].innerText;
        // console.log(foundSuggestion);
        searchInput.value = foundSuggestion;
        suggestionsList.style.display = "none";
      })
    }
  }
  if (suggestionsList.childElementCount == 433) {
    suggestionsList.style.display = "none";
  } else if (suggestionsList.childElementCount !== 433) {
    suggestionsList.style.display = "inline-block";
  }


  // end of test
}

//hover event for submit button
document.addEventListener('mouseover', (e)=>{
  if(e.target.classList.contains('submit-button') || e.target.classList.contains('submit-button-arrow')){
    subBtn.classList.add('submit-button-active');
    subBtnArrow.classList.add('submit-button-arrow-active');
  }
});
document.addEventListener('mouseout', (e)=>{
  if(e.target.classList.contains('submit-button') || e.target.classList.contains('submit-button-arrow')){
    subBtn.classList.remove('submit-button-active');
    subBtnArrow.classList.remove('submit-button-arrow-active');
  }
});

document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('submit-button') || e.target.classList.contains('submit-button-arrow')){
    // e.preventDefault();
    function sendCityName(name){
      window.localStorage.setItem('mySentCity', name);
      // window.localStorage.setItem('originPlace', name);
    }
    sendCityName(searchInput.value);
    const ifYourCityIsAvailable = cities.filter(place => place.city.toUpperCase() == searchInput.value.toUpperCase());
    console.log(ifYourCityIsAvailable.length);
    if(ifYourCityIsAvailable.length == 0){
      e.preventDefault();
      alertBox.classList.add('alert-box-active');
      layout.classList.add('layout-active');
    }
  }

  if(e.target.classList.contains('alert-box-close')){
    alertBox.classList.remove('alert-box-active');
    layout.classList.remove('layout-active');
  }

  if(e.target.closest('.hamburger')){
    // console.log("work");
    document.querySelectorAll(".hamburger span")[0].classList.toggle("span-active-first");
    document.querySelectorAll(".hamburger span")[1].classList.toggle("span-active-second");
    document.querySelectorAll(".hamburger span")[2].classList.toggle("span-active-third");
    document.querySelector(".hamburger-bg").classList.toggle("hamburger-bg-active");

  };
});

// searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('focusin', () => {
  suggestionsList.style.display = "inline-block";
});

searchInput.addEventListener('keyup', sendCordi);
searchInput.addEventListener('change', sendCordi);
logo.addEventListener('click', sendCordi);
// searchInput.addEventListener('focusout', (e) => {
//   // if(e.target.className)
//   console.log(e.target);
//   suggestionsList.style.display = "none";
// });
// //
// suggestionsList.addEventListener("click", (e) => {
//   console.log("test");
// });

// sending name of city and values of position
function sendCordi() {
  function findCity(place) {
    const regex = new RegExp(searchInput.value, 'gi');
    return place.city.match(regex);
  }

  function mapCity(place) {
    return place.lat;
  }

  const foundCity = cities.filter(findCity)
                          .map(mapCity);

  const displayFound = function() {
  }

  for (let i = 0; i < 3; i++) {
    if (suggestionsCity[i]) {
      suggestionsCity[i].addEventListener('click', () => {
        const foundCity = cities.filter(findCity)
          .map(mapCity);
        const displayFound = function() {
        }
        displayFound();
        const changed = changeCordi(foundCity[0]);
      })
    }
  }
  displayFound();
  const changed = changeCordi(foundCity[0]);

}

//changing string result to number result
function changeCordi(value) {
  const valueOfFound = value;
  const valueAsNumber = parseFloat(valueOfFound);
}
