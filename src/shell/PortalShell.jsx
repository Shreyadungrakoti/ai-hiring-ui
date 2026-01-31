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
    nav("/?showAuth=signup");
  };

  return (
    <div className="landingPage">
      {/* Navigation */}
      <nav className="landingNav">
        <div className="landingNavContent">
          <div className="landingLogo" onClick={() => nav("/")}>
            <Logo size={28} />
            <span>AI Hiring</span>
          </div>
          <div className="landingNavLinks">
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
              className={`landingNavLink ${location.pathname.includes("/portal/projects") ? "landingNavLinkActive" : ""}`}
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
              href="#settings" 
              className={`landingNavLink ${location.pathname === "/portal/settings" ? "landingNavLinkActive" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                nav("/portal/settings");
              }}
            >
              Settings
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

      {/* Footer */}
      <footer className="landingFooter">
        <div className="landingFooterContent">
          <div className="landingFooterBrand">
            <div className="landingFooterLogo">
              <Logo size={36} />
              <span>AI Hiring</span>
            </div>
            <p className="landingFooterDesc">
              End-to-end AI-powered recruitment platform. Hire faster with AI you can trust.
            </p>
          </div>

          <div className="landingFooterGrid">
            {/* Product */}
            <div className="landingFooterColumn">
              <h4 className="landingFooterHeading">Product</h4>
              <ul className="landingFooterLinks">
                <li><a href="#" onClick={(e) => { e.preventDefault(); nav("/portal/dashboard"); }}>Dashboard</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); nav("/portal/projects"); }}>Projects</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); nav("/portal/candidates"); }}>Candidates</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Pricing</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="landingFooterColumn">
              <h4 className="landingFooterHeading">Company</h4>
              <ul className="landingFooterLinks">
                <li><a href="#" onClick={(e) => e.preventDefault()}>About Us</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Careers</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Press</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Partners</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="landingFooterColumn">
              <h4 className="landingFooterHeading">Resources</h4>
              <ul className="landingFooterLinks">
                <li><a href="#" onClick={(e) => e.preventDefault()}>Documentation</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Help Center</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Community</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Templates</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="landingFooterBottom">
          <div className="landingFooterLegal">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
          </div>
          <div className="landingFooterCopy">
            © 2026 AI Hiring. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
