import PropTypes from 'prop-types';
import lightIcon from './light/ray.svg';
import darkIcon from './dark/ray.svg';

/**
 * RayIcon - Иконка инструмента "Луч"
 */
const RayIcon = ({ className = '', theme = 'light' }) => {
    const iconSrc = theme === 'dark' ? darkIcon : lightIcon;
    
    return (
        <img 
            src={iconSrc} 
            alt="Ray" 
            className={`ribbon-icon ${className}`}
            width="16"
            height="16"
        />
    );
};

RayIcon.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default RayIcon;
