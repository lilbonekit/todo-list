import './App.scss';

import { useState, useCallback } from 'react';

import Header from './components/Header/Header';
import AddToDo from './components/AddToDo/AddToDo';
import ListToDo from './components/ListToDo/ListToDo';
import Search from './components/Search/Search';
import ModalWindow from './components/ModalWindow/ModalWindow';

// Поскольку работать со стейтом будет каждый компонент,
// то нужно хранить его где-то высоко

// useCallback для предотвращения лишнего пересоздания функций
// memo в ListToDo для предотвращения перерисовки компонента, если его пропсы не изменились

const App = () => {

  // Или вытягиваем с localStorage или берём другое инициальное значение
  const [toDo, setToDo] = useState(JSON.parse(localStorage.getItem('todoData'))?.todoData || [])
  const [filteredItem, setFilteredItem] = useState([])

  // Объект с настройками для вызова onPerfomSearch после фильтрации
  const [toProps, setToProps] = useState({})

  // Создадим стейт для модалки с удалением
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletedId, setDeletedId] = useState(null)
    
  // Функции по удалению, редактированию пишем здесь
  // Лучше, чтобы айди был изначально, а не задавать его в мэп, а то будет поебота потом
  // Удалять из нефильтрованного списка
  const deleteToDo = useCallback((id) => {
    let newToDo = toDo.filter(item => item.id !== id)

    setToDo(newToDo)
  }, [toDo])

  // Напишу функцию для поиска и фильтров.
  // Выводить буду всегда отфильтрованные данные.
  // Если шо то не так, то будем возвращать данные с текущего стейта
  // Вызывать функцию будем в компонентах Search + в ListToDo, после фильтрации
  const onPerfomSearch = useCallback((toDo, query = "", filter = "") => {
    let newArray = [...toDo];

    if(filter === "") {
      newArray = toDo.filter(el => el.title.trim().toLowerCase().includes(query.trim().toLowerCase()) ? el : null)
    }
    if(filter || filter === false) {
      newArray = toDo.filter(el => (
        el.title.trim().toLowerCase().includes(query.trim().toLowerCase()) && el.status === filter
      ));
    }
  
    setFilteredItem(newArray)
    
    saveToLocalStorage(toDo, query, filter)
    // eslint-disable-next-line
  }, []);

  //Функция для сохранения данных в LocalStorage
  const saveToLocalStorage = useCallback((todoData, query, filter) => {
    const dataToSave = {
      todoData,
      query,
      filter,
    }
    localStorage.setItem('todoData', JSON.stringify(dataToSave))
  }, []);
  
  return (
    <div className="App">
        <ModalWindow
          //В модалку был перенесен функционал с удалением
          //Перед удалением нам нужно получить id элемента, который нужно удалить
          // deletedId получаем из ListToDo, передав туда setDeletedId 
          deleteToDo={deleteToDo}
          deletedId={deletedId}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}/>
        <Header
          // Получить кол-во всех элементов
          toDo={toDo}/>
        <Search
          // На основе строки, фильтра и ИЗНАЧАЛЬНЫХ данных, мы делаем поиск
          // Поскольку поиск нужно выполнить здесь и ПОСЛЕ ИЗМЕНЕНИЙ в другом компоненте, то
          // onPerfomSearch и параметры для него были вынесены выше
          onPerfomSearch={onPerfomSearch}
          toDo={toDo}
          setToProps={setToProps}/>
        <ListToDo
          // Переносим выше метод с удалением, 
          // но нам все равно нужно получить айди, удаляемого элемента
          // И так же мне нужно установить модалку активной
          setDeletedId={setDeletedId}
          setShowDeleteModal={setShowDeleteModal}
          // Отображаем отфильтроавнные данные на основе изначальных
          toDo={filteredItem}
          // Поскольку у нас в этом компоненте есть возможность, менять стейт со списком
          // То нам после изменения стейта, нужно снова выполнить поиск
          // Для этого передаем onPerfomSearch и параметры для этой функции
          // Внутри будет дополнительный эффект, который будет отслеживать изменения
          // И выполнять поиск
          onPerfomSearch={onPerfomSearch}
          toProps={toProps}
          // А вот удалять, менять статус, переименовывать, нужно в оригинальном списке
          // Для этого передадим сюда эту функцию
          setFromUnfiltered={setToDo}/>
        <AddToDo
          //Тут все понятно, обновляем оригинальный список 
          setToDo={setToDo}
          toDo={toDo}/>
    </div>
  );
}

export default App;
