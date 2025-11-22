import { useState } from 'react';
import SplitButton from './SplitButton';
import { LineIcon } from '../../icons/ribbon/home/draw';
import './SplitButtonDemo.css';

/**
 * SplitButtonDemo - Демонстрация компонента SplitButton
 */
const SplitButtonDemo = () => {
  const [activeTool, setActiveTool] = useState('line');

  return (
    <div className="split-button-demo">
      <h2>SplitButton (Line)</h2>

      <div className="ribbon-container">
        <SplitButton
          icon={<LineIcon />}
          label="Line"
          active={activeTool === 'line'}
          onClick={() => {
            setActiveTool('line');
            console.log('Line tool selected');
          }}
          onMenuClick={(isOpen) => {
            console.log('Menu', isOpen ? 'opened' : 'closed');
          }}
        />

        <SplitButton
          icon={<LineIcon />}
          label="Rectangle"
          active={activeTool === 'rectangle'}
          onClick={() => {
            setActiveTool('rectangle');
            console.log('Rectangle tool selected');
          }}
        />

        <SplitButton
          icon={<LineIcon />}
          label="Circle"
          active={activeTool === 'circle'}
          onClick={() => {
            setActiveTool('circle');
            console.log('Circle tool selected');
          }}
        />

        <SplitButton
          icon={<LineIcon />}
          label="Disabled"
          disabled={true}
        />
      </div>
    </div>
  );
};

export default SplitButtonDemo;
