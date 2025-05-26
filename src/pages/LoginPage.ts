import { Page } from "@playwright/test";
import HomePage from "./HomePage";

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
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInputSelector, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButtonSelector).catch((error) => {
      console.error(`Error clicking login button: ${error}`);
      throw error; // Re-throw the error to ensure test fails
    });

    const homePage = new HomePage(this.page);
    return homePage;
  }
}
