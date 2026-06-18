// http://www.omdbapi.com/?i=tt3896198&apikey=56fd1ab8

const movieTitleInput = document.getElementById("movie-title");
const submitButton = document.getElementById("submitBtn");



submitButton.addEventListener("click", function(){
    const movieTitleText = movieTitleInput.value;

    // console.log(movieTitleText)
    // console.log(movieTitleInput)
    searchForMovie(movieTitleText)
});



async function searchForMovie(movieTitleText){
    console.log("Search for:", movieTitleText)

    const movieTitleValue = movieTitleText
    const moviesPromises = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=56fd1ab8&s=${movieTitleText}`)
    console.log(moviesPromises)
    const moviePromisesData = await moviesPromises.json()
    console.log(moviesPromises.json())

}
searchForMovie(movieTitleText)