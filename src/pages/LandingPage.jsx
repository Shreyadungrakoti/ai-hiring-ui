import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { ArrowRight, Users, Zap, Target, Shield, TrendingUp, Sparkles } from "lucide-react";

export default function LandingPage() {
  const { auth } = useAuth();
  const nav = useNavigate();

  const handlePortalClick = () => {
    if (auth) {
      nav("/portal/dashboard");
    } else {
      nav("/login");
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
            <button className="btn" onClick={handlePortalClick}>
              {auth ? "My Portal" : "Login"}
            </button>
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
              {auth ? "Go to My Portal" : "Get Started"}
              <ArrowRight size={20} />
            </button>
            <button className="btn btnLarge" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
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
            {auth ? "Go to My Portal" : "Start Free Trial"}
            <ArrowRight size={20} />
          </button>
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
