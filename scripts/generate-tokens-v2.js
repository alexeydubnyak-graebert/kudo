import fs from 'fs';

/**
 * Генератор CSS переменных из полной структуры токенов
 * Поддерживает все коллекции: global, палитры, бренды, типографику
 */

// Читаем JSON файл с токенами
const tokensData = JSON.parse(fs.readFileSync('tokens-full.json', 'utf8'));

let css = `/**
 * ARES Design System - CSS Variables
 * Автоматически сгенерировано из tokens-full.json
 * 
 * Структура:
 * 1. Глобальные палитры (vader, obi, kylo, etc.)
 * 2. Глобальные цветовые токены (light/dark)
 * 3. Глобальные размеры
 * 4. Глобальная типографика
 * 5. Токены брендов (Commander, kudo)
 */

`;

// ============================================
// 1. ГЛОБАЛЬНЫЕ ПАЛИТРЫ
// ============================================

if (tokensData['global-palette']) {
  css += `/* ============================================
   ГЛОБАЛЬНЫЕ ПАЛИТРЫ
   Базовые цветовые шкалы для всей системы
   ============================================ */

:root {
`;

  const palettes = tokensData['global-palette']['palette-default'];

  // Обрабатываем каждую палитру
  Object.keys(palettes).forEach(paletteName => {
    if (typeof palettes[paletteName] === 'object' && palettes[paletteName].tints) {
      css += `\n  /* === ${paletteName.toUpperCase()} Palette === */\n`;

      // Tints (светлые оттенки)
      Object.entries(palettes[paletteName].tints).forEach(([key, data]) => {
        const varName = `--palette-${paletteName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        css += `  ${varName}: ${data.value};\n`;
      });

      // Shadows (темные оттенки)
      if (palettes[paletteName].shadows) {
        Object.entries(palettes[paletteName].shadows).forEach(([key, data]) => {
          const varName = `--palette-${paletteName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
          css += `  ${varName}: ${data.value};\n`;
        });
      }
    }
  });

  // White и Black
  if (tokensData['global-palette'].white) {
    css += `\n  /* === Base Colors === */\n`;
    css += `  --palette-white: ${tokensData['global-palette'].white.value};\n`;
    css += `  --palette-black: ${tokensData['global-palette'].black.value};\n`;
  }

  css += `}\n\n`;
}

// ============================================
// 2. ГЛОБАЛЬНЫЕ ЦВЕТОВЫЕ ТОКЕНЫ - СВЕТЛАЯ ТЕМА
// ============================================

if (tokensData['global-color-tokens']?.light) {
  css += `/* ============================================
   ГЛОБАЛЬНЫЕ ЦВЕТОВЫЕ ТОКЕНЫ - СВЕТЛАЯ ТЕМА
   ============================================ */

:root {
`;

  const light = tokensData['global-color-tokens'].light;

  // States
  if (light.states) {
    css += `  /* === States === */\n`;

    // Background states
    if (light.states.background) {
      Object.entries(light.states.background).forEach(([category, states]) => {
        if (typeof states === 'object' && states.value === undefined) {
          Object.entries(states).forEach(([state, data]) => {
            const varName = `--states-bg-${category}-${state}`;
            css += `  ${varName}: ${data.value};\n`;
          });
        } else if (states.value) {
          css += `  --states-bg-${category}: ${states.value};\n`;
        }
      });
    }

    // Text colors
    if (light.states['text-color']) {
      Object.entries(light.states['text-color']).forEach(([state, data]) => {
        css += `  --states-text-color-${state}: ${data.value};\n`;
      });
    }

    // Icon colors
    if (light.states['icon-color']) {
      Object.entries(light.states['icon-color']).forEach(([state, data]) => {
        css += `  --states-icon-color-${state}: ${data.value};\n`;
      });
    }

    // Border colors
    if (light.states.border) {
      Object.entries(light.states.border).forEach(([category, states]) => {
        Object.entries(states).forEach(([state, data]) => {
          css += `  --states-border-${category}-${state}: ${data.value};\n`;
        });
      });
    }

    // Highlight
    if (light.states.highlight) {
      Object.entries(light.states.highlight).forEach(([state, data]) => {
        css += `  --states-highlight-${state}: ${data.value};\n`;
      });
    }
  }

  // Other global tokens
  if (light['text-color']) {
    css += `\n  /* === Text Colors === */\n`;
    Object.entries(light['text-color']).forEach(([key, data]) => {
      if (typeof data === 'object' && data.value) {
        css += `  --text-color-${key}: ${data.value};\n`;
      } else if (typeof data === 'object') {
        Object.entries(data).forEach(([subKey, subData]) => {
          css += `  --text-color-${key}-${subKey}: ${subData.value};\n`;
        });
      }
    });
  }

  if (light.background) {
    css += `\n  /* === Backgrounds === */\n`;
    Object.entries(light.background).forEach(([key, data]) => {
      if (typeof data === 'object' && data.value) {
        css += `  --background-${key}: ${data.value};\n`;
      } else if (typeof data === 'object') {
        Object.entries(data).forEach(([subKey, subData]) => {
          css += `  --background-${key}-${subKey}: ${subData.value};\n`;
        });
      }
    });
  }

  if (light.divider) {
    css += `\n  /* === Dividers === */\n`;
    Object.entries(light.divider).forEach(([key, data]) => {
      css += `  --divider-${key}: ${data.value};\n`;
    });
  }

  css += `}\n\n`;
}

