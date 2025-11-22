import { useState } from 'react';
import SplitArrow from './SplitArrow';
import RibbonItem from '../RibbonItem/RibbonItem';
import { LineIcon } from '../../icons/ribbon/home/draw';
import './SplitArrowDemo.css';

/**
 * SplitArrowDemo - Демонстрация компонента SplitArrow
 */
const SplitArrowDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="split-arrow-demo">
      <h2>SplitArrow</h2>
      
      <div className="ribbon-container">
        {/* Пример с RibbonItem + SplitArrow */}
        <div className="split-button-group">
          <RibbonItem 
            icon={<LineIcon />} 
            label="Действие"
            onClick={() => console.log('Main action')}
          />
          <SplitArrow 
            active={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Только SplitArrow */}
        <SplitArrow 
          onClick={() => console.log('Arrow clicked')}
        />

        {/* Active состояние */}
        <SplitArrow 
          active={true}
        />

        {/* Disabled состояние */}
        <SplitArrow 
          disabled={true}
        />
      </div>
    </div>
  );
};

export default SplitArrowDemo;
