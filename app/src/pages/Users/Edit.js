import React from "react";
import { useParams } from "react-router-dom";

//Context and Hook
import { useUserContext } from "../../context/userContext";
import useSubmitForm from "../../hooks/useSubmitForm";

import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Submit from "../../components/Form/Submit";

const Edit = () => {

  const { actions: { editUser } } = useUserContext();

  const { handleInputChange, handleSubmit } = useSubmitForm(editUser);

  const { id } = useParams();
  const action = `http://localhost:3000/users/${id}?_method=PUT`;
  const method = "POST";

  return (
    <Form action={action} method={method} onSubmit={handleSubmit}>
      <Input name="name" onChange={handleInputChange} />
      <Input name="email" onChange={handleInputChange} />
      <Submit value="Save Changes" />
    </Form>
  );
};

export default Edit;
