/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // 静的書き出し
  basePath: "/ekuraku",      // GitHub Pages は /repo名/ 配下になる
  assetPrefix: "/ekuraku/",  // 静的アセットのパス
  images: {
    unoptimized: true,       // next/image を使っているなら必須に近い
  },
};

module.exports = nextConfig;
