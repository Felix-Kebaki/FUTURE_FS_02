import { ProtectRoutes } from "./components/protectRoutes/ProtectRoutes";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginAdminPage } from "./pages/LoginAdminPage";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
