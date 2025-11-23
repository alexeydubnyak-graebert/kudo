import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import SearchSelectCombo from '../SearchSelectCombo/SearchSelectCombo';
import Select from '../Select/Select';
import FileBrowserTable from './FileBrowserTable';
import ContextMenu from '../ContextMenu/ContextMenu';
import FileDetails from '../FileDetails/FileDetails';
import Tab from '../Tab/Tab';
import { getAllItems } from './data/fileSystem';
import { useFavorites } from '../../contexts/FavoritesContext';
import './FileBrowser.css';

// Импорт иконок для табов
import GridIcon from '../../assets/file-browser/grid_view.svg';
import ListIcon from '../../assets/file-browser/list_view.svg';

// Импорт иконок хранилищ
import KudoStorageIconSvg from '../../assets/storage/ares.svg';
import GoogleDriveIconSvg from '../../assets/storage/google-drive.svg';
import OneDriveIconSvg from '../../assets/storage/onedrive.svg';
import DropboxIconSvg from '../../assets/storage/dropbox.svg';
import BoxIconSvg from '../../assets/storage/box.svg';
import SharePointIconSvg from '../../assets/storage/sharepoint.svg';
import NextcloudIconSvg from '../../assets/storage/nextcloud.svg';
import WebDavIconSvg from '../../assets/storage/WebDav.svg';

// Компоненты иконок
const KudoStorageIcon = () => <img src={KudoStorageIconSvg} alt="" width="16" height="16" />;
const GoogleDriveIcon = () => <img src={GoogleDriveIconSvg} alt="" width="16" height="16" />;
const OneDriveIcon = () => <img src={OneDriveIconSvg} alt="" width="16" height="16" />;
const DropboxIcon = () => <img src={DropboxIconSvg} alt="" width="16" height="16" />;
const BoxIcon = () => <img src={BoxIconSvg} alt="" width="16" height="16" />;
const SharePointIcon = () => <img src={SharePointIconSvg} alt="" width="16" height="16" />;
const NextcloudIcon = () => <img src={NextcloudIconSvg} alt="" width="16" height="16" />;
const WebDavIcon = () => <img src={WebDavIconSvg} alt="" width="16" height="16" />;

// Список всех хранилищ
const STORAGES = [
    { id: 'kudo-storage', name: 'Kudo Storage', icon: <KudoStorageIcon /> },
    { id: 'google-drive', name: 'Google Drive', icon: <GoogleDriveIcon /> },
    { id: 'one-drive', name: 'One Drive', icon: <OneDriveIcon /> },
    { id: 'dropbox', name: 'Dropbox', icon: <DropboxIcon /> },
    { id: 'box', name: 'Box', icon: <BoxIcon /> },
    { id: 'sharepoint', name: 'SharePoint', icon: <SharePointIcon /> },
    { id: 'nextcloud', name: 'Nextcloud', icon: <NextcloudIcon /> },
    { id: 'webdav', name: 'WebDAV', icon: <WebDavIcon /> }
];

