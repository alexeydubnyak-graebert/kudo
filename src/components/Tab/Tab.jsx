import React from 'react';
import PropTypes from 'prop-types';
import './Tab.css';

/**
 * Tab Component
 * Компонент вкладки с размерами как у Select
 * 
 * @param {string} size - Размер: 'small' | 'medium' | 'large'
 * @param {boolean} active - Активна ли вкладка
 * @param {node} icon - Иконка
 * @param {string} label - Текст label
 * @param {function} onClick - Обработчик клика
 * @param {string} className - Дополнительные CSS классы
 */
const Tab = ({
    size = 'medium',
    active = false,
    icon = null,
    label = '',
    onClick,
    className = '',
    ...props
}) => {
    const tabClasses = [
        'tab',
        `tab--${size}`,
        active && 'tab--active',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={tabClasses}
            onClick={onClick}
            {...props}
        >
            {icon && (
                <span className="tab__icon">
                    {icon}
                </span>
            )}
            {label && (
                <span className="tab__label">{label}</span>
            )}
        </button>
    );
};

Tab.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    active: PropTypes.bool,
    icon: PropTypes.node,
    label: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default Tab;
