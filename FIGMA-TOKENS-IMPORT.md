# How to Import Design Tokens into Figma

This guide explains how to import the `figma-tokens.json` file into Figma using the Tokens Studio plugin.

## Prerequisites

1. **Figma Desktop App** (required for Code Connect)
2. **Tokens Studio Plugin** (free)

## Step 1: Install Tokens Studio Plugin

1. Open Figma Desktop App
2. Go to **Menu → Plugins → Browse plugins in Community**
3. Search for **"Tokens Studio for Figma"** (formerly Figma Tokens)
4. Click **Install**

## Step 2: Import Tokens

### Method A: Direct Import (Recommended)

1. Open your Figma file
2. Open Tokens Studio plugin: **Menu → Plugins → Tokens Studio**
3. In the plugin panel, click the **Settings** icon (⚙️)
4. Click **Import** button
5. Select the `figma-tokens.json` file from your project root
6. Click **Open**

### Method B: Sync with GitHub (Advanced)

If you want automatic sync:

1. In Tokens Studio plugin, go to **Settings**
2. Choose **GitHub** as sync provider
3. Connect your GitHub account
4. Select repository: `alexey-dubnyak/ares-kudo`
5. Set file path: `figma-tokens.json`
6. Click **Save**

Now tokens will sync automatically when you push changes to GitHub.

## Step 3: Verify Import

After import, you should see these token sets in Tokens Studio:

- ✅ **global/palette** - All color palettes (vader, obi, jango, etc.)
- ✅ **global/dimensions** - Sizing and spacing values
- ✅ **global/typography** - Font families, sizes, weights, line heights
- ✅ **semantic/colors** - Semantic color tokens (foundation, text, states)
- ✅ **component/button** - Button-specific tokens

## Step 4: Apply Tokens to Figma Styles

Tokens Studio can create Figma Styles from tokens:

1. In Tokens Studio plugin, click **Create Styles** button
2. Select which token sets to convert to styles:
   - ✅ Colors
   - ✅ Typography
   - ✅ Spacing (as Layout Grid)
3. Click **Create**

This will create native Figma styles that you can use in your designs.

## Token Structure

The tokens are organized in a hierarchical structure:

```
global/palette (Level 1)
    ↓ references
global/dimensions (Level 1)
    ↓ references
global/typography (Level 1)
    ↓ references
semantic/colors (Level 2)
    ↓ references
component/button (Level 3)
```

### Token References

Tokens use references (aliases) to maintain consistency:

```json
// Example: Button primary background references foundation primary
"button.primary.bg": { "value": "{foundation.primary}" }

// Foundation primary has the actual color value
"foundation.primary": { "value": "#254CA8" }
```

When you change `foundation.primary`, all components using it will update automatically.

## Creating Button Components in Figma

Now you can create button components using these tokens:

### 1. Create Base Button Frame

1. Create a frame: **F** key
2. Name it: "Button/Primary"
3. Set **Auto Layout**: **Shift + A**

### 2. Apply Tokens

Using Tokens Studio plugin:

**Background:**

- Click on fill → Click **$** icon in Tokens Studio
- Select: `component/button/primary/bg`

**Text:**

- Select text layer
- Click on fill → Select: `component/button/primary/text`
- Font family → Select: `global/typography/fontFamilies/kudo`
- Font size → Select: `component/button/font-size/default`
- Font weight → Select: `global/typography/fontWeight/medium`

**Padding:**

- Auto Layout padding → Select: `component/button/padding/default`

**Gap:**

- Auto Layout gap → Select: `component/button/gap`

**Border Radius:**

- Corner radius → Select: `component/button/border-radius`

### 3. Create Variants

Create a Component Set with variants:

**Property 1: Variant**

- Primary
- Secondary

**Property 2: State**

- Default
- Hover
- Active
- Disabled

**Property 3: Icon**

- None
- Left
- Right
- Only

**Property 4: Size**

- Small
- Default
- Large

### 4. Apply State-Specific Tokens

For each state, apply the corresponding tokens:

**Primary Hover:**

- Background: `component/button/primary/hover-bg`

**Primary Active:**

- Background: `component/button/primary/active-bg`

**Primary Disabled:**

- Background: `component/button/primary/disabled-bg`
- Text: `component/button/primary/disabled-text`

**Secondary:**

- Background: `component/button/secondary/bg`
- Text: `component/button/secondary/text`

And so on...

## Available Token Categories

### Colors

**Palette (Base Colors):**

- `palette.vader.*` - Dark grays
- `palette.obi.*` - Blue tones
- `palette.jango.*` - Neutral grays
- `palette.snoke.*` - Very dark
- `palette.clone.*` - Neutral grays
- `palette.rey.*` - Light grays
- `palette.red.*` - Red tones

**Semantic:**

