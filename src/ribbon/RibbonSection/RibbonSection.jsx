import PropTypes from 'prop-types';
import RibbonRow from '../RibbonRow/RibbonRow';
import './RibbonSection.css';

/**
 * RibbonSection - Секция ribbon с названием и рядами элементов
 */
const RibbonSection = ({ name, rows, theme }) => {
    return (
        <div className="ribbon-section">
            <div className="ribbon-section__content">
                {rows.map((row, index) => (
                    <RibbonRow key={index} items={row.items} theme={theme} />
                ))}
            </div>
            <div className="ribbon-section__label">{name}</div>
        </div>
    );
};

RibbonSection.propTypes = {
    name: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            items: PropTypes.array.isRequired
        })
    ).isRequired,
    theme: PropTypes.oneOf(['light', 'dark'])
};

export default RibbonSection;
