import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { encrypt, decrypt } from "../utils/cryptoUtil";
import { encryptEnvFile, decryptEnvFile } from "../utils/encryptEnvFile";
import logger from "../utils/LoggerUtil";

const authFile = "src/config/auth.json";

test("Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  // console.log(decrypt(process.env.USER_ID!));
  // console.log(decrypt(process.env.PASSWORD!));
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.USER_ID!));
  await loginPage.fillPassword(decrypt(process.env.PASSWORD!));
  const homePage = await loginPage.clickLoginButton();
  await homePage.waitForPageLoad();
  logger.info("Login successfully Completed.");
  await homePage.expectServiceTitleToBeVisible();
  await page.context().storageState({ path: authFile });
});

test.skip("Sample Test", async ({ page }) => {
  // const plainText = "Bipin Behera";
  // const encryptedText = encrypt(plainText);
  // console.log("SALT", process.env.SALT);
  // console.log("Encrypted Text:", encryptedText);
  // const decryptedText = decrypt(encryptedText);
  // console.log("Decrypted Text:", decryptedText);
  encryptEnvFile();
  // decryptEnvFile();
  console.log("Encryption and decryption of .env file completed.");
});

test.skip("Login with auth file", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: authFile,
  });
  const page = await context.newPage();
  await page.goto(
    "https://agility-energy-9628.lightning.force.com/lightning/page/home"
  );

  await expect(page.locator("one-appnav")).toContainText("Contacts");
  await page.getByRole("link", { name: "Accounts", exact: true }).click();
  await expect(page.getByLabel("Recently Viewed|Accounts|List")).toContainText(
    "Recently Viewed"
  );
  await page.getByRole("link", { name: "Sales" }).click();
  await expect(page.getByText("All Open Leads")).toBeVisible();
});
