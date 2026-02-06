import React, { useState } from 'react';
import './RibbonTabs.css';

const RibbonTabs = () => {
    const [activeTab, setActiveTab] = useState('home');

    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'insert', label: 'Insert' },
        { id: 'annotate', label: 'Annotate' },
        { id: 'parametric', label: 'Parametric' },
        { id: 'tools', label: 'Tools' },
        { id: 'view', label: 'View' },
        { id: 'manage', label: 'Manage' },
        { id: 'output', label: 'Output' },
        { id: 'express', label: 'Express Tools' },
        { id: 'featured', label: 'Featured Apps' }
    ];

    return (
        <div className="ribbon-tabs">
            <div className="ribbon-tabs__container">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`ribbon-tabs__tab ${activeTab === tab.id ? 'ribbon-tabs__tab--active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RibbonTabs;
