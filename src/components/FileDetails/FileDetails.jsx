import React, { useState, useEffect } from 'react';
import './FileDetails.css';

// Импорт иконок
import DateIcon from '../../assets/file-browser/date.svg';
import UsersIcon from '../../assets/file-browser/usernames.svg';
import ActionsIcon from '../../assets/file-browser/actions.svg';
import PreviewIcon from '../../assets/file-browser/preview-big.svg';

const FileDetails = ({ file, isVisible, onClose, initialTab = 'properties' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [collapsedDays, setCollapsedDays] = useState({});
    const [selectedDateFilter, setSelectedDateFilter] = useState('All');
    const [selectedUsersFilter, setSelectedUsersFilter] = useState('All');
    const [selectedActionsFilter, setSelectedActionsFilter] = useState('All');
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showActionDropdown, setShowActionDropdown] = useState(false);
    const [visibleDaysCount, setVisibleDaysCount] = useState(5);

    // Проверяем, является ли выбранный элемент папкой
    const isFolder = file?.type === 'folder' || file?.type === 'shared-folder';

    // Обновляем активную вкладку при изменении initialTab
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab, file]);

    // Закрытие dropdown при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.file-details__filter-container')) {
                setShowDateDropdown(false);
                setShowUserDropdown(false);
                setShowActionDropdown(false);
            }
        };

        if (showDateDropdown || showUserDropdown || showActionDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showDateDropdown, showUserDropdown, showActionDropdown]);

    if (!isVisible || !file) {
        return null;
    }

    // Генерируем активности для файла/папки
    const generateFileActivity = () => {
        const days = [];
        const dayNames = [
            'Today', 'Yesterday', 'Friday, 13', 'Thursday, 12', 'Wednesday, 11', 'Tuesday, 10', 'Monday, 9',
            'Sunday, 8', 'Saturday, 7', 'Friday, 6', 'Thursday, 5', 'Wednesday, 4', 'Tuesday, 3', 'Monday, 2'
        ];

        const users = ['You', 'Sarah Chen', 'Alex Rodriguez', 'Maria Garcia', 'David Kim', 'Lisa Wang', 'John Smith'];
        const fileActions = ['opened', 'modified', 'commented', 'shared', 'renamed', 'moved'];
        const folderActions = ['opened', 'shared', 'renamed', 'moved', 'file_added', 'file_removed'];
        const actions = isFolder ? folderActions : fileActions;

        let currentId = 1;

        dayNames.forEach((dayName) => {
            const activitiesCount = Math.floor(Math.random() * 4) + 2;
            const dayActivities = [];

            for (let i = 0; i < activitiesCount; i++) {
                const user = users[Math.floor(Math.random() * users.length)];
                const action = actions[Math.floor(Math.random() * actions.length)];
                const hour = Math.floor(Math.random() * 16) + 8;
                const minute = Math.floor(Math.random() * 60);
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

                let message = '';
                const itemType = isFolder ? 'folder' : 'file';

                switch (action) {
                    case 'opened':
                        message = user === 'You' ? `You opened this ${itemType}` : `This ${itemType} was opened by ${user}`;
                        break;
                    case 'modified':
                        message = user === 'You' ? `You have modified this ${itemType}` : `${user} has modified this ${itemType}`;
                        break;
                    case 'commented':
                        message = user === 'You' ? `You have commented on this ${itemType}` : `${user} has commented on this ${itemType}`;
                        break;
                    case 'shared':
                        const targetUser = users[Math.floor(Math.random() * users.length)];
                        message = user === 'You' ? `You shared this ${itemType} with ${targetUser}` : `This ${itemType} was shared with ${targetUser} by ${user}`;
                        break;
                    case 'renamed':
                        message = user === 'You' ? `You renamed this ${itemType}` : `This ${itemType} was renamed by ${user}`;
                        break;
                    case 'moved':
                        message = user === 'You' ? `You moved this ${itemType}` : `This ${itemType} was moved by ${user}`;
                        break;
                    case 'file_added':
                        message = user === 'You' ? `You added a file to this folder` : `${user} added a file to this folder`;
                        break;
                    case 'file_removed':
                        message = user === 'You' ? `You removed a file from this folder` : `${user} removed a file from this folder`;
                        break;
                    default:
                        message = `${action} by ${user}`;
                }

                dayActivities.push({
                    id: currentId++,
                    user,
                    action,
                    message,
                    time
                });
            }

            days.push({
                day: dayName,
                activities: dayActivities
            });
        });

        return days;
    };

    const fileActivity = generateFileActivity();

    // Фильтрация активностей
    const filterActivities = (activities) => {
        return activities.map(dayGroup => {
            const filteredActivities = dayGroup.activities.filter(activity => {
                const dateMatch = selectedDateFilter === 'All' ||
                    (selectedDateFilter === 'Today' && dayGroup.day === 'Today') ||
                    (selectedDateFilter === 'Yesterday' && dayGroup.day === 'Yesterday');

                const userMatch = selectedUsersFilter === 'All' || activity.user === selectedUsersFilter;
                const actionMatch = selectedActionsFilter === 'All' || activity.action === selectedActionsFilter;

                return dateMatch && userMatch && actionMatch;
            });

            return {
                ...dayGroup,
                activities: filteredActivities
            };
        }).filter(dayGroup => dayGroup.activities.length > 0);
    };

    const filteredFileActivity = filterActivities(fileActivity);

    const toggleDayCollapse = (dayIndex) => {
        setCollapsedDays(prev => ({
            ...prev,
            [dayIndex]: !prev[dayIndex]
        }));
    };

    const loadMoreDays = () => {
        setVisibleDaysCount(prev => prev + 5);
    };

    const getVisibleDays = (days) => {
        return days.slice(0, visibleDaysCount);
    };

    const toggleDropdown = (dropdownType) => {
        if (dropdownType === 'date') {
            setShowDateDropdown(!showDateDropdown);
            setShowUserDropdown(false);
            setShowActionDropdown(false);
        } else if (dropdownType === 'users') {
            setShowUserDropdown(!showUserDropdown);
            setShowDateDropdown(false);
            setShowActionDropdown(false);
        } else if (dropdownType === 'actions') {
            setShowActionDropdown(!showActionDropdown);
            setShowDateDropdown(false);
            setShowUserDropdown(false);
        }
    };

    const handleDateFilterSelect = (filter) => {
        setSelectedDateFilter(filter);
        setShowDateDropdown(false);
    };

    const handleUsersFilterSelect = (filter) => {
        setSelectedUsersFilter(filter);
        setShowUserDropdown(false);
    };

    const handleActionsFilterSelect = (filter) => {
        setSelectedActionsFilter(filter);
        setShowActionDropdown(false);
    };

    const dateFilterOptions = [
        { value: 'All', label: 'All' },
        { value: 'Today', label: 'Today' },
        { value: 'Yesterday', label: 'Yesterday' },
        { value: 'Last 7 days', label: 'Last 7 days' },
        { value: 'Last 30 days', label: 'Last 30 days' }
    ];

    const usersFilterOptions = [
        { value: 'All', label: 'All' },
        { value: 'You', label: 'You' },
        { value: 'Sarah Chen', label: 'Sarah Chen' },
        { value: 'Alex Rodriguez', label: 'Alex Rodriguez' },
        { value: 'Maria Garcia', label: 'Maria Garcia' },
        { value: 'David Kim', label: 'David Kim' },
        { value: 'Lisa Wang', label: 'Lisa Wang' },
        { value: 'John Smith', label: 'John Smith' }
    ];

    const actionsFilterOptions = [
        { value: 'All', label: 'All' },
        { value: 'opened', label: 'Opened' },
        { value: 'modified', label: 'Modified' },
        { value: 'shared', label: 'Shared' },
        { value: 'commented', label: 'Commented' },
        { value: 'renamed', label: 'Renamed' },
        { value: 'moved', label: 'Moved' }
    ];

    const renderActivityMessage = (message) => {
        const highlightTerms = [
            'Sarah Chen', 'Alex Rodriguez', 'Maria Garcia', 'David Kim', 'Lisa Wang', 'John Smith'
        ];

        const regex = new RegExp(`(${highlightTerms.join('|')})`, 'g');
        const parts = message.split(regex);

        return parts.map((part, index) => {
            if (highlightTerms.includes(part)) {
                return <span key={index} className="file-details__activity-highlight">{part}</span>;
            }
            return part;
        });
    };

    return (
        <div className="file-details">
            <div className="file-details__header">
                <div className="file-details__tabs">
                    <button
                        className={`file-details__tab ${activeTab === 'properties' ? 'file-details__tab--active' : ''}`}
                        onClick={() => setActiveTab('properties')}
                    >
                        Properties
                    </button>
                    <button
                        className={`file-details__tab ${activeTab === 'insights' ? 'file-details__tab--active' : ''}`}
                        onClick={() => setActiveTab('insights')}
                    >
                        {isFolder ? 'Folder insights' : 'File insights'}
                        <div className="file-details__tab-badge">NEW</div>
                    </button>
                </div>
            </div>

            {activeTab === 'insights' && (
                <div className="file-details__filters">
                    <div className="file-details__filter-container">
                        <div
                            className="file-details__filter"
                            onClick={() => toggleDropdown('date')}
                        >
                            <div className="file-details__filter-icon">
                                <img src={DateIcon} alt="Date" width="16" height="16" />
                            </div>
                            <svg
                                className={`file-details__filter-arrow ${showDateDropdown ? 'file-details__filter-arrow--rotated' : ''}`}
                                width="10"
                                height="5"
                                viewBox="0 0 10 5"
                                fill="none"
                            >
                                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
                            </svg>
                        </div>
                        {showDateDropdown && (
                            <div className="file-details__dropdown">
                                {dateFilterOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`file-details__dropdown-item ${selectedDateFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                                        onClick={() => handleDateFilterSelect(option.value)}
                                    >
                                        <div className="file-details__dropdown-check-container">
                                            {selectedDateFilter === option.value && (
                                                <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <span>{option.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="file-details__filter-container">
                        <div
                            className="file-details__filter"
                            onClick={() => toggleDropdown('users')}
                        >
                            <div className="file-details__filter-icon">
                                <img src={UsersIcon} alt="Users" width="16" height="16" />
                            </div>
                            <svg
                                className={`file-details__filter-arrow ${showUserDropdown ? 'file-details__filter-arrow--rotated' : ''}`}
                                width="10"
                                height="5"
                                viewBox="0 0 10 5"
                                fill="none"
                            >
                                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
                            </svg>
                        </div>
                        {showUserDropdown && (
                            <div className="file-details__dropdown">
                                {usersFilterOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`file-details__dropdown-item ${selectedUsersFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                                        onClick={() => handleUsersFilterSelect(option.value)}
                                    >
                                        <div className="file-details__dropdown-check-container">
                                            {selectedUsersFilter === option.value && (
                                                <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <span>{option.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="file-details__filter-container">
                        <div
                            className="file-details__filter"
                            onClick={() => toggleDropdown('actions')}
                        >
                            <div className="file-details__filter-icon">
                                <img src={ActionsIcon} alt="Actions" width="16" height="16" />
                            </div>
                            <svg
                                className={`file-details__filter-arrow ${showActionDropdown ? 'file-details__filter-arrow--rotated' : ''}`}
                                width="10"
                                height="5"
                                viewBox="0 0 10 5"
                                fill="none"
                            >
                                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
                            </svg>
                        </div>
                        {showActionDropdown && (
                            <div className="file-details__dropdown">
                                {actionsFilterOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`file-details__dropdown-item ${selectedActionsFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                                        onClick={() => handleActionsFilterSelect(option.value)}
                                    >
                                        <div className="file-details__dropdown-check-container">
                                            {selectedActionsFilter === option.value && (
                                                <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <span>{option.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="file-details__content">
                {activeTab === 'properties' && (
                    <div className="file-details__properties">
                        {/* File Thumbnail */}
                        {!isFolder && (
                            <div className="file-details__thumbnail">
                                <div className="file-details__thumbnail-container">
                                    {file.thumbnail ? (
                                        <img
                                            src={file.thumbnail}
                                            alt={file.name}
                                            className="file-details__thumbnail-image"
                                        />
                                    ) : (
                                        <div className="file-details__thumbnail-placeholder">
                                            <div className="file-details__thumbnail-icon">
                                                <img src={PreviewIcon} alt="File preview" />
                                            </div>
                                            <span className="file-details__thumbnail-text">No preview available</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="file-details__property">
                            <span className="file-details__property-label">Name:</span>
                            <span className="file-details__property-value">{file.name}</span>
                        </div>
                        <div className="file-details__property">
                            <span className="file-details__property-label">Type:</span>
                            <span className="file-details__property-value">{file.type}</span>
                        </div>
                        <div className="file-details__property">
                            <span className="file-details__property-label">Size:</span>
                            <span className="file-details__property-value">{file.size || 'N/A'}</span>
                        </div>
                        <div className="file-details__property">
                            <span className="file-details__property-label">Modified:</span>
                            <span className="file-details__property-value">{file.modified}</span>
                        </div>
                        <div className="file-details__property">
                            <span className="file-details__property-label">Owner:</span>
                            <span className="file-details__property-value">{file.owner || 'me'}</span>
                        </div>
                    </div>
                )}

                {activeTab === 'insights' && (
                    <div className="file-details__insights">
                        {getVisibleDays(filteredFileActivity).map((dayGroup, dayIndex) => (
                            <div key={dayIndex} className="file-details__day-group">
                                <div
                                    className="file-details__day-header"
                                    onClick={() => toggleDayCollapse(dayIndex)}
                                >
                                    <svg
                                        className={`file-details__day-arrow ${collapsedDays[dayIndex] ? '' : 'file-details__day-arrow--expanded'}`}
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="file-details__day-name">{dayGroup.day}</span>
                                    <span className="file-details__day-count">({dayGroup.activities.length})</span>
                                </div>

                                {!collapsedDays[dayIndex] && (
                                    <div className="file-details__activities">
                                        {dayGroup.activities.map((activity) => (
                                            <div key={activity.id} className="file-details__activity">
                                                <div className="file-details__activity-time">{activity.time}</div>
                                                <div className="file-details__activity-message">
                                                    {renderActivityMessage(activity.message)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {visibleDaysCount < filteredFileActivity.length && (
                            <button
                                className="file-details__load-more"
                                onClick={loadMoreDays}
                            >
                                Load more
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileDetails;
