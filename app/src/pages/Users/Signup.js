import React from "react";

//Context and Hook
import { useUserContext } from "../../context/userContext";
import useSubmitForm from "../../hooks/useSubmitForm";

import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Submit from "../../components/Form/Submit";

const Signup = () => {

  const { actions: { createUser } } = useUserContext();
  const { handleInputChange, handleSubmit } = useSubmitForm(createUser);

  const action = "http://localhost:3000/users";
  const method = "POST";

  return (
    <React.Fragment>
      <Form action={action} method={method} onSubmit={handleSubmit}>
        <Input name="name" onChange={handleInputChange} />
        <Input type="email" name="email" onChange={handleInputChange} />
        <Input type="password" name="password" onChange={handleInputChange} />
        <Submit value="Sign up!" />
      </Form>
    </React.Fragment>
  );
};

export default Signup;
