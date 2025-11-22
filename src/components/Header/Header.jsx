import React from 'react';
import SearchInput from './SearchInput';
import HelpMenu from './HelpMenu';
import ProfileMenu from './ProfileMenu';
import Tooltip from './Tooltip';
import AresLogoDark from '../../assets/header/ares_logo_dark_theme.svg';
import AresLogoLight from '../../assets/header/ares_logo_light_theme.svg';
import './Header.css';

const Header = ({
  userName = "Alexey Dubnyak",
  userPlan = "Flex Cloud Annual",
  theme = "light",
  onSearch = null,
  onProfileMenuItemClick = null,
  onHelpMenuItemClick = null,
  onThemeToggle = null,
  onLogoClick = null
}) => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <img
          src={theme === 'dark' ? AresLogoDark : AresLogoLight}
          alt="ARES kudo"
          className="header__logo-image"
        />
      </div>

      {/* Right Section - Theme Toggle + Help + Profile */}
      <div className="header__right">
        {/* Theme Toggle Button */}
        <div className="header__theme-toggle">
          <Tooltip content={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'} position="bottom">
            <button onClick={onThemeToggle} className="theme-toggle-button">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </Tooltip>
        </div>

        {/* Help Menu */}
        <div className="header__help">
          <Tooltip content="Help & Support" position="bottom">
            <HelpMenu
              onMenuItemClick={onHelpMenuItemClick}
            />
          </Tooltip>
        </div>

        {/* Profile Menu */}
        <div className="header__profile">
          <Tooltip content={`${userName} - ${userPlan}`} position="bottom">
            <ProfileMenu
              userName={userName}
              userPlan={userPlan}
              onMenuItemClick={onProfileMenuItemClick}
            />
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
