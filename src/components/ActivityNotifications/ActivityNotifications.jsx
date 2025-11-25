import React, { useState, useRef, useEffect } from 'react';
import './ActivityNotifications.css';

const ActivityNotifications = ({ activities: initialActivities = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showBalloon, setShowBalloon] = useState(false);
    const [newActivitiesCount, setNewActivitiesCount] = useState(0);
    const [currentBalloonActivity, setCurrentBalloonActivity] = useState(null);
    const [activities, setActivities] = useState(initialActivities);
    const [realTimeNotifications, setRealTimeNotifications] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All Activity');
    const dropdownRef = useRef(null);
    const nextIdRef = useRef(initialActivities.length + 1);

    const filters = ['All Activity', 'Comments', 'Edits', 'Shares'];

    const generateNewActivity = () => {
        const users = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Brown', 'David Wilson', 'Lisa Anderson'];
        const actions = [
            { type: 'comment', action: 'commented on' },
            { type: 'edit', action: 'edited' },
            { type: 'share', action: 'shared' },
            { type: 'edit', action: 'updated' },
            { type: 'comment', action: 'replied to' }
        ];
        const files = ['New building.dwg', 'Floor plan.dwg', 'Elevation view.dwg', 'Section A-A.dwg', 'Site plan.dwg', 'Detail drawing.dwg', 'Structural layout.dwg'];

        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomFile = files[Math.floor(Math.random() * files.length)];

        return {
            id: nextIdRef.current++,
            type: randomAction.type,
            userName: randomUser,
            action: randomAction.action,
            fileName: randomFile,
            timestamp: new Date()
        };
    };

    useEffect(() => {
        const showNewBalloon = () => {
            if (!isOpen) {
                const newActivity = generateNewActivity();
                setActivities(prev => [newActivity, ...prev]);
                if (realTimeNotifications) {
                    setCurrentBalloonActivity(newActivity);
                    setShowBalloon(true);
                    setNewActivitiesCount(prev => prev + 1);
                    setTimeout(() => {
                        setShowBalloon(false);
                        setCurrentBalloonActivity(null);
                    }, 5000);
                }
            }
            const nextDelay = Math.random() * (15000 - 3000) + 3000;
            setTimeout(showNewBalloon, nextDelay);
        };
        const initialDelay = Math.random() * (15000 - 3000) + 3000;
        const timeoutId = setTimeout(showNewBalloon, initialDelay);
        return () => clearTimeout(timeoutId);
    }, [isOpen, realTimeNotifications]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleClick = () => {
        setIsOpen(!isOpen);
        setShowBalloon(false);
        setNewActivitiesCount(0);
    };

    const getFilteredActivities = () => {
        if (activeFilter === 'All Activity') {
            return activities;
        }
        const filterMap = {
            'Comments': 'comment',
            'Edits': 'edit',
            'Shares': 'share'
        };
        return activities.filter(activity => activity.type === filterMap[activeFilter]);
    };

    const filteredActivities = getFilteredActivities();

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'comment':
                return (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 10.5c0 2.59-2.134 4.5-5 4.5a5.942 5.942 0 01-2-.3L4 16l1.1-2.5A4.008 4.008 0 013 10.5C3 7.91 5.134 6 8 6s5 1.91 5 4.5z" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>);
            case 'edit':
                return (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5.5 12.5H3.5V10.5L11.5 2.5Z" stroke="currentColor" strokeWidth="1.5" /></svg>);
            case 'share':
                return (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M6 9l4 2M6 7l4-2" stroke="currentColor" strokeWidth="1.5" /></svg>);
            default:
                return (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
        }
    };

    return (
        <div className="activity-notifications" ref={dropdownRef}>
            <button className={`activity-notifications__button ${newActivitiesCount > 0 ? 'has-new' : ''}`} onClick={handleClick} aria-label="Activity Notifications">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2C8.34315 2 7 3.34315 7 5V5.5C5.34315 5.5 4 6.84315 4 8.5V13L2 15V16H18V15L16 13V8.5C16 6.84315 14.6569 5.5 13 5.5V5C13 3.34315 11.6569 2 10 2Z" fill="white" />
                    <path d="M8.5 16.5C8.5 17.3284 9.17157 18 10 18C10.8284 18 11.5 17.3284 11.5 16.5H8.5Z" fill="white" />
                </svg>
                {newActivitiesCount > 0 && (<span className="activity-notifications__badge">{newActivitiesCount}</span>)}
            </button>
            {showBalloon && !isOpen && currentBalloonActivity && (
                <div className="activity-notifications__balloon">
                    <div className="activity-notifications__balloon-arrow"></div>
                    <div className="activity-notifications__balloon-content">
                        <div className="activity-notifications__balloon-icon">{getActivityIcon(currentBalloonActivity.type)}</div>
                        <div className="activity-notifications__balloon-info">
                            <strong>{currentBalloonActivity.userName}</strong>
                            <p>{currentBalloonActivity.action} {currentBalloonActivity.fileName}</p>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && (
                <div className="activity-notifications__panel">
                    <div className="activity-notifications__panel-arrow"></div>
                    <div className="activity-notifications__panel-header">
                        <div className="activity-notifications__panel-title">
                            <h3>Notifications</h3>
                            <span className="activity-notifications__panel-count">{activities.length} events</span>
                        </div>
                        <label className="activity-notifications__toggle">
                            <input
                                type="checkbox"
                                checked={realTimeNotifications}
                                onChange={(e) => setRealTimeNotifications(e.target.checked)}
                            />
                            <span className="activity-notifications__toggle-label">Real-time notifications</span>
                        </label>
                    </div>
                    <div className="activity-notifications__filters">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`activity-notifications__filter ${activeFilter === filter ? 'activity-notifications__filter--active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="activity-notifications__panel-list">
                        {filteredActivities.length === 0 ? (
                            <div className="activity-notifications__empty">No recent activity</div>
                        ) : (
                            filteredActivities.map((activity) => (
                                <div key={activity.id} className="activity-notifications__item">
                                    <div className="activity-notifications__item-icon">{getActivityIcon(activity.type)}</div>
                                    <div className="activity-notifications__item-content">
                                        <div className="activity-notifications__item-user">{activity.userName}</div>
                                        <div className="activity-notifications__item-action">{activity.action}</div>
                                        <div className="activity-notifications__item-file">{activity.fileName}</div>
                                    </div>
                                    <div className="activity-notifications__item-time">{formatTime(activity.timestamp)}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityNotifications;
