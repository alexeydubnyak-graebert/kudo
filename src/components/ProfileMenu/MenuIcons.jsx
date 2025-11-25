// Импорт иконок из обновленных SVG файлов 20×20px
import ProfileSvg from '../../assets/profile-menu/type=my profile.svg?react';
import CompanySvg from '../../assets/profile-menu/type=company.svg?react';
import WebGLSvg from '../../assets/profile-menu/type=web gl test.svg?react';
import LogoutSvg from '../../assets/profile-menu/type=logout.svg?react';
import SettingsIconSvg from '../../assets/side-bar/settings.svg';

// Для dropdown стрелки используем простую SVG
const DropdownSvg = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.1 8L9.9 12.5L13.9 8L13.4 7.5L9.9 11.4L6.7 7.5L6.1 8Z" fill="currentColor" />
    </svg>
);

// Иконка Settings как компонент
export const SettingsIcon = () => (
    <img src={SettingsIconSvg} alt="Settings" width="16" height="16" />
);

// Экспорт иконок 20×20px из обновленных файлов
export const ProfileIcon = () => <ProfileSvg />;
export const CompanyIcon = () => <CompanySvg />;
export const WebGLIcon = () => <WebGLSvg />;
export const LogoutIcon = () => <LogoutSvg />;
export const DropdownIcon = () => <DropdownSvg />;
