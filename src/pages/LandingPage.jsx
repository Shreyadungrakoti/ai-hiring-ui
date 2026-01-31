import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Users, Zap, Target, Shield, TrendingUp, Sparkles, Send, X, User, ChevronDown, Settings, HelpCircle, Globe, LogOut } from "lucide-react";
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

  // Demo call popup state
  const [demoCallOpen, setDemoCallOpen] = useState(false);
  const [demoCallForm, setDemoCallForm] = useState({ name: "", phone: "", purpose: "" });

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
    // Show auth modal after logout
    setTimeout(() => {
      setAuthMode("login");
      setAuthOpen(true);
    }, 100);
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
            <Logo size={44} />
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
              href="/features" 
              className="landingNavLink"
              onClick={(e) => {
                e.preventDefault();
                nav("/features");
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
              Hire faster with AI<br /><span style={{ color: '#4A7FE0' }}>you can trust.</span>
            </h1>
            <p className="landingHeroSubtitle">
              End-to-end automation from JD to shortlist.
            </p>
            
            {/* Main Content with Side Panel */}
            <div className="landingHeroMainContent">
              {/* Left Side - Chat and Preview */}
              <div className="landingHeroLeftContent">
                {/* AI Chat Input */}
                <div className="landingChatContainer">
                  <form onSubmit={handleChatSubmit} className="landingChatForm">
                    <input
                      type="text"
                      className="landingChatInput"
                      placeholder="Describe the role..."
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
                    {/* Reasoning Section */}
                    <div className="previewReasoning">
                      <h4 className="previewReasoningTitle">AI Reasoning</h4>
                      <p className="previewReasoningText">
                        Analyzing candidate profiles based on job requirements: Senior Data Scientist with 7+ years experience, 
                        strong ML background, and proven track record in production systems. Evaluating technical skills, 
                        experience level, education, and cultural fit...
                      </p>
                    </div>

                    {/* Candidates Results */}
                    <div className="previewResults">
                      <h4 className="previewResultsTitle">Top Candidates</h4>
                      <div className="previewCandidatesList">
                        <button 
                          className="previewCandidateItem"
                          onClick={() => nav("/portal/candidates")}
                        >
                          <div className="previewCandidateInfo">
                            <span className="previewCandidateName">John Smith</span>
                            <span className="previewCandidateExp">10 years experience</span>
                          </div>
                          <span className="previewCandidateScore">9.2</span>
                        </button>

                        <button 
                          className="previewCandidateItem"
                          onClick={() => nav("/portal/candidates")}
                        >
                          <div className="previewCandidateInfo">
                            <span className="previewCandidateName">Bob Williams</span>
                            <span className="previewCandidateExp">8 years experience</span>
                          </div>
                          <span className="previewCandidateScore">8.9</span>
                        </button>

                        <button 
                          className="previewCandidateItem"
                          onClick={() => nav("/portal/candidates")}
                        >
                          <div className="previewCandidateInfo">
                            <span className="previewCandidateName">Jane Doe</span>
                            <span className="previewCandidateExp">7 years experience</span>
                          </div>
                          <span className="previewCandidateScore">8.6</span>
                        </button>

                        <button 
                          className="previewCandidateItem"
                          onClick={() => nav("/portal/candidates")}
                        >
                          <div className="previewCandidateInfo">
                            <span className="previewCandidateName">Alice Johnson</span>
                            <span className="previewCandidateExp">5 years experience</span>
                          </div>
                          <span className="previewCandidateScore">7.8</span>
                        </button>

                        <button 
                          className="previewCandidateItem"
                          onClick={() => nav("/portal/candidates")}
                        >
                          <div className="previewCandidateInfo">
                            <span className="previewCandidateName">Carol Martinez</span>
                            <span className="previewCandidateExp">3 years experience</span>
                          </div>
                          <span className="previewCandidateScore">7.5</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Call Assistant Box */}
                <div className="landingCallAssistantBox">
                  <div className="landingSideBoxContent">
                    <div className="sideBoxHeader">
                      <h4 className="sideBoxTitle">AI Call Assistant</h4>
                      <p className="sideBoxDescription">Automate candidate outreach with AI</p>
                    </div>
                    
                    <div className="sideBoxForm">
                      <div className="sideBoxFormGroup">
                        <label className="sideBoxLabel">Candidate Name</label>
                        <input 
                          type="text" 
                          className="sideBoxInput sideBoxSearchInput" 
                          placeholder="Enter or search..."
                          list="candidateList"
                        />
                        <datalist id="candidateList">
                          <option value="John Smith" />
                          <option value="Bob Williams" />
                          <option value="Jane Doe" />
                          <option value="Alice Johnson" />
                          <option value="Carol Martinez" />
                        </datalist>
                      </div>

                      <div className="sideBoxFormGroup">
                        <label className="sideBoxLabel">Phone Number</label>
                        <input 
                          type="tel" 
                          className="sideBoxInput" 
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div className="sideBoxFormGroup">
                        <label className="sideBoxLabel">Purpose</label>
                        <select className="sideBoxSelect">
                          <option value="">Select...</option>
                          <option value="screening">Initial Screening</option>
                          <option value="technical">Technical Interview</option>
                          <option value="followup">Follow-up</option>
                          <option value="offer">Job Offer</option>
                        </select>
                      </div>

                      <div className="sideBoxDivider"></div>

                      <button className="sideBoxCallButton sideBoxCallButtonPrimary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Start AI Call
                      </button>

                      <button 
                        className="sideBoxCallButton sideBoxCallButtonDemo"
                        onClick={() => setDemoCallOpen(true)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        Try Demo Call
                      </button>

                      <div className="sideBoxStatus">
                        <div className="sideBoxStatusDot"></div>
                        <span className="sideBoxStatusText">AI Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="landingDemo" id="demo">
        <div className="landingDemoContent">
          <h2 className="landingSectionTitle" style={{ textAlign: 'center', marginBottom: '8px' }}>AI Hiring in Action</h2>
          <p className="landingSectionSubtitle" style={{ textAlign: 'center', marginBottom: '32px' }}>
            Watch how our AI transforms your hiring process
          </p>
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
                      placeholder="Your name"
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
                      placeholder="Your email"
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
                      placeholder="Your phone number"
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
                    placeholder="Your message"
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
                <li><a href="/features" onClick={(e) => { e.preventDefault(); nav("/features"); }}>Features</a></li>
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

      {/* Demo Call Popup */}
      {demoCallOpen && (
        <div className="modalOverlay" onClick={() => setDemoCallOpen(false)}>
          <div className="demoCallModal" onClick={(e) => e.stopPropagation()}>
            <div className="demoCallHeader">
              <h3 className="demoCallTitle">Demo Call</h3>
              <button 
                className="demoCallClose"
                onClick={() => setDemoCallOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <p className="demoCallDescription">
              Test our AI calling agent with a demo call. No real call will be made.
            </p>

            <div className="demoCallForm">
              <div className="demoCallFormGroup">
                <label className="demoCallLabel">Name</label>
                <input
                  type="text"
                  className="demoCallInput"
                  placeholder="Enter candidate name"
                  value={demoCallForm.name}
                  onChange={(e) => setDemoCallForm({ ...demoCallForm, name: e.target.value })}
                />
              </div>

              <div className="demoCallFormGroup">
                <label className="demoCallLabel">Phone Number</label>
                <input
                  type="tel"
                  className="demoCallInput"
                  placeholder="+1 (555) 000-0000"
                  value={demoCallForm.phone}
                  onChange={(e) => setDemoCallForm({ ...demoCallForm, phone: e.target.value })}
                />
              </div>

              <div className="demoCallFormGroup">
                <label className="demoCallLabel">Purpose</label>
                <select 
                  className="demoCallSelect"
                  value={demoCallForm.purpose}
                  onChange={(e) => setDemoCallForm({ ...demoCallForm, purpose: e.target.value })}
                >
                  <option value="">Select purpose...</option>
                  <option value="screening">Initial Screening</option>
                  <option value="technical">Technical Interview</option>
                  <option value="followup">Follow-up Call</option>
                  <option value="offer">Job Offer</option>
                </select>
              </div>

              <div className="demoCallActions">
                <button 
                  className="btn btnSecondary"
                  onClick={() => setDemoCallOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btnPrimary demoCallStartBtn"
                  onClick={() => {
                    console.log('Starting demo call:', demoCallForm);
                    // Handle demo call logic here
                    setDemoCallOpen(false);
                    setDemoCallForm({ name: "", phone: "", purpose: "" });
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                  Start Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
