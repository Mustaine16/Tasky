import React from 'react';
import styled from "styled-components"

import useModal from "../../hooks/useModal"
import NewDashboard from './NewDashboard';

const Button = styled.button`
  background: rgba(0,0,0,0.5);
  border:none;
  padding:1rem;
  border-radius:10px;
  cursor:pointer;
`;

const CreateDashboardButton = () => {
  const {modalIsOpen, setModalIsOpen, handleOpenModal, handleCloseModal} = useModal();
  console.log("Open: ",modalIsOpen);
  return (
    <>
      <Button onClick={(e) => handleOpenModal(e)}>+</Button>
      {modalIsOpen && <NewDashboard handleCloseModal={handleCloseModal}/>}
    </>
  )
}

export default CreateDashboardButton