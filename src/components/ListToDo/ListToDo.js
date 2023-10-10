import './ListToDo.scss'

// Я изъявляю ебейшее желание анимировать появление и удаление listItems
// Использую для этого React transition group
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useState } from 'react'

// Иконки SVG
import { CloseIcon, OpenIcon, EditIcon, DeleteIcon } from '../SVGs/Svgs'

// Добавим смски
import Messages from '../Messages/Messages'

const ListToDo = ({toDo, onPerfomSearch, toProps: { filter, query }, setFromUnfiltered, setDeletedId, setShowDeleteModal}) => {

    const [editId, setEditId] = useState(null)
    const [newInputValue, setNewInputValue] = useState("")

    // Установим состояния ошибки инпута
    const [inputError, setInputError] = useState(false)

    
    // Изменение статуса
    const statusToDo = (id) => {
        let newToDo = toDo.filter(item => {
            if(item.id === id) {
                item.status = !item.status
            }
            return item
        })

        // Тоже самое, обновляем стейт нефильтрованного списка
        setFromUnfiltered(newToDo)
        // Это сработало
        onPerfomSearch(newToDo, query, filter)
    }

    // Редактируем значение инпута
    // Если редактируемый айди совпадает с нашим, то поменяется вёрстка
    const editToDo = (id, title) => {
        setEditId(id)

        setNewInputValue(title.trim())
    }

    const saveToDo = (id) => {
        // Получите объект todo, который нужно обновить
        const todoToUpdate = toDo.find(item => item.id === id);
        
        // Проверьте условия валидации перед обновлением
        if (newInputValue.trim().length === 0 || newInputValue.trim().length > 50) {
            setInputError(true)
            return
        } else {
            // Если данные прошли валидацию, обновите todo с новым значением
            const updatedTodo = {
                ...todoToUpdate,
                title: newInputValue.trim()
            };
    
            // Обновите состояние списка с учетом нового todo
            const updatedToDoList = toDo.map(item => (item.id === id ? updatedTodo : item));
            setFromUnfiltered(updatedToDoList);
            setEditId(null);
        }
    }
    


    const message = toDo.length === 0 ? 
    <Messages/> :
    null

    return(
        <> 
            <TransitionGroup className={`to-do-list ${message ? "empty" : null}`}>
                {
                    toDo.map(item => {
                    
                        // Некоторые классы
                        const isDone = item.status ? "done" : ''
                        const isEditing = item.id === editId ? "edit" : ''

                        return <CSSTransition
                                key={item.id}
                                classNames="list"
                                timeout={500}>
                                <li className={`list ${isDone} ${isEditing}`}>
                                {
                                    editId === item.id ?
                                    <div className="edit-mode">
                                        <input
                                            className={inputError ? "error" : null} 
                                            value={newInputValue} 
                                            onChange={e => {
                                                    setNewInputValue(e.target.value)
                                                    setInputError(false)
                                                }}/>
                                        <button onClick={() => saveToDo(item.id)}>Save</button>
                                        <button onClick={() => setEditId(null)}>Discard</button>
                                    </div>  :
                                    <h4 className="list-to-do__item">{item.title}</h4>
                                }
                                {
                                    editId === item.id ?
                                    <></> :
                                    <div className="btns">
                                        <button
                                            data-button="edit" 
                                            onClick={() => editToDo(item.id, item.title)}>
                                                <EditIcon/>
                                                <p>Edit</p>
                                        </button>
                                        <button
                                            data-button="status" 
                                            onClick={() => statusToDo(item.id)}>
                                                {
                                                    isDone ?
                                                    <>
                                                        <OpenIcon/>
                                                        <p>Open</p>
                                                    </> :
                                                    <>
                                                        <CloseIcon/>
                                                        <p>Close</p>
                                                    </>
                                                }
                                        </button>
                                        <button
                                            data-button="delete" 
                                            onClick={() => {
                                                    setDeletedId(item.id)
                                                    setShowDeleteModal(true)
                                                }}>
                                                <DeleteIcon/>
                                                <p>Delete</p>
                                        </button>
                                    </div>
                                }
                                </li>
                            </CSSTransition>
                        })
                }
            </TransitionGroup>
            <CSSTransition
                in={message} 
                classNames="message"
                timeout={500}
                // Оставил компонент не размонтированным, чтобы верстка не прыгала
                /* unmountOnExit */>
                <Messages>
                    <h2 className="message">No items</h2>
                </Messages>
            </CSSTransition>
        </>
    )
}

export default ListToDo