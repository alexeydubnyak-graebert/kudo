import { useState } from 'react';
import RibbonItem from './RibbonItem';
import CurrentIcon from '../icons/CurrentIcon';
import './RibbonItemDemo.css';

/**
 * RibbonItemDemo - Демонстрация компонента RibbonItem
 */
const RibbonItemDemo = () => {
  const [activeItem, setActiveItem] = useState('item2');

  return (
    <div className="ribbon-item-demo">
      <h2>RibbonItem</h2>
      
      <div className="ribbon-container">
        <RibbonItem
          icon={<CurrentIcon />}
          label="Элемент 1"
          active={activeItem === 'item1'}
          onClick={() => setActiveItem('item1')}
        />
        <RibbonItem
          icon={<CurrentIcon />}
          label="Элемент 2"
          active={activeItem === 'item2'}
          onClick={() => setActiveItem('item2')}
        />
        <RibbonItem
          icon={<CurrentIcon />}
          label="Элемент 3"
          active={activeItem === 'item3'}
          onClick={() => setActiveItem('item3')}
        />
        <RibbonItem
          icon={<CurrentIcon />}
          label="Отключен"
          disabled={true}
        />
      </div>
    </div>
  );
};

export default RibbonItemDemo;
