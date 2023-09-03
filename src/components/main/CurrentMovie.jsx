import { useEffect, useState } from "react"
import { KEY } from '../../App'
import Loader from "../Loader"
import StarRating from "./starRating/StarRating"


const CurrentMovie = ({ currentMovieId, setCurrentMovieId, handleAddmovie, watched }) => {
    const [movie, setMovie] = useState()
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        async function fetchMovie() {
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${currentMovieId}`)
            const data = await res.json()
            setMovie(data)
            setIsLoading(false)
        }
        fetchMovie()
    }, [currentMovieId]);


    useEffect(() => {                //change the title of page
        if(!movie?.Title) return
        document.title = movie?.Title

        //clean up function
        return ()=>{
            document.title= 'usePopcorn'
        }

    },[movie?.Title])

    const isAddedBefore = watched.map(watch => watch.imdbID).includes(currentMovieId)


    return (
        <div className="details">
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={() => setCurrentMovieId()}>&larr;</button>
                        <img src={movie?.Poster} alt="not found" />
                        <div className="details-overview">
                            <h2>{movie?.Title}</h2>
                            <p>{movie?.Released} &bull; {movie?.Runtime}</p>
                            <p>{movie?.Genre}</p>
                            <p><span>⭐️</span>{movie?.imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        {!isAddedBefore ?
                            <button
                                className="btn-add"
                                onClick={() => handleAddmovie(movie)}>
                                add to watch list
                            </button>
                            :
                            <div className="rating">
                                <p>You added this movie before</p>
                            </div>
                        }
                        <p><em>{movie?.Plot}</em></p>
                        <p>Starring {movie?.Actors}</p>
                        <p>Directed by {movie?.Director}</p>
                    </section>
                </>
            }
        </div>
    )
}

export default CurrentMovie