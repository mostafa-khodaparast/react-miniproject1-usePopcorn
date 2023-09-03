const Watch = ({movie, handleRemoveWatchedMovie}) => {

    

    return (
        <li>
            <img src={movie.Poster} alt="not found" />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.Runtime}</span>
                </p>
                <button className="btn-delete"  onClick={()=>handleRemoveWatchedMovie(movie.imdbID)}>×</button>
            </div>
        </li>
    )
}

export default Watch