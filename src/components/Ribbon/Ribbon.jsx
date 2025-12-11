import React from 'react';
import RibbonCore from '../../ribbon/Ribbon/Ribbon';
import configPath from '../../config/ribbon-config.xml?url';
import './Ribbon.css';

/**
 * Обёртка для основного Ribbon, используемая на странице Editor.
 * Рендерит живую ленту из XML-конфига.
 */
const Ribbon = () => {
    return <RibbonCore configPath={configPath} theme="dark" />;
};

export default Ribbon;
