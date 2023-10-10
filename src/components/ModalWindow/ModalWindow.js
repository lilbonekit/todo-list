import './ModalWindow.scss'

import { CSSTransition } from 'react-transition-group';

const ModalWindow = ({showDeleteModal, setShowDeleteModal, deleteToDo, deletedId}) => {
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
                    onClick={() => {
                        deleteToDo(deletedId)
                        setShowDeleteModal(false)
                    }} 
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