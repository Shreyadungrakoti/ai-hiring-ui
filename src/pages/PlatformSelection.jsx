import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Linkedin, ChevronRight, CheckCircle2, Shield, Zap } from "lucide-react";

export default function PlatformSelection() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const platforms = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0A66C2",
      description: "Access millions of professional profiles",
      features: [
        "Search profiles by job title, skills, location",
        "View complete professional experience",
        "Send InMails to potential candidates",
        "Real-time profile analysis"
      ]
    }
    // More platforms can be added here later
  ];

  const handleConnect = async (platformId) => {
    setSelectedPlatform(platformId);
    setConnecting(true);

    // Simulate connection process (will be replaced with actual OAuth later)
    setTimeout(() => {
      // Store platform preference
      localStorage.setItem(`platform_${auth.user.uid}`, platformId);
      
      // Navigate to portal
      navigate("/portal/dashboard");
    }, 1500);
  };

  return (
    <div className="platformSelectionPage">
      <div className="platformSelectionContainer">
        {/* Header */}
        <div className="platformSelectionHeader">
          <div className="platformSelectionHeaderIcon">
            <Zap size={32} />
          </div>
          <h1 className="platformSelectionTitle">Connect Your Job Platform</h1>
          <p className="platformSelectionSubtitle">
            Connect to a job platform to start finding and screening candidates with AI
          </p>
        </div>

        {/* Platform Cards */}
        <div className="platformSelectionGrid">
          {platforms.map((platform) => {
            const PlatformIcon = platform.icon;
            const isSelected = selectedPlatform === platform.id;
            const isConnecting = connecting && isSelected;

            return (
              <div
                key={platform.id}
                className={`platformCard ${isSelected ? "platformCardSelected" : ""}`}
              >
                {/* Platform Header */}
                <div className="platformCardHeader">
                  <div
                    className="platformCardIcon"
                    style={{ background: `${platform.color}15` }}
                  >
                    <PlatformIcon size={32} style={{ color: platform.color }} />
                  </div>
                  <div className="platformCardHeaderText">
                    <h3 className="platformCardTitle">{platform.name}</h3>
                    <p className="platformCardDescription">{platform.description}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="platformCardFeatures">
                  <h4 className="platformCardFeaturesTitle">What you can do:</h4>
                  <ul className="platformCardFeaturesList">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="platformCardFeatureItem">
                        <CheckCircle2 size={16} style={{ color: "#10b981" }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security Notice */}
                <div className="platformCardSecurity">
                  <Shield size={14} />
                  <span>Secure OAuth 2.0 authentication</span>
                </div>

                {/* Connect Button */}
                <button
                  className="platformCardButton"
                  onClick={() => handleConnect(platform.id)}
                  disabled={connecting}
                  style={{
                    background: isConnecting
                      ? `${platform.color}80`
                      : platform.color,
                  }}
                >
                  {isConnecting ? (
                    <>
                      <div className="platformCardButtonSpinner" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <span>Connect {platform.name}</span>
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Skip Option */}
        <div className="platformSelectionFooter">
          <button
            className="btn"
            onClick={() => navigate("/portal/dashboard")}
            disabled={connecting}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
