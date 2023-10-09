import './ListToDo.scss'

// Я изъявляю ебейшее желание анимировать появление и удаление listItems
// Использую для этого React transition group
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useState } from 'react'

// Иконки SVG
import { CloseIcon, OpenIcon, EditIcon, DeleteIcon } from '../SVGs/Svgs'

// Добавим смски
import Messages from '../Messages/Messages'

const ListToDo = ({toDo, onPerfomSearch, toProps: { filter, query }, setFromUnfiltered}) => {

    const [editId, setEditId] = useState(null)
    const [newInputValue, setNewInputValue] = useState("")
    

    // Функции по удалению, редактированию пишем здесь
    // Лучше, чтобы айди был изначально, а не задавать его в мэп, а то будет поебота потом
    // Удалять из нефильтрованного списка
    const deleteToDo = (id) => {
        let newToDo = toDo.filter(item => item.id !== id)

        // Это сработало
        setFromUnfiltered(newToDo)
    }

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

/*     const saveToDo = (id) => {

        const todoToUpdate = toDo.find(item => item.id === id)

        if (newInputValue.trim().length === 0 || newInputValue.trim().length > 50) {
            console.error("Некорректные данные. Заголовок должен быть от 1 до 50 символов и не может быть пустым.");
        }

        let newToDo = toDo.map(item => {
            if(item.id === id) {
                item.title = newInputValue
            }
            return item
        })

        // Тоже самое, обновляем стейт нефильтрованного списка
        setFromUnfiltered(newToDo)
        setEditId(null)
    } */
    const saveToDo = (id) => {
        // Получите объект todo, который нужно обновить
        const todoToUpdate = toDo.find(item => item.id === id);
        
        // Проверьте условия валидации перед обновлением
        if (newInputValue.trim().length === 0 || newInputValue.trim().length > 50) {
            // Выведите сообщение об ошибке или выполните другие необходимые действия
            // Например, показать пользователю сообщение о некорректных данных
            alert('Некорректные данные. Заголовок должен быть от 1 до 50 символов и не может быть пустым')
            console.error("Некорректные данные. Заголовок должен быть от 1 до 50 символов и не может быть пустым.");
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
    


    const message = toDo.length === 0 ? <Messages messageText={"No items"}/> : null

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
                                        <input value={newInputValue} onChange={e => setNewInputValue(e.target.value)}/>
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
                                            onClick={() => deleteToDo(item.id)}>
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
                <Messages messageText={"No items"} />
            </CSSTransition>
        </>
    )
}

export default ListToDo