import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '../../components/icons/ChevronDownIcon';
import './SplitArrow.css';

/**
 * SplitArrow - Компонент кнопки со стрелкой (Split Arrow)
 * Используется для раскрывающихся меню в интерфейсе ARES kudo
 * 
 * @component
 * @example
 * <SplitArrow 
 *   onClick={() => console.log('clicked')}
 * />
 */
const SplitArrow = forwardRef(({
  disabled = false,
  onClick,
  className = '',
  active, // Извлекаем active, чтобы не передавать в DOM
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
    'split-arrow',
    disabled && 'split-arrow--disabled',
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
      aria-disabled={disabled}
      aria-label="Раскрыть меню"
      {...props}
    >
      <ChevronDownIcon className="split-arrow__icon" />
    </button>
  );
});

SplitArrow.displayName = 'SplitArrow';

SplitArrow.propTypes = {
  /** Отключенное состояние */
  disabled: PropTypes.bool,
  /** Обработчик клика */
  onClick: PropTypes.func,
  /** Дополнительные CSS классы */
  className: PropTypes.string,
};

export default SplitArrow;
