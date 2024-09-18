window.onload = function() {
    document.querySelector('.back_block').addEventListener('click', function() {
        window.history.back();
    });
    
    const apiKey = '4a54ab11d3721dac3c7f819587e24e14';

    // Récupérer l'ID du film depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id'); // Récupère la valeur du paramètre "id"
  
    if (movieId) {
      // Construire l'URL pour obtenir les détails du film
      const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  
      // Faire une requête à l'API TMDB pour obtenir les détails du film
      fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(data => {
          // Extraire les données du film
          const title = data.title;
          const overview = data.overview;
          const releaseDate = data.release_date;
          const runtime = parseInt(data.runtime);
          const rating = data.vote_average;
          const backdropUrl = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
          const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
          const budget = data.budget;
          const tagline = data.tagline;
          const homepage = data.homepage;

          // Récupérer les genres et les joindre dans une chaîne
          const genres = data.genres.map(genre => genre.name).join(', ');
          const productionCountry = data.production_countries.map(country => country.name).join(', ');

          // Formater le budget avec des séparateurs de milliers
          const formattedBudget = budget.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });

          // Boucler sur les compagnies de production et les ajouter à la div
          const productionCompaniesDiv = document.getElementById('details-production-companies');
          data.production_companies.forEach(company => {
            const companyElement = document.createElement('p');
            companyElement.textContent = company.name;
            productionCompaniesDiv.appendChild(companyElement);
          });
  
          const backdropDiv = document.getElementById('details-backdrop');
          backdropDiv.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${backdropUrl})`;
          //backdropDiv.style.backgroundImage = `url(${backdropUrl})`;
          backdropDiv.style.backgroundSize = 'cover';
          backdropDiv.style.backgroundPosition = 'top';
          backdropDiv.style.width = '100%';
          backdropDiv.style.height = '60vh';
  
          // Mettre à jour les éléments HTML avec les détails du film
          document.getElementById('details-title').textContent = title;
          document.getElementById('details-overview').textContent = overview;
          document.getElementById('details-release-date').textContent = releaseDate;
          document.getElementById('details-rating').textContent = `${rating}/10`;
          document.getElementById('details-runtime').textContent = formatRuntime(runtime);
          document.getElementById('details-genres').textContent = genres;
          document.getElementById('details-production-country').textContent = productionCountry;
          document.getElementById('details-budget').textContent = formattedBudget;
          document.getElementById('details-tagline').textContent = tagline;

          const detailsHomepage = document.getElementById('details-homepage');
          detailsHomepage.href = homepage;
          detailsHomepage.textContent = homepage;

          const poster = document.getElementById('details-poster');
          poster.src = posterUrl;
          poster.style.height = '70vh';
        })
        .catch(error => console.error('Erreur lors de la récupération des détails du film :', error));
    } else {
      console.error('Aucun ID de film trouvé dans l\'URL.');
    }
};


function formatRuntime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h${minutes}min`;
}

  