# Figma Design System - Quick Start Guide

Quick guide to set up your Figma-driven design system for ARES Kudo.

## 🚀 Quick Setup (5 minutes)

### 1. Install Plugin

1. Open **Figma Desktop App**
2. **Menu → Plugins → Browse plugins**
3. Search: **"Tokens Studio for Figma"**
4. Click **Install**

### 2. Import Tokens

1. Open your Figma file (or create new)
2. **Menu → Plugins → Tokens Studio**
3. Click **Settings** ⚙️ → **Import**
4. Select: `figma-tokens.json` from project root
5. Done! ✅

### 3. Verify Import

You should see 5 token sets:

- ✅ global/palette
- ✅ global/dimensions
- ✅ global/typography
- ✅ semantic/colors
- ✅ component/button

## 🎨 Create Your First Button

### Quick Method (2 minutes)

1. **Create Frame**: Press `F`
2. **Add Auto Layout**: Press `Shift + A`
3. **Add Text**: Press `T`, type "Button"
4. **Apply Tokens** (click $ icon in Tokens Studio):

   - Frame fill → `component/button/primary/bg`
   - Text fill → `component/button/primary/text`
   - Padding → `component/button/padding/default`
   - Gap → `component/button/gap`
   - Corner radius → `component/button/border-radius`
   - Font family → `global/typography/fontFamilies/kudo`
   - Font size → `component/button/font-size/default`
   - Font weight → `global/typography/fontWeight/medium`

5. **Create Component**: Press `Ctrl/Cmd + Alt + K`

Done! You have a token-based button. 🎉

## 📋 Key Tokens for Buttons

### Colors

```
Primary Button:
- Background: component/button/primary/bg (#254CA8)
- Text: component/button/primary/text (white)
- Hover: component/button/primary/hover-bg (#305CBA)
- Active: component/button/primary/active-bg (#1C3F84)

Secondary Button:
- Background: component/button/secondary/bg (light gray)
- Text: component/button/secondary/text (dark)
- Hover: component/button/secondary/hover-bg
- Active: component/button/secondary/active-bg
```

### Layout

```
- Padding: 8px 16px (component/button/padding/default)
- Gap: 8px (component/button/gap)
- Border radius: 4px (component/button/border-radius)
- Icon size: 16px (component/button/icon-size/default)
```

### Typography

```
- Font: Roboto (component/button/font-family)
- Size: 13px (component/button/font-size/default)
- Weight: 500 (component/button/font-weight)
- Line height: 18px (component/button/line-height/default)
```

## 🔗 Connect to Code

After creating your button in Figma:

### 1. Get Node ID

1. Select your button component
2. Copy URL from address bar
3. Extract node ID from URL:
   ```
   https://figma.com/design/...?node-id=123-456
   Node ID = 123:456 (replace - with :)
   ```

### 2. Link to Code

Tell me the node ID, and I'll create the connection:

```
nodeId: "123:456"
componentName: "Button/Primary"
source: "src/components/Button/Button.jsx"
```

### 3. Sync Changes

When you update the design:

1. Give me the node ID
2. I'll fetch the updated design
3. I'll update the React code
4. Pixel-perfect sync! ✨

## 📦 What's Included

### Token Files Created

1. **`figma-tokens.json`** - Main tokens file for Figma import
2. **`FIGMA-TOKENS-IMPORT.md`** - Detailed import guide
3. **`FIGMA-QUICK-START.md`** - This quick start guide
4. **`.windsurf/figma-design-system-rules.md`** - Design system rules

### Token Categories

- **Colors**: 100+ color tokens (palettes, semantic, component)
- **Dimensions**: 15 size tokens (2px to 30px)
- **Spacing**: 9 spacing tokens
- **Typography**: Font families, sizes, weights, line heights
- **Button Tokens**: Complete button system

## 🎯 Recommended Workflow

### For New Components

```
1. Design in Figma using tokens
   ↓
2. Get node ID
   ↓
3. Tell me node ID
   ↓
4. I generate React code
   ↓
5. Review and approve
```

### For Existing Components

```
1. Import tokens to Figma
   ↓
2. Recreate component using exact token values
   ↓
3. Get node ID
   ↓
4. I create Code Connect link
   ↓
5. Future updates sync automatically
```

## 💡 Pro Tips

### 1. Use Token References

Always apply tokens via the $ icon, not hard-coded values.

### 2. Create Component Variants

Use Figma Variants for different button states:

- Variant: Primary/Secondary
- State: Default/Hover/Active/Disabled
- Icon: None/Left/Right/Only
- Size: Small/Default/Large

### 3. Document Components

Add descriptions to components explaining which tokens they use.

### 4. Keep Tokens in Sync

When tokens change in code, I can regenerate `figma-tokens.json` for you.

## 🆘 Common Issues

**Q: Tokens not showing?**
A: Refresh the plugin or restart Figma.

**Q: Colors look wrong?**
A: Check you're using the correct token reference (e.g., `button.primary.bg` not `foundation.primary`).

**Q: Can't find a token?**
A: Check the full list in `FIGMA-TOKENS-IMPORT.md`.

**Q: Want to add new tokens?**
A: Tell me what you need, I'll add them to the JSON.

## 📚 Next Steps

1. ✅ Import tokens to Figma
2. ✅ Create button component
3. ✅ Get node ID
4. ✅ Tell me node ID for Code Connect
5. ✅ Start building your design system!

## 🔄 Complete Workflow Example

```
YOU: Create Primary Button in Figma using tokens
     → Get node ID: 123:456

YOU: "Here's my button node ID: 123:456"

ME:  → Fetch design from Figma
     → Verify it matches code
     → Create Code Connect link
     → Confirm connection

YOU: Update button design in Figma

YOU: "I updated the button, node ID: 123:456"

ME:  → Fetch updated design
     → Update React code
     → Show you the changes

YOU: Approve changes

ME:  → Apply changes to codebase
     → Design and code in sync! ✨
```

---

**Ready to start?** Import the tokens and create your first button! 🚀

For detailed instructions, see: `FIGMA-TOKENS-IMPORT.md`
