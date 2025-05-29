import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { encrypt, decrypt } from "../utils/cryptoUtil";
import { encryptEnvFile, decryptEnvFile } from "../utils/encryptEnvFile";

test("Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  console.log(decrypt(process.env.USER_ID!));
  console.log(decrypt(process.env.PASSWORD!));
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.USER_ID!));
  await loginPage.fillPassword(decrypt(process.env.PASSWORD!));
  const homePage = await loginPage.clickLoginButton();
  await homePage.waitForPageLoad();
  // await homePage.expectServiceTitleToBeVisible();
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
