import { useNavigate } from "react-router-dom";
import { Zap, Target, Users, Shield, TrendingUp, Sparkles } from "lucide-react";

export default function Features() {
  const nav = useNavigate();

  return (
    <div className="featuresPage">
      {/* Header Section */}
      <section className="featuresHero">
        <div className="featuresHeroContent">
          <h1 className="featuresHeroTitle">Features</h1>
          <p className="featuresHeroSubtitle">
            Powerful tools to streamline your hiring process
          </p>
        </div>
      </section>

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
