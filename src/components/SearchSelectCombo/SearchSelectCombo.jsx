import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const selectedStorage = storages.find(s => s.id === selectedStorageId) || storages[0];

    // Закрытие dropdown при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleStorageSelect = (storage) => {
        if (onStorageChange) {
            onStorageChange(storage);
        }
        setIsDropdownOpen(false);
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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );

    const ChevronIcon = () => (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="search-select-combo">
            {/* Search Input */}
            <span className="search-select-combo__search-icon">
                <SearchIcon />
            </span>
            <input
                type="text"
                className="search-select-combo__input"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
            />

            {/* Storage Selector (справа внутри поля) */}
            <div className="search-select-combo__selector">
                <button
                    ref={buttonRef}
                    className="search-select-combo__button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    type="button"
                >
                    {selectedStorage?.icon && (
                        <span className="search-select-combo__icon">
                            {selectedStorage.icon}
                        </span>
                    )}
                    <span className="search-select-combo__chevron">
                        <ChevronIcon />
                    </span>
                </button>

                {isDropdownOpen && (
                    <div ref={dropdownRef} className="search-select-combo__dropdown">
                        <div className="search-select-combo__dropdown-list">
                            {storages.map((storage) => (
                                <button
                                    key={storage.id}
                                    className={`search-select-combo__option ${storage.id === selectedStorageId ? 'search-select-combo__option--selected' : ''
                                        }`}
                                    onClick={() => handleStorageSelect(storage)}
                                    type="button"
                                >
                                    {storage.icon && (
                                        <span className="search-select-combo__option-icon">
                                            {storage.icon}
                                        </span>
                                    )}
                                    <span className="search-select-combo__option-label">
                                        {storage.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
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
