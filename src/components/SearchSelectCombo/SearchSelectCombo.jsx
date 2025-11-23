import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Select from '../Select/Select';
import './SearchSelectCombo.css';

/**
 * SearchSelectCombo Component
 * Комбинированный компонент: выбор хранилища + поиск
 * 
 * @param {Array} storages - Массив хранилищ [{id, name, icon}]
 * @param {string} selectedStorageId - ID выбранного хранилища
 * @param {Function} onStorageChange - Обработчик смены хранилища
 * @param {Function} onSearch - Обработчик поиска
 * @param {string} searchPlaceholder - Placeholder для поиска
 */
const SearchSelectCombo = ({
    storages = [],
    selectedStorageId,
    onStorageChange,
    onSearch,
    searchPlaceholder = 'Search...'
}) => {
    const [searchValue, setSearchValue] = useState('');

    // Преобразуем storages в формат options для Select
    const storageOptions = storages.map(storage => ({
        value: storage.id,
        label: storage.name,
        icon: storage.icon
    }));

    const handleStorageSelect = (storageId) => {
        const storage = storages.find(s => s.id === storageId);
        if (onStorageChange && storage) {
            onStorageChange(storage);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(searchValue);
        }
    };

    const SearchIcon = () => (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );

    const ChevronIcon = () => (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="search-select-combo">
            <Input
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder={searchPlaceholder}
                size="small"
                icon={<SearchIcon />}
            />
            <Select
                options={storageOptions}
                value={selectedStorageId}
                onChange={handleStorageSelect}
                size="small"
                iconOnly
            />
        </div>
    );
};

SearchSelectCombo.propTypes = {
    storages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            icon: PropTypes.node
        })
    ).isRequired,
    selectedStorageId: PropTypes.string,
    onStorageChange: PropTypes.func,
    onSearch: PropTypes.func,
    searchPlaceholder: PropTypes.string
};

export default SearchSelectCombo;
