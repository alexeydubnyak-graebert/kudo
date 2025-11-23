import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FavoritesTabs from '../Favorites/FavoritesTabs';
import { useFavorites } from '../../contexts/FavoritesContext';
import Button from '../Button/Button';
import UploadIcon from '../../assets/file-browser/upload_file.svg';
import CreateFolderIcon from '../../assets/file-browser/create_folder.svg';
import CreateDrawingIcon from '../../assets/file-browser/new.svg';
import './Sidebar.css';

// Импорт SVG иконок из side-bar
import CollapseIconSvg from '../../assets/side-bar/collapse.svg';
import MyFilesIconSvg from '../../assets/side-bar/my-files.svg';
import StorageIconSvg from '../../assets/side-bar/storage.svg';
import ResourcesIconSvg from '../../assets/side-bar/resources.svg';
import FavoritesIconSvg from '../../assets/side-bar/favorites.svg';
import AutomationIconSvg from '../../assets/side-bar/automation.svg';
import TrashIconSvg from '../../assets/side-bar/trash.svg';

// Импорт иконок storage
import KudoStorageIconSvg from '../../assets/storage/ares.svg';
import GoogleDriveIconSvg from '../../assets/storage/google-drive.svg';
import OneDriveIconSvg from '../../assets/storage/onedrive.svg';
import DropboxIconSvg from '../../assets/storage/dropbox.svg';
import BoxIconSvg from '../../assets/storage/box.svg';
import SharePointIconSvg from '../../assets/storage/sharepoint.svg';
import NextcloudIconSvg from '../../assets/storage/nextcloud.svg';
import WebDavIconSvg from '../../assets/storage/WebDav.svg';

// Компоненты иконок
const CollapseIcon = () => <img src={CollapseIconSvg} alt="" />;
const MyFilesIcon = () => <img src={MyFilesIconSvg} alt="" />;
const StorageIcon = () => <img src={StorageIconSvg} alt="" />;
const ResourcesIcon = () => <img src={ResourcesIconSvg} alt="" />;
const FavoritesIcon = () => <img src={FavoritesIconSvg} alt="" />;
const AutomationIcon = () => <img src={AutomationIconSvg} alt="" />;
const TrashIcon = () => <img src={TrashIconSvg} alt="" />;

// Компоненты иконок storage
const KudoStorageIcon = () => <img src={KudoStorageIconSvg} alt="" />;
const GoogleDriveIcon = () => <img src={GoogleDriveIconSvg} alt="" />;
const OneDriveIcon = () => <img src={OneDriveIconSvg} alt="" />;
const DropboxIcon = () => <img src={DropboxIconSvg} alt="" />;
const BoxIcon = () => <img src={BoxIconSvg} alt="" />;
const SharePointIcon = () => <img src={SharePointIconSvg} alt="" />;
const NextcloudIcon = () => <img src={NextcloudIconSvg} alt="" />;
const WebDavIcon = () => <img src={WebDavIconSvg} alt="" />;

const ArrowDropDownIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.25 6.375L8.5 10.625L12.75 6.375" fill="currentColor" />
    </svg>
);

/**
 * Sidebar - Боковая панель навигации
 * Использует foundation-colors токены
 */
