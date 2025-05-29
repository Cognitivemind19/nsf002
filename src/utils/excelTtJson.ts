import * as xlsx from "xlsx";
import * as fs from "fs";
import * as path from "path";

interface ExcelRow {
  [key: string]: any;
}

export function generateJSONfromExcel(
  excelFilePath: string,
  sheetName: string,
  boolDataProp: string,
  jsonFilePath: string
): void {
  try {
    const fullExcelPath = path.join("./src/data/", excelFilePath);
    const wb = xlsx.readFile(fullExcelPath, { cellDates: true });

    const sheetNames = wb.SheetNames;
    console.log("Available sheets:", sheetNames);

    // Use the provided sheetName or default to 'data'
    const targetSheet = sheetNames.includes(sheetName) ? sheetName : "data";
    const ws = wb.Sheets[targetSheet];

    if (!ws) {
      console.error(`Sheet '${targetSheet}' not found in workbook`);
      return;
    }

    const dataJson: ExcelRow[] = xlsx.utils.sheet_to_json(ws, { raw: false });

    const newData = dataJson.map((row: ExcelRow) => {
      // Convert boolean strings to actual booleans for the specified property
      if (boolDataProp && row[boolDataProp]) {
        if (row[boolDataProp] === "TRUE") {
          row[boolDataProp] = true;
        } else if (row[boolDataProp] === "FALSE") {
          row[boolDataProp] = false;
        }
      }
      return row;
    });

    console.log("Converted data:", newData);

    const outputDir = "./src/data/";
    const outputPath = path.join(outputDir, jsonFilePath);

    if (fs.existsSync(outputDir)) {
      fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2));
      console.log(`JSON file created successfully: ${outputPath}`);
    } else {
      console.error("Directory does not exist:", outputDir);
    }
  } catch (error) {
    console.error("Error converting Excel to JSON:", error.message);
  }
}

// Usage
