import './App.scss';

import { useState } from 'react';

import Header from './components/Header/Header';
import AddToDo from './components/AddToDo/AddToDo';
import ListToDo from './components/ListToDo/ListToDo';
import Search from './components/Search/Search';


// Поскольку работать со стейтом будет каждый компонент,
// то нужно хранить его где-то высоко

function App() {

  const [toDo, setToDo] = useState(JSON.parse(localStorage.getItem("todoData"))?.todoData || [])
  const [filteredItem, setFilteredItem] = useState([])

  // Объект с настройками для вызова onPerfomSearch после фильтрации
  const [toProps, setToProps] = useState({})

  // Напишу функцию для поиска и фильтров.
  // Выводить буду всегда отфильтрованные данные.
  // Если шо то не так, то будем возвращать данные с текущего стейта
  // Вызывать функцию будем в компоненте Search + в ListToDo, после фильтрации
  const onPerfomSearch = (toDo, query = "", filter = "") => {
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
  };

  //Функция для сохранения данных в LocalStorage
  const saveToLocalStorage = (todoData, query, filter) => {
    const dataToSave = {
      todoData,
      query,
      filter,
    }
    localStorage.setItem('todoData', JSON.stringify(dataToSave))
  };
  
  return (
    <div className="App">
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
