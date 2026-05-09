import { ProtectRoutes } from "./components/protectRoutes/ProtectRoutes";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginAdminPage } from "./pages/LoginAdminPage";
import { RegisterAdminPage } from "./pages/RegisterAdminPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoutes>
                <DashboardPage />
              </ProtectRoutes>
            }
          />
          <Route path="/login" element={<LoginAdminPage />} />
          <Route path="/register" element={<RegisterAdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
