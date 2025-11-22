import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import RibbonItem from '../RibbonItem/RibbonItem';
import SplitArrow from '../SplitArrow/SplitArrow';
import { 
    LineIcon, 
    ConstructionLineIcon,
    RayIcon,
    MlineIcon
} from '../../icons/ribbon/home/draw';
import './LineDropdown.css';

/**
 * LineDropdown - Компонент выпадающего меню для выбора типа линии
 * Объединяет RibbonItem и SplitArrow с выпадающим меню
 */
const LineDropdown = ({ theme = 'light' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLineId, setSelectedLineId] = useState('line');
    const dropdownRef = useRef(null);

    const lineTypes = [
        { id: 'line', label: 'Line', icon: LineIcon, highlighted: false },
        { id: 'infiniteLine', label: 'Infinite Line', icon: ConstructionLineIcon, highlighted: true },
        { id: 'ray', label: 'Ray', icon: RayIcon, highlighted: true },
        { id: 'richLine', label: 'RichLine', icon: MlineIcon, highlighted: false },
    ];

    const selectedLineType = lineTypes.find(type => type.id === selectedLineId) || lineTypes[0];

    // Закрытие при клике вне меню
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectLine = (lineType) => {
        setSelectedLineId(lineType.id);
        setIsOpen(false);
    };

    const SelectedIcon = selectedLineType.icon;

    return (
        <div className="line-dropdown" ref={dropdownRef}>
            <div className="line-dropdown__trigger">
                <RibbonItem
                    icon={<SelectedIcon theme={theme} />}
                    label={selectedLineType.label}
                />
                <SplitArrow onClick={handleToggle} />
            </div>

            {isOpen && (
                <div className="line-dropdown__menu">
                    {lineTypes.map((lineType, index) => {
                        const Icon = lineType.icon;
                        const prevHighlighted = index > 0 && lineTypes[index - 1].highlighted;
                        const nextHighlighted = index < lineTypes.length - 1 && lineTypes[index + 1].highlighted;
                        const showTopDivider = lineType.highlighted && !prevHighlighted;
                        const showBottomDivider = lineType.highlighted && !nextHighlighted;
                        
                        return (
                            <div key={lineType.id}>
                                {showTopDivider && <div className="line-dropdown__divider" />}
                                <button
                                    className="line-dropdown__menu-item"
                                    onClick={() => handleSelectLine(lineType)}
                                >
                                    <Icon className="line-dropdown__menu-icon" theme={theme} />
                                    <span>{lineType.label}</span>
                                </button>
                                {showBottomDivider && <div className="line-dropdown__divider" />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

LineDropdown.propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default LineDropdown;

