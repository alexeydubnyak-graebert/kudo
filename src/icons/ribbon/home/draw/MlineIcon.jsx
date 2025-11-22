import PropTypes from 'prop-types';
import lightIcon from './light/mline.svg';
import darkIcon from './dark/mline.svg';

/**
 * MlineIcon - Иконка инструмента "Мультилиния"
 */
const MlineIcon = ({ className = '', theme = 'light' }) => {
    const iconSrc = theme === 'dark' ? darkIcon : lightIcon;
    
    return (
        <img 
            src={iconSrc} 
            alt="Multiline" 
            className={`ribbon-icon ${className}`}
            width="16"
            height="16"
        />
    );
};

MlineIcon.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default MlineIcon;
