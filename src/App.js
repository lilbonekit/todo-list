import './App.scss';

import { useState } from 'react';

import Header from './components/Header/Header';
import AddToDo from './components/AddToDo/AddToDo';
import ListToDo from './components/ListToDo/ListToDo';
import Search from './components/Search/Search';


// Поскольку работать со стейтом будет каждый компонент,
// то нужно хранить его где-то высоко

function App() {

  const [toDo, setToDo] = useState([])
  const [filteredItem, setFilteredItem] = useState([])

  // Объект с настройками для вызова onPerfomSearch после фильтрации
  const [toProps, setToProps] = useState({})

  // Напишу функцию для поиска и фильтров.
  // Выводить буду всегда отфильтрованные данные.
  // Если шо то не так, то будем возвращать данные с текущего стейта
  // Вызывать функцию будем в компоненте Search + в ListToDo, после фильтрации

  const onPerfomSearch = (toDo, query, filter) => {
    let newArray = [...toDo];

    if(filter === "") {
      newArray = toDo.filter(el => el.title.trim().toLowerCase().includes(query.trim().toLowerCase()) ? el : null)
    }
    if(filter || filter === false) {
      newArray = toDo.filter(el => (
        el.title.trim().toLowerCase().includes(query.trim().toLowerCase()) && el.status === filter
      ));
    }
  
    setFilteredItem(newArray);
  };
  

  return (
    <div className="App">
        <Header
          toDo={toDo}/>
        <Search
          onPerfomSearch={onPerfomSearch}
          toDo={toDo}
          filteredItem={filteredItem}
          setToProps={setToProps}/>
        <ListToDo
          setToDo={setFilteredItem}
          toDo={filteredItem}
          // Тут блять очень скользкий момент,
          // Если я хочу функционал с тоглом активности в фильтрах,
          // То мне нужно обновлять стейт с отфильтрованными данными
          // Но тут встаёт вопрос, а как мне вызвать onPerfomSearch еще раз после фильтрации?
          // Я создал для этого еще один стейт с параметрами,
          // чтобы передавать их вместе с onPerfomSearch
          onPerfomSearch={onPerfomSearch}
          toProps={toProps}
          // Ещё один скользкий момент. Удалять теперь нужно не из фильтрованного списка))
          deleteFromUnfiltered={setToDo}
          />
        <AddToDo
          setToDo={setToDo}
          toDo={toDo}/>
    </div>
  );
}

export default App;
