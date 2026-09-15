const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "matrix");
const outputFile = path.join(outputDir, "flags.json");

const excludedDirectories = new Set([
  ".git",
  ".github",
  "matrix",
  "scripts",
  "node_modules"
]);

const erps = fs.readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && !excludedDirectories.has(entry.name))
  .map(entry => entry.name)
  .sort();

const rows = [];

for (const erp of erps) {
  const erpDir = path.join(root, erp);

  const banks = fs.readdirSync(erpDir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".json"))
    .map(entry => entry.name)
    .sort();

  for (const bankFile of banks) {
    const bank = path.basename(bankFile, ".json");
    const config = JSON.parse(
      fs.readFileSync(path.join(erpDir, bankFile), "utf8")
    );

    rows.push({
      erp,
      bank,
      payments: Boolean(config.payments),
      clients: Boolean(config.clients),
      advisors: Boolean(config.advisors)
    });
  }
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(rows, null, 2) + "\n");

console.log(`Generated ${outputFile} with ${rows.length} rows.`);
