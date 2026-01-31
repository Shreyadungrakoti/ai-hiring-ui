import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../state/theme.jsx";
import { 
  Globe, 
  Monitor,
  Bell,
  Sun,
  Moon,
  ChevronLeft,
  Check
} from "lucide-react";

export default function WebsiteSettings() {
  const nav = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese", 
    "Korean", "Portuguese", "Italian", "Dutch", "Russian", "Arabic"
  ];

  return (
    <div className="websiteSettingsPage">
      <div className="websiteSettingsContainer">
        <div className="websiteSettingsHeader">
          <button className="websiteSettingsBack" onClick={() => nav("/")}>
            <ChevronLeft size={24} />
          </button>
          <h1 className="websiteSettingsTitle">Website Settings</h1>
        </div>

        <div className="websiteSettingsContent">
          {/* Display Section */}
          <div className="websiteSettingsSection">
            <h2 className="websiteSettingsSectionTitle">Display</h2>
            <p className="websiteSettingsSectionDesc">Customize how the website looks</p>
            
            <div className="websiteSettingsCard" onClick={toggleTheme}>
              <div className="websiteSettingsCardLeft">
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                <div>
                  <div className="websiteSettingsCardTitle">Theme</div>
                  <div className="websiteSettingsCardDesc">Choose your preferred theme</div>
                </div>
              </div>
              <div className="websiteSettingsCardRight">
                <span className="websiteSettingsBadge">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className="websiteSettingsSection">
            <h2 className="websiteSettingsSectionTitle">Language</h2>
            <p className="websiteSettingsSectionDesc">Set your preferred language</p>
            
            <div className="websiteSettingsCard" onClick={() => setShowLanguageModal(true)}>
              <div className="websiteSettingsCardLeft">
                <Globe size={20} />
                <div>
                  <div className="websiteSettingsCardTitle">Display Language</div>
                  <div className="websiteSettingsCardDesc">Select the language for the website</div>
                </div>
              </div>
              <div className="websiteSettingsCardRight">
                <span className="websiteSettingsBadge">{language}</span>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="websiteSettingsSection">
            <h2 className="websiteSettingsSectionTitle">Notifications</h2>
            <p className="websiteSettingsSectionDesc">Manage your notification preferences</p>
            
            <div className="websiteSettingsCard" onClick={() => setNotifications(!notifications)}>
              <div className="websiteSettingsCardLeft">
                <Bell size={20} />
                <div>
                  <div className="websiteSettingsCardTitle">Website Notifications</div>
                  <div className="websiteSettingsCardDesc">Receive updates and announcements</div>
                </div>
              </div>
              <div className="websiteSettingsCardRight">
                <div className={`websiteSettingsToggle ${notifications ? "websiteSettingsToggleActive" : ""}`}>
                  <div className="websiteSettingsToggleThumb" />
                </div>
              </div>
            </div>

            <div className="websiteSettingsCard" onClick={() => {}}>
              <div className="websiteSettingsCardLeft">
                <Bell size={20} />
                <div>
                  <div className="websiteSettingsCardTitle">Marketing Emails</div>
                  <div className="websiteSettingsCardDesc">Product updates and news</div>
                </div>
              </div>
              <div className="websiteSettingsCardRight">
                <div className="websiteSettingsToggle">
                  <div className="websiteSettingsToggleThumb" />
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="websiteSettingsSection">
            <h2 className="websiteSettingsSectionTitle">Accessibility</h2>
            <p className="websiteSettingsSectionDesc">Adjust settings for better accessibility</p>
            
            <div className="websiteSettingsCard" onClick={() => {}}>
              <div className="websiteSettingsCardLeft">
                <Monitor size={20} />
                <div>
                  <div className="websiteSettingsCardTitle">Reduce Animations</div>
                  <div className="websiteSettingsCardDesc">Minimize motion effects</div>
                </div>
              </div>
              <div className="websiteSettingsCardRight">
                <div className="websiteSettingsToggle">
                  <div className="websiteSettingsToggleThumb" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="landingAuthOverlay" onClick={() => setShowLanguageModal(false)}>
          <div className="websiteSettingsModal" onClick={(e) => e.stopPropagation()}>
            <div className="websiteSettingsModalHeader">
              <h2>Select Language</h2>
              <button className="websiteSettingsModalClose" onClick={() => setShowLanguageModal(false)}>
                ×
              </button>
            </div>
            <div className="websiteSettingsModalBody">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`websiteSettingsLanguageOption ${language === lang ? "websiteSettingsLanguageActive" : ""}`}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                >
                  <Globe size={18} />
                  <span>{lang}</span>
                  {language === lang && <Check size={18} className="websiteSettingsLanguageCheck" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
