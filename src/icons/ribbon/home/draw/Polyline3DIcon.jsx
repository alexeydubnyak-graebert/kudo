import PropTypes from 'prop-types';
import lightIcon from './light/3d_polyline.svg';
import darkIcon from './dark/3d_polyline.svg';

/**
 * Polyline3DIcon - Иконка инструмента "3D Полилиния"
 */
const Polyline3DIcon = ({ className = '', theme = 'light' }) => {
    const iconSrc = theme === 'dark' ? darkIcon : lightIcon;
    
    return (
        <img 
            src={iconSrc} 
            alt="3D Polyline" 
            className={`ribbon-icon ${className}`}
            width="16"
            height="16"
        />
    );
};

Polyline3DIcon.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default Polyline3DIcon;
