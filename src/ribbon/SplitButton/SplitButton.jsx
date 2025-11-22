import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import RibbonItem from '../RibbonItem/RibbonItem';
import SplitArrow from '../SplitArrow/SplitArrow';
import './SplitButton.css';

/**
 * SplitButton - Комбо-кнопка из RibbonItem + SplitArrow
 * Используется для кнопок с раскрывающимся меню
 * 
 * @component
 * @example
 * <SplitButton 
 *   icon={<LineIcon />}
 *   label="Line"
 *   onClick={() => console.log('Main action')}
 *   onMenuClick={() => console.log('Menu clicked')}
 * />
 */
const SplitButton = forwardRef(({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
  onMenuClick,
  className = '',
  ...props
}, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setIsMenuOpen(!isMenuOpen);
      if (onMenuClick) {
        onMenuClick(!isMenuOpen);
      }
    }
  };

  const classNames = [
    'split-button',
    active && 'split-button--active',
    disabled && 'split-button--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classNames} {...props}>
      <RibbonItem
        icon={icon}
        label={label}
        active={active}
        disabled={disabled}
        onClick={onClick}
        className="split-button__main"
      />
      <SplitArrow
        active={isMenuOpen}
        disabled={disabled}
        onClick={handleMenuClick}
        className="split-button__arrow"
      />
    </div>
  );
});

SplitButton.displayName = 'SplitButton';

SplitButton.propTypes = {
  /** Иконка компонента (React элемент) */
  icon: PropTypes.node,
  /** Текст метки */
  label: PropTypes.string.isRequired,
  /** Активное состояние основной кнопки */
  active: PropTypes.bool,
  /** Отключенное состояние */
  disabled: PropTypes.bool,
  /** Обработчик клика по основной кнопке */
  onClick: PropTypes.func,
  /** Обработчик клика по стрелке (открытие меню) */
  onMenuClick: PropTypes.func,
  /** Дополнительные CSS классы */
  className: PropTypes.string,
};

export default SplitButton;
