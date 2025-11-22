import PropTypes from 'prop-types';
import lightIcon from './light/line.svg';
import darkIcon from './dark/line.svg';

/**
 * LineIcon - Иконка инструмента "Линия"
 */
const LineIcon = ({ className = '', theme = 'light' }) => {
    const iconSrc = theme === 'dark' ? darkIcon : lightIcon;
    
    return (
        <img 
            src={iconSrc} 
            alt="Line" 
            className={`ribbon-icon ${className}`}
            width="16"
            height="16"
        />
    );
};

LineIcon.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default LineIcon;

