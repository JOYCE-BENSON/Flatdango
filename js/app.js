const API_URL = 'http://localhost:3000/films';

document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieRuntime = document.getElementById('movie-runtime');
    const movieShowtime = document.getElementById('movie-showtime');
    const movieTickets = document.getElementById('movie-tickets');
    const movieDescription = document.getElementById('movie-description');
    const buyTicketButton = document.getElementById('buy-ticket');

    let selectedMovie;

    // Fetch movies and populate the list
    fetch(API_URL)
        .then(response => response.json())
        .then(movies => {
            filmsList.innerHTML = ''; // Clear placeholder content
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.classList.add('list-group-item', 'film-item');
                li.addEventListener('click', () => displayMovieDetails(movie));
                filmsList.appendChild(li);
            });

            // Display the first movie by default
            if (movies.length > 0) {
                displayMovieDetails(movies[0]);
            }
        });

    // Display movie details
    function displayMovieDetails(movie) {
        selectedMovie = movie;
        movieTitle.textContent = movie.title;
        moviePoster.src = movie.poster;
        moviePoster.style.display = 'block';
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;
        const availableTickets = movie.capacity - movie.tickets_sold;
        movieTickets.textContent = `Available Tickets: ${availableTickets}`;
        movieDescription.textContent = movie.description;
        buyTicketButton.disabled = availableTickets === 0;
    }

    // Buy ticket button functionality
    buyTicketButton.addEventListener('click', () => {
        if (selectedMovie) {
            const availableTickets = selectedMovie.capacity - selectedMovie.tickets_sold;
            if (availableTickets > 0) {
                selectedMovie.tickets_sold += 1;
                displayMovieDetails(selectedMovie);
                alert('Ticket purchased successfully!');
            } else {
                alert('Sorry, this movie is sold out!');
            }
        }
    });
});
