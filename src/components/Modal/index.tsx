import ReactModal from 'react-modal'

import './styles.scss'

type ModalProps = {
  open: boolean;
  handleSetModal: any;
  onClick: any;
  title: string,
  body: string
  buttonText: string
}

const DeleteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.99988H5H21" stroke="#8b8bbe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CancelIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 5.99988H5H21" stroke="#8b8bbe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/>
  </svg>
)

export function Modal (props: ModalProps) {

  const setModal = () => {
    props.handleSetModal(!props.open)
  }

  const handleOnClick = () => {
    props.onClick()
    setModal()
  }

  return (
    <ReactModal
      isOpen={props.open}
      onRequestClose={setModal}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      {props.buttonText === 'excluir' ? <DeleteIcon /> : <CancelIcon />}
      <p>{props.title}</p>
      <span>{props.body}</span>
      <div className="modal-button">
        <button type="button" id="left" onClick={setModal}>Cancelar</button>
        <button id="right" type="button" onClick={handleOnClick}>Sim, {props.buttonText}</button>
      </div>
    </ReactModal> 
  )
}