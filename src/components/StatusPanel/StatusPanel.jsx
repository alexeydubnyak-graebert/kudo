import React from 'react';
import Button from '../Button/Button';
import './StatusPanel.css';
import NotificationIcon from '../../assets/status-panel/notification.svg';
import LicenseIcon from '../../assets/status-panel/license.svg';
import FeedbackIcon from '../../assets/status-panel/feedback.svg';
import HelpIcon from '../../assets/status-panel/help.svg';
import AutomationIcon from '../../assets/status-panel/automation.svg';

const StatusPanel = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="status-panel">
            {/* Scrollable Cards Container */}
            <div className="status-panel__cards">
                {/* New Features */}
                <div className="status-panel__card">
                    <div className="status-panel__card-header">
                        <div className="status-panel__card-header-icon">
                            <img src={NotificationIcon} alt="" />
                        </div>
                        <span className="status-panel__card-title">New features</span>
                    </div>
                    <div className="status-panel__card-content">
                        <p className="status-panel__card-text">
                            💡 AI – Version Compare – Online Block Libraries – Multifunctional Grips
                            <br /><br />
                            🚀 NEW: Online Drawings Automation to batch-process CAD jobs, or automate the production of DWG drawings from Revit or IFC files.
                            <br /><br />
                            Learn about all the new features released in ARES Kudo and watch the videos:
                        </p>
                        <div className="status-panel__card-actions">
                            <Button variant="secondary" size="small">
                                Learn more
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Licenses */}
                <div className="status-panel__card">
                    <div className="status-panel__card-header">
                        <div className="status-panel__card-header-icon">
                            <img src={LicenseIcon} alt="" />
                        </div>
                        <span className="status-panel__card-title">Licenses</span>
                    </div>
                    <div className="status-panel__card-content">
                        <p className="status-panel__card-description">Your Account has expired and has been transformed to a Free Account with some limitations (no Editing, no Sharing Links).</p>
                        <div className="status-panel__card-actions">
                            <Button variant="secondary" size="small">
                                Buy product
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Automation */}
                <div className="status-panel__card">
                    <div className="status-panel__card-header">
                        <div className="status-panel__card-header-icon">
                            <img src={AutomationIcon} alt="" />
                        </div>
                        <span className="status-panel__card-title">Automation</span>
                    </div>
                    <div className="status-panel__card-content">
                        <p className="status-panel__card-description">
                            You can automate your ongoing jobs with new Drawings Automation feature.
                        </p>
                        <div className="status-panel__card-actions">
                            <Button variant="secondary" size="small">
                                Try now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Help us improve */}
                <div className="status-panel__card">
                    <div className="status-panel__card-header">
                        <div className="status-panel__card-header-icon">
                            <img src={FeedbackIcon} alt="" />
                        </div>
                        <span className="status-panel__card-title">Help us improve</span>
                    </div>
                    <div className="status-panel__card-content">
                        <p className="status-panel__card-description">
                            Would you like to help us improve the product?
                        </p>
                        <div className="status-panel__card-actions">
                            <div className="status-panel__button-row">
                                <Button variant="secondary" size="small">Yes</Button>
                                <Button variant="secondary" size="small">No</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Need help? */}
                <div className="status-panel__card">
                    <div className="status-panel__card-header">
                        <div className="status-panel__card-header-icon">
                            <img src={HelpIcon} alt="" />
                        </div>
                        <span className="status-panel__card-title">Need help?</span>
                    </div>
                    <div className="status-panel__card-content">
                        <p className="status-panel__card-description">
                            Get in touch in our support team
                        </p>
                        <div className="status-panel__card-actions">
                            <Button variant="secondary" size="small">
                                Contact now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusPanel;
