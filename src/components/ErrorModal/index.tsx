import ReactModal from 'react-modal'

import './styles.scss'

type ModalProps = {
  open: boolean;
  handleSetModal: any;
  title: string,
  body: string;
  onClick?: () => void | undefined
}

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="none">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/>
  </svg>
)

export function ErrorModal (props: ModalProps) {

  const setModal = () => {
    props.handleSetModal(!props.open)
    if(props.onClick) {
      props.onClick()
    }
  }

  return (
    <ReactModal
      isOpen={props.open}
      onRequestClose={setModal}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <ErrorIcon />
      <p>{props.title}</p>
      <span>{props.body}</span>
      <button
        type="button"
        onClick={setModal}
      >
        OK
      </button>
    </ReactModal> 
  )
}