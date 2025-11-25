import React from 'react';
import AppHeader from '../components/AppHeader/AppHeader';
import FileTabs from '../components/FileTabs/FileTabs';
import Ribbon from '../components/Ribbon/Ribbon';
import Viewport from '../components/Viewport/Viewport';
import CommandPanel from '../components/CommandPanel/CommandPanel';
import BottomPanel from '../components/BottomPanel/BottomPanel';
import PropertiesImage from '../assets/editor/screenshots/properties.png';
import LayersImage from '../assets/editor/screenshots/layers.png';
import './EditorPage.css';

const EditorPage = ({ file, onClose }) => {
    return (
        <div className="editor-page">
            {/* Header */}
            <AppHeader />

            {/* File Tabs */}
            <FileTabs />

            {/* Ribbon */}
            <Ribbon />

            {/* Main Content Area */}
            <div className="editor-page__main">
                {/* Viewport Area with Command Panel */}
                <div className="editor-page__viewport-area">
                    <Viewport />
                    {/* Command Panel */}
                    <CommandPanel />
                </div>

                {/* Right Panels - скриншоты */}
                <div className="editor-page__right-panels">
                    <img src={PropertiesImage} alt="Properties" className="editor-page__panel-image" />
                    <img src={LayersImage} alt="Layers" className="editor-page__panel-image" />
                </div>
            </div>

            {/* Bottom Panel */}
            <BottomPanel />
        </div>
    );
};

export default EditorPage;
