#!/bin/bash

# Download dark icons 16px from Figma localhost server
cd "/Users/dubnyakalexey/Library/Mobile Documents/com~apple~CloudDocs/GitHub/kudo"

echo "Downloading dark icons (16px)..."

# Dark icons retrieved so far
curl -s -o "src/icons/ribbon/home/draw/dark/polygon.svg" "http://localhost:3845/assets/f05e1eb1baf2dd46eb890e6e936fd1c02d263235.svg"
curl -s -o "src/icons/ribbon/home/draw/dark/rectangle_center.svg" "http://localhost:3845/assets/4de730134467412924cdf8b605d9c3469f231980.svg"
curl -s -o "src/icons/ribbon/home/draw/dark/arc_start_end_angle.svg" "http://localhost:3845/assets/a534a87ba2c0bdf6f2636c683bd6c6b11ba24d1c.svg"
curl -s -o "src/icons/ribbon/home/draw/dark/donut.svg" "http://localhost:3845/assets/02968a48ed2471c554cf926fd2f9d6599cec6ae6.svg"
curl -s -o "src/icons/ribbon/home/draw/dark/arc_center_start_angle.svg" "http://localhost:3845/assets/a1af1808a6c328416ff7972b471f8f70d2accc0d.svg"

echo "Downloaded 5 dark icons so far. Continue getting remaining icons..."
echo "To complete the export, you need to:"
echo "1. Call mcp0_get_code for each remaining dark icon node ID"
echo "2. Extract the SVG URL from the response"
echo "3. Add curl commands to this script"
echo "4. Run the script again"
