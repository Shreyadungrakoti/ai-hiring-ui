import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Users, Zap, Target, Shield, TrendingUp, Sparkles, Send, X, User, ChevronDown, Settings, HelpCircle, Globe, LogOut } from "lucide-react";
import HeroIllustration from "../components/HeroIllustration.jsx";
import TestimonialsCarousel from "../components/TestimonialsCarousel.jsx";
import StatsCarousel from "../components/StatsCarousel.jsx";

export default function LandingPage() {
  const { auth, signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword, logout } = useAuth();
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isAuthed = !!auth?.user;

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup" | "reset"
  const [authForm, setAuthForm] = useState({ fullName: "", email: "", password: "" });
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Me dropdown state
  const [meDropdownOpen, setMeDropdownOpen] = useState(false);
  const meDropdownRef = useRef(null);

  // Auto-open auth modal if redirected from logout
  useEffect(() => {
    const showAuth = searchParams.get("showAuth");
    if (showAuth === "signup") {
      setAuthMode("signup");
      setAuthOpen(true);
      // Clean URL
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

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

  const authTitle = useMemo(
    () => {
      if (authMode === "signup") return "Create your account";
      if (authMode === "reset") return "Reset password";
      return "Welcome back";
    },
    [authMode]
  );

  // Contact form state
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    note: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission (backend will handle this)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Contact form submitted:", contactForm);
    
    setFormSubmitted(true);
    setSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setContactForm({ fullName: "", email: "", phone: "", note: "" });
      setFormSubmitted(false);
    }, 3000);
  };

  const handleLoginClick = () => {
    setAuthError("");
    setAuthSubmitting(false);
    setAuthMode("login");
    setAuthOpen(true);
  };

  const handlePortalClick = () => {
    if (!isAuthed) {
      setAuthError("");
      setAuthSubmitting(false);
      setAuthMode("signup");
      setAuthOpen(true);
    } else if (!auth.hasPortal) {
      // Logged in but no portal → go to create portal
      nav("/create-portal");
    } else {
      // Has portal → go to dashboard
      nav("/portal/dashboard");
    }
  };

  const handleSignOut = async () => {
    setMeDropdownOpen(false);
    await logout();
    // Will redirect to landing with signup modal per sidebar logic
  };

  const getPortalButtonText = () => {
    if (!auth.hasPortal) return "Create Portal";
    return "My Portal";
  };

  const getCtaText = () => {
    if (!isAuthed) return "Get Started";
    return getPortalButtonText();
  };

  const closeAuth = () => {
    setAuthOpen(false);
    setAuthError("");
    setAuthSuccess("");
    setAuthSubmitting(false);
  };

  const onAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((s) => ({ ...s, [name]: value }));
  };

  const onGoogle = async () => {
    setAuthError("");
    setAuthSubmitting(true);
    try {
      await signInWithGoogle();
      closeAuth();
    } catch (err) {
      setAuthError(err?.message || "Google sign-in failed.");
      setAuthSubmitting(false);
    }
  };

  const onAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    setAuthSubmitting(true);
    try {
      if (authMode === "reset") {
        await resetPassword(authForm.email);
        setAuthSuccess("Password reset email sent! Check your inbox.");
        setAuthSubmitting(false);
        return;
      }
      if (authMode === "signup") {
        await signUpWithEmail({
          email: authForm.email,
          password: authForm.password,
          fullName: authForm.fullName,
        });
        setAuthSuccess("Account created! Check your email to verify your account.");
        setAuthSubmitting(false);
        // Don't close modal yet, show success message
        return;
      } else {
        await signInWithEmail({ email: authForm.email, password: authForm.password });
      }
      closeAuth();
    } catch (err) {
      setAuthError(err?.message || "Authentication failed.");
      setAuthSubmitting(false);
    }
  };

  return (
    <div className="landingPage">
      {/* Navigation */}
      <nav className="landingNav">
        <div className="landingNavContent">
          <div className="landingLogo">
            <Sparkles size={28} />
            <span>AI Hiring</span>
          </div>
          <div className="landingNavLinks">
            {isAuthed ? (
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
                    {!auth.hasPortal ? (
                      <button
                        className="landingMeItem"
                        onClick={() => {
                          setMeDropdownOpen(false);
                          nav("/create-portal");
                        }}
                      >
                        <Sparkles size={18} />
                        <span>Create Portal</span>
                      </button>
                    ) : (
                      <button
                        className="landingMeItem"
                        onClick={() => {
                          setMeDropdownOpen(false);
                          nav("/portal/dashboard");
                        }}
                      >
                        <Target size={18} />
                        <span>My Portal</span>
                      </button>
                    )}

                    <button className="landingMeItem" onClick={() => setMeDropdownOpen(false)}>
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
            ) : (
              <button className="landingLoginBtn" onClick={handleLoginClick}>
                Login
              </button>
            )}
            <button className="landingGetStartedBtn" onClick={handlePortalClick}>
              {getCtaText()}
            </button>
          </div>
        </div>
      </nav>

      {authOpen && (
        <div className="landingAuthOverlay" onClick={closeAuth}>
          <div className="landingAuthModal" onClick={(e) => e.stopPropagation()}>
            <button className="landingAuthClose" onClick={closeAuth} aria-label="Close">
              <X size={18} />
            </button>

            <div className="landingAuthHeader">
              <div className="landingAuthBrand">
                <Sparkles size={18} />
                <span>AI Hiring</span>
              </div>
              <div className="landingAuthTitle">{authTitle}</div>
            </div>

            <button className="landingGoogleBtn" onClick={onGoogle} disabled={authSubmitting}>
              Continue with Google
            </button>

            <div className="landingAuthOr">
              <span />
              <div>Or</div>
              <span />
            </div>

            <form className="landingAuthForm" onSubmit={onAuthSubmit}>
              {authMode === "signup" && (
                <label className="landingAuthField">
                  <div className="landingAuthLabel">Full Name</div>
                  <input
                    className="landingAuthInput"
                    name="fullName"
                    value={authForm.fullName}
                    onChange={onAuthChange}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </label>
              )}

              <label className="landingAuthField">
                <div className="landingAuthLabel">Email</div>
                <input
                  className="landingAuthInput"
                  name="email"
                  type="email"
                  value={authForm.email}
                  onChange={onAuthChange}
                  placeholder="Your email address"
                  autoComplete="email"
                />
              </label>

              {authMode !== "reset" && (
                <label className="landingAuthField">
                  <div className="landingAuthLabel">Password</div>
                  <input
                    className="landingAuthInput"
                    name="password"
                    type="password"
                    value={authForm.password}
                    onChange={onAuthChange}
                    placeholder="Password"
                    autoComplete={authMode === "signup" ? "new-password" : "current-password"}
                  />
                </label>
              )}

              {authMode === "login" && (
                <div style={{ textAlign: "right", marginTop: "-8px", marginBottom: "8px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("reset");
                      setAuthError("");
                      setAuthSuccess("");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#7c3aed",
                      fontSize: "14px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {authError && <div className="landingAuthError">{authError}</div>}
              {authSuccess && <div className="landingAuthSuccess">{authSuccess}</div>}

              <button className="landingAuthPrimary" type="submit" disabled={authSubmitting}>
                {authSubmitting
                  ? "Please wait…"
                  : authMode === "reset"
                  ? "Send reset email"
                  : "Continue"}
              </button>

              <button
                type="button"
                className="landingAuthSwitch"
                onClick={() => {
                  setAuthMode((m) => (m === "signup" ? "login" : "signup"));
                  setAuthError("");
                  setAuthSuccess("");
                }}
                disabled={authSubmitting}
              >
                {authMode === "signup"
                  ? "Already have an account? Sign in"
                  : authMode === "reset"
                  ? "Back to sign in"
                  : "New here? Create an account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="landingHero">
        <div className="landingHeroContent">
          <div className="landingHeroText">
            <h1 className="landingHeroTitle">
              Transform Your Hiring with
              <span className="landingGradientText"> AI-Powered</span> Recruitment
            </h1>
            <p className="landingHeroSubtitle">
              Find, screen, and shortlist top talent automatically. Our AI analyzes thousands of profiles 
              to match you with the perfect candidates in minutes, not weeks.
            </p>
          </div>
          <div className="landingHeroIllustration">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="landingDemo">
        <div className="landingDemoContent">
          <div className="landingDemoPlaceholder">
            <div className="landingDemoIcon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
            </div>
            <p className="landingDemoText">Demo Video Coming Soon</p>
          </div>
        </div>
      </section>

      {/* Stats Carousel */}
      <StatsCarousel />

      {/* Features Section */}
      <section className="landingFeatures" id="features">
        <div className="landingFeaturesContent">
          <div className="landingSectionHeader">
            <h2 className="landingSectionTitle">Why Choose AI Hiring?</h2>
            <p className="landingSectionSubtitle">
              Streamline your recruitment process with cutting-edge AI technology
            </p>
          </div>

          <div className="landingFeaturesGrid">
            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Zap size={32} />
              </div>
              <h3 className="landingFeatureTitle">Lightning Fast</h3>
              <p className="landingFeatureText">
                Screen thousands of candidates in minutes. Our AI processes profiles 100x faster than manual review.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Target size={32} />
              </div>
              <h3 className="landingFeatureTitle">Precision Matching</h3>
              <p className="landingFeatureText">
                Advanced algorithms match candidates to your job requirements with 95%+ accuracy.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Users size={32} />
              </div>
              <h3 className="landingFeatureTitle">Multi-Platform Search</h3>
              <p className="landingFeatureText">
                Automatically search LinkedIn, Naukri, and other platforms to find the best talent everywhere.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Shield size={32} />
              </div>
              <h3 className="landingFeatureTitle">Bias-Free Screening</h3>
              <p className="landingFeatureText">
                AI-driven evaluation ensures fair, unbiased candidate assessment based purely on qualifications.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <TrendingUp size={32} />
              </div>
              <h3 className="landingFeatureTitle">Real-Time Analytics</h3>
              <p className="landingFeatureText">
                Track your hiring pipeline with comprehensive dashboards and actionable insights.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Sparkles size={32} />
              </div>
              <h3 className="landingFeatureTitle">Smart Automation</h3>
              <p className="landingFeatureText">
                From screening to outreach, automate repetitive tasks and focus on what matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landingCTA">
        <div className="landingCTAContent">
          <h2 className="landingCTATitle">Ready to revolutionize your hiring?</h2>
          <p className="landingCTASubtitle">
            Join companies that are already finding better candidates, faster.
          </p>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Contact Us Section */}
      <section className="landingContact" id="contact">
        <div className="landingContactContent">
          <div className="landingSectionHeader">
            <h2 className="landingSectionTitle">Get In Touch</h2>
            <p className="landingSectionSubtitle">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="landingContactForm">
            {formSubmitted ? (
              <div className="landingFormSuccess">
                <div className="landingSuccessIcon">
                  <Sparkles size={48} />
                </div>
                <h3 className="landingSuccessTitle">Thank you for reaching out!</h3>
                <p className="landingSuccessText">
                  We've received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div className="landingFormGrid">
                  <div className="landingFormField">
                    <label className="landingFormLabel">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="input"
                      value={contactForm.fullName}
                      onChange={handleContactChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="landingFormField">
                    <label className="landingFormLabel">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div className="landingFormField">
                    <label className="landingFormLabel">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="input"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="landingFormField">
                  <label className="landingFormLabel">Note</label>
                  <textarea
                    name="note"
                    className="textarea"
                    value={contactForm.note}
                    onChange={handleContactChange}
                    placeholder="Tell us about your hiring needs..."
                    rows="5"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btnPrimary btnLarge"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Submit"}
                  {!submitting && <Send size={20} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landingFooter">
        <div className="landingFooterContent">
          <div className="landingFooterLeft">
            <div className="landingFooterLogo">
              <Sparkles size={24} />
              <span>AI Hiring</span>
            </div>
            <p className="landingFooterText">
              © 2026 AI Hiring. All rights reserved.
            </p>
          </div>
          <div className="landingFooterRight">
            <p className="landingFooterContact">Contact us:</p>
            <a href="mailto:kathanrshah@gmail.com" className="landingFooterEmail">
              kathanrshah@gmail.com
            </a>
            <a href="mailto:shreyadungrakoti@gmail.com" className="landingFooterEmail">
              shreyadungrakoti@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
