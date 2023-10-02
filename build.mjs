import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

function getBuildPackages() {
  const packages = fs.readdirSync("./node_modules/@svg-icons");
  return packages.filter((pkg) => !pkg.startsWith("__"));
}

function generateManifestFile(buildPackages) {
  const map = [];
  for (const packageName of buildPackages) {
    const manifest = require(`@svg-icons/${packageName}/__manifest.json`);
    const icons = manifest.map((row) => row.name);
    map.push({ package: packageName, icons });
  }
  return (
    `export const fontPackages = new Set(${JSON.stringify(buildPackages)});\n` +
    `export interface IconManifest { package: string; icons: string[]; }\n` +
    `export const manifest: IconManifest[] = ${JSON.stringify(map)};`
  );
}

function generateSvgFile(buildPackage) {
  const manifest = require(`@svg-icons/${buildPackage}/__manifest.json`);
  const fragments = manifest.map((icon) => {
    const { name } = icon;
    const svg = fs.readFileSync(
      `./node_modules/@svg-icons/${buildPackage}/${name}.svg`,
      { encoding: "utf8", flag: "r" }
    );
    return svg.replace("<svg ", `<svg id="${name}" `);
  });
  const wrapped = `<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style>:root>svg{display:none}:root>svg:target{display:block}</style>${fragments}</svg>`;
  return wrapped;
}

function main() {
  const buildPackages = getBuildPackages();

  /** manifest file */
  fs.writeFileSync(
    "./src/assets/manifest.ts",
    generateManifestFile(buildPackages)
  );

  /** svg files */
  for (let iconPackage of buildPackages) {
    fs.writeFileSync(
      `./public/assets/${iconPackage}.svg`,
      generateSvgFile(iconPackage)
    );
  }
}

main();
