import { useEffect, useState } from "react";
import Main from "./components/main/Main"
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/navbar/SearchBar"
import NumResults from './components/navbar/NumResults'
import Box from "./components/main/Box";
import WatchList from "./components/main/watchlist/WatchList";
import WatchedSummary from "./components/main/watchlist/WatchedSummary";
import MovieList from "./components/main/movielist/MovieList";
import Loader from "./components/Loader";
import CurrentMovie from "./components/main/CurrentMovie";


export const KEY = "f84fc31d"



const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [currentMovieId, setCurrentMovieId] = useState()
  const [watched, setWatched] = useState(() => {
    //get movie from local storage and show in inital render
    //see that we can pass a callback function to useState hook
    const watchedMovies = localStorage.getItem('watchedMovieStorage')
    return JSON.parse(watchedMovies)
  });



  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    setError('')
    async function fetchMovies() {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal })
        if (!res.ok) throw new Error("fetching movies failed...")
        const data = await res.json()
        if (data.Response === 'False') throw new Error("movie not found!")
        setMovies(data.Search)
      }
      catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
        }
      }
      finally {
        setIsLoading(false)
      }
    }

    if (query.length === 0) {
      setMovies([])
      setError('')
      setIsLoading(false)
      return;
    }

    setCurrentMovieId()    //when change the searchbar value, the current movie closed automatically
    fetchMovies()

    //cleanup function
    return () => {
      controller.abort()
    }

  }, [query]);


  const handleAddmovie = m => {
    setWatched(watched => [...watched, m])
    setCurrentMovieId()
  }

  const handleRemoveWatchedMovie = id => {
    setWatched(watched => watched.filter(watch => watch.imdbID !== id))
  }

  //save watch list movies in local storage
  useEffect(() => {
    localStorage.setItem('watchedMovieStorage', JSON.stringify(watched))
  }, [watched])


  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {error && <p className="loader">{error}</p>}
          {isLoading && <Loader />}
          {!error && !isLoading && <MovieList movies={movies} setCurrentMovieId={setCurrentMovieId} />}
        </Box>
        <Box>
          {!currentMovieId
            ?
            <>
              <WatchedSummary watched={watched} />
              <WatchList watched={watched} handleRemoveWatchedMovie={handleRemoveWatchedMovie} />
            </>
            :
            <CurrentMovie
              currentMovieId={currentMovieId}
              setCurrentMovieId={setCurrentMovieId}
              handleAddmovie={handleAddmovie}
              watched={watched}
            />
          }
        </Box>
      </Main>
    </>
  );
}

export default App