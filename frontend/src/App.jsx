import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetails from "./pages/LeadDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
        />

        <Route
          path="/leads"
          element={isLoggedIn ? <LeadsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/leads/:id"
          element={isLoggedIn ? <LeadDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/leads" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
