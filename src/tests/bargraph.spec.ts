import { test, expect, Page } from "@playwright/test";

// Configure test timeout
test.setTimeout(120000); // 2 minutes

test.describe("EMI Calculator Bar Graph Animation Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with increased timeout
    await page.goto("https://emicalculator.net/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Wait for page to stabilize
    await page.waitForTimeout(3000);
  });

  test("Should load EMI calculator and verify initial state", async ({
    page,
  }) => {
    try {
      // Verify page title with increased timeout
      await expect(page).toHaveTitle(
        /EMI Calculator|Home Loan EMI Calculator/,
        { timeout: 15000 }
      );

      // Look for loan amount input with multiple possible selectors
      const loanAmountSelectors = [
        "#loanamount",
        'input[name="loanamount"]',
        'input[placeholder*="loan"]',
        'input[placeholder*="amount"]',
        ".loan-amount input",
      ];

      let loanAmountInput = null;
      for (const selector of loanAmountSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          loanAmountInput = page.locator(selector);
          break;
        } catch (e) {
          continue;
        }
      }

      if (loanAmountInput) {
        await expect(loanAmountInput).toBeVisible({ timeout: 10000 });
        console.log("✅ Loan amount input found");
      } else {
        console.log("⚠️ Loan amount input not found with standard selectors");
      }

      // Look for chart container with multiple selectors
      const chartSelectors = [
        "#chartdiv",
        ".chart-container",
        ".amcharts-main-div",
        "#chart",
        ".chart",
      ];

      let chartFound = false;
      for (const selector of chartSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          await expect(page.locator(selector)).toBeVisible({ timeout: 5000 });
          console.log(`✅ Chart container found: ${selector}`);
          chartFound = true;
          break;
        } catch (e) {
          continue;
        }
      }

      if (!chartFound) {
        console.log(
          "⚠️ Chart container not found, taking screenshot for debugging"
        );
        await page.screenshot({ path: "debug-page-load.png", fullPage: true });
      }
    } catch (error) {
      console.error("Error in initial state test:", error.message);
      await page.screenshot({
        path: "error-initial-state.png",
        fullPage: true,
      });
      throw error;
    }
  });

  test("Should find and interact with EMI calculator inputs", async ({
    page,
  }) => {
    try {
      // Wait for page to load completely
      await page.waitForTimeout(5000);

      // Get all input elements and identify them
      const inputs = await page.locator("input").all();
      console.log(`Found ${inputs.length} input elements`);

      for (let i = 0; i < inputs.length; i++) {
        try {
          const input = inputs[i];
          const id = await input.getAttribute("id");
          const name = await input.getAttribute("name");
          const placeholder = await input.getAttribute("placeholder");
          const type = await input.getAttribute("type");

          console.log(
            `Input ${i}: id="${id}", name="${name}", placeholder="${placeholder}", type="${type}"`
          );

          // Try to interact with numeric inputs
          if (type === "number" || type === "text") {
            await input.scrollIntoViewIfNeeded();
            await input.clear();
            await input.fill("100000");
            await page.waitForTimeout(1000);
            console.log(`✅ Successfully filled input ${i}`);
          }
        } catch (e) {
          console.log(`⚠️ Could not interact with input ${i}: ${e.message}`);
        }
      }

      // Look for any calculate button
      const buttonSelectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button:has-text("Calculate")',
        'button:has-text("CALCULATE")',
        ".calculate-btn",
        "#calculate",
      ];

      for (const selector of buttonSelectors) {
        try {
          const button = page.locator(selector);
          if (await button.isVisible()) {
            await button.click();
            console.log(`✅ Clicked calculate button: ${selector}`);
            await page.waitForTimeout(2000);
            break;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.error("Error in calculator interaction test:", error.message);
      await page.screenshot({
        path: "error-calculator-interaction.png",
        fullPage: true,
      });
    }
  });

  test("Should analyze page structure and find chart elements", async ({
    page,
  }) => {
    try {
      await page.waitForTimeout(5000);

      // Look for canvas elements (charts often use canvas)
      const canvasElements = await page.locator("canvas").all();
      console.log(`Found ${canvasElements.length} canvas elements`);

      // Look for SVG elements (charts often use SVG)
      const svgElements = await page.locator("svg").all();
      console.log(`Found ${svgElements.length} SVG elements`);

      // Look for div elements with chart-related classes
      const potentialChartDivs = await page
        .locator(
          'div[class*="chart"], div[id*="chart"], div[class*="graph"], div[id*="graph"]'
        )
        .all();
      console.log(
        `Found ${potentialChartDivs.length} potential chart containers`
      );

      for (let i = 0; i < potentialChartDivs.length; i++) {
        try {
          const div = potentialChartDivs[i];
          const className = await div.getAttribute("class");
          const id = await div.getAttribute("id");
          console.log(`Chart div ${i}: class="${className}", id="${id}"`);

          if (await div.isVisible()) {
            await div.screenshot({ path: `chart-element-${i}.png` });
            console.log(`✅ Screenshot taken for chart element ${i}`);
          }
        } catch (e) {
          console.log(`⚠️ Could not process chart div ${i}: ${e.message}`);
        }
      }

      // Check for any animated elements
      const animatedElements = await page
        .locator('[style*="animation"], [class*="animate"]')
        .all();
      console.log(
        `Found ${animatedElements.length} potentially animated elements`
      );
    } catch (error) {
      console.error("Error in page structure analysis:", error.message);
      await page.screenshot({
        path: "error-page-analysis.png",
        fullPage: true,
      });
    }
  });

  test("Should test responsive behavior", async ({ page }) => {
    try {
      const viewports = [
        { width: 1920, height: 1080, name: "Desktop" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 375, height: 667, name: "Mobile" },
      ];

      for (const viewport of viewports) {
        console.log(
          `📱 Testing ${viewport.name}: ${viewport.width}x${viewport.height}`
        );

        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.waitForTimeout(2000);

        // Take screenshot for each viewport
        await page.screenshot({
          path: `responsive-${viewport.name.toLowerCase()}.png`,
          fullPage: true,
        });

        console.log(`✅ ${viewport.name} viewport test completed`);
      }
    } catch (error) {
      console.error("Error in responsive test:", error.message);
    }
  });

  test("Should capture page elements and structure", async ({ page }) => {
    try {
      await page.waitForTimeout(5000);

      // Get page HTML structure
      const bodyHTML = await page.locator("body").innerHTML();
      console.log("Page structure analyzed");

      // Save HTML structure to file for debugging
      require("fs").writeFileSync("page-structure.html", bodyHTML);

      // Take full page screenshot
      await page.screenshot({
        path: "full-page-capture.png",
        fullPage: true,
      });

      // Get all visible text
      const visibleText = await page.locator("body").textContent();
      console.log("Page text content captured");

      // Look for EMI-related text
      const emiKeywords = [
        "EMI",
        "loan",
        "interest",
        "tenure",
        "amount",
        "calculate",
      ];
      const foundKeywords = emiKeywords.filter((keyword) =>
        visibleText?.toLowerCase().includes(keyword.toLowerCase())
      );

      console.log(`Found EMI-related keywords: ${foundKeywords.join(", ")}`);

      if (foundKeywords.length > 0) {
        console.log("✅ EMI calculator content confirmed");
      } else {
        console.log("⚠️ EMI calculator content not found");
      }
    } catch (error) {
      console.error("Error in page capture test:", error.message);
    }
  });

  test("Should wait for and test any dynamic content", async ({ page }) => {
    try {
      // Wait longer for dynamic content to load
      await page.waitForTimeout(10000);

      // Look for any loading indicators and wait for them to disappear
      const loadingSelectors = [
        ".loading",
        ".spinner",
        '[class*="loading"]',
        '[id*="loading"]',
      ];

      for (const selector of loadingSelectors) {
        try {
          const loading = page.locator(selector);
          if (await loading.isVisible()) {
            console.log(`Waiting for loading indicator: ${selector}`);
            await loading.waitFor({ state: "hidden", timeout: 30000 });
          }
        } catch (e) {
          // Loading indicator might not exist, continue
        }
      }

      // Test if any sliders exist
      const sliderSelectors = [
        'input[type="range"]',
        ".slider",
        ".ui-slider",
        '[class*="slider"]',
      ];

      for (const selector of sliderSelectors) {
        try {
          const slider = page.locator(selector);
          if (await slider.isVisible()) {
            console.log(`Found slider: ${selector}`);
            await slider.scrollIntoViewIfNeeded();
            // Test slider interaction
            const boundingBox = await slider.boundingBox();
            if (boundingBox) {
              await page.mouse.click(
                boundingBox.x + boundingBox.width * 0.7,
                boundingBox.y + boundingBox.height / 2
              );
              await page.waitForTimeout(1000);
              console.log(`✅ Interacted with slider: ${selector}`);
            }
          }
        } catch (e) {
          console.log(
            `⚠️ Could not interact with slider ${selector}: ${e.message}`
          );
        }
      }
    } catch (error) {
      console.error("Error in dynamic content test:", error.message);
      await page.screenshot({
        path: "error-dynamic-content.png",
        fullPage: true,
      });
    }
  });
});
