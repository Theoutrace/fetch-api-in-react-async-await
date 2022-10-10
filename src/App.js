import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMoviesForm from "./components/AddMoviesForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-get-post-project-default-rtdb.firebaseio.com/movies.json"
      );
      console.log("times ran");

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data =await response.json();

      const loadedMovies = []

      for (const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }


      setMovies(loadedMovies);
      
    } catch (error) {
      setError(error.message);

      console.log("error");
    }
    setIsLoading(false);

  }, []);

  const AddMovieHandlerFun = async (movie) => {
    console.log(movie);
    const response =await fetch("https://react-http-get-post-project-default-rtdb.firebaseio.com/movies.json",{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data);
    fetchMoviesHandler()
    
  };

  const deleteMovieHandler = async (id) => {
    // console.log(id);
    await fetch(`https://react-http-get-post-project-default-rtdb.firebaseio.com/movies/${id}.json`, { method: 'DELETE' })
    fetchMoviesHandler()
  }


  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <AddMoviesForm onMovieSubmit={AddMovieHandlerFun} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} onDel = {deleteMovieHandler}/>}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>...Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
