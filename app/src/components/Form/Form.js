import React from "react";

import "./Form.css";

function Form({ children, action, method, onSubmit }) {
  return (
    <form
      action={action}
      method={method}
      onSubmit={onSubmit}
      encType="application/json"
    >
      {children}
    </form>
  );
}

export default Form;
