import './AddToDo.scss'

import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

const AddToDo = ({setToDo, toDo}) => {

    const [inputValue, setInputValue] = useState('')

    // Добавлю еще состояние для ошибки инпута. Этот код повториться в ListToDo
    const [inputError, setInputError] = useState(false)
    
    // Делаем инпут управляемым
    // При онКлике обновляем стейт с инпута
    // Для уникального id используем библиотеку uuid
    // Делаем валидации от шутников

    const saveToDo = () => {

        if(inputValue.trim().length === 0) {
            setInputError(true)
            return
        }

        if(inputValue.trim().length > 50) {
            setInputError(true)
            return
        }

        setToDo([
            {
                id: uuidv4(),
                title: inputValue.trim(),
                status: false
            },
            ...toDo])

        setInputValue('')
    }

    return(
        <div className="add-to-do">
            <input
                    className={inputError ? "error" : ""} 
                    type="text" 
                    placeholder="Add your task"
                    value={inputValue}
                    onChange={e => {
                            setInputError(false)
                            setInputValue(e.target.value)
                        }}/>
            <button onClick={saveToDo}>Save</button>
        </div>
    )
}

export default AddToDo