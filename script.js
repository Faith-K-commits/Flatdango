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

    // URL of the hosted JSON data
    const jsonBinUrl = "https://api.jsonbin.io/v3/b/66927a4dad19ca34f8871911";
    const options = {
        headers: {
            'X-Master-Key': '$2a$10$Vh0tkfc6hFlhSqWKav/yXenbp.RLGASmLhNOQmoNbEh4DInzDH2x6'
        }
    };

    // Fetch all films and populate the menu
    fetch(jsonBinUrl, options)
        .then(response => response.json())
        .then(data => {
            const films = data.record.films;
            filmsList.innerHTML = "";
            films.forEach(film => {
                const li = document.createElement("li");
                li.textContent = film.title;
                li.classList.add("film", "item");
                li.addEventListener("click", () => loadFilmDetails(film));
                filmsList.appendChild(li);
            });

            // Load the first film's details by default
            if (films.length > 0) {
                loadFilmDetails(films[0]);
            }
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
