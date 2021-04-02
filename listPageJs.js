const searchInput = document.querySelector(".search");
const lookupIcon = document.querySelector(".lookup-icon");
const lookupAndMap = document.querySelector(".lookup-and-map");


//expand search input
searchInput.addEventListener('click', function(){
  searchInput.classList.add('search-active');
  lookupIcon.classList.add('lookup-icon-active');
});

lookupIcon.addEventListener('click', function(){
  searchInput.classList.add('search-active');
  lookupIcon.classList.add('lookup-icon-active');
});

//hover search icon
lookupAndMap.addEventListener('mouseover', function(e){
  e.target.className ==  "material-icons lookup-icon" ? searchInput.classList.add("search-hover") : searchInput.classList.remove("search-hover");

})
