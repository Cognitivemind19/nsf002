import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";

export default class LoginPage {
  private readonly usernameInputSelector = "#username";
  private readonly passwordInputSelector = "#password";
  private readonly loginButtonSelector = "#Login";

  constructor(private page: Page) {}

  async navigateToLoginPage() {
    await this.page.goto("/");
  }

  async fillUsername(username: string) {
    await this.page.fill(this.usernameInputSelector, username);
    logger.info(`Username filled: ${username}`);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInputSelector, password);
    logger.info(`Password filled..`);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButtonSelector).catch((error) => {
      console.error(`Error clicking login button: ${error}`);
      throw error; // Re-throw the error to ensure test fails
    });
    logger.info("Login successfully..");
    const homePage = new HomePage(this.page);
    return homePage;
  }
}
