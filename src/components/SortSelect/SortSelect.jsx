import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SortSelect.css';

/**
 * SortSelect Component
 * Компонент для выбора сортировки файлов
 * 
 * @param {string} value - Текущее значение сортировки
 * @param {Function} onChange - Обработчик изменения сортировки
 */
const SortSelect = ({ value = 'filename-asc', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const sortOptions = [
        { value: 'filename-asc', label: 'Sort Filename by: A→Z' },
        { value: 'filename-desc', label: 'Sort Filename by: Z→A' },
        { value: 'date-newest', label: 'Sort by Date: Newest' },
        { value: 'date-oldest', label: 'Sort by Date: Oldest' }
    ];

    const selectedOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];

    // Закрытие dropdown при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (option) => {
        if (onChange) {
            onChange(option.value);
        }
        setIsOpen(false);
    };

    const ChevronIcon = () => (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="sort-select">
            <button
                ref={buttonRef}
                className={`sort-select__button ${isOpen ? 'sort-select__button--open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span className="sort-select__label">{selectedOption.label}</span>
                <span className="sort-select__chevron">
                    <ChevronIcon />
                </span>
            </button>

            {isOpen && (
                <div ref={dropdownRef} className="sort-select__dropdown">
                    <div className="sort-select__options">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`sort-select__option ${option.value === value ? 'sort-select__option--selected' : ''
                                    }`}
                                onClick={() => handleSelect(option)}
                                type="button"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

SortSelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SortSelect;
