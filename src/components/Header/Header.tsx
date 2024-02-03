import './Header.scss'

import { ITodo } from '../../interface/interface'

interface IHeaderProps {
    toDo: ITodo[]
}

const Header:React.FC<IHeaderProps> = ({toDo}) => {
    return(
        <header>
            <h1>To Do list</h1>
            <p>Total number of tasks: {toDo.length}</p>
        </header>
    )
}

export default Header