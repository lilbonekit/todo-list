import { useState, useEffect } from 'react'
import './Search.scss'

const Search = ({toDo, onPerfomSearch, setToProps}) => {

    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        setToProps({
            query,
            filter
        })
    }, [query, filter])

    useEffect(() => {
        onPerfomSearch(toDo, query, filter)
    }, [toDo, filter, query])

    return(
        <div className="search-panel">
            <input type="text"
                   value={query}
                   onChange={e => {
                        setQuery(e.target.value)
                    }}/>
            <div className="btns">
                <button className={filter ? "white" : "outline-white"} onClick={() => setFilter(true)}>Done</button>
                <button className={filter === false ? "white" : "outline-white"} onClick={() => setFilter(false)}>Outstanding</button>
                <button className={filter === "" ? "white" : "outline-white"} onClick={() => setFilter("")}>Reset</button>
            </div>
        </div>
    )
}

export default Search