import React, { useState } from 'react';
import './TeamActivity.css';

const TeamActivity = ({ isVisible, onClose }) => {
    const [activeFilter, setActiveFilter] = useState('All Activity');

    const filters = ['All Activity', 'My Files', 'Mentions', 'Comments', 'Uploads'];

    const activities = [
        {
            id: 1,
            type: 'upload',
            user: 'Anna',
            action: 'uploaded',
            file: 'FloorPlan_v3.dwg',
            time: '3 mins ago',
            icon: 'upload'
        },
        {
            id: 2,
            type: 'edit',
            user: 'John',
            action: 'edited',
            file: 'Mechanical_Layout.dwg',
            description: 'new version created',
            time: '15 mins ago',
            icon: 'edit'
        },
        {
            id: 3,
            type: 'comment',
            user: 'Maria',
            action: 'added a comment on',
            file: 'Assembly_Model.dwg',
            time: '1 hour ago',
            icon: 'comment'
        },
        {
            id: 4,
            type: 'upload',
            user: 'David',
            action: 'uploaded',
            file: 'Electrical_Schema.dwg',
            time: '2 hours ago',
            icon: 'upload'
        },
        {
            id: 5,
            type: 'edit',
            user: 'Sarah',
            action: 'edited',
            file: 'Site_Plan.dwg',
            description: 'updated layers',
            time: '3 hours ago',
            icon: 'edit'
        },
        {
            id: 6,
            type: 'upload',
            user: 'Mike',
            action: 'uploaded',
            file: 'Foundation_Plan.dwg',
            time: '4 hours ago',
            icon: 'upload'
        },
        {
            id: 7,
            type: 'comment',
            user: 'Lisa',
            action: 'added a comment on',
            file: 'Roof_Details.dwg',
            time: '5 hours ago',
            icon: 'comment'
        },
        {
            id: 8,
            type: 'edit',
            user: 'Tom',
            action: 'edited',
            file: 'HVAC_Layout.dwg',
            description: 'revised ductwork',
            time: '6 hours ago',
            icon: 'edit'
        }
    ];

    if (!isVisible) return null;

    return (
        <div className="team-activity">
            <div className="team-activity__filters">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`team-activity__filter ${activeFilter === filter ? 'team-activity__filter--active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="team-activity__list">
                {activities.map((activity) => (
                    <div key={activity.id} className="team-activity__item">
                        <div className="team-activity__icon">
                            <div className="team-activity__avatar">
                                {activity.user.charAt(0)}
                            </div>
                        </div>
                        <div className="team-activity__content">
                            <div className="team-activity__text">
                                <span className="team-activity__user">{activity.user}</span>
                                {' '}
                                <span className="team-activity__action">{activity.action}</span>
                                {' '}
                                <button className="team-activity__file">{activity.file}</button>
                                {activity.description && (
                                    <>
                                        {' – '}
                                        <span className="team-activity__description">{activity.description}</span>
                                    </>
                                )}
                            </div>
                            <div className="team-activity__time">{activity.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamActivity;
