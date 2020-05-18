import React from "react";

//Context and Hook
import { useUserContext } from "../../context/userContext";
import useSubmitForm from "../../hooks/useSubmitForm";

import Form from "../../components/Form/Form";
import FormInput from "../../components/Form/FormInput";
import FormSubmitButton from "../../components/Form/FormSubmitButton";

const Edit = () => {
  const {
    actions: { loginUser },
  } = useUserContext();

  const [handleInputChange, handleSubmit] = useSubmitForm(loginUser);

  const action = "http://localhost:3000/sessions";
  const method = "POST";

  return (
    <Form action={action} method={method} onSubmit={handleSubmit}>
      <FormInput name="email" type="text" onChange={handleInputChange}/>
      <FormInput name="password" type="password" onChange={handleInputChange}/>
      <FormSubmitButton value="Log in"/>
    </Form>
  );
};

export default Edit;
