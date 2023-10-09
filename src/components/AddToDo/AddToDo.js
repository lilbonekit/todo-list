import './AddToDo.scss'

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'

const AddToDo = ({setToDo, toDo}) => {

    const [inputValue, setInputValue] = useState('')
    
    
    // Делаем инпут управляемым
    // При онКлике обновляем стейт с инпута
    // Для уникального id используем библиотеку uuid
    // Делаем валидации от шутников

    const saveToDo = () => {

        if(inputValue.trim().length === 0) {
            return alert('ебалай')
        }

        if(inputValue.trim().length > 50) {
            return alert('Ну совесть блять имей пидорас нахуй')
        }

        setToDo([...toDo, {
            id: uuidv4(),
            title: inputValue.trim(),
            status: false
        }])

        setInputValue('')
    }

    return(
        <div className="add-to-do">
            <input 
                type="text" 
                placeholder="Add your task"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}/>
            <button onClick={saveToDo}>Save</button>
        </div>
    )
}

export default AddToDo