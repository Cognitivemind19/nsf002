import * as fs from "fs";
import path from "path";

const CSVToJSON = (
  data: string,
  delimiter: string = ","
): Record<string, string>[] => {
  const lines = data.trim().split("\n");
  const titles = parseCSVRow(lines[0], delimiter);

  return lines
    .slice(1)
    .map((line) => {
      if (line.trim() === "") return null; // Skip empty lines

      const values = parseCSVRow(line, delimiter);ass
      return titles.reduce(
        (obj: Record<string, string>, title: string, index: number) => {
          obj[title] = values[index] || ""; // Handle missing values
          return obj;
        },
        {} as Record<string, string>
      );
    })
    .filter((row): row is Record<string, string> => row !== null); // Remove null entries
};

// Helper function to properly parse CSV rows with quoted fields
const parseCSVRow = (row: string, delimiter: string = ","): string[] => {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      // Handle escaped quotes ("")
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
};

// Example usage
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'config' folder
const testdataDir = path.resolve(srcDir, "data");
const csvFilePath = `${testdataDir}`;

export const convertCsvFileToJsonFile = (
  csvFileName,
  jsonFileName,
  delimiter = ","
) => {
  try {
    // Read the CSV file
    const csvData = fs.readFileSync(`${testdataDir}\\${csvFileName}`, "utf8");

    // Convert CSV to JSON
    const jsonData = CSVToJSON(csvData, delimiter);

    // Write JSON data to a new file
    fs.writeFileSync(
      `${testdataDir}\\${jsonFileName}`,
      JSON.stringify(jsonData, null, 2) // Changed to 2 spaces for better formatting
    );

    console.log(
      `Conversion completed. JSON data written to: ${testdataDir}\\${jsonFileName}`
    );
  } catch (error) {
    console.error("Error converting CSV to JSON:", error.message);
  }
};
