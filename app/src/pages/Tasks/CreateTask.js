import React from "react"

import useSubmitForm from "../../hooks/useSubmitForm"
import { useUserContext } from "../../context/userContext"

import Form from "../../components/Form/Form"
import FormInput from "../../components/Form/FormInput"
import FormSubmit from "../../components/Form/FormSubmitButton"

const CreateTask = () => {

    const { state: { token } } = useUserContext();
    const [handleInputChange, handleSubmit] = useSubmitForm();

    const options = [
        { name: "job", id: "4" },
        { name: "miscellaneous", id: "5" }
    ]
    const action = "http://localhost:3000/tasks";
    const method = "POST";

    return (
        <Form action={action} method={method} onSubmit={handleSubmit}>
            <FormInput name={"title"} onChange={handleInputChange} />
            <FormInput name={"description"} onChange={handleInputChange} />
            <FormInput type="select" name={"categoryId"} options={options} onChange={handleInputChange} />
            <FormSubmit value="Create"></FormSubmit>
        </Form>
    )
}

export default CreateTask