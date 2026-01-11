import { LayoutDashboard, FolderKanban, Users, Settings, LogOut, Plus } from "lucide-react";
import { useAuth } from "../state/auth.jsx";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/candidates", label: "Candidates", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ pathname, onNav }) {
  const { auth, logout } = useAuth();

  return (
    <aside className="sidebar sidebarCompact">
      <div className="sbTop">
        <button className="sbBrand" onClick={() => onNav("/")} title="Home">
          <div className="sbBrandMark">AI</div>
        </button>

        {/* Plus exactly between AI and first nav item */}
        <button className="sbPlusBtn" onClick={() => onNav("/projects/new")} title="New project">
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
          onClick={() => {
            logout();
            onNav("/login");
          }}
          title="Logout"
        >
          <LogOut size={22} />
          <span className="sbIconLabel">Logout</span>
        </button>
      </div>
    </aside>
  );
}
