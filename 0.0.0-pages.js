window.onload = function() {
    const apiKey = '4a54ab11d3721dac3c7f819587e24e14';
    const moviesContainer = document.getElementById('now-movies-container');
    const regionSelect = document.getElementById('region-select');
    const template = document.querySelector('.now_component'); // Sélectionnez le modèle de base

    const currentUrl = document.location.href;
    let searchType;

    if (currentUrl.includes('now-playing')) {
        searchType = 'now_playing';
    } else if (currentUrl.includes('upcoming')) {
        searchType = 'upcoming';
    } else if (currentUrl.includes('popular')) {
        searchType = 'popular';
    } else if (currentUrl.includes('top-rated')) {
        searchType = 'top_rated';
    }

    // Fonction pour récupérer les films
    function fetchMoviesByRegion(region) {
        const url = `https://api.themoviedb.org/3/movie/${searchType}?api_key=${apiKey}&language=fr-FR&region=${region}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                moviesContainer.innerHTML = ''; // Effacer le contenu précédent

                data.results.forEach(movie => {
                    // Dupliquer le modèle de base
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

                // Initialiser les animations de Webflow après la duplication
                Webflow.require('ix2').init();
            })
            .catch(error => console.error('Erreur lors de la récupération des films:', error));
    }

    // Événement pour détecter le changement de région
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        fetchMoviesByRegion(selectedRegion); // Charger les films pour la région sélectionnée
    });

    // Charger les films pour la région par défaut (France)
    fetchMoviesByRegion(regionSelect.value);
};
