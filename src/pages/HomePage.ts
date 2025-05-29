import { Page, expect } from "@playwright/test";
import { error, time } from "console";
import logger from "../utils/LoggerUtil";
import ContactPage from "./ContactPage";

export default class HomePage {
  private serviceTitleLocator = 'span[title="Contacts"]'; // Target the span specifically

  // Alternative specific locators you can use:
  private serviceTitleSpan = 'span.slds-truncate[title="Service"]';
  private serviceTitleByDataTarget =
    '[data-target-selection-name="18091d42e3de45d9832ee76c43bc1481"]';
  private serviceTitleExact = 'span[title="Service"]:not(button)';
  private readonly contactsLinkLocators = "a[title='Contacts']";
  private readonly contactsLinkLocator = "Contacts";
  constructor(private page: Page) {}

  async waitForPageLoad() {
    console.log("🏠 Loading Salesforce home page...");

    try {
      // Step 1: Wait for basic page load
      await this.page
        .waitForLoadState("load", { timeout: 20000 })
        .catch((error) => {
          logger.error(
            `Error waiting for page load: ${error.message}. Retrying...`
          );
          throw error; // Re-throw to ensure test fails
        });
      console.log("📄 Basic page load complete");

      // Step 2: Wait for Salesforce Lightning navigation (most reliable indicator)
      await this.page
        .waitForSelector(
          ".slds-context-bar, .oneAppNavContainer, .slds-global-header",
          {
            timeout: 30000,
            state: "visible",
          }
        )
        .catch((error) => {
          logger.error(
            `Error waiting for page load: ${error.message}. Retrying...`
          );
          throw error; // Re-throw to ensure test fails
        });
      console.log("🧭 Salesforce navigation loaded");

      // // Step 3: Wait for Lightning app launcher (waffle menu)
      // await this.page
      //   .waitForSelector(
      //     '.slds-icon-waffle, [data-aura-class*="appLauncher"]',
      //     {
      //       timeout: 20000,
      //       state: "visible",
      //     }
      //   )
      //   .catch(() => {
      //     console.warn("⚠️ App launcher not found, continuing...");
      //   });

      // // Step 4: Wait for user profile area
      // await this.page
      //   .waitForSelector(
      //     '.profileTrigger, [data-aura-class*="oneUserProfileCardTrigger"]',
      //     {
      //       timeout: 20000,
      //       state: "visible",
      //     }
      //   )
      //   .catch(() => {
      //     console.warn("⚠️ User profile not found, continuing...");
      //   });

      // Step 5: Wait for main content area
      await this.page
        .waitForSelector(
          'main, [role="main"], .oneWorkspace, .slds-template__container',
          {
            timeout: 20000,
            state: "visible",
          }
        )
        .catch((error) => {
          console.warn("⚠️ Main content not found, continuing...");
          logger.error(`Error waiting for page load: ${error}. Retrying...`);
        });

      // Step 7: Additional buffer for Lightning components to initialize
      await this.page.waitForTimeout(3000);

      console.log("✅ Salesforce home page completely loaded");
    } catch (error) {
      console.error("❌ Home page loading failed:", error.message);
      logger.error(
        `Error waiting for page load: ${error.message}. Retrying...`
      );

      // // Take screenshot for debugging
      // await this.page.screenshot({
      //   path: `homepage-load-error-${Date.now()}.png`,
      //   fullPage: true,
      // });

      throw new Error(`Home page load timeout: ${error.message}`);
    }
  }

  async expectServiceTitleToBeVisible() {
    console.log(" Inside Service title validation function!");
    await expect(this.page.locator(this.serviceTitleLocator))
      .toBeVisible({
        timeout: 15000,
      })
      .catch((error) => {
        logger.error(
          `Error waiting for page load: ${error.message}. Retrying...`
        );
        throw error; // rethrow the error if needed
      });
  }

  async navigateToContactTab() {
    logger.info("Contacts Tab is visible");
    await this.page
      .getByRole("link", { name: this.contactsLinkLocator })
      .click();
    logger.info("Contacts Tab is clicked");
    await expect(
      this.page.getByRole("link", { name: this.contactsLinkLocator })
    ).toBeVisible();
    return new ContactPage(this.page);
  }
}
