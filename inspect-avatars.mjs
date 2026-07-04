import { read, utils } from 'xlsx';
import fs from 'fs';

const workbook = read(fs.readFileSync('data/Games_SEO_Database_Updated-ad4589.xlsx'));
console.log('Sheet names:', workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
  console.log(`\n=== ${sheetName} ===`);
  const data = utils.sheet_to_json(workbook.Sheets[sheetName]);
  console.log(`Rows: ${data.length}`);
  if (data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
    console.log('Sample rows:');
    data.slice(0, 3).forEach((row, i) => {
      console.log(`\nRow ${i+1}:`);
      Object.entries(row).forEach(([key, val]) => {
        if (val && key.toLowerCase().includes('avatar')) {
          console.log(`  ${key}: ${val.toString().substring(0, 100)}`);
        }
      });
      if (row['Game Name / Название']) {
        console.log(`  Game: ${row['Game Name / Название']}`);
      }
    });
  }
});
