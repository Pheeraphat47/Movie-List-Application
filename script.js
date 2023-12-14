document.addEventListener('DOMContentLoaded', () => {
    // Check if movies exist in local storage
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    displayMovies(movies);
  });
  
  function addMovie() {
    const movieName = document.getElementById('movieName').value;
    const releaseYear = document.getElementById('releaseYear').value;
  
    if (movieName && releaseYear) {
      const movie = { name: movieName, year: releaseYear };
      const movies = JSON.parse(localStorage.getItem('movies')) || [];
      movies.push(movie);
      localStorage.setItem('movies', JSON.stringify(movies));
  
      displayMovies(movies);
  
      // Clear input fields
      document.getElementById('movieName').value = '';
      document.getElementById('releaseYear').value = '';
    }
  }
  
  function removeMovie(index) {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.splice(index, 1);
    localStorage.setItem('movies', JSON.stringify(movies));
    displayMovies(movies);
  }
  
  function editMovie(index) {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const updatedName = prompt('Enter updated movie name:', movies[index].name);
    const updatedYear = prompt('Enter updated release year:', movies[index].year);
  
    if (updatedName !== null && updatedYear !== null) {
      movies[index] = { name: updatedName, year: updatedYear };
      localStorage.setItem('movies', JSON.stringify(movies));
      displayMovies(movies);
    }
  }
  
  function searchMovie() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchValue));
    displayMovies(filteredMovies);
  }
  
  function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
  
    movies.forEach((movie, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${movie.name} (${movie.year}) 
        <button onclick="removeMovie(${index})">Remove</button>
        <button onclick="editMovie(${index})">Edit</button>`;
      movieList.appendChild(li);
    });
  }
  
