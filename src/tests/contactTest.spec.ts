import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { encrypt, decrypt } from "../utils/cryptoUtil";
import { encryptEnvFile, decryptEnvFile } from "../utils/encryptEnvFile";
import logger from "../utils/LoggerUtil";
import ContactPage from "../pages/ContactPage";
import cdata from "../data/contact.json";
import { convertCsvFileToJsonFile } from "../utils/csvToJsonUtil";
import { generateJSONfromExcel } from "../utils/excelTtJson";
import { faker } from "@faker-js/faker";
import {
  generateMultipleFakeUserData,
  exportToJson,
  exportTocsv,
} from "../utils/fakerSample";

test.skip("Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  for (const contact of cdata) {
    const flname = contact.fname;
    const lname = contact.fname;

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.USER_ID!));
    await loginPage.fillPassword(decrypt(process.env.PASSWORD!));
    const homePage = await loginPage.clickLoginButton();
    // await homePage.waitForPageLoad();
    // await homePage.expectServiceTitleToBeVisible();
    const contactsPage = await homePage.navigateToContactTab();

    logger.info("Navigated to Contact Page Successfully.");
    await contactsPage.createNewContact(lname, lname);
  }
});

test.skip("csv to json", async ({ page }) => {
  // convertCsvFileToJsonFile("data.csv", "dataone.json");
  generateJSONfromExcel("./datasheet.xlsx", "Sheet1", "Paid", "dataTable.json");
});

// test("faker test", async ({ page }) => {
//   generateMultipleFakeUserData(10).forEach((user) => {
//     console.log(
//       `ID: ${user.id}, Name: ${user.name}, Age: ${user.age}, Email: ${user.email}, Phone: ${user.phone}, Address: ${user.address}`
//     );
//   });
// });

// Generate test data
const testData = generateMultipleFakeUserData(3);

// Export data to JSON file
exportToJson(testData, "testData_en.json");

// exportTocsv(testData, "testData_en.csv");
