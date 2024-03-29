import { useState, useEffect } from 'react'
import './Search.scss'

import { ITodo, IToProps } from '../../interface/interface'

interface ISearchProps {
    toDo: ITodo[]
    onPerfomSearch: (toDo: ITodo[], query: string, filter: boolean | string) => void
    setToProps: (IToProps: IToProps) => void
}

const Search:React.FC<ISearchProps> = ({toDo, onPerfomSearch, setToProps}) => {

    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState<boolean | string>("")

    // Закоментил, а то это скорее мешало
    // const [query, setQuery] = useState(JSON.parse(localStorage.getItem("todoData"))?.query || "")
    // const [filter, setFilter] = useState("" || JSON.parse(localStorage.getItem("todoData"))?.filter)
    
    // Передаем эти параметры выше, чтобы вызывать с ними onPerfomSearch в другом компоненте,
    // Если там произошли изменения списка
    useEffect(() => {
        setToProps({
            query,
            filter
        })
    }, [query, filter, setToProps])

    // Выполняем фильрацию, при изменениях этих параметров
    useEffect(() => {
        onPerfomSearch(toDo, query, filter)
        // eslint-disable-next-line
    }, [toDo, filter, query])

    return(
        <div className="search-panel">
            <input type="text"
                   placeholder="Search..."
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