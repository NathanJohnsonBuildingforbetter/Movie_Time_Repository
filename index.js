// http://www.omdbapi.com/?i=tt3896198&apikey=56fd1ab8

const movieTitleInput = document.getElementById("movie-title");
const submitButton = document.getElementById("submitBtn");
let allMovies = []



submitButton.addEventListener("click", function(){
    const movieTitleText = movieTitleInput.value;

    // console.log(movieTitleText)
    // console.log(movieTitleInput)
    searchForMovie(movieTitleText)
});



async function searchForMovie(movieTitleText, filter){
    console.log("Search for:", movieTitleText)

    
    const movieTitleValue = movieTitleText
    const moviesPromises = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=56fd1ab8&s=${movieTitleText}`)
    console.log(moviesPromises)
    const moviePromisesData = await moviesPromises.json()
    allMovies = moviePromisesData.Search
    console.log(allMovies)
    // console.log(moviePromisesData)
    // if (!movies){
    //   movies = await moviesPromises.json()
    //   console.log(movies)
    // }
  //  movies = moviePromisesData
   filterMoviesYear();
   
}
function displayMovies(movies){
const moviesWrapper = document.querySelector(".movies");
 const moviesHtml = movies.map((movie)=>{
  return `<div class="movie__image--format">
                  <div class="movie__title">Movie Title: ${movie.Title}</div>
                    <img class="movie__poster" src="${movie.Poster}" alt="">
                    <div class="movie__year">Year Released: ${movie.Year}</div>
                </div>`

}).join("");
moviesWrapper.innerHTML = moviesHtml;}

// Slider code
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}
    
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= Number(toSlider.min) ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);
filterMoviesYear();

fromSlider.oninput = () => {controlFromSlider(fromSlider, toSlider, fromInput); filterMoviesYear();}
toSlider.oninput = () => {controlToSlider(fromSlider, toSlider, toInput); filterMoviesYear();}
fromInput.oninput = () => {controlFromInput(fromSlider, fromInput, toInput, toSlider); filterMoviesYear();}
toInput.oninput = () => {controlToInput(toSlider, fromInput, toInput, toSlider); filterMoviesYear();}

// Slider to filter code
function filterMoviesYear() {
  // If there are no movies loaded from the API yet, do nothing
  if (!allMovies || allMovies.length === 0) return;

  // 1. Get the current active values from your slider inputs
  const minYear = parseInt(fromInput.value, 10);
  const maxYear = parseInt(toInput.value, 10);

  // 2. Filter the raw API data array based on the year range
  const filteredMovies = allMovies.filter(movie => {
    // OMDB sometimes returns years with ranges (e.g., "2015–2019"). 
    // parseInt cleans this up and grabs the starting year.
    const movieYear = parseInt(movie.Year, 10);
    
    return movieYear >= minYear && movieYear <= maxYear;
  });

  // 3. Re-render only the movies that match the filter range
  displayMovies(filteredMovies);
}




//filter function

function sortMovies(event){
  const filterValue = event.target.value;
  let sortedMovies = [...allMovies]; 

  if (filterValue === "A_to_Z") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (filterValue === "Z_to_A") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (filterValue === "Oldest_To_Newest") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  } else if (filterValue === "Newest_to_Oldest") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  }

  displayMovies(sortedMovies);
}

