let iffy = (function(){
    // CONST & VARS
    const movieDataBaseURL = "https://api.themoviedb.org/3/";
    let imageURL = null;
    let imageSizes = [];
    let searchString ="";
    let pages = [];
    //
    document.addEventListener("DOMContentLoaded", init);
    /**************/ 
    /* INITIALIZE */ 
    /**************/ 
    function init() {
        getLocalStorageData();
        addEventListener();
    }

    function addEventListener() {
        //SEARCH BUTTON
        let searchButton = document.querySelector(".searchButtonDiv");
        searchButton.addEventListener("click", startSearch);
        //OPTIONS BUTTON
        let optionsButton = document.querySelector(".options");
        optionsButton.addEventListener("click", showModal);
        //BACK BUTTON
        let backButton = document.querySelector(".backButtonDiv");
        backButton.addEventListener("click", goToSearchResults);
        //CANCEL BUTTON IN MODAL WINDOW cause saving doesn't do anything.
        let cancelButton = document.querySelector(".cancelButton");
        cancelButton.addEventListener("click",hideOverlay);
        //SAVE BUTTON IN MODAL WINDOW
        // let saveButton = document.querySelector(".saveButton");
        // saveButton.addEventListener("click",saveOptions);
        //does it save? NOPE.

        //enter to submit? ha. I couldn't make that work at all.
        
    }

    /***************************/
    /* LOCAL STORAGE FUNCTIONS */
    /***************************/
    function getLocalStorageData(){
        
        //find the time
        if(localStorage.getItem("dateStored")) {
        //let the limit it's good for 
            // let staleLimit = 3600000;
            let staleLimit = 300;
            // localStorage.clear();
            let saveDate = localStorage.getItem("dateStored");
            console.log(saveDate);
        //calc the time inbetween
            let timeSaved = calcTimeStored(saveDate);
        //check if theres data in localStorage
            
        //if its more than that ^ you refresh
            if(timeSaved > staleLimit){
                config();
            }
        //else use it
            else{
                imageURL = JSON.parse(localStorage.getItem('secure_base_url'));
                imageSizes = JSON.parse(localStorage.getItem('poster_sizes')); 
                console.log(imageURL + imageSizes);
            }
        }else{
            config();
        }
    }
    function saveLocalStorageData(){
        let saveDate = new Date;
            saveDate = saveDate.getTime();
        localStorage.setItem("dateStored", saveDate);
        localStorage.setItem("url",JSON.stringify(imageURL));
        localStorage.setItem("sizes",JSON.stringify(imageSizes));
    }
    function calcTimeStored(saveDate){
        let now = new Date;
        console.log(now.getTime());
        let eTime = (now - saveDate);
        return eTime;
        //this was the hardest part ^ 
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
            saveLocalStorageData(data);
        })
        .catch(function(error){
            console.log(error);
            alert("check the console. its broken.");
        })
        
    }
    /******************/
    /* MODE FUNCTINOS */ 
    /******************/ 
    function saveOptions(){
        let perferences = document.getElementById("movies");
        let mode = null ; 
        
    }
    //search button
    function startSearch(){
        pages = document.querySelectorAll(".page");
        console.log(pages);
        goToSearchResults();
        //
        searchString = document.getElementById("search-input").value;
        if (!searchString){
            alert("please enter search data");
            console.log('search not executed');
            return;
        }
        console.log('start search');
        getSearchResults ();

    }
    /****************/ 
    /* START SEARCH */
    /****************/ 
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
    /**********************/ 
    /* BUILD RESULTS PAGE */ 
    /**********************/ 
    function newPage(data){

        let content = document.querySelector("#search-results>.content");
        let title = document.querySelector("#search-results>.title");
        content.innerHTML = " ";
        title.innerHTML = " ";
        let message = document.createElement("h2");
        message.innerHTML = " ";

        //lists number of total results
        if (data.total_results.length === 0){
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
        //collecting array of cards to click
        let cardList = document.querySelectorAll(".content>div");
        cardList.forEach(function(item){
            item.addEventListener("click",getRec);
            
        })
        // console.log(df)
    }
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
        movCard.setAttribute("data-id", item.id);
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
    /***********************/ 
    /* GET RECOMMENDATIONS */ 
    /***********************/
    function getRec(){
        // console.log(this);
        let movieTitle = this.getAttribute("data-title");
        let movieID = this.getAttribute("data-id");
        console.log("clicked" + movieID + movieTitle);
        //starting rec request
        let url = `${movieDataBaseURL}movie/${movieID}/recommendations?api_key=${apikey}`;
        fetch(url)
        .then(response => response.json())
        .then ((data) => {
            //log data
            console.log(data);
            //calling newRecPage
            newRecPage(data);
        })
        .catch((error) => console.log(error));
        
    }
    /******************************/ 
    /* BUILD RECOMMENDATIONS PAGE */ 
    /******************************/ 
    function newRecPage(data){
        let content = document.querySelector("#recommend-results>.content");
        let title = document.querySelector("#recommend-results>.title");
        content.innerHTML = " ";
        title.innerHTML = " ";
        let message = document.createElement("h2");
        message.innerHTML = " ";
        console.log(title);
        goToRecResults(pages);
        //lists number of total results
        if (data.total_results == 0){
            message.innnerHTML = `No results found for movie related to${searchString}`;
            return;    
        }else{
            message.innerHTML = `${data.total_results}`;
        }
        //shows number to user
        title.appendChild(message);
        
        // //create docFrag to fill the page with
        let df = new DocumentFragment();

        // //calling func to make cards w/ data.results
        df.appendChild(videoCards(data.results));
        content.appendChild(df);
        // collecting array of cards to click
        let cardList = document.querySelectorAll(".content>div");
        cardList.forEach(function(item){
            item.addEventListener("click",getRec);
        })
        console.log(df);
        console.log(content);
    }
    /********************/ 
    /* PAGE NAVIGATIONS */ 
    /********************/ 
    function goToSearchResults(){
        pages[0].classList.remove("hidden");
        pages[1].classList.add("hidden");
    }
    function goToRecResults(){
        pages[0].classList.add("hidden");
        pages[1].classList.remove("hidden");
    }
    /****************/ 
    /* MODAL WINDOW */ 
    /****************/
    function showModal(e) {
        e.preventDefault();
        let overlay = document.querySelector("#overlay");
        overlay.classList.toggle("hidden");
        overlay.classList.toggle("active");
        let modal = document.querySelector("#modal");
        modal.classList.toggle("off");
        modal.classList.toggle("on");
    }
    function hideOverlay(e) {
        e.preventDefault();
        e.stopPropagation();
        let overlay = document.querySelector(".overlay");
        overlay.classList.remove("active");
        overlay.classList.add("hidden");
        hideModal(e);
        
    }
    function hideModal(e) {
        e.preventDefault();
        let modal = document.querySelector(".modal");
        modal.classList.remove("on");
        modal.classList.add("off");
    }
}());