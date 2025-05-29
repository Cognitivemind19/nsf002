import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class ContactPage {
  private readonly contactsLink = "Contacts";
  private readonly newButtonLocator = "New";
  private readonly firstNameTextFieldLocator = "First Name";
  private readonly lastNameTextFieldLocator = "*Last Name";
  private readonly accountNameTextFieldLocator = "*Account Name";
  private readonly saveButtonLocator = "Save";
  private readonly searchBoxLocator = "Search this list...";
  private readonly contactFullNameLabelLocator =
    "sfa-output-name-with-hierarchy-icon-wrapper";
  private readonly contactDisplayNameLocator = "#brandBand_2";
  private readonly searchTerm = "Ashok";
  private readonly contactsLinkLocator = "contactsLink";
  private readonly btnViewProfile = "View profile";
  private readonly logoutLink = "Log Out";

  constructor(private page: Page) {}

  async createNewContact(fname: string, lname: string) {
    await this.page
      .getByRole("button", { name: this.newButtonLocator })
      .click();
    logger.info("New button is clicked");
    // await this.page.waitForLoadState("load", { timeout: 20000 });

    await this.page
      .getByRole("textbox", { name: this.firstNameTextFieldLocator })
      .click();
    await this.page
      .getByRole("textbox", { name: this.firstNameTextFieldLocator })
      .fill(fname);
    await this.page
      .getByRole("textbox", { name: this.firstNameTextFieldLocator })
      .press("Tab");
    await this.page
      .getByRole("textbox", { name: this.lastNameTextFieldLocator })
      .click();
    await this.page
      .getByRole("textbox", { name: this.lastNameTextFieldLocator })
      .fill(lname);
    await this.page
      .getByRole("textbox", { name: this.firstNameTextFieldLocator })
      .press("Tab");
    await this.page
      .getByRole("combobox", { name: this.accountNameTextFieldLocator })
      .click();
    await this.page
      .getByLabel("Recent Accounts")
      .getByText(this.searchTerm)
      .click();
    logger.info(`Account Name ${this.searchTerm} is selected`);

    await this.page
      .getByRole("button", { name: this.saveButtonLocator, exact: true })
      .click()
      .catch((error) => {
        logger.error(`Error clicking Save button: ${error}`);
        throw error; // rethrow the error if needed
      })
      .then(() => logger.info("Save Button is clicked"));

    // async expectContactLabelContainsName(lname: string) {
    //   await expect(
    //     this.page.locator(this.contactFullNameLabelLocator)
    //   ).toContainText(` ${lname}`);
    // logger.info(`New contact created and ${lname} is visible`);
    // await this.page
    //   .getByRole("link", { name: this.contactsLinkLocator })
    //   .click();
    await this.page.waitForLoadState("load", { timeout: 20000 });
    await this.page.getByRole("button", { name: this.btnViewProfile }).click();
    await this.page.getByRole("link", { name: this.logoutLink }).click();
    await this.page.waitForLoadState("load", { timeout: 20000 });
  }

  //   async findExistingContactByLastName(lname: string) {
  //     await this.page.getByRole("link", { name: this.contactsLink }).click();
  //     await this.page.getByPlaceholder(this.searchBoxLocator).click();
  //     await this.page.getByPlaceholder(this.searchBoxLocator).fill(lname);
  //     await this.page.getByPlaceholder(this.searchBoxLocator).press("Enter");
  //     await this.page.getByRole("link", { name: lname }).click();
  //   }
}
