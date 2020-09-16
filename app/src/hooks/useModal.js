import { useEffect } from "react"
import {useState} from "react"

const usePortal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleOpenModal = ({ e = null}) => {
    //Handle the Enter Key
    if (e && e.keyCode !== 13) return null
  
    setModalIsOpen(true)
  }
  
  const handleCloseModal = (e = null) => {
    //Handle Escape Key
    console.log("KeyCode: ", e && e.keyCode);
    if (e && e.keyCode !== 27) return null
    setModalIsOpen(false)
  
    //Hide scrollBar
    document.body.style.overflow = ""
    document.querySelector("#portal").classList.remove("portal__open")
  }
  
  return  {modalIsOpen, setModalIsOpen,  handleOpenModal, handleCloseModal}
}

export default usePortal