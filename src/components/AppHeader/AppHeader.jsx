import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppHeader.css';
import UserAvatars from '../UserAvatars/UserAvatars';
import ActivityNotifications from '../ActivityNotifications/ActivityNotifications';
import HelpMenu from '../HelpMenu/HelpMenu';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Logo from '../../assets/header/ares_logo_dark_theme.svg';
import HeaderLeftImage from '../../assets/editor/screenshots/app-header-left.png';

// Mock data for viewers
const mockViewers = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        initials: 'JS',
        color: '#4A90E2',
        status: 'editing',
        timestamp: '2 min ago'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        initials: 'SJ',
        color: '#E24A90',
        status: 'viewing',
        timestamp: 'Active now'
    },
    {
        id: 3,
        name: 'Mike Davis',
        email: 'mike.d@example.com',
        initials: 'MD',
        color: '#90E24A',
        status: 'viewing',
        timestamp: '5 min ago'
    }
];

// Mock data for activities
const mockActivities = [
    {
        id: 1,
        type: 'comment',
        userName: 'Sarah Johnson',
        action: 'commented on',
        fileName: 'New building.dwg',
        timestamp: new Date(Date.now() - 120000) // 2 min ago
    },
    {
        id: 2,
        type: 'edit',
        userName: 'John Smith',
        action: 'edited',
        fileName: 'Floor plan.dwg',
        timestamp: new Date(Date.now() - 300000) // 5 min ago
    },
    {
        id: 3,
        type: 'share',
        userName: 'Mike Davis',
        action: 'shared',
        fileName: 'Elevation view.dwg',
        timestamp: new Date(Date.now() - 900000) // 15 min ago
    },
    {
        id: 4,
        type: 'edit',
        userName: 'Sarah Johnson',
        action: 'edited',
        fileName: 'Section A-A.dwg',
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    }
];

const AppHeader = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="app-header">
            {/* Left Section - Hamburger, Logo, File Name, Header Image */}
            <div className="app-header__left">
                <button className="app-header__hamburger" aria-label="Menu">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <img
                    src={Logo}
                    alt="ARES Kudo"
                    className="app-header__logo"
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                />
                <span className="app-header__filename">New drawing.dwg</span>
                <img src={HeaderLeftImage} alt="Header Tools" className="app-header__left-image" />
            </div>

            {/* Spacer */}
            <div className="app-header__spacer"></div>

            {/* Right Section - User Avatars, Notifications, Help & Profile Menus */}
            <div className="app-header__right">
                {/* User Avatars */}
                <UserAvatars viewers={mockViewers} />

                {/* Activity Notifications */}
                <ActivityNotifications activities={mockActivities} />

                {/* Help Menu */}
                <div className="app-header__help">
                    <HelpMenu />
                </div>

                {/* Profile Menu */}
                <div className="app-header__profile">
                    <ProfileMenu
                        userName="Alexey Dubnyak"
                        userPlan="Flex Cloud Annual"
                    />
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
