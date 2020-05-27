import  { useState } from "react";
import {useHistory} from "react-router-dom"

const useSubmitForm = (contextAction) => {
  const [inputs, setInputs] = useState({});
  const history =  useHistory()

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
        Authorization: "",
      },
    })
      .then((res) => {
        console.log(res.status);
        console.log(res.headers.get('Content-Type'));
        
        return res.json();
      })
      .then((result) => {
        if (result.errors) {
          console.log("ERROR");
          console.log(result);
        } else {
          console.log("OK");
          console.log(result);
          //Exec the dispatcher
          console.log("result");
          contextAction(result);
          // history.push("/login")
        }
      })
      .catch((err) => {
        console.log("ERROR CLIENTE, en useSubmitForm");
        console.log(err);
      });

    e.preventDefault();
  };

  return [handleInputChange, handleSubmit];
};

export default useSubmitForm;
