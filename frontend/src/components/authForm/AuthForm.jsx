import { useState } from "react";
import "./authform.css";

export function AuthForm({ page, switchPage, title }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const OnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="AuthFormMainDiv">
      <form onSubmit={HandleSubmit}>
        <p className="AuthFormTitle">{title}</p>
        <div className="AuthFormInputLabelDiv">
          <label htmlFor="emailId">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={OnChange}
            id="emailId"
          />
        </div>
        <div className="AuthFormInputLabelDiv">
          <label htmlFor="PasswordId">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={OnChange}
            id="PasswordId"
          />
        </div>
        <div className="AuthFormBtnDiv">
          <button>{page}</button>
        </div>
        <div className="AuthFormSwitchFormDiv">
          <p>
            {switchPage}{" "}
            <a href="">
              {title === "Admin Login" ? "register" : "login"}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
