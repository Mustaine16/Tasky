import React from "react";

function Input({ name, type = "text", options = [], onChange }) {

  if (type === "select") {
    return (
      <div className="form-control">
        <label htmlFor={name}>{name}</label>
        <select
          name={name}
          id={name}
          onChange={onChange}
        >
          {options.map(opt => <option value={opt["id"]} key={opt["name"]}>{opt["name"]}</option> )}
        </select>
      </div>
    )
  }

  return (
    <div className="form-control">
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
