import React from 'react';
import './Ribbon.css';
import RibbonImage from '../../assets/editor/screenshots/ribbon.png';

const Ribbon = () => {
    return (
        <div className="ribbon">
            <div className="ribbon__scroll-container">
                <img src={RibbonImage} alt="Ribbon" className="ribbon__image" />
            </div>
        </div>
    );
};

export default Ribbon;
