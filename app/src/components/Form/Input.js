import React from "react";

function Input({ name, label, type = "text", options = [], onChange }) {

  if (type === "select") {
    console.log("OPTIONS: ", options[0]["id"]);
    
    return (
      <div className="form-control">
        <label htmlFor={name}>{label || name}</label>
        <select
          name={name}
          id={name}
          onChange={onChange}
        >
          <option value={""}>Select a Category</option>
          {options.map(opt =>
            <option value={opt["id"]} key={opt["title"]}>{opt["title"]}</option>
          )}
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
