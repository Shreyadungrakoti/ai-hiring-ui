import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container containerShell">
      <div className="shell shellCompact">
        <Sidebar pathname={location.pathname} onNav={(to) => navigate(to)} />

        <div className="main">
          <Topbar pathname={location.pathname} />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
