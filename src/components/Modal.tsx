import './Modal.css'

interface ModalProps {
  children: React.ReactNode
  modalState: boolean
}

const Modal = (props: ModalProps): JSX.Element => {
  return (
    <>
      {
      props.modalState
        ? <div className='modal__overlay'>
          <div className='modal__card'>
            {props.children}
            {/* eslint-disable-next-line react/jsx-closing-tag-location */}
          </div>
          {/* eslint-disable-next-line react/jsx-closing-tag-location */}
        </div>
        : <div />
      }
    </>
  )
}

export default Modal
