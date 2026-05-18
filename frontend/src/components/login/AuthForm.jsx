import { useState } from "react";
import "./authform.css";
import API from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function AuthForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const OnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/loginAdmin", formData);

      console.log(res.data.message);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error.response.data.error || error.message || error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    console.error(error.response.data.error || error.message || error);
  };

  return (
    <div className="AuthFormMainDiv">
      <form onSubmit={HandleSubmit}>
        <p className="AuthFormTitle">Admin Login</p>
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
          <button type="submit">Login</button>
        </div>
        {errorMessage !== "" ? <pre>{errorMessage}</pre> : null}
      </form>
    </div>
  );
}
