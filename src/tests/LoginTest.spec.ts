import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

test("Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername("bipin.behera26-ybgj@force.com");
  await loginPage.fillPassword("Dadha@$#2025");
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
});
