import { readFileSync, writeFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
writeFileSync(new URL("../src/.version.ts", import.meta.url), `export const version = "${version}";\n`);
