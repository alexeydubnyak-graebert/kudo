import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Button Component
 * Универсальная кнопка с поддержкой различных вариантов и иконок
 * 
 * @param {string} variant - Вариант кнопки: 'primary' | 'secondary'
 * @param {string} iconPosition - Позиция иконки: 'left' | 'right' | 'only' | null
 * @param {ReactNode} icon - Иконка (SVG или компонент)
 * @param {string} children - Текст кнопки
 * @param {boolean} disabled - Отключена ли кнопка
 * @param {function} onClick - Обработчик клика
 * @param {string} className - Дополнительные CSS классы
 * @param {string} type - Тип кнопки: 'button' | 'submit' | 'reset'
 */
const Button = ({
    variant = 'primary',
    iconPosition = null,
    icon = null,
    children,
    disabled = false,
    onClick,
    className = '',
    type = 'button',
    ...props
}) => {
    const buttonClasses = [
        'button',
        `button--${variant}`,
        iconPosition && `button--icon-${iconPosition}`,
        disabled && 'button--disabled',
        className
    ].filter(Boolean).join(' ');

    const renderContent = () => {
        if (iconPosition === 'only') {
            return <span className="button__icon">{icon}</span>;
        }

        if (iconPosition === 'left') {
            return (
                <>
                    <span className="button__icon">{icon}</span>
                    <span className="button__text">{children}</span>
                </>
            );
        }

        if (iconPosition === 'right') {
            return (
                <>
                    <span className="button__text">{children}</span>
                    <span className="button__icon">{icon}</span>
                </>
            );
        }

        return <span className="button__text">{children}</span>;
    };

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {renderContent()}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']),
    iconPosition: PropTypes.oneOf(['left', 'right', 'only', null]),
    icon: PropTypes.node,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;
