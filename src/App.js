import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interId, setInterId]=useState(null)

  console.log("hi");

 useEffect(()=>{
  fetch("https://swapi.dev/api/film/").then( async response=>{
    const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
  }).catch(error=>{
    setInterId( setInterval(fetchMoviesHandler, 5000))
    
  })
 },[])
  
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      
      console.log('error');
    }
    setIsLoading(false);
  }

  const stopRefreshHandler = () => {
    clearInterval(interId)
    setError(false);
    setIsLoading(false)
  };

  return (
    <React.Fragment>
      {console.log("rendered")}
      <section>
        {!isLoading && !error && (
          <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        )}
        {!isLoading && error && (
          <button onClick={stopRefreshHandler}>Cancel refresh</button>
        )}
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>...Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
