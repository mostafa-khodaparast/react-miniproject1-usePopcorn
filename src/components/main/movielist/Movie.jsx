const Movie = ({movie, setCurrentMovieId}) => {


    return (
        <li key={movie.imdbID} onClick={()=> setCurrentMovieId(movie.imdbID)}>
            <img src={movie.Poster} alt="not found" />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

export default Movie