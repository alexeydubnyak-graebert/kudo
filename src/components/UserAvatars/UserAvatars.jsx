import React, { useState, useEffect, useRef } from 'react';
import './UserAvatars.css';

const UserAvatars = ({ viewers = [] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const allUsers = viewers;
  const maxVisibleUsers = 3;
  const visibleUsers = allUsers.slice(0, maxVisibleUsers);
  const hasMoreUsers = allUsers.length > maxVisibleUsers;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const renderUserAvatar = (user, showDetails = false) => (
    <div
      key={user.id}
      className={showDetails ? "user-list-item" : "avatar-wrapper"}
      title={!showDetails ? `${user.name}\n${user.email}\n${user.timestamp || 'Active now'}` : undefined}
    >
      <div
        className="avatar"
        style={{ backgroundColor: user.color }}
      >
        <span className="avatar-initials">{user.initials}</span>
      </div>
      <div className={`avatar-badge ${user.status}`}>
        {user.status === 'editing' ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 1.5L12.5 3.5L4.5 11.5H2.5V9.5L10.5 1.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7C1 7 3 3 7 3C11 3 13 7 13 7C13 7 11 11 7 11C3 11 1 7 1 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="7" r="2" stroke="white" strokeWidth="1.5" />
          </svg>
        )}
      </div>
      {showDetails && (
        <div className="user-details">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
          <div className="user-time">
            {user.timestamp || 'Active now'}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="user-avatars" ref={dropdownRef}>
      {visibleUsers.map((user) => renderUserAvatar(user))}

      {hasMoreUsers && (
        <button
          className="more-users-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="more-users-count">+{allUsers.length - maxVisibleUsers}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {showDropdown && (
        <div className="users-dropdown">
          <div className="users-dropdown-header">
            Viewing this file ({allUsers.length})
          </div>
          <div className="users-dropdown-list">
            {allUsers.map((user) => renderUserAvatar(user, true))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatars;