// Опции сортировки
const SORT_OPTIONS = [
    { value: 'filename-asc', label: 'Sort Filename by: A→Z' },
    { value: 'filename-desc', label: 'Sort Filename by: Z→A' },
    { value: 'date-newest', label: 'Sort by Date: Newest' },
    { value: 'date-oldest', label: 'Sort by Date: Oldest' }
];

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
    const [sortBy, setSortBy] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
    const [contextMenu, setContextMenu] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        item: null
    });
    const [fileDetailsVisible, setFileDetailsVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileDetailsTab, setFileDetailsTab] = useState('properties');
    const [activeStorage, setActiveStorage] = useState({
        id: 'kudo-storage',
        name: 'Kudo Storage',
        icon: <KudoStorageIcon />
    });
    const [breadcrumbsPath, setBreadcrumbsPath] = useState([]);

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
        setSelectedFile(file);
        setFileDetailsVisible(true);
        setFileDetailsTab('properties');
        console.log('Selected file:', file);
    };

    const handleFileDoubleClick = (file) => {
        console.log('Double clicked file:', file);
        if (file.type === 'folder' || file.type === 'shared-folder') {
            console.log('Opening folder:', file.name);
            setCurrentFolderId(file.id);
            setSelectedFileId(null);
            // Добавляем папку в breadcrumbs
            setBreadcrumbsPath([...breadcrumbsPath, {
                id: file.id,
                label: file.name,
                onClick: handleBreadcrumbClick
            }]);
        }
    };

    const handleFolderNameClick = (file) => {
        console.log('Folder name clicked:', file);
        if (file.type === 'folder' || file.type === 'shared-folder') {
            setCurrentFolderId(file.id);
            setSelectedFileId(null);
            // Добавляем папку в breadcrumbs
            setBreadcrumbsPath([...breadcrumbsPath, {
                id: file.id,
                label: file.name,
                onClick: handleBreadcrumbClick
            }]);
        }
    };

    const handleFolderInsights = (file) => {
        console.log('Folder insights clicked:', file);
        setSelectedFile(file);
        setFileDetailsVisible(true);
        setFileDetailsTab('insights');
        setSelectedFileId(null);
    };

    const handleSidebarToggle = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleStorageChange = (storage) => {
        console.log('Storage changed:', storage);
        setActiveStorage(storage);
        setCurrentFolderId('root');
        setSelectedFileId(null);
        setBreadcrumbsPath([]);
    };

    const handleBreadcrumbClick = (item) => {
        console.log('Breadcrumb clicked:', item);
        if (item.id === 'storage') {
            setCurrentFolderId('root');
            setBreadcrumbsPath([]);
        } else {
            setCurrentFolderId(item.id);
            // Обрезаем path до выбранного элемента
            const itemIndex = breadcrumbsPath.findIndex(p => p.id === item.id);
            if (itemIndex !== -1) {
                setBreadcrumbsPath(breadcrumbsPath.slice(0, itemIndex + 1));
            }
        }
        setSelectedFileId(null);
    };

    const handleSearch = (searchQuery) => {
        console.log('Search:', searchQuery, 'in storage:', activeStorage.id);
        // TODO: Implement search functionality
    };

    const handleSortChange = (newSortBy) => {
        console.log('Sort changed:', newSortBy);
        setSortBy(newSortBy);
        // TODO: Implement sorting functionality
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

    // Формируем breadcrumbs items
    const breadcrumbsItems = [
        {
            id: 'storage',
            label: activeStorage.name,
            icon: activeStorage.icon,
            onClick: handleBreadcrumbClick
        },
        ...breadcrumbsPath
    ];

    return (
        <div className="file-browser-page">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={handleSidebarToggle}
                onFolderClick={handleFavoriteFolderClick}
                onStorageChange={handleStorageChange}
            />
            <div className="file-browser-page__right">
                <Header
                    theme={theme}
                    onThemeToggle={handleThemeToggle}
                />
                <div className="file-browser-page__main">
                    <div className="file-browser-page__toolbar">
                        <Breadcrumbs items={breadcrumbsItems} />
                        <SearchSelectCombo
                            storages={STORAGES}
                            selectedStorageId={activeStorage.id}
                            onStorageChange={handleStorageChange}
                            onSearch={handleSearch}
                            searchPlaceholder="Search files and folders..."
                        />
                        <Select
                            options={SORT_OPTIONS}
                            value={sortBy}
                            onChange={handleSortChange}
                            placeholder="Sort by..."
                            size="small"
                        />

                        {/* View Mode Tabs */}
                        <div className="file-browser-page__view-tabs">
                            <Tab
                                size="small"
                                active={viewMode === 'list'}
                                icon={<img src={ListIcon} alt="List view" />}
                                onClick={() => setViewMode('list')}
                            />
                            <Tab
                                size="small"
                                active={viewMode === 'grid'}
                                icon={<img src={GridIcon} alt="Grid view" />}
                                onClick={() => setViewMode('grid')}
                            />
                        </div>
                    </div>
                    <div className="file-browser-page__content">
                        <FileBrowserTable
                            files={items}
                            selectedId={selectedFileId}
                            onFileSelect={handleFileSelect}
                            onFileDoubleClick={handleFileDoubleClick}
                            onFolderNameClick={handleFolderNameClick}
                            onFolderInsights={handleFolderInsights}
                            onContextMenu={handleContextMenu}
                        />
                        <FileDetails
                            file={selectedFile}
                            isVisible={fileDetailsVisible}
                            onClose={() => setFileDetailsVisible(false)}
                            initialTab={fileDetailsTab}
                        />
                    </div>
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
