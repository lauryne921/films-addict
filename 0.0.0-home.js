window.onload = function() {
  const apiKey = '4a54ab11d3721dac3c7f819587e24e14';


  // Image de la home hero
  const movieIdHome = '550';
  const urlHero = `https://api.themoviedb.org/3/movie/${movieIdHome}?api_key=${apiKey}`;
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w780';
  
  fetch(urlHero)
    .then(response => response.json())
    .then(data => {
      const posterPath = data.backdrop_path;
      const posterUrl = `${imageBaseUrl}${posterPath}`;

      const posterDiv = document.getElementById('hero-poster');
      posterDiv.style.backgroundImage = `url(${posterUrl})`;
      posterDiv.style.backgroundSize = 'cover';
      posterDiv.style.backgroundPosition = 'top';
      posterDiv.style.width = '100%';
      posterDiv.style.height = '60vh';
    })
    .catch(error => console.error('Erreur:', error));
  
  

  // section now de la home
  const urlNow = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&region=FR`;

  fetch(urlNow)
    .then(response => response.json())
    .then(data => {
      // Boucler sur les 6 premiers films
      data.results.slice(0, 6).forEach((movie, index) => {
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const movieId = movie.id; // ID du film pour la page de détails

        // Sélectionner la div correspondante
        const movieDiv = document.getElementById(`movie-${index + 1}`);
        const title = movie.title;
        const review = movie.review;

        console.log(title);
        console.log(review);

        movieDiv.querySelector('.now_title').textContent = title;
        movieDiv.querySelector('.now_review').textContent = review;

        // Appliquer le poster en background image
        movieDiv.style.backgroundImage = `url(${posterUrl})`;
        movieDiv.style.backgroundSize = 'cover';
        movieDiv.style.backgroundPosition = 'center';
        movieDiv.style.repeat = 'no-repeat';
        movieDiv.style.width = '100%';
        movieDiv.style.height = '50vh';

        movieDiv.querySelector('.now_details-button').href = `/movie-details?id=${movieId}`;

        // Ajouter un lien sur le link block parent (ou créer un nouveau lien)
        const linkBlock = document.createElement('a');
        linkBlock.href = `/movie-details?id=${movieId}`; // Lien dynamique vers la page de détails
        linkBlock.style.display = 'block'; // Pour s'assurer que le lien englobe toute la div
        linkBlock.style.width = '100%';
        linkBlock.style.height = '100%';
        
        // Déplacer la div du film dans le link block
        movieDiv.parentNode.replaceChild(linkBlock, movieDiv);
        linkBlock.appendChild(movieDiv);
      });
    })
    .catch(error => console.error('Erreur:', error));


  // page details
  // Récupérer l'ID du film depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id'); // Récupère la valeur du paramètre "id"

  if (movieId) {
    // Construire l'URL pour obtenir les détails du film
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`;

    // Faire une requête à l'API TMDB pour obtenir les détails du film
    fetch(movieDetailsUrl)
      .then(response => response.json())
      .then(data => {
        // Extraire les données du film
        const title = data.title;
        const overview = data.overview;
        const releaseDate = data.release_date;
        const rating = data.vote_average;
        const backdropUrl = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
        const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

        const backdropDiv = document.getElementById('details-backdrop');
        backdropDiv.style.backgroundImage = `url(${backdropUrl})`;
        backdropDiv.style.backgroundSize = 'cover';
        backdropDiv.style.backgroundPosition = 'top';
        backdropDiv.style.width = '100%';
        backdropDiv.style.height = '60vh';

        // Mettre à jour les éléments HTML avec les détails du film
        document.getElementById('movie-title').textContent = title;
        document.getElementById('movie-overview').textContent = overview;
        document.getElementById('movie-release-date').textContent = `Date de sortie : ${releaseDate}`;
        document.getElementById('movie-rating').textContent = `Note : ${rating}/10`;
        document.getElementById('movie-poster').src = posterUrl;
      })
      .catch(error => console.error('Erreur lors de la récupération des détails du film :', error));
  } else {
    console.error('Aucun ID de film trouvé dans l\'URL.');
  }
};
