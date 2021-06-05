const content = document.querySelector('.content');
const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".list-of-suggestions");
const subBtn = document.querySelector(".submit-button");
const subBtnArrow = document.querySelector(".submit-button-arrow");
const logo = document.querySelector(".logo");
let suggestionsCity = suggestionsList.children;
const alertBox = document.querySelector('.alert-box');
const alertBoxClose = document.querySelector('.alert-box-close');
const layout = document.querySelector('.layout');
busImg = document.querySelector('.bus-img');
const alertBoxText = document.querySelector('.alert-box p');

const fadeIn = document.querySelector('.fade-in');
const hamburgerBg = document.querySelector('.hamburger-bg');
const hamburgerLogo = document.querySelector('.hamburger-bg .logo');
const myFace = document.querySelector('.hamburger-bg .my-face');
const mapIcon = document.querySelector('.map-icon');
const logoCenterHamburger = document.querySelector('.hamburger-bg .logo-center');
const hamburgerList = document.querySelector('.hamburger-bg ul');


window.addEventListener('load', () => {
  window.localStorage.removeItem('currentDestination');
  window.localStorage.removeItem('originPlace');
  if (window.innerWidth > 850) {
    busImg.setAttribute('src', '../images/bus2.png')
  }
  searchInput.classList.add('search-animation');
  subBtn.classList.add('submit-button-animation');
  content.classList.add('content-animation');
  busImg.classList.add('bus-img-animation');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 850) {
    busImg.setAttribute('src', '../images/bus2.png')
  }
  if (window.innerWidth < 650) {
    busImg.setAttribute('src', '../images/bus2-small.png')
  }
});

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

        if (foundSuggestion.includes(" ")) {
          const [firstPartCity, secondPartCity] = foundSuggestion.split(" ");
          searchInput.value = firstPartCity.charAt(0).toUpperCase() + firstPartCity.slice(1).toLowerCase() + " " + secondPartCity.charAt(0).toUpperCase() + secondPartCity.slice(1).toLowerCase();
        } else {
          searchInput.value = foundSuggestion.charAt(0).toUpperCase() + foundSuggestion.slice(1).toLowerCase();
        }

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
document.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('submit-button') || e.target.classList.contains('submit-button-arrow')) {
    subBtn.classList.add('submit-button-active');
    subBtnArrow.classList.add('submit-button-arrow-active');
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('submit-button') || e.target.classList.contains('submit-button-arrow')) {
    subBtn.classList.remove('submit-button-active');
    subBtnArrow.classList.remove('submit-button-arrow-active');
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('submit-button') || e.target.classList.contains('submit-button-arrow')) {
    e.preventDefault();

    function sendCityName(name) {
      // window.localStorage.setItem('mySentCity', name.charAt(0).toUpperCase()+name.slice(1).toLowerCase());
      if (name.includes(" ")) {
        const [firstPartCity, secondPartCity] = name.split(" ");
        name = firstPartCity.charAt(0).toUpperCase() + firstPartCity.slice(1).toLowerCase() + " " + secondPartCity.charAt(0).toUpperCase() + secondPartCity.slice(1).toLowerCase();
        window.localStorage.setItem('mySentCity', name);

      } else {
        window.localStorage.setItem('mySentCity', name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
      }
    }
    sendCityName(searchInput.value);
    const ifYourCityIsAvailable = cities.filter(place => place.city.toUpperCase() == searchInput.value.toUpperCase());
    const hasNumber = /\d/;
    if (ifYourCityIsAvailable.length == 0 && !hasNumber.test(searchInput.value)) {
      e.preventDefault();
      alertBoxText.innerHTML = 'Twojego miasta nie ma <span class="alert-box-important">jeszcze</span> w naszej bazie';
      alertBox.classList.add('alert-box-active');
      layout.classList.add('layout-active');
    }
    else if (hasNumber.test(searchInput.value)) {
      e.preventDefault();
      alertBoxText.innerHTML = "Miasto <span class='alert-box-error'>nie może</span> zawierać cyfry!";
      alertBox.classList.add('alert-box-active');
      layout.classList.add('layout-active');
    }
    else{
      fadeIn.classList.add("fade-in-active");
      setTimeout(function() {
        window.location.href = "listPage";
      }, 500);
    }

  }

  if(e.target.closest('.hamburger-bg li')){
    myFace.classList.add('my-face-list-active');
    hamburgerLogo.classList.add('logo-list-active');
    hamburgerList.style.transform="scale(0)";
    document.querySelector('.hamburger').style.transform="scaleX(0)";
    // console.log(e.target.closest('li').children[0].innerText);
    if(e.target.closest('li').children[0].innerText == "Mapa"){
      e.preventDefault();
      mapIcon.classList.add("map-icon-list-active");
      setTimeout(function() {
        window.location.href = "mapsPage";
      }, 1000);
    }
    if(e.target.closest('li').children[0].innerText == "Strona Główna"){
      e.preventDefault();
      logoCenterHamburger.classList.add("logo-center-list-active");
      setTimeout(function() {
        window.location.href = "/";
      }, 1000);
    }
  }

  if (e.target.closest('.alert-box-close')) {
    alertBox.classList.remove('alert-box-active');
    layout.classList.remove('layout-active');
  }

  if (e.target.closest('.hamburger')) {

    document.querySelectorAll(".hamburger span")[0].classList.toggle("span-active-first");
    document.querySelectorAll(".hamburger span")[1].classList.toggle("span-active-second");
    document.querySelectorAll(".hamburger span")[2].classList.toggle("span-active-third");
    document.querySelector(".hamburger-bg").classList.toggle("hamburger-bg-active");
  };

  if (e.target.closest('nav .logo')){
    console.log("hi");
    e.preventDefault();
    document.querySelector('.fade-out-welcome').style.top="0";
    setTimeout(function() {
      window.location.href = "/";
    }, 500);
  }
});

//close alert on Escape key
document.addEventListener('keydown', closeAlertAndHamburger);


// searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('focusin', () => {
  suggestionsList.style.display = "inline-block";
});

searchInput.addEventListener('keyup', showSuggestedCities);
searchInput.addEventListener('change', showSuggestedCities);
logo.addEventListener('click', showSuggestedCities);


// sending name of city and values of position
function showSuggestedCities() {
  function findCity(place) {
    const regex = new RegExp(searchInput.value, 'gi');
    return place.city.match(regex);
  }

  function mapCity(place) {
    return place.lat;
  }

  const foundCity = cities.filter(findCity)
    .map(mapCity);

  for (let i = 0; i < 3; i++) {
    if (suggestionsCity[i]) {
      suggestionsCity[i].addEventListener('click', () => {
        const foundCity = cities.filter(findCity)
          .map(mapCity);

        const changed = changeCordi(foundCity[0]);
      })
    }
  }
  const changed = changeCordi(foundCity[0]);

}

//changing string result to number result
function changeCordi(value) {
  const valueOfFound = value;
  const valueAsNumber = parseFloat(valueOfFound);
}

function closeAlertAndHamburger(e) {
  if (e.key == "Escape") {
    alertBox.classList.remove('alert-box-active');
    layout.classList.remove('layout-active');
    document.querySelectorAll(".hamburger span")[0].classList.remove("span-active-first");
    document.querySelectorAll(".hamburger span")[1].classList.remove("span-active-second");
    document.querySelectorAll(".hamburger span")[2].classList.remove("span-active-third");
    document.querySelector(".hamburger-bg").classList.remove("hamburger-bg-active");
  }
}
