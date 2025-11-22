import React from 'react';
import PropTypes from 'prop-types';
import TitleRow from './TitleRow';
import FileBrowserRow from './FileBrowserRow';
import './FileBrowser.css';

/**
 * FileBrowserTable - Компонент таблицы файлового браузера
 * Адаптирован из favourite-folders с использованием foundation-colors токенов
 * 
 * @component
 */
const FileBrowserTable = ({
    files = [],
    selectedId = null,
    onFileSelect = null,
    onFileDoubleClick = null,
    onFolderNameClick = null,
    onContextMenu = null
}) => {
    const handleRowClick = (file) => {
        if (onFileSelect) {
            onFileSelect(file);
        }
    };

    const handleRowDoubleClick = (file) => {
        if (onFileDoubleClick) {
            onFileDoubleClick(file);
        }
    };


    if (files.length === 0) {
        return (
            <div className="file-browser">
                <div className="file-browser__empty">
                    <div className="file-browser__empty-icon">📁</div>
                    <p className="file-browser__empty-text">Нет файлов для отображения</p>
                </div>
            </div>
        );
    }

    return (
        <div className="file-browser">
            <TitleRow />
            <div className="file-browser__content">
                {files.map((file) => (
                    <FileBrowserRow
                        key={file.id}
                        type={file.type}
                        name={file.name}
                        access={file.access}
                        modified={file.modified}
                        size={file.size}
                        owner={file.owner || 'me'}
                        fileData={file}
                        isActive={selectedId === file.id}
                        isFavorite={file.isFavorite || false}
                        onClick={handleRowClick}
                        onDoubleClick={handleRowDoubleClick}
                        onFolderNameClick={onFolderNameClick}
                        onContextMenu={onContextMenu}
                    />
                ))}
            </div>
        </div>
    );
};

FileBrowserTable.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['file', 'folder', 'shared-folder']).isRequired,
            size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            modified: PropTypes.string,
            owner: PropTypes.string,
            access: PropTypes.string,
            isFavorite: PropTypes.bool
        })
    ),
    selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onFileSelect: PropTypes.func,
    onFileDoubleClick: PropTypes.func,
    onFolderNameClick: PropTypes.func,
    onContextMenu: PropTypes.func
};

export default FileBrowserTable;
