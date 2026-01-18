import { LayoutDashboard, FolderKanban, Users, Settings, LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../state/auth.jsx";

const nav = [
  { to: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portal/projects", label: "Projects", icon: FolderKanban },
  { to: "/portal/candidates", label: "Candidates", icon: Users },
  { to: "/portal/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ pathname, onNav }) {
  const { auth, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    // Redirect to landing page with signup modal open
    onNav("/?showAuth=signup");
  };

  return (
    <aside className="sidebar sidebarCompact">
      <div className="sbTop">
        <button className="sbBrand" onClick={() => onNav("/portal/dashboard")} title="Home">
          <div className="sbBrandMark">AI</div>
        </button>

        {/* Plus exactly between AI and first nav item */}
        <button className="sbPlusBtn" onClick={() => onNav("/portal/projects/new")} title="New project">
          <Plus size={18} />
        </button>
      </div>

      <nav className="sbNav">
        {nav.map((item) => {
          const Active = pathname === item.to;
          const Icon = item.icon;
          return (
            <button
              key={item.to}
              className={`sbIconBtn ${Active ? "sbIconBtnActive" : ""}`}
              onClick={() => onNav(item.to)}
              title={item.label}
            >
              <Icon size={22} />
              <span className="sbIconLabel">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sbBottom">
        <div className="sbEmail" title={auth?.user?.email}>
          {auth?.user?.email ? auth.user.email.split("@")[0] : "Account"}
        </div>

        <button
          className="sbIconBtn"
          onClick={() => setShowLogoutConfirm(true)}
          title="Logout"
        >
          <LogOut size={22} />
          <span className="sbIconLabel">Logout</span>
        </button>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="h2">Confirm Logout</div>
              <div className="hr" />
              <p style={{ margin: "16px 0" }}>
                Are you sure you want to logout? You'll need to sign in again to access your portal.
              </p>
              <div className="row" style={{ justifyContent: "flex-end", gap: 8 }}>
                <button className="btn" onClick={() => setShowLogoutConfirm(false)}>
                  Cancel
                </button>
                <button 
                  className="btn btnPrimary" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
