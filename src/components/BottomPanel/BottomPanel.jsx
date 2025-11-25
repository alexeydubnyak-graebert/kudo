import React from 'react';
import './BottomPanel.css';
import BottomPanelLeft from '../../assets/editor/screenshots/bottom-panel-left.png';
import BottomPanelRight from '../../assets/editor/screenshots/bottom-panel-right.png';

const BottomPanel = () => {
    return (
        <div className="bottom-panel">
            {/* Left Section - Bottom Panel Screenshot */}
            <img src={BottomPanelLeft} alt="Bottom Panel Left" className="bottom-panel__left-image" />

            {/* Spacer */}
            <div className="bottom-panel__spacer"></div>

            {/* Right Section - Bottom Panel Controls Screenshot */}
            <img src={BottomPanelRight} alt="Bottom Panel Right" className="bottom-panel__right-image" />
        </div>
    );
};

export default BottomPanel;
