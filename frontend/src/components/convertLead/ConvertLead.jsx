import React from "react";
import { useState } from "react";
import API from "../../utils/axios";
import moment from "moment";

import "./convertLead.css";
import { Notes } from "../notes/Notes";

export function ConvertLead({ id, setId, notes, setNotes }) {
  const [errorMessage,setErrorMessage]=useState("")
  const [converting, setConverting] = useState(false);
  const [afterConv, setAfterConv] = useState("");
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
    setNotes(null);
  };

  const ClickOnStartConverting = () => {
    setConverting(true);
  };

  const HandleConvertingSubmission = async () => {
    try {
      if (afterConv === "withdrawn") {
        const res = await API.delete(`/lead/deleteLead/${id}`);

        console.log(res.data.message);
      } else if (afterConv === "converted") {
        const res = await API.post(`/lead/acquireCustomer/${id}`);

        console.log(res.data.message);
      } else if (afterConv === "followup") {
        const res = await API.post(`/lead/saveNotes/${id}`, formData);

        console.log(res.data.message);
      }
      setId(null);
    } catch (error) {
      console.error(error.response.data.error || error.message || error);
      setErrorMessage(error.response.data.error || error.message || error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="ConvertLeadMainDiv">
      {notes.length !== 0 ? (
        <div className="NoteMainDivWrapper">
          <p className="NoteMainTitle">Notes recorded:</p>
          {notes.map((note, index) => (
            <div className="NotesMainDiv" key={index}>
              <p>{moment(note.date).format("Do MMM ,YYYY")}</p>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      ) : null}

      {!converting ? (
        <div>
          <p className="ConvertMainPrompt">You want to follow-up with lead?</p>
          <div className="PromptTwoBtnDiv">
            <button onClick={ClickOnStartConverting}>Yes</button>
            <button onClick={Cancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="SelectOptionAtConvertDiv">
          <p>Select Outcome of conversation:</p>
          <div className="InsideSelectOptionAtConvertDiv">
            <div>
              <input
                type="radio"
                value="converted"
                name="outcome"
                onChange={(e) => setAfterConv(e.target.value)}
              />

              <label>Converted</label>
            </div>
            <div>
              <input
                type="radio"
                value="followup"
                name="outcome"
                onChange={(e) => setAfterConv(e.target.value)}
              />

              <label>Follow-up</label>
            </div>
            <div>
              <input
                type="radio"
                value="withdrawn"
                name="outcome"
                onChange={(e) => setAfterConv(e.target.value)}
              />
              <label>Withdrawn</label>
            </div>
          </div>

          {afterConv === "followup" ? (
            <form className="CreateNoteMainForm">
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
            </form>
          ) : null}
          {afterConv !== "" ? (
            <div className="PromptTwoBtnDiv">
              <button onClick={HandleConvertingSubmission}>Save</button>
              <button onClick={Cancel}>Cancel</button>
            </div>
          ) : null}
          
              {errorMessage!==""?<pre>{errorMessage}</pre>:null}
        </div>
      )}
    </div>
  );
}
