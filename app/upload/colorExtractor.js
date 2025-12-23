import ColorThief from "colorthief";

/**
 * 画像から主要な色を抽出してRGB文字列の配列で返す
 * @param {HTMLImageElement} img
 * @param {number} colorCount
 * @returns {string[]}
 */
export function extractColors(img, colorCount = 3) {
  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(img, colorCount); // [[r,g,b], ...]
  return palette.map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`);
}
