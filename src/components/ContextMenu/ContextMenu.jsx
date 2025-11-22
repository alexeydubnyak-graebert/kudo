import React, { useEffect, useRef } from 'react';
import './ContextMenu.css';

const ContextMenu = ({ isOpen, position, onClose, items = [] }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Корректируем позицию меню, чтобы оно не выходило за границы экрана
    const adjustPosition = () => {
        if (!menuRef.current) return position;

        const menuRect = menuRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let { x, y } = position;

        // Проверяем правую границу
        if (x + menuRect.width > viewportWidth) {
            x = viewportWidth - menuRect.width - 10;
        }

        // Проверяем нижнюю границу
        if (y + menuRect.height > viewportHeight) {
            y = viewportHeight - menuRect.height - 10;
        }

        // Проверяем левую границу
        if (x < 10) {
            x = 10;
        }

        // Проверяем верхнюю границу
        if (y < 10) {
            y = 10;
        }

        return { x, y };
    };

    const adjustedPosition = adjustPosition();

    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{
                left: `${adjustedPosition.x}px`,
                top: `${adjustedPosition.y}px`
            }}
        >
            {items.map((item, index) => (
                <button
                    key={index}
                    className={`context-menu__item ${item.active ? 'context-menu__item--active' : ''}`}
                    onClick={() => {
                        item.onClick?.();
                        onClose();
                    }}
                    disabled={item.disabled}
                >
                    {item.icon && (
                        <img src={item.icon} alt="" className="context-menu__icon" />
                    )}
                    <span className="context-menu__text">{item.label}</span>
                    {item.badge && (
                        <span className="context-menu__badge">{item.badge}</span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ContextMenu;
