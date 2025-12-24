const isProd = process.env.NODE_ENV === "production";
const repo = "ekuraku-app";
const basePath = isProd ? `/${repo}` : "";

module.exports = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};