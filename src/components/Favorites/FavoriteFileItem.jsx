import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import FileIcon from '../../assets/file-browser/preview-small.svg';
import './FavoriteFileItem.css';

const FavoriteFileItem = ({
    file,
    index,
    isDragging = false,
    isDragOver = false,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onContextMenu,
    onClick
}) => {
    const { removeFileFromFavorites } = useFavorites();

    const handleDragStart = (e) => {
        onDragStart?.(e, index);
    };

    const handleDragOver = (e) => {
        onDragOver?.(e, index);
    };

    const handleDrop = (e) => {
        onDrop?.(e, index);
    };

    const handleClick = (e) => {
        if (e.button === 0) {
            onClick?.(file);
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu?.(e, file);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        removeFileFromFavorites(file.id, file.storageId);
    };

    const formatSize = (sizeBytes) => {
        if (!sizeBytes) return '';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(sizeBytes) / Math.log(k));
        return Math.round(sizeBytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div
            className={`favorite-file-item ${isDragging ? 'favorite-file-item--dragging' : ''} ${isDragOver ? 'favorite-file-item--drag-over' : ''}`}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={onDragLeave}
            onDrop={handleDrop}
            onDragEnd={onDragEnd}
            onContextMenu={handleContextMenu}
            onClick={handleClick}
        >
            <img src={FileIcon} alt="File" className="favorite-file-item__icon" />
            <div className="favorite-file-item__info">
                <span className="favorite-file-item__name">{file.name}</span>
                {file.size && (
                    <span className="favorite-file-item__size">{formatSize(file.size)}</span>
                )}
            </div>
            <button
                className="favorite-file-item__remove"
                onClick={handleRemove}
                aria-label="Remove from favorites"
            >
                ×
            </button>
        </div>
    );
};

export default FavoriteFileItem;