- `foundation.primary` - Primary brand color (#254CA8)
- `semantic.success` - Success green
- `semantic.warning` - Warning yellow
- `semantic.error` - Error red
- `semantic.info` - Info blue

**Text:**

- `text.primary` - Primary text color
- `text.secondary` - Secondary text color
- `text.muted` - Muted text color
- `text.on-primary` - Text on primary background

**States:**

- `states.disabled-bg` - Disabled background
- `states.disabled-text` - Disabled text
- `states.focus` - Focus state color
- `states.active` - Active state color

### Dimensions

**Sizing:**

- `size.2` through `size.30` - Base sizes (2px to 30px)

**Spacing:**

- `spacing.2` through `spacing.24` - Spacing values

**Border Radius:**

- `borderRadius.sm` - 2px
- `borderRadius.md` - 4px (default for buttons)
- `borderRadius.lg` - 8px
- `borderRadius.xl` - 12px
- `borderRadius.round` - 999px (fully rounded)

### Typography

**Font Families:**

- `fontFamilies.commander` - Segoe UI
- `fontFamilies.kudo` - Roboto (default for buttons)

**Font Sizes:**

- `fontSize.sm` - 10px
- `fontSize.md` - 12px
- `fontSize.lg` - 14px
- `fontSize.xl` - 16px
- `fontSize.heading1` through `fontSize.heading5`

**Font Weights:**

- `fontWeight.light` - 300
- `fontWeight.regular` - 400
- `fontWeight.medium` - 500 (default for buttons)
- `fontWeight.bold` - 900
- `fontWeight.extra-bold` - 1200

**Line Heights:**

- `lineHeight.sm` - 12px
- `lineHeight.md` - 16px
- `lineHeight.lg` - 20px
- `lineHeight.xlg` - 26px

### Button-Specific Tokens

All button tokens are under `component/button/*`:

**Colors:**

- `button.primary.bg` - Primary button background
- `button.primary.text` - Primary button text
- `button.primary.hover-bg` - Hover state
- `button.primary.active-bg` - Active state
- `button.primary.disabled-bg` - Disabled background
- `button.primary.disabled-text` - Disabled text
- `button.secondary.*` - Secondary button colors

**Layout:**

- `button.padding.default` - 8px 16px
- `button.padding.small` - 6px 12px
- `button.padding.large` - 10px 20px
- `button.padding.icon-only` - 8px
- `button.gap` - 8px (gap between icon and text)
- `button.border-radius` - 4px

**Typography:**

- `button.font-family` - Roboto
- `button.font-size.default` - 13px
- `button.font-size.small` - 12px
- `button.font-size.large` - 14px
- `button.font-weight` - 500
- `button.line-height.*` - Line heights for each size

**Icon Sizing:**

- `button.icon-size.default` - 16px
- `button.icon-size.small` - 14px
- `button.icon-size.large` - 18px

**Minimum Sizes:**

- `button.min-size.icon-only` - 34px
- `button.min-size.icon-only-small` - 28px
- `button.min-size.icon-only-large` - 40px

## Tips

### 1. Use Token References

Always use token references instead of hard-coded values. This ensures:

- ✅ Consistency across designs
- ✅ Easy theme switching
- ✅ Automatic updates when tokens change

### 2. Create Figma Variables

Convert tokens to Figma Variables for better integration:

1. In Tokens Studio, go to **Settings**
2. Enable **"Create Variables"**
3. Click **"Push to Figma"**

This creates native Figma Variables that work with Figma's built-in features.

### 3. Document Token Usage

Add descriptions to your components explaining which tokens they use:

- Primary Button uses `button.primary.*` tokens
- Hover state uses `button.primary.hover-bg`
- etc.

### 4. Keep Tokens in Sync

If you update tokens in code:

1. Regenerate `figma-tokens.json` (we can create a script for this)
2. Push to GitHub
3. In Figma, click **"Pull from GitHub"** in Tokens Studio
4. Tokens will update automatically

## Next Steps

After importing tokens:

1. ✅ Create button components using the tokens
2. ✅ Get node IDs from Figma URLs
3. ✅ Use Code Connect to link Figma components to React code
4. ✅ Generate code from Figma designs

## Troubleshooting

**Problem: Tokens not showing up**

- Solution: Make sure you're in the correct Figma file
- Solution: Refresh the plugin

**Problem: Token references not working**

- Solution: Check token set order in `$metadata.tokenSetOrder`
- Solution: Make sure referenced tokens are in earlier sets

**Problem: Colors look different**

- Solution: Check if you're using the correct theme (light/dark)
- Solution: Verify color values in the JSON file

## Support

For more information:

- Tokens Studio Documentation: https://docs.tokens.studio/
- Figma Variables: https://help.figma.com/hc/en-us/articles/15339657135383

---

**Ready to create your design system!** 🎨
