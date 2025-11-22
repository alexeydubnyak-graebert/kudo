import PropTypes from 'prop-types';
import { useMemo } from 'react';

/**
 * DynamicIcon - Компонент для отображения иконок
 * Поддерживает разные пути для светлой и темной темы
 */
const DynamicIcon = ({ icon, iconLight, iconDark, theme = 'light', className = '' }) => {
    const iconSrc = useMemo(() => {
        // Если указаны отдельные пути для тем, используем их
        if (iconLight || iconDark) {
            return theme === 'dark' ? iconDark : iconLight;
        }
        
        // Иначе используем общий путь
        return icon;
    }, [icon, iconLight, iconDark, theme]);

    if (!iconSrc) return null;

    return (
        <img 
            src={iconSrc} 
            alt={icon} 
            className={`ribbon-icon ${className}`}
            width="16"
            height="16"
        />
    );
};

DynamicIcon.propTypes = {
    icon: PropTypes.string,
    iconLight: PropTypes.string,
    iconDark: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
    className: PropTypes.string
};

export default DynamicIcon;
