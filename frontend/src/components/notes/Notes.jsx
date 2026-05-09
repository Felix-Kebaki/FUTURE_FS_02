import React from "react";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./notes.css";

export function Notes({ notes, setNotes ,setShowNotes}) {
  const Cancel = () => {
    setNotes(null);
    setShowNotes(null)
  };
  return (
    <div className="OnlyNotesMainDiv">
      <div className="TopOfNotesDiv">
        <p>Recorded notes</p>
        <FontAwesomeIcon icon={faXmark} onClick={Cancel} id="ExitNotesIcon"/>
      </div>
      {notes && notes.length !== 0
        ? notes.map((note,index) => (
            <div className="ActualNotesDiv" key={index}>
              <p>{moment(note.date).format("Do MMM ,YYYY")}</p>
              <p>{note.text}</p>
            </div>
          ))
        : null}
    </div>
  );
}
