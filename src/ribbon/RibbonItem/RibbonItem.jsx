import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './RibbonItem.css';

/**
 * RibbonItem - Компонент элемента ленты (Ribbon Item)
 * Используется в интерфейсе ARES kudo для создания интерактивных элементов ленты
 * 
 * @component
 * @example
 * <RibbonItem 
 *   icon={<CurrentIcon />} 
 *   label="Текущий"
 *   active={true}
 *   onClick={() => console.log('clicked')}
 * />
 */
const RibbonItem = forwardRef(({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}, ref) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  const classNames = [
    'ribbon-item',
    active && 'ribbon-item--active',
    disabled && 'ribbon-item--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      aria-pressed={active}
      aria-disabled={disabled}
      {...props}
    >
      {icon && (
        <span className="ribbon-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {label && (
        <span className="ribbon-item__label">
          {label}
        </span>
      )}
    </button>
  );
});

RibbonItem.displayName = 'RibbonItem';

RibbonItem.propTypes = {
  /** Иконка компонента (React элемент) */
  icon: PropTypes.node,
  /** Текст метки */
  label: PropTypes.string,
  /** Активное состояние */
  active: PropTypes.bool,
  /** Отключенное состояние */
  disabled: PropTypes.bool,
  /** Обработчик клика */
  onClick: PropTypes.func,
  /** Дополнительные CSS классы */
  className: PropTypes.string,
};

export default RibbonItem;
