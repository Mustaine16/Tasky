import { useState } from "react";

const useSubmitForm = (contextAction = () => console.log("hola")) => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    const URL = e.currentTarget.action;
    const METHOD = e.currentTarget.method;
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
        if (result.errors) {
          console.log("ERROR");
        }else{
          console.log("OK");
          contextAction(result);

        }
        //Exec the dispatcher
        console.log(result);
      })
      .catch((err) => {
        console.log("ERROR CLIENTE");
        console.log(err);
      });

    e.preventDefault();
  };

  return [handleInputChange, handleSubmit];
};

export default useSubmitForm;
