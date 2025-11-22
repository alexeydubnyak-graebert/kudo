import React from 'react';
import './FileBrowserRow.css';
import { useFavorites } from '../../contexts/FavoritesContext';
import ShareSharpIcon from '../../assets/file-browser/ShareSharp.svg';
import LinkSharpIcon from '../../assets/file-browser/LinkSharp.svg';
import ActionsIcon from '../../assets/file-browser/actions.svg';
import StarFilledGrayIcon from '../../assets/file-browser/StarFilledGray.svg';
import StarFilledYellowIcon from '../../assets/file-browser/StarFilledYellow.svg';
import FolderIcon from '../../assets/file-browser/folder.svg';
import SharedFolderIcon from '../../assets/file-browser/shared folder.svg';
import PreviewSmallIcon from '../../assets/file-browser/preview-small.svg';

const FileBrowserRow = ({
    type = 'file',
    name = 'Untitled',
    access = null,
    modified = 'Unknown',
    size = null,
    owner = 'me',
    onClick = null,
    onDoubleClick = null,
    onFolderNameClick = null,
    onShare = null,
    onLink = null,
    onPermissions = null,
    onFolderInsights = null,
    onToggleFavorite = null,
    onContextMenu = null,
    fileData = null,
    isActive = false,
    ...props
}) => {
    const { isFavorite, isFileFavorite, addToFavorites, removeFromFavorites, addFileToFavorites, removeFileFromFavorites } = useFavorites();

    const isFolder = type === 'folder' || type === 'shared-folder';
    const isFile = type === 'file';

    // Проверяем, находится ли элемент в избранном
    const inFavorites = fileData && (
        isFolder
            ? isFavorite(fileData.id, fileData.storageId || 'kudo')
            : isFile
                ? isFileFavorite(fileData.id, fileData.storageId || 'kudo')
                : false
    );

    const getIcon = () => {
        if (type === 'folder') {
            return FolderIcon;
        } else if (type === 'shared-folder') {
            return SharedFolderIcon;
        } else {
            return PreviewSmallIcon;
        }
    };

    const getIconClassName = () => {
        if (type === 'folder' || type === 'shared-folder') {
            return 'file-browser-row__folder-icon-img';
        } else {
            return 'file-browser-row__file-icon-img';
        }
    };

    const formatSize = (sizeBytes) => {
        if (!sizeBytes || isFolder) return '';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(sizeBytes) / Math.log(k));
        return Math.round(sizeBytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleRowClick = (e) => {
        if (onClick) {
            onClick(fileData || { type, name, access, modified, size, owner });
        }
    };

    const handleRowDoubleClick = (e) => {
        if (onDoubleClick) {
            onDoubleClick(fileData || { type, name, access, modified, size, owner });
        }
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        if (isFolder && onFolderNameClick) {
            onFolderNameClick(fileData || { type, name, access, modified, size, owner });
        }
    };

    const handleShare = (e) => {
        e.stopPropagation();
        onShare?.(fileData);
    };

    const handleLink = (e) => {
        e.stopPropagation();
        onLink?.(fileData);
    };

    const handlePermissions = (e) => {
        e.stopPropagation();
        onPermissions?.(fileData);
    };

    const handleFolderInsights = (e) => {
        e.stopPropagation();
        onFolderInsights?.(fileData);
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();

        if (!fileData) return;

        if (isFolder) {
            if (inFavorites) {
                removeFromFavorites(fileData.id, fileData.storageId || 'kudo');
            } else {
                addToFavorites({
                    ...fileData,
                    storageId: fileData.storageId || 'kudo',
                    storageType: fileData.storageType || 'KUDO'
                });
            }
        } else if (isFile) {
            if (inFavorites) {
                removeFileFromFavorites(fileData.id, fileData.storageId || 'kudo');
            } else {
                addFileToFavorites({
                    ...fileData,
                    storageId: fileData.storageId || 'kudo',
                    storageType: fileData.storageType || 'KUDO'
                });
            }
        }

        onToggleFavorite?.(fileData);
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        onContextMenu?.(e, fileData);
    };

    // Обработчики для drag-and-drop
    const handleDragStart = (e) => {
        if (fileData) {
            e.dataTransfer.effectAllowed = 'copy';
            // Устанавливаем данные в разных форматах для совместимости
            const dragData = JSON.stringify(fileData);
            e.dataTransfer.setData('application/json', dragData);

            // Специфичные типы для папок и файлов
            if (isFolder) {
                e.dataTransfer.setData('application/x-folder-data', dragData);
            } else if (isFile) {
                e.dataTransfer.setData('application/x-file-data', dragData);
            }
        }
    };

    return (
        <div
            className={`file-browser-row ${isActive ? 'file-browser-row--active' : ''}`}
            onClick={handleRowClick}
            onDoubleClick={handleRowDoubleClick}
            onContextMenu={handleContextMenu}
            draggable={!!fileData}
            onDragStart={handleDragStart}
        >
            {/* NAME секция */}
            <div className="file-browser-row__name-section">
                <div className="file-browser-row__icon">
                    <img src={getIcon()} alt={type} className={getIconClassName()} />
                </div>
                <span
                    className={`file-browser-row__name ${isFolder ? 'file-browser-row__name--folder' : ''}`}
                    onClick={handleNameClick}
                >
                    {name}
                </span>
            </div>

            {/* ACCESS секция - кнопки Share и Link */}
            <div className="file-browser-row__access-section">
                <button
                    className="file-browser-row__action-btn"
                    onClick={handleShare}
                    title="Share"
                >
                    <img src={ShareSharpIcon} alt="Share" />
                </button>
                <button
                    className="file-browser-row__action-btn"
                    onClick={handleLink}
                    title="Link"
                >
                    <img src={LinkSharpIcon} alt="Link" />
                </button>
            </div>

            {/* ACTIONS секция - Permissions и Favorites */}
            <div className="file-browser-row__actions-section">
                <button
                    className="file-browser-row__action-btn"
                    onClick={isFolder ? handleFolderInsights : handlePermissions}
                    title={isFolder ? "Folder Insights" : "Permissions"}
                >
                    <img src={ActionsIcon} alt={isFolder ? "Insights" : "Permissions"} />
                </button>
                <button
                    className={`file-browser-row__action-btn ${inFavorites ? 'file-browser-row__action-btn--favorite-active' : ''}`}
                    onClick={handleToggleFavorite}
                    title={inFavorites ? "Remove from Favorites" : "Add to Favorites"}
                >
                    <img src={inFavorites ? StarFilledYellowIcon : StarFilledGrayIcon} alt="Favorite" />
                </button>
            </div>

            {/* MODIFIED секция */}
            <div className="file-browser-row__modified-section">
                <span className="file-browser-row__modified-text">
                    {modified}, <strong>{owner}</strong>
                </span>
            </div>

            {/* SIZE секция */}
            <div className="file-browser-row__size-section">
                {!isFolder ? (
                    <span className="file-browser-row__size">{formatSize(size)}</span>
                ) : (
                    <div className="file-browser-row__size-placeholder" />
                )}
            </div>
        </div>
    );
};

export default FileBrowserRow;
