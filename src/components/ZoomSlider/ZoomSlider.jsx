import React from 'react';
import PropTypes from 'prop-types';
import './ZoomSlider.css';

const ZoomSlider = ({ value = 75, onChange }) => {
    const handleChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="zoom-control">
            <span className="zoom-label">Zoom</span>
            <div className="zoom-slider">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleChange}
                    style={{
                        background: `transparent`,
                        backgroundImage: `linear-gradient(to right, #b2b2b2 0%, #b2b2b2 ${value}%, #141518 ${value}%, #141518 100%)`,
                        backgroundSize: '100% 4px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </div>
            <span className="zoom-value">{value}%</span>
        </div>
    );
};

ZoomSlider.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
};

export default ZoomSlider;
