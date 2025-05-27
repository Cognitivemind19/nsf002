import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { encrypt, decrypt } from "../utils/cryptoUtil";
import { encryptEnvFile, decryptEnvFile } from "../utils/encryptEnvFile";

test.skip("Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  console.log(process.env.USER_ID!);
  console.log(process.env.PASSWORD!);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));
  const homePage = await loginPage.clickLoginButton();
  await homePage.waitForPageLoad();
  await homePage.expectServiceTitleToBeVisible();
});

test("Sample Test", async ({ page }) => {
  // const plainText = "Bipin Behera";
  // const encryptedText = encrypt(plainText);
  // console.log("SALT", process.env.SALT);
  // console.log("Encrypted Text:", encryptedText);
  // const decryptedText = decrypt(encryptedText);
  // console.log("Decrypted Text:", decryptedText);
  encryptEnvFile();
});
