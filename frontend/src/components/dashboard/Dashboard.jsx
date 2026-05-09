import { useState } from "react";
import API from "../../utils/axios";
import { useEffect } from "react";
import moment from "moment";

import "./dashboard.css";
import { ContactLead } from "../contactLead/ContactLead";
import { ConvertLead } from "../convertLead/ConvertLead";
import { Notes } from "../notes/Notes";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toContacted, setToContacted] = useState(null);
  const [toConverted, setToConverted] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(null);

  const navigate = useNavigate();

  const getLeads = async () => {
    try {
      const res = await API.get("/lead/getLeads");
      setData(res.data);
    } catch (error) {
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const HandleClickLead = (getId, getStatus, getNotes) => {
    if (getStatus === "new") {
      setToContacted(getId);
    } else if (getStatus === "contacted") {
      setToConverted(getId);
      setNotes(getNotes);
    } else if (getStatus === "converted") {
      setNotes(getNotes);
      setShowNotes(true);
    }
  };

  const HandleLogout = async () => {
    try {
      const res = await API.post("/admin/logoutAdmin");
      if (res.error) {
        console.error(res.error.data.error || res.error.error);
      }
      console.log(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error.message || error);
    }
  };

  useEffect(() => {
    getLeads();
  }, [toContacted, toConverted]);

  if (loading) {
    return (
      <div className="LoadingMainDiv">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="DashboardMainDiv">
      <div className="LogoutMainDiv">
        <button onClick={HandleLogout}>Logout</button>
      </div>
      <div className="DashboardTableWrapper">
        <table className="DashboardMainTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Follow-up</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {data !== null
              ? data.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() =>
                      HandleClickLead(lead._id, lead.status, lead.notes)
                    }
                  >
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.source}</td>
                    <td>{lead.status}</td>
                    <td>
                      {lead.notes.length !== 0
                        ? `Available(${lead.notes.length})`
                        : null}
                    </td>
                    <td>
                      {lead.followUpDate && lead.status !== "converted"
                        ? moment(lead.followUpDate).format("YYYY-MM-DD")
                        : null}
                    </td>
                    <td>{moment(lead.createdAt).format("YYYY-MM-DD")}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      {toContacted !== null ? (
        <div className="OverflowAddMainDiv">
          <ContactLead id={toContacted} setId={setToContacted} />
        </div>
      ) : null}

      {toConverted !== null ? (
        <div className="OverflowAddMainDiv">
          <ConvertLead
            id={toConverted}
            setId={setToConverted}
            notes={notes}
            setNotes={setNotes}
          />
        </div>
      ) : null}

      {showNotes ? (
        <div className="OverflowAddMainDiv">
          <Notes
            notes={notes}
            setNotes={setNotes}
            setShowNotes={setShowNotes}
          />
        </div>
      ) : null}
    </div>
  );
}
