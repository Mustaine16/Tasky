import React from "react";

import useForm from "../../hooks/useForm";
import "./css/Signup.css";

const Signup = () => {
  
  const [handleInputChange, handleSubmit] = useForm();

  return (
    <form
      action="http://localhost:3000/users"
      method="POST"
      onSubmit={handleSubmit}
      name="signupForm"
    >
      <div className="form-control">
        <label htmlFor="text">Name</label>
        <input type="text" name="name" id="text" onChange={handleInputChange} />
      </div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleInputChange}
        />
      </div>
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default Signup;
