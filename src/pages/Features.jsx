import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Zap, Target, Users, Shield, TrendingUp, Sparkles, User, ChevronDown, Settings, HelpCircle, Globe, LogOut } from "lucide-react";
import Logo from "../components/Logo.jsx";

export default function Features() {
  const { auth, logout } = useAuth();
  const nav = useNavigate();
  const isAuthed = !!auth?.user;

  // Me dropdown state
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
    await logout();
    setMeDropdownOpen(false);
    nav("/?showAuth=signup");
  };

  return (
    <div className="featuresPage">
      {/* Navigation */}
      <nav className="landingNav">
        <div className="landingNavContent">
          <div className="landingLogo" onClick={() => nav("/")} style={{ cursor: 'pointer' }}>
            <Logo size={44} />
          </div>
          <div className="landingNavLinks" style={{ gap: '32px' }}>
            <a 
              href="/" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                nav("/");
              }}
            >
              New Project
            </a>
            <a 
              href="/features" 
              className="landingNavLink"
              style={{ color: '#4A7FE0' }}
            >
              Features
            </a>
            <a 
              href="/portal/dashboard" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthed) {
                  nav("/portal/dashboard");
                } else {
                  nav("/?showAuth=signup");
                }
              }}
            >
              Dashboard
            </a>
            <a 
              href="/portal/projects" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthed) {
                  nav("/portal/projects");
                } else {
                  nav("/?showAuth=signup");
                }
              }}
            >
              Projects
            </a>
            <a 
              href="/portal/candidates" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthed) {
                  nav("/portal/candidates");
                } else {
                  nav("/?showAuth=signup");
                }
              }}
            >
              Candidates
            </a>
            <a 
              href="/#contact" 
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
            {isAuthed ? (
              <>
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
              </>
            ) : (
              <>
                <button className="landingNavButton landingSignUpBtn" onClick={() => nav("/?showAuth=signup")}>
                  Sign Up
                </button>
                <button className="landingNavButton landingLogInBtn" onClick={() => nav("/?showAuth=login")}>
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Features Grid Section */}
      <section className="landingFeatures">
        <div className="landingFeaturesContent">
          <div className="landingFeaturesGrid">
            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Zap size={32} />
              </div>
              <h3 className="landingFeatureTitle">AI-Powered Screening</h3>
              <p className="landingFeatureText">
                Automatically screen and rank candidates based on job requirements using advanced AI algorithms.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Target size={32} />
              </div>
              <h3 className="landingFeatureTitle">Smart Matching</h3>
              <p className="landingFeatureText">
                Find the best-fit candidates with our intelligent matching system that considers skills, experience, and culture fit.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Users size={32} />
              </div>
              <h3 className="landingFeatureTitle">Multi-Platform Integration</h3>
              <p className="landingFeatureText">
                Connect with LinkedIn, Indeed, and other platforms to access millions of candidate profiles instantly.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Shield size={32} />
              </div>
              <h3 className="landingFeatureTitle">Bias-Free Hiring</h3>
              <p className="landingFeatureText">
                Ensure fair and objective candidate evaluation with our bias-detection and mitigation technology.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <TrendingUp size={32} />
              </div>
              <h3 className="landingFeatureTitle">Real-Time Analytics</h3>
              <p className="landingFeatureText">
                Track hiring metrics, candidate pipeline, and team performance with comprehensive analytics dashboards.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Sparkles size={32} />
              </div>
              <h3 className="landingFeatureTitle">Automated Workflow</h3>
              <p className="landingFeatureText">
                Streamline every step from job posting to offer with intelligent automation and custom workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="featuresCTA">
        <div className="featuresCTAContent">
          <h2 className="featuresCTATitle">Ready to transform your hiring?</h2>
          <p className="featuresCTASubtitle">
            Join thousands of companies using AI Hiring to find the best talent faster.
          </p>
          <button className="featuresCTAButton" onClick={() => nav("/")}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
