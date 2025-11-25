import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FileCardAvatars from './FileCardAvatars';
import FolderIcon from '../../assets/file-browser/folder.svg';
import SharedFolderIcon from '../../assets/file-browser/shared folder.svg';
import FilePreviewIcon from '../../assets/file-browser/preview-big.svg';
import { useFavorites } from '../../contexts/FavoritesContext';
import StarFilledYellowIcon from '../../assets/file-browser/StarFilledYellow.svg';
import StarIcon from '../../assets/file-browser/Star.svg';
import './FileCard.css';

const FileCard = ({
    file = {},
    isSelected = false,
    onClick = null,
    onDoubleClick = null,
    onOpen = null
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isFavorite, isFileFavorite, addToFavorites, removeFromFavorites, addFileToFavorites, removeFileFromFavorites } = useFavorites();

    const isFolder = file.type === 'folder' || file.type === 'shared-folder';
    const inFavorites = file && (
        isFolder
            ? isFavorite(file.id, file.storageId || 'kudo')
            : isFileFavorite(file.id, file.storageId || 'kudo')
    );

    const handleClick = (e) => {
        if (onClick) {
            onClick(file, e);
        }
    };

    const handleDoubleClick = (e) => {
        if (onDoubleClick) {
            onDoubleClick(file, e);
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B';
        if (isFolder) return file.size || ''; // For folders, size is like "8 items"
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 10) / 10 + sizes[i];
    };

    const formatDate = (dateString) => {
        if (!dateString) return file.modified || '';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}min ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return file.modified || '';
    };

    const getFolderIcon = () => {
        if (file.type === 'shared-folder') return SharedFolderIcon;
        return FolderIcon;
    };

    const handleDragStart = (e) => {
        if (file) {
            e.dataTransfer.effectAllowed = 'copy';
            const dragData = JSON.stringify(file);
            e.dataTransfer.setData('application/json', dragData);

            if (isFolder) {
                e.dataTransfer.setData('application/x-folder-data', dragData);
            } else {
                e.dataTransfer.setData('application/x-file-data', dragData);
            }
        }
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        if (!file) return;

        if (isFolder) {
            if (inFavorites) {
                removeFromFavorites(file.id, file.storageId || 'kudo');
            } else {
                addToFavorites({
                    ...file,
                    storageId: file.storageId || 'kudo',
                    storageType: file.storageType || 'KUDO'
                });
            }
        } else {
            if (inFavorites) {
                removeFileFromFavorites(file.id, file.storageId || 'kudo');
            } else {
                addFileToFavorites({
                    ...file,
                    storageId: file.storageId || 'kudo',
                    storageType: file.storageType || 'KUDO'
                });
            }
        }
    };

    return (
        <div
            className={`start-page-card ${isDropdownOpen ? 'dropdown-active' : ''}`}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            draggable={!!file}
            onDragStart={handleDragStart}
        >
            <div className="start-page-card-image-wrapper">
                {isFolder ? (
                    <div className="start-page-card-folder-preview">
                        <img
                            src={getFolderIcon()}
                            alt={file.name}
                            className="start-page-card-folder-icon"
                        />
                    </div>
                ) : file.thumbnail ? (
                    <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="start-page-card-image"
                    />
                ) : (
                    <div className="start-page-card-folder-preview">
                        <img
                            src={FilePreviewIcon}
                            alt={file.name}
                            className="start-page-card-folder-icon"
                        />
                    </div>
                )}
                <button
                    className="start-page-card-favorite-button"
                    onClick={handleToggleFavorite}
                    title={inFavorites ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <img
                        src={inFavorites ? StarFilledYellowIcon : StarIcon}
                        alt="Favorite"
                        className="start-page-card-favorite-icon"
                    />
                </button>
            </div>

            <div className="start-page-card-filename">
                <span className="start-page-card-filename-text">
                    {file.name}
                </span>
            </div>

            <div className="start-page-card-actions">
                <button
                    className="action-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onOpen) {
                            onOpen(file);
                        }
                    }}
                >
                    Open
                </button>
                {!isFolder && (
                    <FileCardAvatars
                        viewers={file.viewers || []}
                        onDropdownChange={setIsDropdownOpen}
                    />
                )}
            </div>

            <div className="start-page-card-footer">
                <span className="start-page-card-last-opened">
                    {formatDate(file.lastModified)}
                </span>
                <span className="start-page-card-filesize">
                    {formatFileSize(file.size)}
                </span>
            </div>
        </div>
    );
};

FileCard.propTypes = {
    file: PropTypes.object,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onOpen: PropTypes.func
};

export default FileCard;
