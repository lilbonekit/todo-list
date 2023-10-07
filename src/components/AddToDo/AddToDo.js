import './AddToDo.scss'

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'

const AddToDo = ({setToDo, toDo}) => {

    const [inputValue, setInputValue] = useState('')
    
    // Делаем инпут управляемым
    // При онКлике обновляем стейт с инпута
    // Для уникального id используем библиотеку uuid

    const saveToDo = () => {
        setToDo([...toDo, {
            id: uuidv4(),
            title: inputValue,
            status: false
        }])

        setInputValue('')
    }

    return(
        <div className="add-to-do">
            <input 
                type="text" 
                placeholder="Name your task"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}/>
            <button onClick={saveToDo}>Save</button>
        </div>
    )
}

export default AddToDo