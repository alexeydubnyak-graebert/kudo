import React from 'react';
import PropTypes from 'prop-types';
import FileCard from '../FileCard/FileCard';
import './FileBrowserGrid.css';

const FileBrowserGrid = ({
    files = [],
    selectedId = null,
    onFileSelect = null,
    onFileDoubleClick = null,
    onFileOpen = null,
    cardsPerRow = 5
}) => {
    const handleCardClick = (file, e) => {
        if (onFileSelect) {
            onFileSelect(file);
        }
    };

    const handleCardDoubleClick = (file, e) => {
        if (onFileDoubleClick) {
            onFileDoubleClick(file);
        }
    };

    return (
        <div className="file-browser-grid" style={{ '--cards-per-row': cardsPerRow }}>
            {files.map((file) => (
                <FileCard
                    key={file.id}
                    file={file}
                    isSelected={file.id === selectedId}
                    onClick={handleCardClick}
                    onDoubleClick={handleCardDoubleClick}
                    onOpen={onFileOpen}
                />
            ))}
        </div>
    );
};

FileBrowserGrid.propTypes = {
    files: PropTypes.array,
    selectedId: PropTypes.string,
    onFileSelect: PropTypes.func,
    onFileDoubleClick: PropTypes.func,
    onFileOpen: PropTypes.func,
    cardsPerRow: PropTypes.number
};

export default FileBrowserGrid;
