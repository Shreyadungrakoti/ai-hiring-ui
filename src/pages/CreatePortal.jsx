import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Sparkles, ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

export default function CreatePortal() {
  const { auth, createPortal } = useAuth();
  const nav = useNavigate();
  const [creating, setCreating] = useState(false);

  const handleCreatePortal = async () => {
    setCreating(true);
    
    // Simulate portal creation (backend will handle this)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    createPortal();
    nav("/portal/dashboard", { replace: true });
  };

  return (
    <div className="createPortalPage">
      <div className="createPortalContainer">
        <div className="createPortalContent">
          <div className="createPortalIcon">
            <Sparkles size={48} />
          </div>
          
          <h1 className="createPortalTitle">Create Your AI Hiring Portal</h1>
          
          <p className="createPortalSubtitle">
            Set up your personalized recruitment dashboard to start finding top talent with AI.
          </p>

          <div className="createPortalFeatures">
            <div className="createPortalFeature">
              <Zap size={24} />
              <div>
                <div className="createPortalFeatureTitle">Instant Setup</div>
                <div className="createPortalFeatureText">Ready in seconds</div>
              </div>
            </div>
            
            <div className="createPortalFeature">
              <Target size={24} />
              <div>
                <div className="createPortalFeatureTitle">AI-Powered</div>
                <div className="createPortalFeatureText">Smart candidate matching</div>
              </div>
            </div>
            
            <div className="createPortalFeature">
              <TrendingUp size={24} />
              <div>
                <div className="createPortalFeatureTitle">Analytics</div>
                <div className="createPortalFeatureText">Track your hiring pipeline</div>
              </div>
            </div>
          </div>

          <button 
            className="btn btnPrimary btnLarge" 
            onClick={handleCreatePortal}
            disabled={creating}
          >
            {creating ? "Creating your portal..." : "Create My Portal"}
            {!creating && <ArrowRight size={20} />}
          </button>

          <button 
            className="btn" 
            onClick={() => nav("/")}
            disabled={creating}
          >
            Maybe Later
          </button>

          <div className="createPortalNote">
            Logged in as: <strong>{auth?.user?.email}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
