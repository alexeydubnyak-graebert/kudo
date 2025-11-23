import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumbs.css';

/**
 * Breadcrumbs Component
 * Компонент навигационной цепочки (хлебные крошки)
 * 
 * @param {Array} items - Массив элементов [{id, label, icon, onClick}]
 * @param {string} separator - Разделитель между элементами
 */
const Breadcrumbs = ({ items = [], separator = '/' }) => {
    if (items.length === 0) return null;

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol className="breadcrumbs__list">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.id || index} className="breadcrumbs__item">
                            {item.onClick && !isLast ? (
                                <button
                                    className="breadcrumbs__link"
                                    onClick={() => item.onClick(item)}
                                    type="button"
                                >
                                    {item.icon && (
                                        <span className="breadcrumbs__icon">{item.icon}</span>
                                    )}
                                    <span className="breadcrumbs__label">{item.label}</span>
                                </button>
                            ) : (
                                <span className="breadcrumbs__current">
                                    {item.icon && (
                                        <span className="breadcrumbs__icon">{item.icon}</span>
                                    )}
                                    <span className="breadcrumbs__label">{item.label}</span>
                                </span>
                            )}

                            {!isLast && (
                                <span className="breadcrumbs__separator" aria-hidden="true">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            onClick: PropTypes.func
        })
    ).isRequired,
    separator: PropTypes.string
};

export default Breadcrumbs;
