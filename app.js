// API KEY: c3936491
// https://www.omdbapi.com/?apikey=c3936491&s=SEARCH_TERM
// https://www.omdbapi.com/?apikey=c3936491&i=IMDB_ID
// Data requests: http://www.omdbapi.com/?apikey=[c3936491]&
// Poster API requests: http://img.omdbapi.com/?apikey=[c3936491]&

console.log("JS loaded!");

fetchMovies("Shrek");
console.log("fetchMovies was called");

let movies = [];
const searchInput = document.getElementById("search__input");
const sortSelect = document.getElementById("sort__select");
const resultsGrid = document.getElementById("results__grid");
const searchButton = document.querySelector(".search__button");

async function fetchMovies(query) {
    const API_KEY = "c3936491";
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();

    if (data.Search) {
        movies = data.Search;
        displayMovies(movies);
    } else {
        resultsGrid.innerHTML = "<p>No results found.</p>";
    }
}

function displayMovies(list) {
    const limited = list.slice(0, 8); 

    resultsGrid.innerHTML = limited.map(movie => `
        <div class="movie">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "./Assets/placeholder.png"}" alt="${movie.Title}">
            <h3 class="movie__title">${movie.Title}</h3>
            <p class="movie__year">${movie.Year}</p>
            <button class="movie__details">View Details</button>
        </div>
    `).join("");

    const detailButtons = resultsGrid.querySelectorAll(".movie__details");

    detailButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const imdbID = limited[index].imdbID;
            console.log("Clicked movie:", imdbID);
        });
    });
}

document.querySelector(".search__button").addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchMovies(query);
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) fetchMovies(query);
    }
});

sortSelect.addEventListener("change", () => {
    let sorted = [...movies];

    switch (sortSelect.value) {
        case "az":
            sorted.sort((a, b) => a.Title.localeCompare(b.Title));
            break;
        case "za":
            sorted.sort((a, b) => b.Title.localeCompare(a.Title));
            break;
        case "year__oldest":
            sorted.sort((a, b) => a.Year - b.Year);
            break;
        case "year__newest":
            sorted.sort((a, b) => b.Year - a.Year);
            break;
    }

    displayMovies(sorted);
});