import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import API from "../../utils/axios";

export function ProtectRoutes({ children }) {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const res = await API.get("/admin/me");
      if (res.error) {
        console.error(res.error.data.error || res.error.error);
      }
      setMe(res.data);
    } catch (error) {
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return me !== null ? children : <Navigate to="/login" />;
}
