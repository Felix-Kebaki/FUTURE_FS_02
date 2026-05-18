import React, { useState } from "react";
import "./websiteForm.css";
import API from "../../utils/axios";

export function WebsiteForm() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "website",
  });
  const { name, email } = formData;

  const OnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/lead/setLeads", formData);
 
      setMessage("Form submitted successfully")
      console.log(res.data.message);
      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      console.error(error.response.data.error || error.message || error);
      setMessage(error.response.data.error || error.message || error);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="WebsiteFormMainDiv">
      <form onSubmit={SubmitForm}>
        <p className="WebsiteFormTitle">Get Started With Us</p>
        <p className="WebsiteFormDesc">
          Fill in your details and our team will contact you to discuss how we
          can help.
        </p>
        <div className="FormInputAndLabelDiv">
          <label htmlFor="nameId">Full name</label>
          <br />
          <input
            type="text"
            id="nameId"
            value={name}
            name="name"
            onChange={OnChange}
          />
        </div>
        <div className="FormInputAndLabelDiv">
          <label htmlFor="emailId">Email</label>
          <br />
          <input
            type="email"
            id="emailId"
            value={email}
            name="email"
            onChange={OnChange}
          />
        </div>
        <div className="WebsiteFormBtnDiv">
          <button type="submit">Submit</button>
        </div>
        {message !== "" ? <pre>{message}</pre> : null}
      </form>
    </div>
  );
}
