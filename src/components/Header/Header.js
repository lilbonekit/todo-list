import './Header.scss'

const Header = ({toDo}) => {
    return(
        <header>
            <h1>To Do list</h1>
            <p>Общее число задач: {toDo.length}</p>
        </header>
    )
}

export default Header