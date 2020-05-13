import { useState } from "react";

const useSubmitForm = () => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = e.currentTarget.action;
    const METHOD = e.currentTarget.method
    const formData = JSON.stringify(inputs);

    fetch(URL, {
      method: METHOD,
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((result) => {
        result.errors ? console.log("ERROR") : console.log("OK");
        console.log(result);
      })
      .catch((err) => {
        console.log("ERROR CLIENTE");
        console.log(err);
      });
  };

  return [handleInputChange, handleSubmit];
};

export default useSubmitForm;