// ============================================
// 3. ГЛОБАЛЬНЫЕ ЦВЕТОВЫЕ ТОКЕНЫ - ТЕМНАЯ ТЕМА
// ============================================

if (tokensData['global-color-tokens']?.dark) {
  css += `/* ============================================
   ГЛОБАЛЬНЫЕ ЦВЕТОВЫЕ ТОКЕНЫ - ТЕМНАЯ ТЕМА
   ============================================ */

:root[data-theme="dark"] {
`;

  const dark = tokensData['global-color-tokens'].dark;

  // States
  if (dark.states) {
    css += `  /* === States === */\n`;

    // Background states
    if (dark.states.background) {
      Object.entries(dark.states.background).forEach(([category, states]) => {
        if (typeof states === 'object' && states.value === undefined) {
          Object.entries(states).forEach(([state, data]) => {
            css += `  --states-bg-${category}-${state}: ${data.value};\n`;
          });
        } else if (states.value) {
          css += `  --states-bg-${category}: ${states.value};\n`;
        }
      });
    }

    // Text colors
    if (dark.states['text-color']) {
      Object.entries(dark.states['text-color']).forEach(([state, data]) => {
        css += `  --states-text-color-${state}: ${data.value};\n`;
      });
    }

    // Icon colors
    if (dark.states['icon-color']) {
      Object.entries(dark.states['icon-color']).forEach(([state, data]) => {
        css += `  --states-icon-color-${state}: ${data.value};\n`;
      });
    }

    // Border colors
    if (dark.states.border) {
      Object.entries(dark.states.border).forEach(([category, states]) => {
        Object.entries(states).forEach(([state, data]) => {
          css += `  --states-border-${category}-${state}: ${data.value};\n`;
        });
      });
    }

    // Highlight
    if (dark.states.highlight) {
      Object.entries(dark.states.highlight).forEach(([state, data]) => {
        css += `  --states-highlight-${state}: ${data.value};\n`;
      });
    }
  }

  // Other global tokens
  if (dark['text-color']) {
    css += `\n  /* === Text Colors === */\n`;
    Object.entries(dark['text-color']).forEach(([key, data]) => {
      if (typeof data === 'object' && data.value) {
        css += `  --text-color-${key}: ${data.value};\n`;
      } else if (typeof data === 'object') {
        Object.entries(data).forEach(([subKey, subData]) => {
          css += `  --text-color-${key}-${subKey}: ${subData.value};\n`;
        });
      }
    });
  }

  if (dark.background) {
    css += `\n  /* === Backgrounds === */\n`;
    Object.entries(dark.background).forEach(([key, data]) => {
      if (typeof data === 'object' && data.value) {
        css += `  --background-${key}: ${data.value};\n`;
      } else if (typeof data === 'object') {
        Object.entries(data).forEach(([subKey, subData]) => {
          css += `  --background-${key}-${subKey}: ${subData.value};\n`;
        });
      }
    });
  }

  if (dark.divider) {
    css += `\n  /* === Dividers === */\n`;
    Object.entries(dark.divider).forEach(([key, data]) => {
      css += `  --divider-${key}: ${data.value};\n`;
    });
  }

  css += `}\n\n`;
}

// ============================================
// 4. ГЛОБАЛЬНЫЕ РАЗМЕРЫ
// ============================================

if (tokensData['global-dimensions']) {
  css += `/* ============================================
   ГЛОБАЛЬНЫЕ РАЗМЕРЫ
   ============================================ */

:root {
  /* === Base Sizes === */\n`;

  const sizes = tokensData['global-dimensions'].size.base;
  Object.entries(sizes).forEach(([key, data]) => {
    const varName = `--size-${key.replace('base', '')}`;
    css += `  ${varName}: ${data.value};\n`;
  });

  css += `}\n\n`;
}

