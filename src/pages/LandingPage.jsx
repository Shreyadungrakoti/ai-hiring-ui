import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Users, Zap, Target, Shield, TrendingUp, Sparkles, Send, X, User, ChevronDown, Settings, HelpCircle, Globe, LogOut } from "lucide-react";
import StatsCarousel from "../components/StatsCarousel.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import Logo from "../components/Logo.jsx";

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

  // Chatbot input state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setIsProcessing(true);

    // Add user message to chat
    setChatMessages(prev => [...prev, { type: "user", text: userMessage }]);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add AI response
    const aiResponse = `Thanks for your interest! Our AI can help you find the perfect candidates for: "${userMessage}". ${
      isAuthed 
        ? "Click 'Get Started' to create your first project." 
        : "Sign up now to start using our AI-powered hiring platform!"
    }`;
    
    setChatMessages(prev => [...prev, { type: "ai", text: aiResponse }]);
    setIsProcessing(false);
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
    } else {
      // Go directly to dashboard
      nav("/portal/dashboard");
    }
  };

  const handleSignOut = async () => {
    setMeDropdownOpen(false);
    await logout();
    nav("/");
  };

  const getCtaText = () => {
    if (!isAuthed) return "Get Started";
    return "Dashboard";
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
          <div className="landingLogo" onClick={() => nav("/")} style={{ cursor: 'pointer' }}>
            <Logo size={28} />
            <span>AI Hiring</span>
          </div>
          <div className="landingNavLinks" style={{ gap: '32px' }}>
            <a 
              href="#new-project" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                if (!isAuthed) {
                  setAuthMode("signup");
                  setAuthOpen(true);
                }
                // If authenticated, just stay on landing page - no navigation
              }}
            >
              New Project
            </a>
            <a 
              href="#features" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                // Scroll to features section on landing page
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Features
            </a>
            <a 
              href="#dashboard" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthed) {
                  nav("/portal/dashboard");
                } else {
                  setAuthMode("signup");
                  setAuthOpen(true);
                }
              }}
            >
              Dashboard
            </a>
            <a 
              href="#projects" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthed) {
                  nav("/portal/projects");
                } else {
                  setAuthMode("signup");
                  setAuthOpen(true);
                }
              }}
            >
              Projects
            </a>
            <a 
              href="#candidates" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthed) {
                  nav("/portal/candidates");
                } else {
                  setAuthMode("signup");
                  setAuthOpen(true);
                }
              }}
            >
              Candidates
            </a>
            <a 
              href="#contact" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                // Scroll to footer/contact section
                const footer = document.querySelector('.landingFooter');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth' });
                }
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
              </>
            ) : (
              <>
                <button className="landingGetStartedBtn" onClick={handlePortalClick}>
                  Sign up
                </button>
                <button className="landingLoginBtn" onClick={handleLoginClick}>
                  Log in
                </button>
              </>
            )}
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
                <Logo size={24} />
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
        <div className="landingHeroContent landingHeroContentCentered">
          <div className="landingHeroText">
            <h1 className="landingHeroTitle">
              Hire faster with AI you <span className="landingGradientText">can trust.</span>
            </h1>
            <p className="landingHeroSubtitle">
              End-to-end automation from JD to shortlist.
            </p>
            
            {/* AI Chat Input */}
            <div className="landingChatContainer">
              <form onSubmit={handleChatSubmit} className="landingChatForm">
                <input
                  type="text"
                  className="landingChatInput"
                  placeholder="Describe the role you're hiring for... (e.g., 'Senior React Developer with 5+ years experience')"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isProcessing}
                />
                <button 
                  type="submit" 
                  className="landingChatSubmit"
                  disabled={isProcessing || !chatInput.trim()}
                >
                  {isProcessing ? (
                    <div className="landingChatSpinner" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </form>

              {/* Chat Messages */}
              {chatMessages.length > 0 && (
                <div className="landingChatMessages">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`landingChatMessage ${msg.type === "user" ? "landingChatUser" : "landingChatAI"}`}>
                      <div className="landingChatMessageContent">
                        {msg.type === "ai" && (
                          <div className="landingChatAvatar">
                            <Sparkles size={16} />
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="landingChatMessage landingChatAI">
                      <div className="landingChatMessageContent">
                        <div className="landingChatAvatar">
                          <Sparkles size={16} />
                        </div>
                        <div className="landingChatTyping">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            
            {/* Preview Box */}
            <div className="landingPreviewBox">
              <div className="landingPreviewContent">
                <p className="landingPreviewText">Preview: Your hiring workflow visualized here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase - moved before demo */}
      <ProductShowcase />

      {/* Stats Carousel */}
      <StatsCarousel />

      {/* Demo Video Section */}
      <section className="landingDemo" id="demo">
        <div className="landingDemoContent">
          <div className="landingDemoPlaceholder">
            <div className="landingDemoIcon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
            </div>
            <p className="landingDemoText">See AI Hiring in Action</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landingFeatures" id="features">
        <div className="landingFeaturesContent">
          <div className="landingSectionHeader">
            <h2 className="landingSectionTitle">Why AI Hiring?</h2>
            <p className="landingSectionSubtitle">
              Powerful features for modern recruiters
            </p>
          </div>

          <div className="landingFeaturesGrid">
            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Zap size={32} />
              </div>
              <h3 className="landingFeatureTitle">10x Faster Screening</h3>
              <p className="landingFeatureText">
                Screen thousands in minutes, not weeks.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Target size={32} />
              </div>
              <h3 className="landingFeatureTitle">95% Match Accuracy</h3>
              <p className="landingFeatureText">
                AI finds candidates you'd actually hire.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Users size={32} />
              </div>
              <h3 className="landingFeatureTitle">Multi-Platform Integration</h3>
              <p className="landingFeatureText">
                Tap into millions of profiles instantly.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Shield size={32} />
              </div>
              <h3 className="landingFeatureTitle">Bias-Free Hiring</h3>
              <p className="landingFeatureText">
                Focus on skills, not demographics.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <TrendingUp size={32} />
              </div>
              <h3 className="landingFeatureTitle">Real-Time Insights</h3>
              <p className="landingFeatureText">
                Track every candidate, every metric.
              </p>
            </div>

            <div className="landingFeatureCard">
              <div className="landingFeatureIcon">
                <Sparkles size={32} />
              </div>
              <h3 className="landingFeatureTitle">Smart Automation</h3>
              <p className="landingFeatureText">
                From screening to outreach, fully automated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landingCTA">
        <div className="landingCTAContent">
          <h2 className="landingCTATitle">Start Hiring Smarter Today</h2>
          <p className="landingCTASubtitle">
            Join the AI revolution in recruitment.
          </p>
          <button
            onClick={() => {
              if (isAuthed) {
                if (auth.hasPortal) {
                  nav("/portal/dashboard");
                } else {
                  nav("/create-portal");
                }
              } else {
                setAuthMode("signup");
                setAuthOpen(true);
              }
            }}
            className="btnLarge btnPrimary"
          >
            <Sparkles size={20} />
            Get Started Free
          </button>
        </div>
      </section>

      {/* Product Showcase - removed duplicate */}

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
        <div className="landingFooterMain">
          <div className="landingFooterGrid">
            {/* Company Info */}
            <div className="landingFooterColumn">
              <div className="landingFooterLogo">
                <Logo size={32} />
                <span>AI Hiring</span>
              </div>
              <p className="landingFooterDesc">
                Transform your recruitment with AI-powered screening and matching. 
                Find the perfect candidates faster than ever.
              </p>
            </div>

            {/* Product */}
            <div className="landingFooterColumn">
              <h4 className="landingFooterHeading">Product</h4>
              <ul className="landingFooterLinks">
                <li><a href="#features">Features</a></li>
                <li><a href="#demo">Demo</a></li>
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
                <li><a href="#" onClick={(e) => e.preventDefault()}>Help Center</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Documentation</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Guides</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Community</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Status</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="landingFooterColumn">
              <h4 className="landingFooterHeading">Contact</h4>
              <ul className="landingFooterLinks">
                <li><a href="mailto:kathanrshah@gmail.com">kathanrshah@gmail.com</a></li>
                <li><a href="mailto:shreyadungrakoti@gmail.com">shreyadungrakoti@gmail.com</a></li>
                <li><a href="#contact">Contact Form</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="landingFooterBottom">
          <p className="landingFooterCopyright">© 2026 AI Hiring. All rights reserved.</p>
          <div className="landingFooterLegal">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
