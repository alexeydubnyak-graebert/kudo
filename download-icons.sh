#!/bin/bash

# Light icons 16px - downloading from localhost Figma server
# These are the base icons without size postfixes

echo "Downloading light icons (16px)..."

# Already downloaded
curl -s -o "src/icons/ribbon/home/draw/light/3d_polyline.svg" "http://localhost:3845/assets/177e6fbe36a05ab9f58a5c4ee95db2961ecf9481.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_center_start_angle.svg" "http://localhost:3845/assets/7c7f0dd483f303271b89cb8ae26bce94d22f7d69.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_center_start_end.svg" "http://localhost:3845/assets/27ca583e94d733a828bcfebbf590bd5d1a44bf9a.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_continue.svg" "http://localhost:3845/assets/d8eaac2ccf8bacb37cf21203d2300c062d8f9ea7.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_end_radius.svg" "http://localhost:3845/assets/0582c27556755dd443a984e8cf00bc06f5345957.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_start_center_angle.svg" "http://localhost:3845/assets/04d5248d81e62fc0fdec24eb91eaedddf6ca8f29.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_start_center_end.svg" "http://localhost:3845/assets/5fedf9a9af4fcd44c9570726046bd6ca57934394.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_start_center_lenght.svg" "http://localhost:3845/assets/bc4c163cc8123528a1e551a74260651c72ac26d7.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_start_end_angle.svg" "http://localhost:3845/assets/8313f534b5d54ec4c5f1c2d7833ab89ad34e6c29.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc_start_end_direction.svg" "http://localhost:3845/assets/93feac512ec81c1f5e1d06f4dc7a396636f411aa.svg"
curl -s -o "src/icons/ribbon/home/draw/light/arc.svg" "http://localhost:3845/assets/d957e39cfd33bd050d203b6dabcc4fe85a864e74.svg"

echo "Downloaded 11 light icons so far..."
echo "Please run Figma MCP tool to get remaining icon URLs"
