import React, { useState } from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import FavoriteItem from './FavoriteItem';
import FavoriteFileItem from './FavoriteFileItem';
import ContextMenu from '../ContextMenu/ContextMenu';
import './FavoritesTabs.css';

const FavoritesTabs = ({
    onFolderClick = null
}) => {
    const [activeTab, setActiveTab] = useState('folders');
    const {
        favorites,
        favoriteFiles,
        reorderFavorites,
        reorderFavoriteFiles,
        removeFromFavorites,
        removeFileFromFavorites,
        addToFavorites,
        addFileToFavorites
    } = useFavorites();

    // States for folders
    const [folderDraggedIndex, setFolderDraggedIndex] = useState(null);
    const [folderDragOverIndex, setFolderDragOverIndex] = useState(null);
    const [folderDropZoneActive, setFolderDropZoneActive] = useState(false);
    const [folderContextMenu, setFolderContextMenu] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        folder: null
    });

    // States for files
    const [fileDraggedIndex, setFileDraggedIndex] = useState(null);
    const [fileDragOverIndex, setFileDragOverIndex] = useState(null);
    const [fileDropZoneActive, setFileDropZoneActive] = useState(false);
    const [fileContextMenu, setFileContextMenu] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        file: null
    });

    // Folder handlers
    const handleFolderDragStart = (e, index) => {
        setFolderDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleFolderDragOver = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        if (folderDraggedIndex !== null && folderDraggedIndex !== index) {
            setFolderDragOverIndex(index);
        }
    };

    const handleFolderDragLeave = () => {
        setFolderDragOverIndex(null);
    };

    const handleFolderDrop = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        if (folderDraggedIndex !== null && folderDraggedIndex !== index) {
            reorderFavorites(folderDraggedIndex, index);
        }

        setFolderDraggedIndex(null);
        setFolderDragOverIndex(null);
    };

    const handleFolderDragEnd = () => {
        setFolderDraggedIndex(null);
        setFolderDragOverIndex(null);
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

    const handleFolderClick = (folder) => {
        onFolderClick?.(folder);
    };

    // File handlers
    const handleFileDragStart = (e, index) => {
        setFileDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleFileDragOver = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileDraggedIndex !== null && fileDraggedIndex !== index) {
            setFileDragOverIndex(index);
        }
    };

    const handleFileDragLeave = () => {
        setFileDragOverIndex(null);
    };

    const handleFileDrop = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        if (fileDraggedIndex !== null && fileDraggedIndex !== index) {
            reorderFavoriteFiles(fileDraggedIndex, index);
        }

        setFileDraggedIndex(null);
        setFileDragOverIndex(null);
    };

    const handleFileDragEnd = () => {
        setFileDraggedIndex(null);
        setFileDragOverIndex(null);
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

    const handleFileClick = (file) => {
        console.log('File clicked:', file);
    };

    // Обработчики drop zone для папок (принятие папок из FileBrowser)
    const handleFolderDropZoneDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const types = Array.from(e.dataTransfer.types);
        if (types.includes('application/x-folder-data') || types.includes('application/json')) {
            setFolderDropZoneActive(true);
        }
    };

    const handleFolderDropZoneDragLeave = (e) => {
        e.preventDefault();
        if (e.currentTarget === e.target || !e.currentTarget.contains(e.relatedTarget)) {
            setFolderDropZoneActive(false);
        }
    };

    const handleFolderDropZoneDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFolderDropZoneActive(false);

        console.log('📁 Folder drop event triggered');

        try {
            // Пробуем получить данные из разных источников
            let folderData = e.dataTransfer.getData('application/x-folder-data');
            if (!folderData) {
                folderData = e.dataTransfer.getData('application/json');
            }

            console.log('📁 Folder data received:', folderData ? 'YES' : 'NO');

            if (folderData) {
                const data = JSON.parse(folderData);
                console.log('📁 Parsed folder data:', data);

                // Проверяем что это папка
                if (data.type === 'folder' || data.type === 'shared-folder') {
                    console.log('📁 Calling addToFavorites with:', data);
                    addToFavorites(data);
                } else {
                    console.log('❌ Not a folder, type:', data.type);
                }
            } else {
                console.log('❌ No folder data in dataTransfer');
            }
        } catch (error) {
            console.error('Error parsing dropped folder data:', error);
        }
    };

    // Обработчики drop zone для файлов (принятие файлов из FileBrowser)
    const handleFileDropZoneDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const types = Array.from(e.dataTransfer.types);
        if (types.includes('application/x-file-data') || types.includes('application/json')) {
            setFileDropZoneActive(true);
        }
    };

    const handleFileDropZoneDragLeave = (e) => {
        e.preventDefault();
        if (e.currentTarget === e.target || !e.currentTarget.contains(e.relatedTarget)) {
            setFileDropZoneActive(false);
        }
    };

    const handleFileDropZoneDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFileDropZoneActive(false);

        try {
            // Пробуем получить данные из разных источников
            let fileData = e.dataTransfer.getData('application/x-file-data');
            if (!fileData) {
                fileData = e.dataTransfer.getData('application/json');
            }

            if (fileData) {
                const data = JSON.parse(fileData);
                // Проверяем что это файл
                if (data.type === 'file') {
                    addFileToFavorites(data);
                }
            }
        } catch (error) {
            console.error('Error handling drop:', error);
        }
    };

    const getFolderContextMenuItems = () => {
        if (!folderContextMenu.folder) return [];

        const folder = folderContextMenu.folder;

        return [
            {
                label: 'Open',
                onClick: () => onFolderClick?.(folder)
            },
            {
                label: 'Remove from Favorites',
                onClick: () => removeFromFavorites(folder.id, folder.storageId)
            }
        ];
    };

    const getFileContextMenuItems = () => {
        if (!fileContextMenu.file) return [];

        const file = fileContextMenu.file;

        return [
            {
                label: 'Open',
                onClick: () => console.log('Open file:', file)
            },
            {
                label: 'Remove from Favorites',
                onClick: () => removeFileFromFavorites(file.id, file.storageId)
            }
        ];
    };

    return (
        <div className="favorites-tabs">
            <div className="favorites-tabs__tab-buttons">
                <button
                    className={`favorites-tabs__tab-button ${activeTab === 'folders' ? 'favorites-tabs__tab-button--active' : ''}`}
                    onClick={() => setActiveTab('folders')}
                >
                    Folders ({favorites.length})
                </button>
                <button
                    className={`favorites-tabs__tab-button ${activeTab === 'files' ? 'favorites-tabs__tab-button--active' : ''}`}
                    onClick={() => setActiveTab('files')}
                >
                    Files ({favoriteFiles.length})
                </button>
            </div>

            <div className="favorites-tabs__content">
                {activeTab === 'folders' && (
                    <div
                        className={`favorites-tabs__panel ${folderDropZoneActive ? 'favorites-tabs__panel--drop-active' : ''}`}
                        onDragOver={handleFolderDropZoneDragOver}
                        onDragLeave={handleFolderDropZoneDragLeave}
                        onDrop={handleFolderDropZoneDrop}
                    >
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
                                        isDragging={folderDraggedIndex === index}
                                        isDragOver={folderDragOverIndex === index}
                                        onDragStart={handleFolderDragStart}
                                        onDragOver={handleFolderDragOver}
                                        onDragLeave={handleFolderDragLeave}
                                        onDrop={handleFolderDrop}
                                        onDragEnd={handleFolderDragEnd}
                                        onContextMenu={handleFolderContextMenu}
                                        onClick={handleFolderClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'files' && (
                    <div
                        className={`favorites-tabs__panel ${fileDropZoneActive ? 'favorites-tabs__panel--drop-active' : ''}`}
                        onDragOver={handleFileDropZoneDragOver}
                        onDragLeave={handleFileDropZoneDragLeave}
                        onDrop={handleFileDropZoneDrop}
                    >
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
                                        isDragging={fileDraggedIndex === index}
                                        isDragOver={fileDragOverIndex === index}
                                        onDragStart={handleFileDragStart}
                                        onDragOver={handleFileDragOver}
                                        onDragLeave={handleFileDragLeave}
                                        onDrop={handleFileDrop}
                                        onDragEnd={handleFileDragEnd}
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
