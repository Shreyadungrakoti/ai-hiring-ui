import { useState } from "react";
import { useAuth } from "../state/auth.jsx";
import { useTheme } from "../state/theme.jsx";
import { 
  User, 
  MapPin, 
  Shield, 
  Eye, 
  Lock, 
  Bell, 
  Globe, 
  Monitor,
  ChevronRight,
  Mail,
  Phone,
  Key,
  Smartphone,
  Settings as SettingsIcon
} from "lucide-react";

export default function Settings() {
  const { auth } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("account");
  const [language, setLanguage] = useState("English");
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese", 
    "Korean", "Portuguese", "Italian", "Dutch", "Russian", "Arabic"
  ];

  const sections = [
    { id: "account", label: "Account preferences", icon: User },
    { id: "signin", label: "Sign in & security", icon: Shield },
    { id: "visibility", label: "Visibility", icon: Eye },
    { id: "privacy", label: "Data privacy", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const renderAccountSection = () => (
    <div className="settingsSection">
      <h2 className="settingsSectionTitle">Profile information</h2>
      
      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Name, location, and industry</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Personal demographic information</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Verifications</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <h2 className="settingsSectionTitle" style={{ marginTop: "32px" }}>Display</h2>
      
      <div className="settingsCard" onClick={toggleTheme}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Dark mode</div>
        </div>
        <div className="settingsCardValue">{theme === "dark" ? "On" : "Off"}</div>
      </div>

      <h2 className="settingsSectionTitle" style={{ marginTop: "32px" }}>General preferences</h2>
      
      <div className="settingsCard" onClick={() => setShowLanguageModal(true)}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Language</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="settingsCardValue">{language}</span>
          <ChevronRight size={20} color="#6b7280" />
        </div>
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Content language</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Autoplay videos</div>
        </div>
        <div className="settingsCardValue">On</div>
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Email notifications</div>
        </div>
        <div className="settingsCardValue">On</div>
      </div>
    </div>
  );

  const renderSignInSection = () => (
    <div className="settingsSection">
      <h2 className="settingsSectionTitle">Account access</h2>
      
      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <Mail size={18} color="#6b7280" />
          <div className="settingsCardLabel">Email addresses</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="settingsCardValue" style={{ fontSize: "14px", color: "#9ca3af" }}>
            {auth.email || "Not set"}
          </span>
          <ChevronRight size={20} color="#6b7280" />
        </div>
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <Phone size={18} color="#6b7280" />
          <div className="settingsCardLabel">Phone numbers</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <Key size={18} color="#6b7280" />
          <div className="settingsCardLabel">Change password</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <Key size={18} color="#6b7280" />
          <div className="settingsCardLabel">Passkeys</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <Monitor size={18} color="#6b7280" />
          <div className="settingsCardLabel">Where you're signed in</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <Smartphone size={18} color="#6b7280" />
          <div className="settingsCardLabel">Devices that remember your password</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <Shield size={18} color="#6b7280" />
          <div className="settingsCardLabel">Two-factor authentication</div>
        </div>
        <div className="settingsCardValue">Off</div>
      </div>
    </div>
  );

  const renderVisibilitySection = () => (
    <div className="settingsSection">
      <h2 className="settingsSectionTitle">Visibility</h2>
      <p className="settingsDescription">
        Control who can see your activity and profile information.
      </p>
      
      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Profile viewing options</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Edit your public profile</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="settingsSection">
      <h2 className="settingsSectionTitle">Data privacy</h2>
      <p className="settingsDescription">
        Control how your data is used and manage your data requests.
      </p>
      
      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">How AI Hiring uses your data</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Download your data</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Delete your account</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="settingsSection">
      <h2 className="settingsSectionTitle">Notifications</h2>
      <p className="settingsDescription">
        Choose how you want to be notified about activity.
      </p>
      
      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">On AI Hiring</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Email</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>

      <div className="settingsCard" onClick={() => {}}>
        <div className="settingsCardContent">
          <div className="settingsCardLabel">Push notifications</div>
        </div>
        <ChevronRight size={20} color="#6b7280" />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return renderAccountSection();
      case "signin":
        return renderSignInSection();
      case "visibility":
        return renderVisibilitySection();
      case "privacy":
        return renderPrivacySection();
      case "notifications":
        return renderNotificationsSection();
      default:
        return renderAccountSection();
    }
  };

  return (
    <div className="settingsPage">
      <div className="settingsContainer">
        <div className="settingsSidebar">
          <div className="settingsHeader">
            <SettingsIcon size={24} />
            <h1 className="settingsTitle">Settings</h1>
          </div>
          
          <div className="settingsNav">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`settingsNavItem ${activeSection === section.id ? "settingsNavItemActive" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon size={20} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="settingsContent">
          {renderContent()}
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="modal-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="modal-content settingsModal" onClick={(e) => e.stopPropagation()}>
            <div className="settingsModalHeader">
              <h2>Select Language</h2>
              <button className="settingsModalClose" onClick={() => setShowLanguageModal(false)}>
                ×
              </button>
            </div>
            <div className="settingsModalBody">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`settingsLanguageOption ${language === lang ? "settingsLanguageOptionActive" : ""}`}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                >
                  <Globe size={18} />
                  <span>{lang}</span>
                  {language === lang && <span className="settingsLanguageCheck">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