const Sidebar = ({
    activeSection = 'my-files',
    activeItem = 'kudo-storage',
    collapsed = false,
    onCollapse = null,
    onNavigate = null,
    onFolderClick = null
}) => {
    const { addToFavorites, addFileToFavorites } = useFavorites();
    const [expandedSections, setExpandedSections] = useState({
        'my-files': false,
        'resources': false,
        'my-profile': false,
        'favorites': false,
        'automation': false
    });
    const [favoritesDropZoneActive, setFavoritesDropZoneActive] = useState(false);

    const toggleSection = (sectionId) => {
        if (!collapsed) {
            setExpandedSections(prev => ({
                ...prev,
                [sectionId]: !prev[sectionId]
            }));
        }
    };

    // Drag-and-drop handlers for Favorites section
    const handleFavoritesDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const types = Array.from(e.dataTransfer.types);

        const hasData = types.includes('application/x-folder-data') ||
            types.includes('application/x-file-data') ||
            types.includes('application/json');

        if (hasData) {
            setFavoritesDropZoneActive(true);
        }
    };

    const handleFavoritesDragLeave = (e) => {
        e.preventDefault();
        // Проверяем, что действительно покинули секцию
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFavoritesDropZoneActive(false);
        }
    };

    const handleFavoritesDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFavoritesDropZoneActive(false);

        try {
            // Пытаемся получить данные в разных форматах
            let data = null;
            let folderData = e.dataTransfer.getData('application/x-folder-data');
            let fileData = e.dataTransfer.getData('application/x-file-data');
            let jsonData = e.dataTransfer.getData('application/json');

            if (folderData) {
                data = JSON.parse(folderData);
            } else if (fileData) {
                data = JSON.parse(fileData);
            } else if (jsonData) {
                data = JSON.parse(jsonData);
            }

            if (data) {
                // Автоматически определяем тип и добавляем в соответствующий таб
                if (data.type === 'folder' || data.type === 'shared-folder') {
                    addToFavorites(data);
                } else if (data.type === 'file') {
                    addFileToFavorites(data);
                }

                // Автоматически разворачиваем секцию после добавления
                if (!expandedSections['favorites']) {
                    toggleSection('favorites');
                }
            }
        } catch (error) {
            console.error('Error handling drop on Favorites:', error);
        }
    };

    const handleNavigate = (sectionId, itemId = null) => {
        if (onNavigate) {
            onNavigate(sectionId, itemId);
        }
    };

    return (
        <div className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
            <div className="sidebar__top">
                {/* Collapse Button */}
                <button
                    className="sidebar__collapse"
                    onClick={onCollapse}
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    <div className={`sidebar__collapse-icon ${collapsed ? 'sidebar__collapse-icon--expanded' : ''}`}>
                        <CollapseIcon />
                    </div>
                    {!collapsed && <p className="sidebar__collapse-text">Collapse</p>}
                </button>

                {/* Action Buttons */}
                {!collapsed && (
                    <div className="sidebar__actions">
                        <Button
                            variant="secondary"
                            iconPosition="left"
                            icon={<img src={UploadIcon} alt="Upload" width="16" height="16" />}
                            onClick={() => console.log('Upload drawing clicked')}
                            className="sidebar__action-btn"
                        >
                            Upload drawing
                        </Button>
                        <Button
                            variant="secondary"
                            iconPosition="left"
                            icon={<img src={CreateFolderIcon} alt="Create folder" width="16" height="16" />}
                            onClick={() => console.log('Create folder clicked')}
                            className="sidebar__action-btn"
                        >
                            Create folder
                        </Button>
                        <Button
                            variant="secondary"
                            iconPosition="left"
                            icon={<img src={CreateDrawingIcon} alt="Create drawing" width="16" height="16" />}
                            onClick={() => console.log('Create drawing clicked')}
                            className="sidebar__action-btn"
                        >
                            Create drawing
                        </Button>
                    </div>
                )}

                {/* My Files Section */}
                <div className="sidebar__section">
                    <button
                        className={`sidebar__section-header ${expandedSections['my-files'] ? 'expanded' : ''}`}
                        onClick={() => toggleSection('my-files')}
                    >
                        <div className="sidebar__section-left">
                            <div className="sidebar__section-icon">
                                <MyFilesIcon />
                            </div>
                            <p className="sidebar__section-title">My files</p>
                        </div>
                        <div className={`sidebar__section-arrow ${expandedSections['my-files'] ? 'expanded' : ''}`}>
                            <ArrowDropDownIcon />
                        </div>
                    </button>

                    <div className={`sidebar__section-content sidebar__section-content--scrollable ${expandedSections['my-files'] ? 'expanded' : ''}`}>
                        <button
                            className={`sidebar__item ${activeItem === 'kudo-storage' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'kudo-storage')}
                        >
                            <div className="sidebar__item-icon">
                                <KudoStorageIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">Kudo Storage</p>
                                <p className="sidebar__item-email">storage@kudo.com</p>
                            </div>
                        </button>

                        <button
                            className={`sidebar__item ${activeItem === 'google-drive' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'google-drive')}
                        >
                            <div className="sidebar__item-icon">
                                <GoogleDriveIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">Google Drive</p>
                                <p className="sidebar__item-email">user@gmail.com</p>
                            </div>
                        </button>

                        <button
                            className={`sidebar__item ${activeItem === 'one-drive' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'one-drive')}
                        >
                            <div className="sidebar__item-icon">
                                <OneDriveIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">One Drive</p>
                                <p className="sidebar__item-email">user@outlook.com</p>
                            </div>
                        </button>

                        <button
                            className={`sidebar__item ${activeItem === 'dropbox' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'dropbox')}
                        >
                            <div className="sidebar__item-icon">
                                <DropboxIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">Dropbox</p>
                                <p className="sidebar__item-email">user@dropbox.com</p>
                            </div>
                        </button>

                        <button
                            className={`sidebar__item ${activeItem === 'box' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'box')}
                        >
                            <div className="sidebar__item-icon">
                                <BoxIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">Box</p>
                                <p className="sidebar__item-email">user@box.com</p>
                            </div>
                        </button>

                        <button
                            className={`sidebar__item ${activeItem === 'sharepoint' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'sharepoint')}
                        >
                            <div className="sidebar__item-icon">
                                <SharePointIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">SharePoint</p>
                                <p className="sidebar__item-email">user@company.com</p>
                            </div>
                        </button>

                        <button
                            className={`sidebar__item ${activeItem === 'nextcloud' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'nextcloud')}
                        >
                            <div className="sidebar__item-icon">
                                <NextcloudIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">Nextcloud</p>
                                <p className="sidebar__item-email">user@nextcloud.com</p>
                            </div>
                        </button>

                        <button
                            className={`sidebar__item ${activeItem === 'webdav' ? 'active' : ''}`}
                            onClick={() => handleNavigate('my-files', 'webdav')}
                        >
                            <div className="sidebar__item-icon">
                                <WebDavIcon />
                            </div>
                            <div className="sidebar__item-content">
                                <p className="sidebar__item-text">WebDAV</p>
                                <p className="sidebar__item-email">user@webdav.server</p>
                            </div>
                        </button>
                    </div>

                    {/* Разделитель */}
                    <div className={`sidebar__section-divider ${expandedSections['my-files'] ? 'visible' : ''}`}></div>

                    {/* Deleted files - вне списка storage, показывается только при раскрытии */}
                    {expandedSections['my-files'] && (
                        <>
                            <button
                                className={`sidebar__section-header ${activeItem === 'deleted-files' ? 'active' : ''}`}
                                onClick={() => handleNavigate('my-files', 'deleted-files')}
                            >
                                <div className="sidebar__section-left">
                                    <div className="sidebar__section-icon">
                                        <TrashIcon />
                                    </div>
                                    <p className="sidebar__section-title">Deleted files</p>
                                </div>
                            </button>

                            {/* Разделитель ниже Deleted files */}
                            <div className="sidebar__section-divider visible"></div>
                        </>
                    )}
                </div>

                {/* Resources Section */}
                <div className="sidebar__section">
                    <button
                        className={`sidebar__section-header ${expandedSections['resources'] ? 'expanded' : ''}`}
                        onClick={() => toggleSection('resources')}
                    >
                        <div className="sidebar__section-left">
                            <div className="sidebar__section-icon">
                                <ResourcesIcon />
                            </div>
                            <p className="sidebar__section-title">Resources</p>
                        </div>
                        <div className={`sidebar__section-arrow ${expandedSections['resources'] ? 'expanded' : ''}`}>
                            <ArrowDropDownIcon />
                        </div>
                    </button>

                    <div className={`sidebar__section-content ${expandedSections['resources'] ? 'expanded' : ''}`}>
                        <button
                            className={`sidebar__inner-item ${activeItem === 'my-templates' ? 'active' : ''}`}
                            onClick={() => handleNavigate('resources', 'my-templates')}
                        >
                            <p className="sidebar__inner-item-text">My templates</p>
                        </button>

                        <button
                            className={`sidebar__inner-item ${activeItem === 'my-fonts' ? 'active' : ''}`}
                            onClick={() => handleNavigate('resources', 'my-fonts')}
                        >
                            <p className="sidebar__inner-item-text">My fonts</p>
                        </button>

                        <button
                            className={`sidebar__inner-item ${activeItem === 'trinity-block-library' ? 'active' : ''}`}
                            onClick={() => handleNavigate('resources', 'trinity-block-library')}
                        >
                            <p className="sidebar__inner-item-text">Trinity block library</p>
                        </button>

                        <button
                            className={`sidebar__inner-item ${activeItem === 'batch-process' ? 'active' : ''}`}
                            onClick={() => handleNavigate('resources', 'batch-process')}
                        >
                            <p className="sidebar__inner-item-text">Batch Process</p>
                        </button>
                    </div>

                    {/* Разделитель */}
                    <div className={`sidebar__section-divider ${expandedSections['resources'] ? 'visible' : ''}`}></div>
                </div>

                {/* Storage */}
                <div className="sidebar__section">
                    <button
                        className="sidebar__section-header"
                        onClick={() => handleNavigate('storage')}
                    >
                        <div className="sidebar__section-left">
                            <div className="sidebar__section-icon">
                                <StorageIcon />
                            </div>
                            <p className="sidebar__section-title">Storage</p>
                        </div>
                    </button>
                </div>

                {/* Automation */}
                <div className="sidebar__section">
                    <button
                        className="sidebar__section-header"
                        onClick={() => handleNavigate('automation')}
                    >
                        <div className="sidebar__section-left">
                            <div className="sidebar__section-icon">
                                <AutomationIcon />
                            </div>
                            <p className="sidebar__section-title">Automation</p>
                        </div>
                    </button>
                </div>

                {/* Favorites Section */}
                <div
                    className={`sidebar__section ${favoritesDropZoneActive ? 'sidebar__section--drop-active' : ''}`}
                    onDragOver={handleFavoritesDragOver}
                    onDragLeave={handleFavoritesDragLeave}
                    onDrop={handleFavoritesDrop}
                >
                    <button
                        className={`sidebar__section-header ${expandedSections['favorites'] ? 'expanded' : ''}`}
                        onClick={() => toggleSection('favorites')}
                    >
                        <div className="sidebar__section-left">
                            <div className="sidebar__section-icon">
                                <FavoritesIcon />
                            </div>
                            <p className="sidebar__section-title">Favorites</p>
                        </div>
                        <div className={`sidebar__section-arrow ${expandedSections['favorites'] ? 'expanded' : ''}`}>
                            <ArrowDropDownIcon />
                        </div>
                    </button>

                    <div className={`sidebar__section-content ${expandedSections['favorites'] ? 'expanded' : ''}`}>
                        <FavoritesTabs
                            onFolderClick={onFolderClick}
                        />
                    </div>

                    {/* Разделитель */}
                    <div className={`sidebar__section-divider ${expandedSections['favorites'] ? 'visible' : ''}`}></div>
                </div>
            </div>

            {/* Footer */}
            <div className="sidebar__footer">
                <div className="sidebar__footer-content">
                    <p>© Graebert GmbH</p>
                    <a href="https://kudo.graebert.com/terms">Terms of Use</a>
                    <a href="https://customer-portal.graebert.com/about/privacypolicy">Privacy policy</a>
                    <p>v.1.171.7876.79fbf925d.6ec928</p>
                </div>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    activeSection: PropTypes.string,
    activeItem: PropTypes.string,
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    onNavigate: PropTypes.func,
    onFolderClick: PropTypes.func
};

export default Sidebar;
