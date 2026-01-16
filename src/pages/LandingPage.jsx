import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { ArrowRight, Users, Zap, Target, Shield, TrendingUp, Sparkles, Send } from "lucide-react";

export default function LandingPage() {
  const { auth } = useAuth();
  const nav = useNavigate();

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
    // Go to login page
    nav("/login");
  };

  const handlePortalClick = () => {
    if (!auth) {
      // Not logged in → go to signup
      nav("/login?mode=signup");
    } else if (!auth.hasPortal) {
      // Logged in but no portal → go to create portal
      nav("/create-portal");
    } else {
      // Has portal → go to dashboard
      nav("/portal/dashboard");
    }
  };

  const getPortalButtonText = () => {
    if (!auth.hasPortal) return "Create Portal";
    return "My Portal";
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
            {!auth ? (
              <button className="landingGetStartedBtn" onClick={handleLoginClick}>
                Login
              </button>
            ) : (
              <button className="landingGetStartedBtn" onClick={handlePortalClick}>
                {getPortalButtonText()}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landingHero">
        <div className="landingHeroContent">
          <h1 className="landingHeroTitle">
            Transform Your Hiring with
            <span className="landingGradientText"> AI-Powered</span> Recruitment
          </h1>
          <p className="landingHeroSubtitle">
            Find, screen, and shortlist top talent automatically. Our AI analyzes thousands of profiles 
            to match you with the perfect candidates in minutes, not weeks.
          </p>
          <div className="landingHeroCTA">
            <button className="btn btnPrimary btnLarge" onClick={handlePortalClick}>
              {!auth ? "Get Started" : getPortalButtonText()}
              <ArrowRight size={20} />
            </button>
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
          <button className="btn btnPrimary btnLarge" onClick={handlePortalClick}>
            {!auth ? "Get Started" : getPortalButtonText()}
            <ArrowRight size={20} />
          </button>
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
          <div className="landingFooterLogo">
            <Sparkles size={24} />
            <span>AI Hiring</span>
          </div>
          <p className="landingFooterText">
            © 2026 AI Hiring. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
