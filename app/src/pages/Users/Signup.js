import React from "react";
import {Link} from "react-router-dom"

//Context and Hook
import { useUserContext } from "../../context/userContext";
import useSubmitForm from "../../hooks/useSubmitForm";

import Form from "../../components/Form/Form";
import FormInput from "../../components/Form/FormInput";
import FormSubmitButton from "../../components/Form/FormSubmitButton";

const Signup = () => {

  const { actions: { createUser } } = useUserContext();
  const [handleInputChange, handleSubmit] = useSubmitForm(createUser);

  const action = "http://localhost:3000/users";
  const method = "POST";

  return (
    <React.Fragment>
    <Form action={action} method={method} onSubmit={handleSubmit}>
      <FormInput name="name" onChange={handleInputChange} />
      <FormInput type="email" name="email" onChange={handleInputChange} />
      <FormInput type="password" name="password" onChange={handleInputChange} />
      <FormSubmitButton value="Sign up!" />
    </Form>
    </React.Fragment>
  );
};

export default Signup;
