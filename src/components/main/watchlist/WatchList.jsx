import Watch from "./Watch"

const WatchList = ({watched, handleRemoveWatchedMovie}) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <Watch movie={movie} key={movie.imdbID} handleRemoveWatchedMovie={handleRemoveWatchedMovie} />
            ))}
        </ul>
    )
}

export default WatchList