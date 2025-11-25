import React from 'react';
import './CommandPanel.css';
import CommandPanelImage from '../../assets/editor/screenshots/command-panel.png';

const CommandPanel = () => {
    return (
        <div className="command-panel">
            <img src={CommandPanelImage} alt="Command Panel" className="command-panel__image" />
        </div>
    );
};

export default CommandPanel;
