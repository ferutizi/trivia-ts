import './Modal.css'

interface ModalProps {
  children: React.ReactNode
  modalState: boolean
}

const Modal = (props: ModalProps): JSX.Element => {
  return (
    <div>
      {props.children}
      {props.modalState}
    </div>
  )
}

export default Modal
