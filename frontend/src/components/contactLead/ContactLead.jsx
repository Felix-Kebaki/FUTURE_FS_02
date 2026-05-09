import React from "react";
import "./contactLead.css";
import { useState } from "react";
import API from "../../utils/axios";

export function ContactLead({ id, setId }) {
  const [contacting, setContacting] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    followUpDate: "",
  });
  const { text, followUpDate } = formData;

  const OnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Cancel = () => {
    setId(null);
  };

  const StartContacting = () => {
    setContacting(true);
  };

  const HandleContactLead = async (e) => {
    e.preventDefault();
    try {
      const res1 = await API.post(`/lead/contactLead/${id}`);
      if (res1.error) {
        console.error(res1.error.data.error || res1.error.error);
      } else {
        const res2 = await API.post(`/lead/saveNotes/${id}`, formData);
        if (res2.error) {
          console.error(res2.error.data.error || res2.error.error);
        }
        console.log(res2.data.message);
        setId(null);
      }
    } catch (error) {
      console.error(error.message || error);
    }
  };

  return (
    <div className="ContactLeadMainDiv">
      {!contacting ? (
        <div className="ContactMainQuizDiv">
          <p>Do you want to contact lead</p>
          <div className="PromptTwoBtnDiv">
            <button onClick={StartContacting}>Contact</button>
            <button onClick={Cancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <form onSubmit={HandleContactLead} className="CreateNoteMainForm">
          <div>
            <label htmlFor="noteId">Notes</label>
            <br />
            <textarea
              id="noteId"
              value={text}
              name="text"
              onChange={OnChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="followUpDateId">Follow-up</label>
            <br />
            <input
              type="date"
              id="followUpDateId"
              value={followUpDate}
              name="followUpDate"
              onChange={OnChange}
            />
          </div>
          <div className="PromptTwoBtnDiv">
            <button type="submit">Save</button>
            <button type="button" onClick={Cancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
