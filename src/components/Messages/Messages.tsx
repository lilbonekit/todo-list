import { ReactNode } from 'react';
import './Messages.scss'

interface IMessagesProps {
    children: ReactNode;
}

const Messages: React.FC<IMessagesProps> = ({children}) => {
    // Планировал использовать это для валидации инпутов, но что то оно не очень выглядело
    // Но на будущеее так можно сделать
    return(
        <>
            {children}
        </>
    )
}

export default Messages