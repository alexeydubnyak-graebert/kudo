/**
 * Convert tokens to Figma Variables JSON format
 * Run: node scripts/convert-to-figma-variables.js
 */

const fs = require('fs');
const path = require('path');

// Read tokens
const tokensPath = path.join(__dirname, '../figma-tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Figma Variables format
const figmaVariables = {
    collections: [
        {
            name: "ARES Kudo Design System",
            modes: [{ name: "Default", modeId: "1" }],
            variableIds: []
        }
    ],
    variables: []
};

let variableId = 1;

// Convert colors
function convertColors(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
        if (value.type === 'color') {
            figmaVariables.variables.push({
                id: `var-${variableId++}`,
                name: prefix ? `${prefix}/${key}` : key,
                type: 'COLOR',
                value: value.value,
                scopes: ['ALL_SCOPES']
            });
        } else if (typeof value === 'object' && !value.type) {
            convertColors(value, prefix ? `${prefix}/${key}` : key);
        }
    }
}

// Convert dimensions
function convertDimensions(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
        if (value.type === 'sizing' || value.type === 'spacing' || value.type === 'borderRadius') {
            figmaVariables.variables.push({
                id: `var-${variableId++}`,
                name: prefix ? `${prefix}/${key}` : key,
                type: 'FLOAT',
                value: parseFloat(value.value),
                scopes: ['ALL_SCOPES']
            });
        } else if (typeof value === 'object' && !value.type) {
            convertDimensions(value, prefix ? `${prefix}/${key}` : key);
        }
    }
}

// Convert all token sets
if (tokens.colors) convertColors(tokens.colors, 'colors');
if (tokens.semantic) convertColors(tokens.semantic, 'semantic');
if (tokens.components) convertColors(tokens.components, 'components');
if (tokens.dimensions) convertDimensions(tokens.dimensions, 'dimensions');

// Save
const outputPath = path.join(__dirname, '../figma-variables.json');
fs.writeFileSync(outputPath, JSON.stringify(figmaVariables, null, 2));

console.log('✅ Converted to Figma Variables format!');
console.log(`📄 Output: ${outputPath}`);
console.log(`📊 Created ${figmaVariables.variables.length} variables`);
