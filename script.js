document.addEventListener("DOMContentLoaded", () => {
    const filmsList = document.getElementById("films");
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketButton = document.getElementById("buy-ticket");

    let currentFilm;

    // Fetch all films and populate the menu
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(films => {
            filmsList.innerHTML = "";
            films.forEach(film => {
                const li = document.createElement("li");
                li.textContent = film.title;
                li.classList.add("film", "item");
                li.addEventListener("click", () => loadFilmDetails(film));
                filmsList.appendChild(li);
            });
        });

    // Fetch the first film's details when the page loads
    fetch("http://localhost:3000/films/1")
        .then(response => response.json())
        .then(film => {
            loadFilmDetails(film);
        });

    // Load film details
    function loadFilmDetails(film) {
        currentFilm = film;
        poster.src = film.poster;
        title.textContent = film.title;
        description.textContent = film.description;
        runtime.textContent = film.runtime;
        showtime.textContent = film.showtime;
        updateAvailableTickets();
    }

    // Update the available tickets
    function updateAvailableTickets() {
        const available = currentFilm.capacity - currentFilm.tickets_sold;
        availableTickets.textContent = available;
        buyTicketButton.disabled = available === 0;
    }

    // Buy ticket event listener
    buyTicketButton.addEventListener("click", () => {
        if (currentFilm.tickets_sold < currentFilm.capacity) {
            currentFilm.tickets_sold++;
            updateAvailableTickets();
        }
    });
});
