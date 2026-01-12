import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "../state/theme.jsx";

const titleMap = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/projects/new": "New project",
  "/candidates": "Candidates",
  "/settings": "Settings",
};

export default function Topbar({ pathname }) {
  const title = titleMap[pathname] || "Dashboard";
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="topbar">
      <div className="row space">
        <div className="stack" style={{ gap: 2 }}>
          <div className="h1">{title}</div>
        </div>

        <div className="row" style={{ gap: 10 }}>
          <div className="search">
            <Search size={16} />
            <input className="searchInput" placeholder="Search projects, candidates…" />
            <kbd>⌘K</kbd>
          </div>

          <button
            className="btn btnGhost"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="btn btnGhost" title="Notifications">
            <Bell size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
