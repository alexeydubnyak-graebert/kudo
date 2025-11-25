import React, { useState, useRef, useEffect } from 'react';
import './ProfileMenu.css';
import MenuItem from './MenuItem';
import './MenuItem.css';
import {
    ProfileIcon,
    CompanyIcon,
    WebGLIcon,
    LogoutIcon,
    DropdownIcon,
    SettingsIcon
} from './MenuIcons';

// Данные пунктов меню
const menuItems = [
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'company', label: 'My company', icon: CompanyIcon },
    { id: 'webgl', label: 'WebGL Test', icon: WebGLIcon },
    { id: 'logout', label: 'Logout', icon: LogoutIcon }
];

export default function ProfileMenu({
    state = "standard",
    userName = "Alexey Dubnyak",
    userPlan = "Flex Cloud Annual",
    onStateChange = null,
    onMenuItemClick = null
}) {
    const [currentState, setCurrentState] = useState(state);
    const [isOpen, setIsOpen] = useState(state === "active");
    const menuRef = useRef(null);

    useEffect(() => {
        setCurrentState(state);
        setIsOpen(state === "active");
    }, [state]);

    // Обработчик клика вне компонента для закрытия меню
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (currentState === "active") {
                    setCurrentState("standard");
                    setIsOpen(false);
                    onStateChange && onStateChange("standard");
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [currentState, onStateChange]);

    const handleMouseEnter = () => {
        if (currentState === "standard") {
            setCurrentState("hover");
            onStateChange && onStateChange("hover");
        }
    };

    const handleMouseLeave = () => {
        if (currentState === "hover") {
            setCurrentState("standard");
            onStateChange && onStateChange("standard");
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (currentState === "active") {
            setCurrentState("standard");
            setIsOpen(false);
            onStateChange && onStateChange("standard");
        } else {
            setCurrentState("active");
            setIsOpen(true);
            onStateChange && onStateChange("active");
        }
    };

    const handleMenuItemClick = (item) => {
        onMenuItemClick && onMenuItemClick(item);

        // Закрываем меню после клика на пункт
        setCurrentState("standard");
        setIsOpen(false);
        onStateChange && onStateChange("standard");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && currentState === "active") {
            setCurrentState("standard");
            setIsOpen(false);
            onStateChange && onStateChange("standard");
        }
    };

    // Формируем CSS классы для состояний
    const containerClasses = [
        'profile-menu',
        `profile-menu--${currentState}`
    ].join(' ');

    return (
        <div ref={menuRef} className="profile-menu-wrapper">
            <button
                className={containerClasses}
                data-name={`state=${currentState}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                aria-label={`User menu for ${userName}`}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {/* Текстовый блок с информацией о пользователе */}
                <div className="profile-menu__user-info">
                    <p className="profile-menu__user-name" title={userName}>
                        {userName}
                    </p>
                    <p className="profile-menu__user-plan" title={userPlan}>
                        {userPlan}
                    </p>
                </div>

                {/* Иконки профиля и стрелки - прижаты к правой стороне */}
                <div className="profile-menu__icons">
                    <div className="profile-menu__profile-icon profile-menu__icon" aria-hidden="true">
                        <ProfileIcon />
                    </div>
                    <div className="profile-menu__dropdown-icon profile-menu__icon" aria-hidden="true">
                        <DropdownIcon />
                    </div>
                </div>

                {/* Выпадающее меню */}
                {isOpen && (
                    <div
                        className="profile-menu__dropdown"
                        role="menu"
                        aria-label="User menu options"
                    >
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                badge={item.badge}
                                onClick={() => handleMenuItemClick(item)}
                            />
                        ))}
                    </div>
                )}
            </button>
        </div>
    );
}
