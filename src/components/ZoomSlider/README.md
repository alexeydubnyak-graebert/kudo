# ZoomSlider Component

Slider component for controlling the zoom level of file cards in grid view.

## Usage

```jsx
import ZoomSlider from './components/ZoomSlider';

const [zoomValue, setZoomValue] = useState(75);
const [cardsPerRow, setCardsPerRow] = useState(5);

const handleZoomChange = (value) => {
    setZoomValue(value);
    // Map zoom 0-100 to cards per row 2-8
    // 0% = 8 cards, 100% = 2 cards
    const cards = Math.round(8 - (value / 100) * 6);
    setCardsPerRow(Math.max(2, Math.min(8, cards)));
};

<ZoomSlider value={zoomValue} onChange={handleZoomChange} />

// Apply to grid container
<div className="file-browser-grid" style={{ '--cards-per-row': cardsPerRow }}>
    {/* File cards */}
</div>
```

## Props

- `value` (number): Current zoom value (0-100), default: 75
- `onChange` (function): Callback when zoom value changes

## Zoom to Cards Mapping

- 0% → 8 cards per row (smallest cards)
- 25% → 6-7 cards per row
- 50% → 4-5 cards per row
- 75% → 3-4 cards per row
- 100% → 2 cards per row (largest cards)

## Styling

The component uses CSS custom properties and can be styled via:

- `--text-secondary` for label/value text color
- Slider track and thumb colors are defined in `ZoomSlider.css`
