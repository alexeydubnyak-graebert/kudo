import React, { useState, useRef, useEffect } from 'react';
import './FileCardAvatars.css';

const FileCardAvatars = ({ viewers = [], onDropdownChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState('down');
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleDropdownToggle = () => {
        const newState = !showDropdown;
        setShowDropdown(newState);
        if (onDropdownChange) {
            onDropdownChange(newState);
        }
    };

    const closeDropdown = () => {
        setShowDropdown(false);
        if (onDropdownChange) {
            onDropdownChange(false);
        }
    };

    // Show first viewer, hide rest
    const visibleViewer = viewers[0];
    const hiddenViewersCount = viewers.length - 1;

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    // Handle dropdown positioning
    useEffect(() => {
        if (showDropdown && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownHeight = 200;

            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                setDropdownPosition('up');
            } else {
                setDropdownPosition('down');
            }
        }
    }, [showDropdown]);

    if (viewers.length === 0) return null;

    return (
        <div className="card-user-avatars">
            {/* First viewer avatar */}
            <div className="card-avatar-wrapper" title={`${visibleViewer.name}\n${visibleViewer.email}`}>
                <div
                    className="card-avatar"
                    style={{ backgroundColor: visibleViewer.color }}
                >
                    <span className="card-avatar-initials">{visibleViewer.initials}</span>
                </div>
            </div>

            {/* Status icon */}
            <div className="card-user-status-icon">
                {visibleViewer.status === 'editing' ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M8.5 1.5L10.5 3.5L4.5 9.5H2.5V7.5L8.5 1.5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6C1 6 2.5 3 6 3C9.5 3 11 6 11 6C11 6 9.5 9 6 9C2.5 9 1 6 1 6Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1" />
                    </svg>
                )}
            </div>

            {/* More users button */}
            {hiddenViewersCount > 0 && (
                <div className="card-more-users-container" ref={buttonRef}>
                    <button
                        className="card-more-users-button"
                        onClick={handleDropdownToggle}
                    >
                        <span className="card-more-users-count">+{hiddenViewersCount}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={showDropdown ? 'rotated' : ''}>
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {showDropdown && (
                        <div ref={dropdownRef} className={`card-user-list-dropdown card-user-list-dropdown-${dropdownPosition}`}>
                            {viewers.map((viewer) => (
                                <div key={viewer.id} className="card-user-list-item">
                                    <div
                                        className="card-user-list-avatar"
                                        style={{ backgroundColor: viewer.color }}
                                    >
                                        <span className="card-user-list-initials">{viewer.initials}</span>
                                    </div>
                                    <div className="card-user-list-info">
                                        <div className="card-user-list-name">{viewer.name}</div>
                                        <div className="card-user-list-email">{viewer.email}</div>
                                        <div className="card-user-list-meta">
                                            <span className="card-user-list-status">
                                                {viewer.status === 'editing' ? 'Editing' : 'Viewing'}
                                            </span>
                                            <span className="card-user-list-timestamp">• {viewer.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileCardAvatars;
