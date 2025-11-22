import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import FileBrowserTable from './FileBrowserTable';
import ContextMenu from '../ContextMenu/ContextMenu';
import { getAllItems } from './data/fileSystem';
import { useFavorites } from '../../contexts/FavoritesContext';
import './FileBrowser.css';

/**
 * FileBrowser - Полноценный компонент файлового браузера со всей логикой
 * Включает Sidebar, Header и FileBrowserTable
 */
const FileBrowser = () => {
    const { isFavorite, isFileFavorite, addToFavorites, removeFromFavorites, addFileToFavorites, removeFileFromFavorites } = useFavorites();

    const [theme, setTheme] = useState('dark');
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentFolderId, setCurrentFolderId] = useState('root');
    const [items, setItems] = useState([]);
    const [contextMenu, setContextMenu] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        item: null
    });

    // Загружаем содержимое текущей папки
    useEffect(() => {
        const folderItems = getAllItems(currentFolderId);
        setItems(folderItems);
    }, [currentFolderId]);

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleFileSelect = (file) => {
        setSelectedFileId(file.id);
        console.log('Selected file:', file);
    };

    const handleFileDoubleClick = (file) => {
        console.log('Double clicked file:', file);
        if (file.type === 'folder' || file.type === 'shared-folder') {
            console.log('Opening folder:', file.name);
            setCurrentFolderId(file.id);
            setSelectedFileId(null); // Сбрасываем выделение при переходе в папку
        }
    };

    const handleFolderNameClick = (folder) => {
        console.log('Folder name clicked:', folder.name);
        setCurrentFolderId(folder.id);
        setSelectedFileId(null);
    };

    const handleSidebarToggle = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleFavoriteFolderClick = (folder) => {
        console.log('Favorite folder clicked:', folder);
        setCurrentFolderId(folder.id);
        setSelectedFileId(null);
    };

    const handleContextMenu = (e, item) => {
        e.preventDefault();
        setContextMenu({
            isOpen: true,
            position: { x: e.clientX, y: e.clientY },
            item
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu({
            isOpen: false,
            position: { x: 0, y: 0 },
            item: null
        });
    };

    const getContextMenuItems = () => {
        if (!contextMenu.item) return [];

        const item = contextMenu.item;
        const isFolder = item.type === 'folder' || item.type === 'shared-folder';
        const isFile = item.type === 'file';
        const inFavorites = isFolder
            ? isFavorite(item.id, item.storageId || 'kudo')
            : isFile
                ? isFileFavorite(item.id, item.storageId || 'kudo')
                : false;

        const menuItems = [];

        // Открыть
        if (isFolder) {
            menuItems.push({
                label: 'Open',
                onClick: () => {
                    setCurrentFolderId(item.id);
                    setSelectedFileId(null);
                }
            });
        }

        // Добавить/удалить из избранного
        menuItems.push({
            label: inFavorites ? 'Remove from Favorites' : 'Add to Favorites',
            onClick: () => {
                if (isFolder) {
                    if (inFavorites) {
                        removeFromFavorites(item.id, item.storageId || 'kudo');
                    } else {
                        addToFavorites({
                            ...item,
                            storageId: item.storageId || 'kudo',
                            storageType: item.storageType || 'KUDO'
                        });
                    }
                } else if (isFile) {
                    if (inFavorites) {
                        removeFileFromFavorites(item.id, item.storageId || 'kudo');
                    } else {
                        addFileToFavorites({
                            ...item,
                            storageId: item.storageId || 'kudo',
                            storageType: item.storageType || 'KUDO'
                        });
                    }
                }
            }
        });

        // Поделиться
        menuItems.push({
            label: 'Share',
            onClick: () => {
                console.log('Share:', item);
            }
        });

        // Получить ссылку
        menuItems.push({
            label: 'Get Link',
            onClick: () => {
                console.log('Get Link:', item);
            }
        });

        // Переименовать
        menuItems.push({
            label: 'Rename',
            onClick: () => {
                console.log('Rename:', item);
            }
        });

        // Удалить
        menuItems.push({
            label: 'Delete',
            onClick: () => {
                console.log('Delete:', item);
            }
        });

        return menuItems;
    };

    return (
        <div className="file-browser-page">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={handleSidebarToggle}
                onFolderClick={handleFavoriteFolderClick}
            />
            <div className="file-browser-page__right">
                <Header
                    theme={theme}
                    onThemeToggle={handleThemeToggle}
                />
                <div className="file-browser-page__main">
                    <FileBrowserTable
                        files={items}
                        selectedId={selectedFileId}
                        onFileSelect={handleFileSelect}
                        onFileDoubleClick={handleFileDoubleClick}
                        onFolderNameClick={handleFolderNameClick}
                        onContextMenu={handleContextMenu}
                    />
                </div>
            </div>
            <ContextMenu
                isOpen={contextMenu.isOpen}
                position={contextMenu.position}
                onClose={handleCloseContextMenu}
                items={getContextMenuItems()}
            />
        </div>
    );
};

export default FileBrowser;
