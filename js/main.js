const movieDataBaseURL = "https://api.themoviedb.org/3/";
let imageURL = null;
let imageSizes = [];

let searchString ="";

document.addEventListener("DOMContentLoaded", init);

function init() {
    addEventListener();
    console.log(APIKEY);
}

function addEventListener() {
    let searchButton = document.querySelector(".searchButtonDiv");
  searchButton.addEventListener("click", startSearch);


}
function getLocalStorageData(){
    //load image sizes and base url from local storage
    
    //doesn't exist
    // the data is there but stale (over an hour old)
    
    //else it does exist and is less than 1 hour old 
    // load from local storage
    
}

function getPosterSizesandURL(){
    let url = `${movieDataBaseURL}configuration?api_key=${APIKEY}`;
    
    fetch(url)
    .then(function(response){
        return response.json;    
    })
    .then(function(data){
        consoel.log(data);
        imageURL = data.images.secure_base_url;
        imageSizes = data.images.posters_sizes;
        console.log(imageURL);
        console.log(imageSizes);
    })
    .catch(function(error){
        console.log(error);
        alert("check the console. its broken.");
    })
}

function startSearch(){
    console.log('start search');
    searchString = document.getElementById("search-input").value;
    if (!searchString){
        alert("please enter search data");
        return;
    }

    getSearchResults ();

}
function getSearchResults(){
let url = `${movieDataBaseURL}search/movie?
api_key=${APIKEY}&query=${searchString.value}`;

fetch(url)
    .then(response => response.json())
    .then(function (data){
        console.log(data);
    })
    .catch(error => console.log(error))

}