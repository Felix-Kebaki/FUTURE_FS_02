import { ProtectRoutes } from "./components/protectRoutes/ProtectRoutes";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginAdminPage } from "./pages/LoginAdminPage";
import { WebsiteFormPage } from "./pages/WebsiteFormPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectRoutes>
                <DashboardPage />
              </ProtectRoutes>
            }
          />
          <Route path="/login" element={<LoginAdminPage />} />
          <Route path='/' element={<WebsiteFormPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
