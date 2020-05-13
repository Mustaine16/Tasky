import React from "react";
import {useParams} from "react-router-dom"

import useSubmitForm from "../../hooks/useSubmitForm";
import "./css/Form.css";

const Edit = () => {
  
  const [handleInputChange, handleSubmit] = useSubmitForm();
  const {id} = useParams()
  const URL = `http://localhost:3000/users/${id}`

  return (
    <form
      action= {URL}
      method="POST"
      onSubmit={handleSubmit}
      name="editForm"
    >
      <div className="form-control">
        <label htmlFor="text">Name</label>
        <input type="text" name="name" id="text" onChange={handleInputChange} />
      </div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputChange}
        />
      </div>
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default Edit;