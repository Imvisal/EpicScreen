const API_KEY = "cbbd63fd";

const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movies = document.getElementById("movies");

searchBtn.addEventListener("click", searchMovie);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchMovie();
    }
});

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

        <button
class="details-btn"
onclick="movieDetails('${movie.imdbID}')">

View Details

</button>

    } catch {

        movies.innerHTML = "<h2>Something went wrong!</h2>";

    }

}

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

                <button class="details-btn">
                    View Details
                </button>

            </div>

        </div>

        `;

    });

}

