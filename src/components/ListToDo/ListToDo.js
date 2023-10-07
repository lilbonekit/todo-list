import './ListToDo.scss'

import { useState } from 'react'

const ListToDo = ({toDo, setToDo, onPerfomSearch, toProps: { filter, query }, deleteFromUnfiltered}) => {

    const [editId, setEditId] = useState(null)
    const [newInputValue, setNewInputValue] = useState('')

    // Функции по удалению, редактированию пишем здесь
    // Лучше, чтобы айди был изначально, а не задавать его в мэп, а то будет поебота потом
    // Еще один скользкий момент. Теперь тут нужно удалять из нефильтрованного списка)))
    const deleteToDo = (id) => {
        let newToDo = toDo.filter(item => item.id !== id)
        // Это сработало
        deleteFromUnfiltered(newToDo)
    }

    // Изменение статуса
    const statusToDo = (id) => {
        let newToDo = toDo.filter(item => {
            if(item.id === id) {
                item.status = !item.status
            }
            return item
        })

        
        setToDo(newToDo)
        // Это сработало
        onPerfomSearch(newToDo, query, filter)
    }

    // Редактируем значение инпута
    // Если редактируемый айди совпадает с нашим, то поменяется вёрстка
    const editToDo = (id, title) => {
        setEditId(id)
        setNewInputValue(title)
    }

    const saveToDo = (id) => {
        let newToDo = toDo.map(item => {
            if(item.id === id) {
                item.title = newInputValue
            }
            return item
        })

        setToDo(newToDo)
        setEditId(null)
    }

    return(
        toDo.length ?
        <ul className='to-do-list'>
            {
                toDo.map(item => (
                    <li key={item.id} className={item.status ? "done" : ''}>
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
                                <button onClick={() => editToDo(item.id, item.title)}>Edit</button>
                                <button onClick={() => statusToDo(item.id)}>Open / Done</button>
                                <button onClick={() => deleteToDo(item.id)}>Delete</button>
                            </div>
                        }
                    </li>
                ))
            }
        </ul> :
        <><h2 style={{color: "#2d2d2d", textAlign: "center", marginTop: "60px"}}>Нет тут нихуя пока что</h2></>

    )
}

export default ListToDo