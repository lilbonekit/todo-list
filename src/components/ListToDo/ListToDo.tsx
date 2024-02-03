import './ListToDo.scss'

// Я изъявляю ебейшее желание анимировать появление и удаление listItems
// Использую для этого React transition group
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useState, memo } from 'react'

// Иконки SVG
import { CloseIcon, OpenIcon, EditIcon, DeleteIcon } from '../SVGs/Svgs'

// Добавим смски
import Messages from '../Messages/Messages'

import { ITodo, IToProps } from '../../interface/interface'

interface IListToDoProps {
    toDo: ITodo[]
    toProps: IToProps
    onPerfomSearch: (toDo: ITodo[], query: string, filter: boolean | string) => void
    setFromUnfiltered: (toDo: ITodo[]) => void
    setDeletedId: (id: null | string) => void
    setShowDeleteModal: (isShown: boolean) => void
}

const ListToDo:React.FC<IListToDoProps> = memo((props) => {
    const {toDo, onPerfomSearch, toProps: { filter, query }, setFromUnfiltered, setDeletedId, setShowDeleteModal} = props

    const [editId, setEditId] = useState<string | null>(null)
    const [newInputValue, setNewInputValue] = useState<string>("")

    // Установим состояния ошибки инпута
    const [inputError, setInputError] = useState<boolean>(false)

    // Изменение статуса
    const statusToDo = (id:string):void => {
        let newToDo = toDo.filter(item => {
            if(item.id === id) {
                item.status = !item.status
            }
            return item
        })

        // Тоже самое, обновляем стейт нефильтрованного списка
        setFromUnfiltered(newToDo)
        // Выполняем фильтрацию снова, поскольку мы изменили стейт нефильтрованного списка
        onPerfomSearch(newToDo, query, filter)
    }

    // Редактируем значение инпута
    // Если редактируемый айди совпадает с нашим, то поменяется вёрстка
    const editToDo = (id:string, title:string):void => {
        setEditId(id)

        setNewInputValue(title.trim())
    }

    const saveToDo = (id:string):void => {
        // Начальный фильтрованный список, 
        // можно и не фильтрованный, id то все равно уникальный
        const todoToUpdate: ITodo | undefined = toDo.find(item => item.id === id);

        // Если не найден, то просто завершаем выполнение функции
        if (todoToUpdate === undefined) {
            return;
        }
        
        // Валидация
        if (newInputValue.trim().length === 0 || newInputValue.trim().length > 50) {
            setInputError(true)
            return
        } else {
            // Если данные прошли валидацию, то добавляем их в начало
            // Так красивее мне кажется
            const updatedTodo:ITodo = {
                ...todoToUpdate,
                title: newInputValue.trim()
            };
    
            // Новый стейт, но обновляем нефильтрованный стейт
            const updatedToDoList:ITodo[] = toDo.map(item => (item.id === id ? updatedTodo : item));
            setFromUnfiltered(updatedToDoList);
            // Сбрасываем редактирование
            setEditId(null);
        }
    }
    


    const message = toDo.length === 0

    return(
        <> 
            <TransitionGroup className={`to-do-list ${message ? 'empty' : null}`}>
                {
                    toDo.map(item => {
                    
                        // Некоторые классы
                        const isDone = item.status ? 'done' : ''
                        const isEditing = item.id === editId ? 'edit' : ''

                        return <CSSTransition
                                key={item.id}
                                classNames='list'
                                timeout={500}>
                                <li className={`list ${isDone} ${isEditing}`}>
                                {
                                    editId === item.id ?
                                    <div className='edit-mode'>
                                        <input
                                            className={inputError ? 'error' : ''} 
                                            value={newInputValue} 
                                            onChange={e => {
                                                    setNewInputValue(e.target.value)
                                                    setInputError(false)
                                                }}/>
                                        <button onClick={() => saveToDo(item.id)}>Save</button>
                                        <button onClick={() => setEditId(null)}>Discard</button>
                                    </div>  :
                                    <h4 className='list-to-do__item'>{item.title}</h4>
                                }
                                {
                                    editId === item.id ?
                                    <></> :
                                    <div className='btns'>
                                        <button
                                            data-button='edit' 
                                            onClick={() => editToDo(item.id, item.title)}>
                                                <EditIcon/>
                                                <p>Edit</p>
                                        </button>
                                        <button
                                            data-button='status' 
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
                                            data-button='delete' 
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
                classNames='message'
                timeout={500}>
                <Messages>
                    <h2 className='message'>No items</h2>
                </Messages>
            </CSSTransition>
        </>
    )
})

export default ListToDo