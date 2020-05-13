import React from "react";

import Form from "../../components/User/Form/Form";
import FormInput from "../../components/User/Form/FormInput";
import FormSubmitButton from "../../components/User/Form/FormSubmitButton";

import useSubmitForm from "../../hooks/useSubmitForm";

const Signup = () => {
  const [handleInputChange, handleSubmit] = useSubmitForm();

  const action = "http://localhost:3000/users";
  const method = "POST";

  return (
    <Form action={action} method={method} onSubmit={handleSubmit}>
      <FormInput name="name" onChange={handleInputChange} />
      <FormInput type="email" name="email" onChange={handleInputChange} />
      <FormInput
        type="password"
        name="password"
        onChange={handleInputChange}
      />
      <FormSubmitButton value="Sign up!"/>
    </Form>
  );
};

export default Signup;
