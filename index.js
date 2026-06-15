// http://www.omdbapi.com/?i=tt3896198&apikey=56fd1ab8

const movieTitleInput = document.getElementById("movie-title");
const submitButton = document.getElementById("submitBtn");



submitButton.addEventListener("click", function(){
    const movieTitleText = movieTitleInput.value;

    console.log(movieTitleText)
    console.log(movieTitleInput)
});



function searchForMovie(movieTitleText){
    console.log(movieTitleText)

}