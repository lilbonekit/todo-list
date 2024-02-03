import './ModalWindow.scss'

import { CSSTransition } from 'react-transition-group';

interface IModalWindow {
	showDeleteModal: boolean
	setShowDeleteModal: (isShown:boolean) => void
	deleteToDo: (id: string) => void
	deletedId: null | string
}

const ModalWindow:React.FC<IModalWindow> = ({showDeleteModal, setShowDeleteModal, deleteToDo, deletedId}) => {

	const handleDelete = () => {
		if(deletedId !== null) {
			deleteToDo(deletedId)
			setShowDeleteModal(false)
		}
	}

    return (
        <CSSTransition
          in={showDeleteModal}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <div className="modal" onClick={() => setShowDeleteModal(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
              <h2>Delete item?</h2>
              <p>Are you sure you want to delete this list item?</p>
              <div className="btns">
                <button 
                    className="outline-black"
                    onClick={() => 
                        setShowDeleteModal(false)
                    }>
                    Cancel
                </button>
                <button
                    onClick={handleDelete} 
                  className="black_btn">
                    Delete
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>
      );
}

export default ModalWindow