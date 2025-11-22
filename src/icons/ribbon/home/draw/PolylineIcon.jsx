import PropTypes from 'prop-types';
import lightIcon from './light/polyline.svg';
import darkIcon from './dark/polyline.svg';

/**
 * PolylineIcon - Иконка инструмента "Полилиния"
 */
const PolylineIcon = ({ className = '', theme = 'light' }) => {
    const iconSrc = theme === 'dark' ? darkIcon : lightIcon;
    
    return (
        <img 
            src={iconSrc} 
            alt="Polyline" 
            className={`ribbon-icon ${className}`}
            width="16"
            height="16"
        />
    );
};

PolylineIcon.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default PolylineIcon;

