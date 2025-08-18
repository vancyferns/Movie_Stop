import React, { useState, useEffect } from 'react';

const API_URL = "https://www.omdbapi.com/?apikey=9f9e557e";

const App = () => {
  // Use state to store the list of movies and the search term
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Superman");

  // useEffect to run the initial search when the component loads, and whenever the search term changes.
  // This resolves the linting warning.
  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm]);

  // Function to fetch movies from the API
  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      // Correctly set the movies state with the fetched data
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    }
  };

  // Function to handle the search button click
  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  return (
    <div className="container-fluid bg-dark text-white p-4" style={{ minHeight: '100vh' }}>
      <h1 className="display-4 text-center my-4 font-weight-bold" style={{
        backgroundImage: 'linear-gradient(to right, #20c2b2, #18a97b)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        MovieStop
      </h1>

      <div className="d-flex justify-content-center my-4">
        {/* Connect the input value and onChange to the state */}
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control me-2"
          style={{ maxWidth: '20rem' }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        {/* Connect the image click to the search function */}
        <button
          onClick={handleSearch}
          className="btn btn-outline-secondary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className='container my-4'>
        {/* Use the .map() method to iterate over the movies array */}
        {movies.length > 0 ? (
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
            {movies.map((movie) => (
              <div key={movie.imdbID} className='col'>
                <div className='card h-100 bg-secondary text-white shadow-lg border-0' style={{transition: 'transform 0.3s ease', transform: 'scale(1)'}} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300.png?text=No+Image'} 
                    alt={movie.Title} 
                    className="card-img-top" 
                    style={{ objectFit: 'cover', height: '18rem' }}
                  />
                  <div className="card-body">
                    <span className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>{movie.Type}</span>
                    <h5 className="card-title fw-bold mt-1 mb-2 text-truncate">{movie.Title}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.875rem' }}>{movie.Year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted fs-5 mt-5">No movies found. Try searching for something else!</p>
        )}
      </div>
    </div>
  );
};

export default App;
