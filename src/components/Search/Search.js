import { useState, useEffect } from 'react'
import './Search.scss'

const Search = ({toDo, onPerfomSearch, setToProps, setToDo, filteredItem}) => {

    // Обязательно продумываем тот вариант, если в LS нет ничего
    const [query, setQuery] = useState(JSON.parse(localStorage.getItem("params.query")) || "")
    const [filter, setFilter] = useState("" || JSON.parse(localStorage.getItem("params.filter")))
    
    // Инициализация ЛС при первой загрузке
 /*    useEffect(() => {
        setToDo(JSON.parse(localStorage.getItem("params.toDo")) || toDo)
    }, []) */

    useEffect(() => {
        setToProps({
            query,
            filter
        })
    }, [query, filter])

    useEffect(() => {
        onPerfomSearch(toDo, query, filter)
        // Проверяем, поддерживается ли localStorage в браузере
      /*   if (typeof localStorage !== 'undefined') {
            // Записываем данные в localStorage
            localStorage.setItem('params.query', JSON.stringify(query));
            localStorage.setItem('params.toDo', JSON.stringify(toDo));
            localStorage.setItem('params.filter', JSON.stringify(filter));
        } */
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
                <button style={{fontWeight : 700}} onClick={() => setFilter("")}>Reset</button>
            </div>
        </div>
    )
}

export default Search