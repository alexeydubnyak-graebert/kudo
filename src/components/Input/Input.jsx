import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * Input Component
 * Базовый компонент текстового поля с поддержкой иконок
 * 
 * @param {string} value - Значение input
 * @param {function} onChange - Обработчик изменения значения
 * @param {string} placeholder - Placeholder текст
 * @param {boolean} disabled - Отключен ли input
 * @param {string} size - Размер: 'small' | 'medium' | 'large'
 * @param {node} icon - Иконка (слева)
 * @param {string} className - Дополнительные CSS классы
 * @param {string} error - Текст ошибки
 */
const Input = forwardRef(({
    value = '',
    onChange,
    onKeyDown,
    placeholder = '',
    disabled = false,
    size = 'medium',
    icon = null,
    className = '',
    error = null,
    type = 'text',
    ...props
}, ref) => {
    const inputClasses = [
        'input',
        `input--${size}`,
        icon && 'input--with-icon',
        disabled && 'input--disabled',
        error && 'input--error',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="input-wrapper">
            <div className={inputClasses}>
                {icon && (
                    <span className="input__icon">
                        {icon}
                    </span>
                )}
                <input
                    ref={ref}
                    type={type}
                    className="input__field"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...props}
                />
            </div>
            {error && (
                <span className="input__error-text">{error}</span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    icon: PropTypes.node,
    className: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string
};

export default Input;
