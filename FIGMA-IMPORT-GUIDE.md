# Figma Tokens Import Guide

Complete guide to import design tokens into Figma.

## 🎯 Best Option: Tokens Studio (Free Tier)

**Tokens Studio** is the only plugin that can **import JSON tokens** directly.

### What's Free vs Paid:

- ✅ **Free**: Import/Export JSON, Token references, Single theme
- ❌ **Paid ($10/mo)**: Multi-theme switching, GitHub sync

**For our use case:** Free tier is enough! We only need to import tokens once.

## 📥 Installation & Import

### Step 1: Install Tokens Studio

1. Open **Figma Desktop App**
2. Go to **Menu → Plugins → Browse plugins in Community**
3. Search: **"Tokens Studio for Figma"**
4. Click **Install** (free)

### Step 2: Import Tokens

1. Open your Figma file (or create new)
2. Open plugin: **Menu → Plugins → Tokens Studio**
3. Click **Settings** icon (⚙️) in bottom left
4. Click **Import** button
5. Select `figma-tokens.json` from project root
6. Click **Open**

✅ Done! All tokens imported.

### Step 3: Verify Import

You should see 5 token sets in the plugin:

- ✅ colors
- ✅ semantic
- ✅ components
- ✅ dimensions
- ✅ typography

## 📊 Token Structure

### 1. **colors** (Level 1 - Base Colors)

- `foundation.primary` - Primary brand color (#254CA8)
- `gray.900` to `gray.0` - 21 gray shades
- `semantic.success/warning/error/info` - Status colors

### 2. **semantic** (Level 2 - Semantic Tokens)

- `surface.*` - Background surfaces (page, base, alt)
- `text.*` - Text colors (primary, secondary, muted)
- `border.*` - Border colors
- `states.*` - Interactive states (hover, active, disabled)
- `scrollbar.*`, `divider.*`, `shadow.*`

### 3. **components** (Level 3 - Component Tokens)

- `button.*` - Button styles (primary, secondary)
- `sidebar.*` - Sidebar styles
- `header.*` - Header styles
- `input.*`, `tab.*` - Form components

### 4. **dimensions**

- `size.*` - Base sizes (2px to 30px)
- `spacing.*` - Spacing values
- `borderRadius.*` - Border radius values

### 5. **typography**

- `fontFamily.*` - Font families (Roboto, Segoe UI)
- `fontSize.*` - Font sizes (sm to heading1)
- `fontWeight.*` - Font weights (light to bold)
- `lineHeight.*` - Line heights

## 🎨 Creating Components with Tokens

### Example: Primary Button

1. **Create Frame**: Press `F`
2. **Add Auto Layout**: Press `Shift + A`
3. **Add Text**: Press `T`, type "Button"

4. **Apply Tokens** (click $ icon in Tokens Studio):

**Background:**

- Frame fill → Click `$` → Select `components.button.primary.bg`

**Text:**

- Text fill → Click `$` → Select `components.button.primary.text`
- Font family → Click `$` → Select `typography.fontFamily.kudo`
- Font size → Click `$` → Select `typography.fontSize.lg` (14px)
- Font weight → Click `$` → Select `typography.fontWeight.medium` (500)

**Layout:**

- Padding horizontal → Click `$` → Select `dimensions.spacing.16` (16px)
- Padding vertical → Click `$` → Select `dimensions.spacing.8` (8px)
- Corner radius → Click `$` → Select `dimensions.borderRadius.md` (4px)

5. **Create Component**: Press `Ctrl/Cmd + Alt + K`

### Button States (Variants)

Create component variants for different states:

**Hover State:**

- Background → `components.button.primary.hover` (#305CBA)

**Active State:**

- Background → `components.button.primary.active` (#1C3F84)

**Disabled State:**

- Background → `components.button.primary.disabled-bg`
- Text → `components.button.primary.disabled-text`

**Secondary Button:**

- Background → `components.button.secondary.bg`
- Text → `components.button.secondary.text`
- Border → `components.button.secondary.border`

## 🔗 Token References

Tokens use references (aliases) for consistency:

```
components.button.primary.bg → {foundation.primary}
foundation.primary → #254CA8
```

When you change `foundation.primary`, all components using it update automatically!

## 💡 Pro Tips

### 1. Create Figma Variables (Recommended)

Convert tokens to native Figma Variables:

1. In Tokens Studio, click **Settings**
2. Click **Create Variables** button
3. Select token sets to convert
4. Click **Create**

This creates native Figma Variables that work with all Figma features.

### 2. Use Token Browser

Click **Browse** tab in Tokens Studio to see all tokens organized by category.

### 3. Search Tokens

Use search box in Tokens Studio to quickly find tokens.

### 4. Apply Multiple Tokens

You can apply different tokens to different properties of the same element.

## 📋 Quick Reference: Key Tokens

### Colors

```
foundation.primary          #254CA8 (brand blue)
gray.900 to gray.0         Dark to light grays (21 shades)
semantic.success           #2ECC71 (green)
semantic.error             #E74C3C (red)
semantic.warning           #F1C40F (yellow)
semantic.info              #3498DB (blue)
```

### Button Tokens

```
components.button.primary.bg           #254CA8
components.button.primary.hover        #305CBA
components.button.primary.active       #1C3F84
components.button.primary.text         White
components.button.secondary.bg         Light gray
components.button.secondary.text       Dark text
```

### Layout Tokens

```
dimensions.spacing.8       8px
dimensions.spacing.16      16px
dimensions.spacing.24      24px
dimensions.borderRadius.md 4px
```

### Typography Tokens

```
typography.fontFamily.kudo     Roboto
typography.fontSize.sm         10px
typography.fontSize.md         12px
typography.fontSize.lg         14px
typography.fontWeight.medium   500
```

## 🔄 Workflow: Design → Code

1. **Design in Figma** using tokens from Tokens Studio
2. **Get node ID** from Figma URL (e.g., `node-id=123-456`)
3. **Share node ID** with developer
4. **Developer uses Code Connect** to fetch design
5. **Code generated** automatically with exact styles

## 🆘 Troubleshooting

**Q: Can't see tokens after import?**
A: Make sure all token sets are enabled (toggle switches in Tokens Studio).

**Q: Token references not working?**
A: Check token set order. Should be: colors → semantic → components.

**Q: Can't apply token to property?**
A: Make sure you're using correct token type (color for fills, sizing for dimensions).

**Q: Want to update tokens?**
A: Re-import `figma-tokens.json` file. Old tokens will be replaced.

**Q: Need multi-theme support?**
A: That requires Tokens Studio Pro ($10/month). For free tier, use single theme.

## ⚠️ Free Tier Limitations

Tokens Studio Free has these limitations:

- ❌ Can't switch between multiple themes
- ❌ Can't sync with GitHub automatically
- ✅ Can import/export JSON (what we need!)
- ✅ Can use token references
- ✅ Can create Figma Variables

**For our workflow:** Free tier is perfect! We only need to import tokens once.

## 🎯 Next Steps

1. ✅ Install **Tokens Studio** plugin
2. ✅ Import `figma-tokens.json`
3. ✅ Create button component using tokens
4. ✅ Create component variants (hover, active, disabled)
5. ✅ Get node ID from Figma URL
6. ✅ Share with developer for Code Connect

---

**Ready to start?** Install Tokens Studio and import your tokens! 🚀

**Plugin Link:**

- Tokens Studio: https://www.figma.com/community/plugin/843461159747178978

**Documentation:**

- Tokens Studio Docs: https://docs.tokens.studio/
