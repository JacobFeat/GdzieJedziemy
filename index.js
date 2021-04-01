const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".list-of-suggestions");
const leftLight = document.querySelector(".left-light");
const rightLight = document.querySelector(".right-light");
const subBtn = document.querySelector(".submit-button");
const logo = document.querySelector(".logo");
let suggestionsCity = suggestionsList.children;
// let cityArray = [];

let cities = [];

fetch('pl.json')
  .then(blob => blob.json())
  .then(data => cities.push(...data));

  function findMatches(cityToSearch, cities){
    return cities.filter((place) => {
        const regex = new RegExp(cityToSearch, 'gi');
        return place.city.match(regex);
    })
  };

function displayMatches(){
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

    if(suggestionsCity[0]){
      suggestionsCity[0].addEventListener('click', () =>{
        const foundSuggestion = suggestionsCity[0].innerText;
        // console.log(foundSuggestion);
        searchInput.value = foundSuggestion;
        suggestionsList.style.display = "none";
        const foundCity = cities.filter(findCity)
                                .map(mapCity);
        const displayFound = function(){
          console.log(foundCity[0]);
        }
        displayFound();
      })
    }
    if(suggestionsCity[1]){
      suggestionsCity[1].addEventListener('click', () =>{
        const foundSuggestion = suggestionsCity[1].innerText;
        // console.log(foundSuggestion);
        searchInput.value = foundSuggestion;
        suggestionsList.style.display = "none";
        const foundCity = cities.filter(findCity)
                                .map(mapCity);
        const displayFound = function(){
          console.log(foundCity[0]);
        }
        displayFound();
      })
    }

    if(suggestionsList.childElementCount == 433){
      suggestionsList.style.display = "none";
    }
    else if(suggestionsList.childElementCount !== 433){
      suggestionsList.style.display = "inline-block";
    }

    // const foundCity = cities.filter((place) => {
    //     return place.city.includes(searchInput.value);
    // })
    //                       .map((place) => {
    //     return place.lat;
    // });
    // console.log(foundCity);


    // console.log(displayFound());
    // subBtn.addEventListener('click', displayFound());
    function findCity(place){
      const regex = new RegExp(searchInput.value, 'gi');
      return place.city.match(regex);
    }

    function mapCity(place){
      return place.lat;
    }

    const foundCity = cities.filter(findCity)
                            .map(mapCity);

    const displayFound = function(){
      console.log(foundCity[0]);
    }
    displayFound();
    // logo.addEventListener('click', displayFound);

    // function takeCordinates(displayFound){
    //   return displayFound*2 + " new";
    // }

    // logo.addEventListener('click', takeCordinates);
    // end of test
}


searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('focusin', () => {
  suggestionsList.style.display = "inline-block";
});
// searchInput.addEventListener('focusout', () => {
//   suggestionsList.style.display = "none";
// });
//
// suggestionsList.addEventListener("click", (e) => {
//   console.log("test");
// });
