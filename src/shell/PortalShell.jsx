import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../state/auth.jsx";
import { User, ChevronDown, Settings, HelpCircle, Globe, LogOut, Target } from "lucide-react";
import Logo from "../components/Logo.jsx";

export default function PortalShell() {
  const { auth, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [meDropdownOpen, setMeDropdownOpen] = useState(false);
  const meDropdownRef = useRef(null);

  // Close Me dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (meDropdownRef.current && !meDropdownRef.current.contains(e.target)) {
        setMeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setMeDropdownOpen(false);
    await logout();
    nav("/");
  };

  return (
    <div className="landingPage">
      {/* Navigation */}
      <nav className="landingNav">
        <div className="landingNavContent">
          <div className="landingLogo" onClick={() => nav("/")} style={{ cursor: 'pointer' }}>
            <Logo size={28} />
            <span>AI Hiring</span>
          </div>
          <div className="landingNavLinks" style={{ gap: '32px' }}>
            <a 
              href="#new-project" 
              className={`landingNavLink ${location.pathname === "/portal/projects/new" ? "landingNavLinkActive" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                nav("/");
              }}
            >
              New Project
            </a>
            <a 
              href="#features" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                nav("/");
                setTimeout(() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              Features
            </a>
            <a 
              href="#dashboard" 
              className={`landingNavLink ${location.pathname === "/portal/dashboard" ? "landingNavLinkActive" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                nav("/portal/dashboard");
              }}
            >
              Dashboard
            </a>
            <a 
              href="#projects" 
              className={`landingNavLink ${location.pathname.includes("/portal/projects") && location.pathname !== "/portal/projects/new" ? "landingNavLinkActive" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                nav("/portal/projects");
              }}
            >
              Projects
            </a>
            <a 
              href="#candidates" 
              className={`landingNavLink ${location.pathname === "/portal/candidates" ? "landingNavLinkActive" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                nav("/portal/candidates");
              }}
            >
              Candidates
            </a>
            <a 
              href="#contact" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                nav("/");
                setTimeout(() => {
                  const footer = document.querySelector('.landingFooter');
                  if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              Contact
            </a>
          </div>
          <div className="landingNavLinks" style={{ flex: '0', gap: '8px' }}>
            <div className="landingMeDropdown" ref={meDropdownRef}>
              <button
                className="landingMeBtn"
                onClick={() => setMeDropdownOpen(!meDropdownOpen)}
              >
                <User size={20} />
                <span>Me</span>
                <ChevronDown size={16} />
              </button>

              {meDropdownOpen && (
                <div className="landingMeMenu">
                  <button
                    className="landingMeItem"
                    onClick={() => {
                      setMeDropdownOpen(false);
                      nav("/portal/dashboard");
                    }}
                  >
                    <Target size={18} />
                    <span>Dashboard</span>
                  </button>

                  <button 
                    className="landingMeItem" 
                    onClick={() => {
                      setMeDropdownOpen(false);
                      nav("/portal/settings");
                    }}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>

                  <button className="landingMeItem" onClick={() => setMeDropdownOpen(false)}>
                    <HelpCircle size={18} />
                    <span>Help</span>
                  </button>

                  <button className="landingMeItem" onClick={() => setMeDropdownOpen(false)}>
                    <Globe size={18} />
                    <span>Language</span>
                  </button>

                  <div className="landingMeDivider" />

                  <button className="landingMeItem" onClick={handleSignOut}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Portal Content */}
      <div className="portalContentWrapper">
        <Outlet />
      </div>
    </div>
  );
}
