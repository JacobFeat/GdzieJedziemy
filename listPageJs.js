const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".list-of-suggestions");
const lookupIcon = document.querySelector(".lookup-icon");
const lookupAndMap = document.querySelector(".lookup-and-map");
const suggestionsCity = suggestionsList.children;

document.addEventListener('mouseover', (e) => {
  e.target.className === "search" ? searchInput.classList.add("search-hover") : searchInput.classList.remove("search-hover");
});

//expand and collapse search input
document.addEventListener('click', (e) => {
  if (e.target.className === "search" || e.target.className === "search search-active" || e.target.className === "search search-hover") {
    searchInput.classList.add('search-active');
    lookupIcon.classList.add('lookup-icon-active');
  } else {
    searchInput.classList.remove('search-active');
    lookupIcon.classList.remove('lookup-icon-active');
    searchInput.value = "";
  }
});

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
