const KEY = "ae3a28351ad1752fe9c80c48e0cc3b49";
//your MOVIEDB API key goes here. The one that I got from TMDB//


//iconic icon set. you can add the iconic.min.js content here//
//search --> baseurl + "search/movie?api_key=<KEY>&query=<search words>
//recommended --> baseurl + "movie/" + <movie_id> + "recommendations?api_key + <KEY> + "&language=en-US"

let app = {
    URL: 'http://api.themoviedb.org/3/',
    imgURL: 'https://image.tmdb.org/t/p/w500/',
    init: function () {
        //focus on the text field
        let input = document.getElementById('search-input');
        input.focus();
        //setTimeout(app.addHandlers,1234);
        //focus concentrates on one thing that we want. it tells the browswer, "I want the keyboard cursor on the blank field. there is an html for it but the js tends to render faster and, for example, bring the keyboard on the mobile. For desktops, it doesn't matter.//
        //next, add the click listener
        //addHandlers: funcion(){} this is just if you are using SVG from unicode TMDB
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);
        //add a listener for <ENTER>
        //        document.addEventListener('keypress', app.runSearch);
        //you can add a whole code to check if the ENTER key was entered, but instead, create a function
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            //whichever anh of the three is true. this is to check for char values on older browser.
            let str = String.fromCharCode(char);
            console.log(char, str);
            if (char == 10 || char == 13) {
                //we have an ENTER or RETURN key, then run the search
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });
    },
    //comma separates things within the function//
    runSearch: function (ev) {
        //inside here, do the fetch to get the list of movies//
        console.log(ev.type);
        ev.preventDefault();
        let page = 1;
        //good practice for prevent from weird browser things, the preventDefault
        let input = document.getElementById('search-input');
        if (input.value) {
            //code will not run if the value is an empty string
            let url = app.URL + "search/movie?api_key=" + KEY + "&query=" + input.value + "&page=" + page;
            //if the key is inside, put it within the app properties, and this will be APP.KEY
            //this info comes from the movie database documentation for queries
            //another recent way to write line 43 is url=`${app.URL}search/movie?api_key${APIKEY}&query=${input.value}`; 
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    //break steps so you can reuse them
                    app.showMovies(data);
                })

                .catch(err => {
                    console.log(err);
                })

        }
    },
    showMovies: function (movies) {
        let container = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        //i want to find something with content class within the search-results
        
        container.innerHTML = " ";
        var eraser = document.getElementById('search-input').reset;
        
        //above: it is supposed to clear old results for a new search, but it is keeping the typed values//

        movies.results.forEach(function (movie) {
            //you only want the value on the array, not the numbers or the other one

            let div = document.createElement('div');
            console.log(movie);
            let title = document.createElement('a');
            let release = document.createElement('span');
            release.classList.add('year');
            title.textContent = movie.title;
            div.appendChild(title);
            release.textContent = movie.release_date;
            div.classList.add('movie');
            let overview = document.createElement('p');
            overview.textContent = movie.overview;
            let img = document.createElement('img');
            img.classList.add('poster');
            img.setAttribute('src', app.imgURL + movie.poster_path);
            title.setAttribute('data-movie', movie.id);
            div.appendChild(img);
            div.appendChild(overview);
            div.appendChild(release);


            title.addEventListener('click', function (ev) {
                     
                let movieID = ev.target.getAttribute('data-movie');
                console.log(movieID);
                
                let page = 1;
                let url = app.URL + "movie/" + movieID + "/recommendations?api_key=" + KEY + "&language=en-US&page=" + page;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        //break steps so you can reuse them
                        // Create recommendation list
                        let movies = data;

                        let container = document.querySelector('#recommend-results .content');
                        let df = document.createDocumentFragment();

                        movies.results.forEach(function (movie) {
                            let div = document.createElement('div');
                            let title = document.createElement('a');
                            let release = document.createElement('date');
                            title.textContent = movie.title;
                            div.appendChild(title);
                            release.textContent = movie.release_date;
                            div.classList.add('movie');
                            let overview = document.createElement('p');
                            overview.textContent = movie.overview;
                            let img = document.createElement('img');
                            img.classList.add('poster');
                            img.setAttribute('src', app.imgURL + movie.poster_path);
                            title.setAttribute('data-movie', movie.id);
                            div.appendChild(img);
                            div.appendChild(overview);
                            df.appendChild(div);
                            div.appendChild(release);

                            // toggle active class
                            document.getElementById("search-results").classList.remove("active");
                            document.getElementById("recommend-results").classList.add("active");
                        });
                        container.appendChild(df);
                    })

                    .catch(err => {
                        console.log(err);
                    })


            });

                

            div.appendChild(overview);
            //add click listener for getting recommended movies
            //you don't want the page to reload x amount of results. mobiles can't handle so much information for reload. you need to break it down so it reloads once on line 63. 
            df.appendChild(div);

        });
        container.appendChild(df);


    },

    //    ASK STEVE WHY THE HELL THIS WON'T WORK'
    //    getRecommended: function (ev) {
    //        let movieID = ev.target.getAttribute('data-movie');
    ////        let movieID = id;
    //        console.log(movieID);
    //        console.log("qwerfg");
    //
    //    },
    getRecommended: function (movies) {}
};

document.addEventListener('DOMContentLoaded', app.init);
//you don't put the parenthesis at the end because you want app after DOM is loaded//




//HOW CAN YOU MAKE IT EASIER FOR SOMEONE TO NAVIGATE OR OPERATE YOUR APP? TELL THEM WHAT TO DO WITH MESSAGES WITH INSTRUCTIONS OR HINTS, OR DOING A FIRST CLICK, FOR EXAMPLE, ON THE TEXT FIEL AND BE READY FOR THE USER TO START TYPING. NEXT, YOU TELL THEM TO HIT ENTER OR CLICK THE SEARCH BUTTON. YOU CAN USE AN EVENT OR A DOWNKEY .LISTENER FOR THAT.//

//DOMCONTENTLOADED LISTENER
//GET IMAGE CONFIG INFO WITH FETCH, BECAUSE THIS IS WHERE THE IMAGES WITH DIFFERNT SIZES ARE.
//AUTOFOCUS ON TEXT FIELD
//CLICK LISTENER ON SEARCH BUTTON
//KEYPRESS LISTENER FOR ENTER. LISTENER CALLS FOR FUNCTIONS: CLICK, FUNCTION THAT CALLS ANOTHER FUNCTION THAT TRIGGERS ANOTHER FUNCTION AND SO ON. 

//BOTH CLICK AND ENTER CALL SEARCH FUNCTION 
//DO A FETCH CALL TO RUN THE SEARCH
//HANDLE THE RESULTS -BUILD A LIST OF MOVIES

//NEW MOVIE CONTENT HAS CLICK LISTENERS
//CLICK MOVIE TO DO A FETCH FOR RECOMMENDED
//WITH RECOMMENDED RESULTS BACK
//NAVIGATE TO RECOMMENDED PAGE
//BUILD AND DISPLAY THE LIST OF MOVIE RECOMMENDATIONS
