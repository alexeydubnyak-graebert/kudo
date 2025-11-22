import PropTypes from 'prop-types';
import RibbonItem from '../RibbonItem/RibbonItem';
import DynamicSplitButton from '../DynamicSplitButton/DynamicSplitButton';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import './RibbonRow.css';

/**
 * RibbonRow - Ряд элементов в ribbon
 */
const RibbonRow = ({ items, theme }) => {
    const renderItem = (item) => {
        switch (item.type) {
            case 'ribbonitem':
                return (
                    <RibbonItem
                        key={item.id}
                        icon={<DynamicIcon 
                            icon={item.icon} 
                            iconLight={item.iconLight}
                            iconDark={item.iconDark}
                            theme={theme}
                        />}
                        label={item.label}
                    />
                );
            
            case 'splitbutton':
                return (
                    <DynamicSplitButton
                        key={item.id}
                        config={item}
                        theme={theme}
                    />
                );
            
            case 'select':
                // TODO: Реализовать компонент Select
                return (
                    <div key={item.id} className="ribbon-select-placeholder">
                        {item.label}
                    </div>
                );
            
            default:
                console.warn(`Unknown ribbon item type: ${item.type}`);
                return null;
        }
    };

    return (
        <div className="ribbon-row">
            {items.map(renderItem)}
        </div>
    );
};

RibbonRow.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            label: PropTypes.string,
            icon: PropTypes.string
        })
    ).isRequired,
    theme: PropTypes.oneOf(['light', 'dark'])
};

export default RibbonRow;
