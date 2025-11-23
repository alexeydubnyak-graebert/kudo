import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Select.css';

/**
 * Select Component
 * Компонент выпадающего списка с поддержкой поиска и кастомных опций
 * 
 * @param {Array} options - Массив опций [{value, label, icon, disabled}]
 * @param {string|number} value - Выбранное значение
 * @param {function} onChange - Обработчик изменения значения
 * @param {string} placeholder - Placeholder текст
 * @param {boolean} disabled - Отключен ли select
 * @param {boolean} searchable - Включить поиск
 * @param {boolean} iconOnly - Показывать только иконку без текста
 * @param {string} size - Размер: 'small' | 'medium' | 'large'
 * @param {string} className - Дополнительные CSS классы
 * @param {string} error - Текст ошибки
 */
const Select = ({
    options = [],
    value = null,
    onChange,
    placeholder = 'Select option...',
    disabled = false,
    searchable = false,
    iconOnly = false,
    size = 'medium',
    className = '',
    error = null,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const selectRef = useRef(null);
    const searchInputRef = useRef(null);

    // Находим выбранную опцию
    const selectedOption = options.find(opt => opt.value === value);

    // Фильтруем опции по поисковому запросу
    const filteredOptions = searchable && searchQuery
        ? options.filter(opt =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : options;

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchQuery('');
                setHighlightedIndex(-1);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Фокус на поле поиска при открытии
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    // Обработка клавиатуры
    const handleKeyDown = (e) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSearchQuery('');
                setHighlightedIndex(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    setHighlightedIndex(prev =>
                        prev < filteredOptions.length - 1 ? prev + 1 : prev
                    );
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            default:
                break;
        }
    };

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (isOpen) {
                setSearchQuery('');
                setHighlightedIndex(-1);
            }
        }
    };

    const handleSelect = (option) => {
        if (option.disabled) return;

        onChange && onChange(option.value);
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setHighlightedIndex(-1);
    };

    const selectClasses = [
        'select',
        `select--${size}`,
        isOpen && 'select--open',
        disabled && 'select--disabled',
        error && 'select--error',
        iconOnly && 'select--icon-only',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="select-wrapper" ref={selectRef}>
            <div
                className={selectClasses}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-disabled={disabled}
                {...props}
            >
                <div className="select__value">
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && (
                                <span className="select__icon">{selectedOption.icon}</span>
                            )}
                            {!iconOnly && (
                                <span className="select__label">{selectedOption.label}</span>
                            )}
                        </>
                    ) : (
                        !iconOnly && <span className="select__placeholder">{placeholder}</span>
                    )}
                </div>

                <div className="select__arrow">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="select__dropdown" role="listbox">
                    {searchable && (
                        <div className="select__search">
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="select__search-input"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}

                    <div className="select__options">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={option.value}
                                    className={[
                                        'select__option',
                                        option.value === value && 'select__option--selected',
                                        option.disabled && 'select__option--disabled',
                                        index === highlightedIndex && 'select__option--highlighted'
                                    ].filter(Boolean).join(' ')}
                                    onClick={() => handleSelect(option)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    role="option"
                                    aria-selected={option.value === value}
                                    aria-disabled={option.disabled}
                                >
                                    {option.icon && (
                                        <span className="select__option-icon">{option.icon}</span>
                                    )}
                                    <span className="select__option-label">{option.label}</span>
                                    {option.value === value && (
                                        <span className="select__option-check">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path
                                                    d="M13 4L6 11L3 8"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="select__empty">No options found</div>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <div className="select__error-message">{error}</div>
            )}
        </div>
    );
};

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            disabled: PropTypes.bool
        })
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    searchable: PropTypes.bool,
    iconOnly: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
    error: PropTypes.string
};

export default Select;
