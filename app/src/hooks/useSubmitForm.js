import { useState } from "react";
import { useHistory } from "react-router-dom"

const useSubmitForm = (contextAction = "", redirect = "", initialState = {}) => {
  const [inputs, setInputs] = useState(initialState);
  const history = useHistory()

  const handleInputChange = async (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    })

    e.preventDefault();
  };

  const handleSubmit = (e) => {
    console.log("SUBMIT!");

    const URL = e.currentTarget.action;
    const METHOD = e.currentTarget.method;
    const formData = JSON.stringify(inputs);

    fetch(URL, {
      method: METHOD,
      body: formData,
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      credentials: "include"
    })
      .then((res) => {
        console.log(res.status);
        if (!res.ok) {
          console.log("ERROR SERVER")
        };
        return res.json();
      })
      .then((result) => {
        if (result.errors || result.message) {
          console.log("Errores:", result.errors || result.message);
        } else {
          console.log(result);
          //Exec the dispatcher
          if (contextAction) contextAction(result);
          if (redirect) history.push(redirect)
        }
      })
      .catch((err) => {
        console.log("ERROR CLIENTE, en useSubmitForm");
        console.log(err);
      });

    e.preventDefault();
  };

  return { inputs, setInputs, handleInputChange, handleSubmit };
};

export default useSubmitForm;
