import React from 'react';
import FolderIcon from '../../assets/file-browser/folder.svg';
import SharedFolderIcon from '../../assets/file-browser/shared folder.svg';
import { useFavorites } from '../../contexts/FavoritesContext';
import './FavoriteItem.css';

const FavoriteItem = ({
    folder,
    index,
    isDragging,
    isDragOver,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onContextMenu,
    onClick
}) => {
    const { removeFromFavorites } = useFavorites();

    const handleDragStart = (e) => {
        onDragStart?.(e, index);
    };

    const handleDragOver = (e) => {
        onDragOver?.(e, index);
    };

    const handleDrop = (e) => {
        onDrop?.(e, index);
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu?.(e, folder);
    };

    const handleClick = () => {
        onClick?.(folder);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        removeFromFavorites(folder.id, folder.storageId);
    };

    const getFolderIcon = () => {
        return FolderIcon;
    };

    return (
        <div
            className={`favorite-item ${isDragging ? 'favorite-item--dragging' : ''} ${isDragOver ? 'favorite-item--drag-over' : ''}`}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={onDragLeave}
            onDrop={handleDrop}
            onDragEnd={onDragEnd}
            onContextMenu={handleContextMenu}
            onClick={handleClick}
        >
            <div className="favorite-item__icon">
                <img src={getFolderIcon()} alt="folder" className="favorite-item__icon-img" />
            </div>
            <div className="favorite-item__name">
                {folder.name}
            </div>
            <button
                className="favorite-item__remove"
                onClick={handleRemove}
                aria-label="Remove from favorites"
            >
                ×
            </button>
        </div>
    );
};

export default FavoriteItem;
