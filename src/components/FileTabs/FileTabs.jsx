import React from 'react';
import './FileTabs.css';
import FileTabsLeft from '../../assets/editor/screenshots/file-tabs-left.png';
import FileTabsRight from '../../assets/editor/screenshots/file-tabs-right.png';

const FileTabs = () => {
    return (
        <div className="file-tabs">
            {/* Left Section - File Tabs Screenshot */}
            <img src={FileTabsLeft} alt="File Tabs" className="file-tabs__left-image" />

            {/* Spacer */}
            <div className="file-tabs__spacer"></div>

            {/* Right Section - File Tabs Controls Screenshot */}
            <img src={FileTabsRight} alt="File Tabs Controls" className="file-tabs__right-image" />
        </div>
    );
};

export default FileTabs;