// ============================================
// 5. ГЛОБАЛЬНАЯ ТИПОГРАФИКА
// ============================================

if (tokensData['global-typography']) {
  css += `/* ============================================
   ГЛОБАЛЬНАЯ ТИПОГРАФИКА
   ============================================ */

:root {
`;

  const typo = tokensData['global-typography'];

  // Font families
  if (typo['font-family']) {
    css += `  /* === Font Families === */\n`;
    Object.entries(typo['font-family']).forEach(([key, data]) => {
      const varName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      css += `  ${varName}: '${data.value}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n`;
    });
  }

  // Font sizes
  if (typo['font-size']) {
    css += `\n  /* === Font Sizes === */\n`;
    Object.entries(typo['font-size']).forEach(([key, data]) => {
      const varName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      css += `  ${varName}: ${data.value};\n`;
    });
  }

  // Font weights
  if (typo['font-weight']) {
    css += `\n  /* === Font Weights === */\n`;
    Object.entries(typo['font-weight']).forEach(([key, data]) => {
      const varName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      // Убираем 'px' из font-weight
      const value = data.value.replace('px', '');
      css += `  ${varName}: ${value};\n`;
    });
  }

  // Line heights
  if (typo['line-height']) {
    css += `\n  /* === Line Heights === */\n`;
    Object.entries(typo['line-height']).forEach(([key, data]) => {
      const varName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      css += `  ${varName}: ${data.value};\n`;
    });
  }

  // Letter spacing
  if (typo['letter-spacing']) {
    css += `\n  /* === Letter Spacing === */\n`;
    Object.entries(typo['letter-spacing']).forEach(([key, data]) => {
      const varName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      css += `  ${varName}: ${data.value};\n`;
    });
  }

  css += `}\n\n`;
}

// ============================================
// 6. ТОКЕНЫ БРЕНДА KUDO - СВЕТЛАЯ ТЕМА
// ============================================

function generateBrandTokens(brandData, brandName, theme) {
  let brandCss = '';

  const themeData = brandData[theme];
  if (!themeData) return brandCss;

  const prefix = brandName.toLowerCase();
  const selector = theme === 'dark' ? ':root[data-theme="dark"]' : ':root';

  brandCss += `/* ============================================
   ${brandName.toUpperCase()} - ${theme.toUpperCase()} ТЕМА
   ============================================ */

${selector} {
`;

  // Colors
  if (themeData[prefix]?.colors) {
    brandCss += `  /* === ${brandName} Colors === */\n`;

    function processColors(obj, path = '') {
      Object.entries(obj).forEach(([key, value]) => {
        const newPath = path ? `${path}-${key}` : key;

        if (value && typeof value === 'object' && value.value !== undefined) {
          const varName = `--${prefix}-${newPath}`;
          brandCss += `  ${varName}: ${value.value};\n`;
        } else if (value && typeof value === 'object') {
          processColors(value, newPath);
        }
      });
    }

    processColors(themeData[prefix].colors);
  }

  // Dimensions
  if (themeData[prefix]?.dimensions) {
    brandCss += `\n  /* === ${brandName} Dimensions === */\n`;

    function processDimensions(obj, path = '') {
      Object.entries(obj).forEach(([key, value]) => {
        const newPath = path ? `${path}-${key}` : key;

        if (value && typeof value === 'object' && value.value !== undefined) {
          const varName = `--${prefix}-${newPath}`;
          brandCss += `  ${varName}: ${value.value};\n`;
        } else if (value && typeof value === 'object') {
          processDimensions(value, newPath);
        }
      });
    }

    processDimensions(themeData[prefix].dimensions);
  }

  // Divider
  if (themeData.divider) {
    brandCss += `\n  /* === Divider === */\n`;
    brandCss += `  --${prefix}-divider: ${themeData.divider.value};\n`;
  }

  brandCss += `}\n\n`;

  return brandCss;
}

// Генерируем токены для kudo
if (tokensData['ares-kudo']) {
  css += generateBrandTokens(tokensData['ares-kudo'], 'kudo', 'light');
  css += generateBrandTokens(tokensData['ares-kudo'], 'kudo', 'dark');
}

// Генерируем токены для Commander
if (tokensData['ares-commander']) {
  css += generateBrandTokens(tokensData['ares-commander'], 'Commander', 'light');
  css += generateBrandTokens(tokensData['ares-commander'], 'Commander', 'dark');
}

// Сохраняем файл
fs.writeFileSync('src/styles/tokens-generated.css', css);
console.log('✅ Токены успешно сгенерированы в src/styles/tokens-generated.css');
console.log(`📊 Размер файла: ${(css.length / 1024).toFixed(2)} KB`);
