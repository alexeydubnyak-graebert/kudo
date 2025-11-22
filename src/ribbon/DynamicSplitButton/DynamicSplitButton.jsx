import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import RibbonItem from '../RibbonItem/RibbonItem';
import SplitArrow from '../SplitArrow/SplitArrow';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import './DynamicSplitButton.css';

/**
 * DynamicSplitButton - Универсальный SplitButton на основе конфигурации
 */
const DynamicSplitButton = ({ config, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(config.id);
    const dropdownRef = useRef(null);

    // Получаем все элементы из dropdown (включая группы)
    const getAllItems = () => {
        if (!config.dropdown) return [];
        
        const items = [];
        config.dropdown.items.forEach(item => {
            if (item.type === 'group') {
                items.push(...item.items);
            } else {
                items.push(item);
            }
        });
        return items;
    };

    const allItems = getAllItems();
    const selectedItem = allItems.find(item => item.id === selectedId) || {
        id: config.id,
        label: config.label,
        icon: config.icon,
        iconLight: config.iconLight,
        iconDark: config.iconDark
    };

    // Закрытие при клике вне меню
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectItem = (item) => {
        setSelectedId(item.id);
        setIsOpen(false);
        console.log('Selected:', item.id);
    };

    const renderDropdownContent = () => {
        if (!config.dropdown) return null;

        return config.dropdown.items.map((item, index) => {
            if (item.type === 'group') {
                return (
                    <div key={index}>
                        {/* Разделитель сверху */}
                        {(item.dividers || item.dividerTop) && <div className="dynamic-split-button__divider" />}
                        
                        {/* Элементы группы */}
                        {item.items.map(groupItem => renderMenuItem(groupItem))}
                        
                        {/* Разделитель снизу */}
                        {(item.dividers || item.dividerBottom) && <div className="dynamic-split-button__divider" />}
                    </div>
                );
            } else {
                return renderMenuItem(item);
            }
        });
    };

    const renderMenuItem = (item) => (
        <button
            key={item.id}
            className="dynamic-split-button__menu-item"
            onClick={() => handleSelectItem(item)}
        >
            <DynamicIcon 
                icon={item.icon}
                iconLight={item.iconLight}
                iconDark={item.iconDark}
                theme={theme}
                className="dynamic-split-button__menu-icon" 
            />
            <span>{item.label}</span>
        </button>
    );

    return (
        <div className="dynamic-split-button" ref={dropdownRef}>
            <div className="dynamic-split-button__trigger">
                <RibbonItem
                    icon={<DynamicIcon 
                        icon={selectedItem.icon}
                        iconLight={selectedItem.iconLight}
                        iconDark={selectedItem.iconDark}
                        theme={theme}
                    />}
                    label={config.label ? selectedItem.label : ''}
                />
                <SplitArrow onClick={handleToggle} active={isOpen} />
            </div>

            {isOpen && config.dropdown && (
                <div className="dynamic-split-button__menu">
                    {renderDropdownContent()}
                </div>
            )}
        </div>
    );
};

DynamicSplitButton.propTypes = {
    config: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        icon: PropTypes.string.isRequired,
        dropdown: PropTypes.shape({
            items: PropTypes.array.isRequired
        })
    }).isRequired,
    theme: PropTypes.oneOf(['light', 'dark'])
};

export default DynamicSplitButton;
