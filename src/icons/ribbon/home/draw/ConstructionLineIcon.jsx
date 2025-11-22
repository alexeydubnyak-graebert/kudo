import PropTypes from 'prop-types';
import lightIcon from './light/constuction_line.svg';
import darkIcon from './dark/constuction_line.svg';

/**
 * ConstructionLineIcon - Иконка инструмента "Вспомогательная линия"
 */
const ConstructionLineIcon = ({ className = '', theme = 'light' }) => {
    const iconSrc = theme === 'dark' ? darkIcon : lightIcon;
    
    return (
        <img 
            src={iconSrc} 
            alt="Construction Line" 
            className={`ribbon-icon ${className}`}
            width="16"
            height="16"
        />
    );
};

ConstructionLineIcon.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default ConstructionLineIcon;
