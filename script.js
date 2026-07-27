const API_KEY = "cbbd63fd";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movies = document.getElementById("movies");

const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// Search Button
searchBtn.addEventListener("click", searchMovie);

// Enter Key
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchMovie();
    }
});

// Search Movie
async function searchMovie() {

    const movie = searchInput.value.trim();

    if (movie === "") {
        alert("Please enter a movie name");
        return;
    }

    movies.innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            movies.innerHTML = "<h2>Movie Not Found</h2>";
            return;
        }

        displayMovies(data.Search);

    } catch (error) {

        movies.innerHTML = "<h2>Something went wrong!</h2>";

    }

}

// Display Movies
function displayMovies(list) {

    movies.innerHTML = "";

    list.forEach(movie => {

        movies.innerHTML += `
        
        <div class="movie">

            <img src="${
                movie.Poster !== "N/A"
                ? movie.Poster
                : "https://placehold.co/300x450?text=No+Image"
            }">

            <div class="movie-info">

                <h3>${movie.Title}</h3>

                <p>📅 ${movie.Year}</p>

                <button
                class="details-btn"
                onclick="movieDetails('${movie.imdbID}')">

                View Details

                </button>

            </div>

        </div>

        `;

    });

}

// Movie Details
async function movieDetails(id) {

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );

        const movie = await response.json();

        console.log(movie); // මේ line එක add කරන්න

      modalBody.innerHTML = `
<div class="modal-details">

    <img src="${movie.Poster}" alt="${movie.Title}">

    <div class="modal-text">

        <h2>${movie.Title}</h2>

        <p><strong>⭐ IMDb:</strong> ${movie.imdbRating}</p>

        <p><strong>📅 Year:</strong> ${movie.Year}</p>

        <p><strong>🎭 Genre:</strong> ${movie.Genre}</p>

        <p><strong>🎬 Director:</strong> ${movie.Director}</p>

        <p><strong>👨‍🎤 Actors:</strong> ${movie.Actors}</p>

        <p><strong>🌍 Country:</strong> ${movie.Country}</p>

        <p><strong>⏰ Runtime:</strong> ${movie.Runtime}</p>

        <p><strong>📝 Plot:</strong></p>

        <p>${movie.Plot}</p>

        <br>

        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + " Official Trailer")}" target="_blank">

            <button class="details-btn">
                ▶ Watch Trailer
            </button>

        </a>

    </div>

</div>
`;

// Close Modal
closeModal.onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

};

console.log(modal);
console.log(modalBody);
console.log(closeModal);

