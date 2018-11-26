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
    config();
    addEventListener();

    let cardList = document.querySelectorAll(".content>div");

    cardList.forEach(function(item){
        item.addEventListener("click",getRec());
    })
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
// function config(){
//     let url = `${movieDataBaseURL}configuration?api_key=${apikey}
//     `;

//     fetch(url)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         imageURL = data.secure_base_url;
//     })
// }
function getLocalStorageData(){
    //load image sizes and base url from local storage
    
    //doesn't exist
    // the data is there but stale (over an hour old)
    
    //else it does exist and is less than 1 hour old 
    // load from local storage
    
}

function config(){
    let url = `${movieDataBaseURL}configuration?api_key=${apikey}`;
    
    fetch(url)
    .then(function(response){
        return response.json();    
    })
    .then(function(data){
        console.log(data);
        imageURL = data.images.secure_base_url;
        imageSizes = data.images.poster_sizes;
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
    searchString = document.getElementById("search-input").value;
    if (!searchString){
        alert("please enter search data");
        console.log('search not executed');
        return;
    }
    console.log('start search');
    getSearchResults ();

}
//response
function getSearchResults(){
let url = `${movieDataBaseURL}search/movie?api_key=${apikey}&query=${searchString}`;
fetch(url)
    .then(function(response){
        //log response
        console.log(response);
        //make response into data
        return response.json();
    })
    .then (function(data){
        //log data
        console.log(data);
        //make the new page
        newPage(data);
        //go to next page
        //whenever I figure that out HA! 
    })
    .catch(function (error){
        console.log("error " + error.message);
        return;
    })
}
//build results page
function newPage(data){

    let content = document.querySelector("#search-results>.content");
    let title = document.querySelector("#search-results>.title");
    content.innerHTML = " ";
    title.innerHTML = " ";
    let message = document.createElement("h2");
    message.innerHTML = " ";

    //lists number of total results
    if (data.total_results == 0){
        message.innnerHTML = `No results found for ${searchString}`;
        return;    
    }else{
        message.innerHTML = `${data.total_results}`;
    }

    //shows number to user
    title.appendChild(message);
    
    //create docFrag to fill the page with
    let df = new DocumentFragment();

    //calling func to make cards w/ data.results
    df.appendChild(videoCards(data.results));
    
    content.appendChild(df);
    console.log(df)
    //logs to be removed
    console.log(content);
    console.log(title);
}
//results page content
function videoCards(results){

    let df = new DocumentFragment();

    results.forEach(function (item){
    //make everything
    let movCard = document.createElement("div");
    let section = document.createElement("section");
    let image   = document.createElement("img");
    let vidTitl = document.createElement("h1");
    let vidDate = document.createElement("p");
    let vidRate = document.createElement("p");
    let vidDisc = document.createElement("p");
    //giving it class names
    movCard.className = "card";
    section.className = "imgSection";
    vidTitl.className = "movieTitle";
    vidDisc.className = "description";
    vidDate.className = "dateOfRel";
    //img things
    // set up image source URL
    image.src = `${imageURL}${imageSizes[2]}${item.poster_path}`;
    //movie data atributes
    movCard.setAttribute("data-title", item.title);
    movCard.setAttribute("data-title", item.id);
    //Woah there, you still append the sh!t 
    vidTitl.textContent = item.title;
    vidDate.textContent = "Released on: " + item.release_date;
    vidDisc.textContent = item.overview;
    vidRate.textcontent = item.vote_overview;
    
    //fill er up, the df that is.
    section.appendChild(image);
    movCard.appendChild(section);
    movCard.appendChild(vidTitl);
    movCard.appendChild(vidDate);
    movCard.appendChild(vidDisc);
    movCard.appendChild(vidRate);

    df.appendChild(movCard);
    })
    return df;



}
//get recommendations
function getRec(e){
    console.log(e);
    console.log(e.target);
    let movieTitle = this.getAttribute("data-title");
    console.log("clicked" + movieTitle);
}