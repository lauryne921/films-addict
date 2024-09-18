const apiKey = '4a54ab11d3721dac3c7f819587e24e14';
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const template = document.querySelector('.now_component'); // Sélectionnez le modèle de base


window.onload = function() {
    const loadUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false`;

    fetch(loadUrl)
      .then(response => response.json())
      .then(data => {
        const moviesContainer = document.getElementById('movies-container');
          moviesContainer.innerHTML = ''; // Effacer les films précédents
  
            data.results.forEach(movie => {
                const movieClone = template.cloneNode(true);
                    
                // Mettre à jour les informations du film
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieClone.style.backgroundImage = `url(${posterUrl})`;
                movieClone.style.backgroundSize = 'cover';
                movieClone.style.backgroundPosition = 'center';
                movieClone.style.height = '60vh'; // Hauteur des blocs de films
                movieClone.style.marginBottom = '20px';
                movieClone.querySelector('.now_item h3').textContent = movie.title;
                
                // Ajouter le lien vers la page de détails
                const movieLink = document.createElement('a');
                movieLink.href = `movie-details?id=${movie.id}`;
                movieLink.appendChild(movieClone);

                // Ajouter le clone dans le container
                moviesContainer.appendChild(movieLink);
            });
  
        // Réinitialiser les animations Webflow après la duplication
        Webflow.require('ix2').init();
      });
}

fetch(genresUrl)
  .then(response => response.json())
  .then(data => {
    const genresSelect = document.getElementById('genres-select');
    data.genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genresSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des genres :', error));


  document.getElementById('genres-select').addEventListener('change', function() {
    const selectedGenreId = this.value;
  
    if (selectedGenreId) {
      const moviesByGenreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenreId}`;
  
      fetch(moviesByGenreUrl)
        .then(response => response.json())
        .then(data => {
          const moviesContainer = document.getElementById('movies-container');
          moviesContainer.innerHTML = ''; // Effacer les films précédents
  
            data.results.forEach(movie => {
                const movieClone = template.cloneNode(true);
                    
                // Mettre à jour les informations du film
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieClone.style.backgroundImage = `url(${posterUrl})`;
                movieClone.style.backgroundSize = 'cover';
                movieClone.style.backgroundPosition = 'center';
                movieClone.style.height = '60vh'; // Hauteur des blocs de films
                movieClone.style.marginBottom = '20px';
                movieClone.querySelector('.now_item h3').textContent = movie.title;
                
                // Ajouter le lien vers la page de détails
                const movieLink = document.createElement('a');
                movieLink.href = `movie-details?id=${movie.id}`;
                movieLink.appendChild(movieClone);

                // Ajouter le clone dans le container
                moviesContainer.appendChild(movieLink);
            });
  
          // Réinitialiser les animations Webflow après la duplication
          Webflow.require('ix2').init();
        })
        .catch(error => console.error('Erreur lors de la récupération des films :', error));
    }
});
  
