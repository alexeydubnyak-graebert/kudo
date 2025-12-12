# Figma Design System Integration Rules

This document defines how to integrate Figma designs into the ARES Kudo codebase using Code Connect.

## 1. Design System Structure

### Token System

The project uses a **3-level token architecture**:

1. **Global Palette** (`src/styles/tokens/global-palette.css`)

   - Base color values (e.g., `--palette-jango-tint-28`, `--palette-obi-tint-24`)
   - Foundation colors that don't change between themes

2. **Global Tokens** (`src/styles/tokens/global-tokens.css`)

   - Semantic tokens that reference palette colors
   - Theme-aware tokens (light/dark mode via `[data-theme="dark"]`)
   - State tokens: `--states-bg-*`, `--states-text-color-*`, `--states-border-*`

3. **Product-Specific Tokens**
   - `src/styles/tokens/ares-kudo.css` - ARES Kudo specific tokens
   - `src/styles/tokens/ares-commander.css` - ARES Commander tokens
   - `src/styles/tokens/foundation-colors.css` - Foundation color system

### Additional Token Files

- **Typography** (`src/styles/tokens/typography.css`) - Font families, sizes, weights
- **Dimensions** (`src/styles/tokens/dimensions.css`) - Spacing, sizing values

## 2. Component Architecture

### Component Structure

```
src/components/
├── Button/
│   ├── Button.jsx          # Component logic
│   ├── Button.css          # Component styles
│   └── Button.stories.jsx  # Storybook stories
```

### Component Pattern

```jsx
// Example: Button component
const Button = ({
  variant = "primary",
  iconPosition = null,
  icon = null,
  children,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  ...props
}) => {
  // Component logic
};
```

**Key Principles:**

- Props-based API with sensible defaults
- BEM-like CSS class naming: `.button`, `.button--primary`, `.button__icon`
- Support for variants, states, and modifiers
- Icon support with flexible positioning

## 3. Styling Approach

### CSS Methodology

- **Plain CSS** with CSS Custom Properties (CSS Variables)
- **BEM-inspired naming**: `.block`, `.block--modifier`, `.block__element`
- **Component-scoped styles**: Each component has its own CSS file
- **Token-based values**: Always use CSS variables from token files

### Example Button Styles

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 500;
}

.button--primary {
  background: var(--foundation-primary);
  color: var(--text-on-primary);
}

.button--primary:hover:not(.button--disabled) {
  background: var(--foundation-primary-alpha-30);
  opacity: 0.9;
}
```

### State Management

States are handled via:

- CSS pseudo-classes (`:hover`, `:active`, `:focus-visible`, `:disabled`)
- BEM modifiers (`.button--disabled`)
- State tokens from `global-tokens.css`

## 4. Icon System

### Icon Storage

- **Location**: `src/icons/`
- **Format**: SVG files
- **Usage**: Imported as React components via `vite-plugin-svgr`

### Icon Usage Pattern

```jsx
import IconName from "../icons/icon-name.svg?react";

<Button icon={<IconName />} iconPosition="left">
  Button Text
</Button>;
```

## 5. Framework & Build System

- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Router**: React Router DOM 7.9.6
- **SVG Handling**: vite-plugin-svgr for SVG-as-components

## 6. Figma Integration Guidelines

### When Implementing from Figma

1. **Always call `get_design_context` with `forceCode: true`** to get complete code
2. **Use ONLY styles from Figma**:
   - All colors must match the design (hex, rgba)
   - All sizes, spacing, borders - exact values
   - All border-radius, gap, spacing - as in Figma
3. **Never improvise**:
   - Don't simplify styles
   - Don't adapt to "best practices" without approval
   - Don't change structure without discussion
4. **If unclear** - ask the user before implementation
5. **Verify result** via `get_screenshot`

### Token Mapping Strategy

When creating new components from Figma:

1. **Extract colors from Figma** → Map to existing tokens or create new ones
2. **Extract spacing/sizing** → Use existing dimension tokens or add to `dimensions.css`
3. **Extract typography** → Map to typography tokens
4. **Create component-specific tokens** if needed in product-specific token files

### Code Connect Workflow

1. **Identify Figma node** (get node ID from Figma URL)
2. **Create/update React component** following the component pattern
3. **Map component** using `add_code_connect_map`:
   ```
   nodeId: "123:456"
   componentName: "Button/Primary"
   source: "src/components/Button/Button.jsx"
   ```
4. **Verify mapping** with `get_code_connect_map`

## 7. Button Component Specifications

### Variants

- **Primary**: `variant="primary"` - Main action button
- **Secondary**: `variant="secondary"` - Secondary actions

### Icon Positions

- `iconPosition="left"` - Icon before text
- `iconPosition="right"` - Icon after text
- `iconPosition="only"` - Icon-only button (no text)
- `iconPosition={null}` - No icon (default)

### States

- **Default**: Normal state
- **Hover**: `:hover` pseudo-class
- **Active/Pressed**: `:active` pseudo-class
- **Disabled**: `disabled={true}` prop + `.button--disabled` class
- **Focus**: `:focus-visible` for keyboard navigation

### Size Variations (Optional)

- **Small**: `.button--small` - Compact button
- **Default**: Standard size (no modifier)
- **Large**: `.button--large` - Prominent button

### Token Usage in Buttons

```css
/* Primary Button */
--foundation-primary              /* Background */
--text-on-primary                 /* Text color */
--foundation-primary-alpha-30     /* Hover background */
--states-active                   /* Active/pressed state */
--states-focus                    /* Focus ring */

/* Secondary Button */
--button-secondary-bg             /* Background */
--button-secondary-text           /* Text color */
--button-secondary-hover          /* Hover state */
--button-secondary-active         /* Active state */

/* Disabled State */
--states-disabled-bg              /* Disabled background */
--states-disabled-text            /* Disabled text */
```

## 8. Project Structure

```
ares-kudo/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── ribbon/           # Ribbon-specific components
│   ├── icons/            # SVG icon files
│   ├── styles/           # Global styles and tokens
│   │   ├── tokens/       # Design token files
│   │   └── base.css      # Base/reset styles
│   ├── contexts/         # React contexts
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration files
│   └── assets/           # Static assets
├── .windsurf/            # Windsurf configuration
└── package.json
```

## 9. Best Practices

### DO:

- ✅ Use existing tokens whenever possible
- ✅ Follow BEM naming conventions
- ✅ Keep components modular and reusable
- ✅ Support both light and dark themes
- ✅ Use semantic token names
- ✅ Test components in both themes
- ✅ Verify pixel-perfect match with Figma

### DON'T:

- ❌ Hardcode color values
- ❌ Create duplicate tokens
- ❌ Mix different naming conventions
- ❌ Ignore accessibility (focus states, ARIA)
- ❌ Skip theme testing
- ❌ Deviate from Figma without approval

## 10. Token Generation

The project has scripts for token generation:

```bash
npm run generate:tokens      # Generate tokens from tokens-full.json
npm run tokens:watch         # Watch and regenerate on changes
npm run create:tokens        # Create tokens-full.json
```

## 11. Development Workflow

1. **Start dev server**: `npm run dev`
2. **Open Figma** and select component
3. **Get design context**: Use `get_design_context` with node ID
4. **Implement component** following patterns above
5. **Map to Figma**: Use `add_code_connect_map`
6. **Verify**: Check in browser and with `get_screenshot`
7. **Test themes**: Toggle light/dark mode
8. **Commit**: Follow project git workflow

---

**Goal**: Achieve pixel-perfect Figma-to-code implementation on the first try using Code Connect.
