import React, { useState, useEffect } from "react"

import useSubmitForm from "../../hooks/useSubmitForm"
import { useUserContext } from "../../context/userContext"

import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import Submit from "../../components/Form/Submit"

const CreateTask = () => {

  const {
    actions: { addTask }
  } = useUserContext();

  const initialState = {
    categoryId: "null"
  }

  const [categories, setCategories] = useState();

  const { inputs, setInputs, handleInputChange, handleSubmit } = useSubmitForm(addTask, "/");


  useEffect(() => console.log("INPUTS: ", inputs)
    , [inputs])

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(({ categories }) => {
        console.log(categories)
        setCategories(categories)
      })
      .catch(err => console.log(err)
      )
  }, [])


  const action = "http://localhost:3000/tasks";
  const method = "POST";

  //Return null while categories are being loaded
  if (!categories) return null

  return (
    <Form action={action} method={method} onSubmit={handleSubmit}>
      <Input name={"title"} onChange={handleInputChange} value={inputs["title"] || ""} />
      <Input name={"description"} onChange={handleInputChange} />
      <Input type="select" label="Category" name={"categoryId"} options={categories} onChange={handleInputChange} value={inputs["categories"] || ""} />
      <Submit value="Create"></Submit>
    </Form>
  )
}

export default CreateTask