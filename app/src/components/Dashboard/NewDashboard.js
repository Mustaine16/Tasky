import React from 'react';

import Portal from "../../utils/Portal"

const NewDashboard = ({handleCloseModal}) => {
  return (
    <Portal>
      <h1>Create new dashboard</h1>
      <button onClick={() => handleCloseModal()}>close</button>
    </Portal>
  )
}

export default NewDashboard