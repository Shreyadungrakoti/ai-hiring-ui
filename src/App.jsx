import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import NewProject from "./pages/NewProject.jsx";
import ProjectEdit from "./pages/ProjectEdit.jsx";
import RunDetail from "./pages/RunDetail.jsx";
import Candidates from "./pages/Candidates.jsx";
import Settings from "./pages/Settings.jsx";
import WebsiteSettings from "./pages/WebsiteSettings.jsx";
import NotFound from "./pages/NotFound.jsx";
import PortalShell from "./shell/PortalShell.jsx";
import ProtectedRoute from "./shell/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/website-settings" element={<WebsiteSettings />} />

      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <PortalShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<NewProject />} />
        <Route path="projects/:projectId/edit" element={<ProjectEdit />} />
        
        <Route path="candidates" element={<Candidates />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
