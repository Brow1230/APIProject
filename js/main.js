// CONST & VARS
const movieDataBaseURL = "https://api.themoviedb.org/3/";
let imageURL = null;
let imageSizes = [];

let searchString ="";
let pages = [];
//
document.addEventListener("DOMContentLoaded", init);
//
function init() {
    addEventListener();
}

function addEventListener() {
    //SEARCH BUTTON
    let searchButton = document.querySelector(".searchButtonDiv");
  searchButton.addEventListener("click", startSearch);
    //OPTIONS BUTTON
    let optionsButton = document.querySelector(".options");
    optionsButton.addEventListener("click", options);
    //BACK BUTTON
    let backButton = document.querySelector(".backButtonDiv");
    backButton.addEventListener("click", back);
    //PAGES
    pages = document.querySelectorAll(".page");
    console.log(pages,optionsButton,searchButton);
    //enter to submit?
    //NOPE.
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
//Button functions
//options / settings button
function options(){

}
//Back Button
function back(){

}
//search button
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
let url = `${movieDataBaseURL}search/movie?api_key=${APIKEY}&query=${searchString}`;
fetch(url)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then (function(jsonData){

        console.log(jsonData);
        showResponseData();
    })
    .catch(function (error){
        console.log("error" + error.message);
    })

    
// fetch(url)
//     .then(response => response.json())
//     .then(function (data){
//         console.log(data);
//     })
//     .catch(error => console.log(error))

}
function showResponseData(jsonData){
    let searchResults = document.querySelector(".search-results>.content");
    let cards = []
    jsonData.forEach(cardBuilder(item));
        //FU. you get the best of me tonght
        //till tomorrow API.
        
}    
function cardBuilder(){
    //make everything
    let df = new DocumentFragment();
    let movieCard = document.createElement("div");
    let section = document.createElement("section");
    let image = document.createElement("img");
    let vidTitle = document.createElement("p");
    let vidDate = document.createElement("p");
    let vidRate = document.createElement("p");
    let vidDisc =document.createElement("p");
    //giving it class names
    movieCard.className("card");
    section.className("imgSection");
    vidTitle.className("movieTitle");
    vidDisc.className("description");
    vidDate.className("description");
    //Woah there, you still append the sh!t 
    vidTitle.textContent = response.title;
    vidDate.textContent = results.release_date;
    vidDisc.textContet = results.overview;
    
    //fill er up, the df that is.
    section.appendChild(image);
    movieCard.appendChild(section);
    movieCard.appendChild(vidTitle);
    movieCard.appendChild(vidDate);
    movieCard.appendChild(vidDisc);
    movieCard.appendChild(vidRate);

    df.appendChild(movieCard);

    console.log(df)
}