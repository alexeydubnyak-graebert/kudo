import React, { useState } from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import FavoriteItem from './FavoriteItem';
import FavoriteFileItem from './FavoriteFileItem';
import ContextMenu from '../ContextMenu/ContextMenu';
import Tab from '../Tab/Tab';
import './FavoritesTabs.css';

const FavoritesTabs = ({ onFolderClick, onFileClick }) => {
    const { favorites, favoriteFiles, addToFavorites, removeFromFavorites, addFileToFavorites, removeFileFromFavorites } = useFavorites();
    const [activeTab, setActiveTab] = useState('folders');
    const [folderDropZoneActive, setFolderDropZoneActive] = useState(false);
    const [fileDropZoneActive, setFileDropZoneActive] = useState(false);

    const [folderContextMenu, setFolderContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, folder: null });
    const [fileContextMenu, setFileContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, file: null });

    const handleFolderClick = (folder) => {
        onFolderClick?.(folder);
    };

    const handleFileClick = (file) => {
        onFileClick?.(file);
    };

    const handleFolderContextMenu = (e, folder) => {
        e.preventDefault();
        e.stopPropagation();
        setFolderContextMenu({
            isOpen: true,
            position: { x: e.clientX, y: e.clientY },
            folder
        });
    };

    const handleFileContextMenu = (e, file) => {
        e.preventDefault();
        e.stopPropagation();
        setFileContextMenu({
            isOpen: true,
            position: { x: e.clientX, y: e.clientY },
            file
        });
    };

    const handleRemoveFolderFromFavorites = (folderId, storageId) => {
        removeFromFavorites(folderId, storageId);
        setFolderContextMenu({ isOpen: false, position: { x: 0, y: 0 }, folder: null });
    };

    const handleRemoveFileFromFavorites = (fileId, storageId) => {
        removeFileFromFavorites(fileId, storageId);
        setFileContextMenu({ isOpen: false, position: { x: 0, y: 0 }, file: null });
    };

    const getFolderContextMenuItems = () => {
        if (!folderContextMenu.folder) return [];

        return [
            {
                label: 'Open',
                onClick: () => console.log('Open folder:', folderContextMenu.folder)
            },
            {
                label: 'Remove from Favorites',
                onClick: () => handleRemoveFolderFromFavorites(folderContextMenu.folder.id, folderContextMenu.folder.storageId)
            }
        ];
    };

    const getFileContextMenuItems = () => {
        if (!fileContextMenu.file) return [];

        return [
            {
                label: 'Open',
                onClick: () => console.log('Open file:', fileContextMenu.file)
            },
            {
                label: 'Remove from Favorites',
                onClick: () => handleRemoveFileFromFavorites(fileContextMenu.file.id, fileContextMenu.file.storageId)
            }
        ];
    };

    // Unified drop zone handlers
    const handleUnifiedDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const types = Array.from(e.dataTransfer.types);

        const hasFolderData = types.includes('application/x-folder-data') || types.includes('application/json');
        const hasFileData = types.includes('application/x-file-data') || types.includes('application/json');

        if (activeTab === 'folders' && hasFolderData) {
            setFolderDropZoneActive(true);
        } else if (activeTab === 'files' && hasFileData) {
            setFileDropZoneActive(true);
        }
    };

    const handleUnifiedDragLeave = (e) => {
        e.preventDefault();
        setFolderDropZoneActive(false);
        setFileDropZoneActive(false);
    };

    const handleUnifiedDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFolderDropZoneActive(false);
        setFileDropZoneActive(false);

        if (activeTab === 'folders') {
            try {
                let folderData = e.dataTransfer.getData('application/x-folder-data');
                if (!folderData) {
                    folderData = e.dataTransfer.getData('application/json');
                }

                if (folderData) {
                    const data = JSON.parse(folderData);
                    if (data.type === 'folder' || data.type === 'shared-folder') {
                        addToFavorites(data);
                    }
                }
            } catch (error) {
                console.error('Error parsing dropped folder data:', error);
            }
        } else if (activeTab === 'files') {
            try {
                let fileData = e.dataTransfer.getData('application/x-file-data');
                if (!fileData) {
                    fileData = e.dataTransfer.getData('application/json');
                }

                if (fileData) {
                    const data = JSON.parse(fileData);
                    if (data.type === 'file') {
                        addFileToFavorites(data);
                    }
                }
            } catch (error) {
                console.error('Error handling drop:', error);
            }
        }
    };

    return (
        <div
            className={`favorites-tabs ${(folderDropZoneActive || fileDropZoneActive) ? 'favorites-tabs--drop-active' : ''}`}
            onDragOver={handleUnifiedDragOver}
            onDragLeave={handleUnifiedDragLeave}
            onDrop={handleUnifiedDrop}
        >
            <div className="favorites-tabs__tab-buttons">
                <Tab
                    label={`Folders (${favorites.length})`}
                    active={activeTab === 'folders'}
                    onClick={() => setActiveTab('folders')}
                    size="small"
                    variant="text-only"
                />
                <Tab
                    label={`Files (${favoriteFiles.length})`}
                    active={activeTab === 'files'}
                    onClick={() => setActiveTab('files')}
                    size="small"
                    variant="text-only"
                />
            </div>

            <div className="favorites-tabs__content">
                {activeTab === 'folders' && (
                    <div className="favorites-tabs__panel">
                        {favorites.length === 0 ? (
                            <div className="favorites-tabs__empty">
                                <p>{folderDropZoneActive ? 'Drop folder here to add to favorites' : 'No favorite folders yet'}</p>
                                <p className="favorites-tabs__empty-hint">
                                    {folderDropZoneActive ? '' : 'Drag folders here or right-click and select "Add to Favorites"'}
                                </p>
                            </div>
                        ) : (
                            <div className="favorites-tabs__items">
                                {favorites.map((folder, index) => (
                                    <FavoriteItem
                                        key={`${folder.id}-${folder.storageId}`}
                                        folder={folder}
                                        index={index}
                                        isDragging={false}
                                        isDragOver={false}
                                        onDragStart={() => { }}
                                        onDragOver={() => { }}
                                        onDragLeave={() => { }}
                                        onDrop={() => { }}
                                        onDragEnd={() => { }}
                                        onContextMenu={handleFolderContextMenu}
                                        onClick={handleFolderClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'files' && (
                    <div className="favorites-tabs__panel">
                        {favoriteFiles.length === 0 ? (
                            <div className="favorites-tabs__empty">
                                <p>{fileDropZoneActive ? 'Drop file here to add to favorites' : 'No favorite files yet'}</p>
                                <p className="favorites-tabs__empty-hint">
                                    {fileDropZoneActive ? '' : 'Drag files here or right-click and select "Add to Favorites"'}
                                </p>
                            </div>
                        ) : (
                            <div className="favorites-tabs__items">
                                {favoriteFiles.map((file, index) => (
                                    <FavoriteFileItem
                                        key={`${file.id}-${file.storageId}`}
                                        file={file}
                                        index={index}
                                        isDragging={false}
                                        isDragOver={false}
                                        onDragStart={() => { }}
                                        onDragOver={() => { }}
                                        onDragLeave={() => { }}
                                        onDrop={() => { }}
                                        onDragEnd={() => { }}
                                        onContextMenu={handleFileContextMenu}
                                        onClick={handleFileClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ContextMenu
                isOpen={folderContextMenu.isOpen}
                position={folderContextMenu.position}
                onClose={() => setFolderContextMenu({ isOpen: false, position: { x: 0, y: 0 }, folder: null })}
                items={getFolderContextMenuItems()}
            />

            <ContextMenu
                isOpen={fileContextMenu.isOpen}
                position={fileContextMenu.position}
                onClose={() => setFileContextMenu({ isOpen: false, position: { x: 0, y: 0 }, file: null })}
                items={getFileContextMenuItems()}
            />
        </div>
    );
};

export default FavoritesTabs;