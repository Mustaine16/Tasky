import React from "react";


function Input({ type= "text", name, onChange }) {
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
