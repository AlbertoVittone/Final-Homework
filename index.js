

$('#movie-search').bind('keydown', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});



let MainMovies = ["Star Wars", "Barbie", "Batman"]

async function loadMovies() {
    let CardClicked = document.querySelector(".card-clicked")
    CardClicked.innerHTML = "";
    let ChosenMovies = document.querySelector("#cinema")
    ChosenMovies.innerHTML = "";
    document.querySelector("#spinner").style.display = "block";
    let alert = document.querySelector("#alert")
    alert.style.display = "none"


    for (i = 0; i < MainMovies.length; i++) {
        let response = await fetch("http://www.omdbapi.com/?apikey=5d3ee366&s=" + MainMovies[i])
        let Allmovies = await response.json()
        console.log(Allmovies)
        let MoviesContainer = document.createElement("div")
        MoviesContainer.className = "movies-container"
        MoviesContainer.innerHTML = `<h3> The best movies of "${MainMovies[i]}"</h3>`
        let MyMovies = document.createElement("div")
        MyMovies.className = "movies-firstpage"
        for (j = 0; j < Allmovies.Search.length; j++) {

            MyMovies.innerHTML += `<div class="col-sm-6 col-md-4 col-lg-2 card-poster">  
            <img class="poster" src="${Allmovies.Search[j].Poster}">
            <a href="details.html?imdbID=${Allmovies.Search[j].imdbID}"><div class="overlay">
            <div class="info">
            <p class="title">${Allmovies.Search[j].Title} </p>
            <span class="badge badge-success" class="type">${Allmovies.Search[j].Type}</span>
            </div>
            </div></a>
            </div>`
        }
        ChosenMovies.appendChild(MoviesContainer)
        MoviesContainer.appendChild(MyMovies)

    }
    document.querySelector("#spinner").style.display = "none";
}





let TheSearched = document.querySelector("#movie-search")
TheSearched.addEventListener("keydown", function x(e){
    if(e.keyCode === 13){
        search()
    }
})






function search() {
    setTimeout(function () { $("[data-toggle=popover]").popover("hide") });
    let ChosenMovies = document.querySelector("#ChosenMovies")
    ChosenMovies.innerHTML = "";
    let MovieSearched = document.querySelector("#movie-search").value
    if (MovieSearched) {
        setTimeout(function () { $("[data-toggle=popover]").popover("hide") });
        loadSearch()
    }
    else {
        setTimeout(function () { $("[data-toggle=popover]").popover("show") });
    }



    async function loadSearch() {
        let alert = document.querySelector("#alert")
        alert.style.display = "none"
        document.querySelector("#spinner").style.display = "block";
        let cardclicked = document.querySelector(".card-clicked")
        cardclicked.innerHTML = "";
        let cinema = document.querySelector("#cinema")
        cinema.innerHTML = ""
        let url = "http://www.omdbapi.com/?apikey=5d3ee366&s="
        let MovieSearched = document.querySelector("#movie-search").value
        let response = await fetch(url += MovieSearched)

        if (response.ok) {
            let movies = await response.json();
            if (movies.Search) {
                let alert = document.querySelector("#alert")
                alert.style.display = "none"
                let Mylist = document.createElement("div")
                Mylist.className = "row"
                Mylist.style.justifyContent = "center"
                let cinema = document.querySelector("#cinema")
                for (i = 0; i < movies.Search.length; i++) {
                    Mylist.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-2 card-poster">  
                            <img class="poster" src="${movies.Search[i].Poster}">
                            <a href="details.html?imdbID=${movies.Search[i].imdbID}"><div class="overlay">
                            <div class="info">
                            <p class="title">${movies.Search[i].Title} </p>
                            <span class="badge badge-success" class="type">${movies.Search[i].Type}</span>
                            </div>
                            </div></a>
                            </div>`
                    cinema.appendChild(Mylist)
                }
            } else {
                let alert = document.querySelector("#alert")
                alert.style.display = "block"
                alert.innerText = `It seems there is nothing called "${MovieSearched}". Try again!`
            }
        }
        document.querySelector("#spinner").style.display = "none";
    }
}






async function loadClicked(MovieId) {
    let response = await fetch("http://www.omdbapi.com/?apikey=5d3ee366&i=" + MovieId)
    let TheInfo = await response.json()
    console.log(TheInfo)
    document.querySelector("#ChosenImage").src = TheInfo.Poster
    let about = document.querySelector(".About")
    // about.style.backgroundImage = `url("${TheInfo.Poster}")`
    about.innerHTML =
        `<h2> ${TheInfo.Title}</h2>
            <p> <h5> Actors </h5> ${TheInfo.Actors} </p>
            <p> <h5> Year </h5> ${TheInfo.Year} </p>
            <p> <h5> Language </h5>${TheInfo.Language}</p>
            <p><h5> Country</h5> ${TheInfo.Country} </p>
            <p><h5> Director </h5>${TheInfo.Director}</p>
            <p> <h5> Genre </h5> ${TheInfo.Genre}</p>
            <p> <h5> Plot </h5> ${TheInfo.Plot}</p>
            <p><h5> Runtime </h5>${TheInfo.Runtime}</p>`

}







function toeliminate(){
    let list= document.querySelector("#Movielist")
    list.innerHTML =""
}

function check() {
    let checkbox = document.querySelector("#completedonly").checked
    if (checkbox) {
        let seen = document.querySelectorAll(".seen")
        for (let i = 0; i < seen.length; i ++){
            seen[i].classList.add("hidden")
        }
    }
    else {
        let hidden = document.querySelectorAll(".hidden")
        for(let i = 0; i < hidden.length; i++)
            hidden[i].classList.remove("hidden")
    }
}



    function add() {
        let ToWatch = document.querySelector("#insertHere").value 
        let list = document.querySelector("#Movielist")
        if(ToWatch){ let TheMovie = document.createElement("li")
        TheMovie.classList.add("list")
        TheMovie.innerText = ToWatch
        list.appendChild(TheMovie)

        TheMovie.addEventListener("click", (e) => e.currentTarget.classList.toggle("seen"))
          
        } else {  
            alert("You must insert a text!")

    } }







            
    

