const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".list-of-suggestions");
const lookupIcon = document.querySelector(".lookup-icon");
const lookupAndMap = document.querySelector(".lookup-and-map");
const suggestionsCity = suggestionsList.children;

const myPlace = {
  lat: 49.092
}

document.addEventListener('mouseover', (e) => {
  e.target.className === "search" ? searchInput.classList.add("search-hover") : searchInput.classList.remove("search-hover");
});

document.addEventListener('click', (e) => {
  //expand and collapse search input
  if(e.target.classList.contains('search')){
    searchInput.classList.add('search-active');
    lookupIcon.classList.add('lookup-icon-active');
  }
  else{
    searchInput.classList.remove('search-active');
    lookupIcon.classList.remove('lookup-icon-active');

  }

  if(e.target.closest('li')){
    // TODO: add popup feature about particular object
  }

  if(e.target.classList.contains('name')){
    // add main-color bullet to clicked suggested name
    let dotForLi = document.createElement('span');
    dotForLi.setAttribute('class', 'dot-for-li');
    e.target.appendChild(dotForLi);
    //replace search input value by clicked suggested name
    searchInput.value = e.target.textContent;
    const currentName = e.target.textContent;

    //leave just one active suggested city feature
    const suggestionsCityArray = Array.from(suggestionsCity);

    if(e.target.textContent == currentName){
      // make a function which return new array with name of cities
      function findMyCity(place){
        return place = searchInput.value;
      }
      const showMyCity = suggestionsCityArray.filter(findMyCity)
                                              .map(place => {
        return place.innerText;
      });
      const myCurrentCityIndex = showMyCity.indexOf(currentName);
      for(let i=0; i<3; i++){
        if(suggestionsCity[i]){
          suggestionsCity[i].style.display = "none";
          suggestionsCity[myCurrentCityIndex].style.display = "inline-block";
        }
      }
    }
  }
}, false);

//search city function
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
    const cityName = place.city.replace(regex, this.value);

    return `
    <li>
      <span class = "name">${cityName}</span>
    </li>
    `;
  }).join("");
  suggestionsList.innerHTML = html;

//display just 3 suggested cities
  for(let i=3; i<suggestionsList.childElementCount; i++){
    if(suggestionsCity[i]){
      suggestionsCity[i].style.display = "none";
    }
  }

}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
