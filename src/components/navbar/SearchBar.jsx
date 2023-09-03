import { useEffect, useRef } from "react"


const SearchBar = ({query, setQuery}) => {

    //focus on input in initial render
    const inputEl = useRef()
    useEffect(()=>{
        inputEl.current.focus()
    },[])

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default SearchBar