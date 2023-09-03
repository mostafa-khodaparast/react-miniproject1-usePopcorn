import { useState } from "react";
import Movie from "./Movie";


const MovieList = ({ movies, setCurrentMovieId }) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    setCurrentMovieId={setCurrentMovieId}
                />
            ))}
        </ul>
    )
}

export default MovieList