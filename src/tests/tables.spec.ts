import { test, expect, Page } from "@playwright/test";

async function testWebTable(page: Page): Promise<void> {
  await page.goto(
    "https://examples.bootstrap-table.com/template.html?v=134&url=options%2Ftable-pagination.html"
  );
  await page.waitForTimeout(2000);

  await page.waitForSelector("#table tbody");
  const rows = await page.locator("#table tbody tr").all();
  const columns = await page.locator("#table tbody tr td").all();

  const counts: number = rows.length;
  console.log(`Number of rows: ${counts}`);
  console.log(`Number of columns: ${columns.length}`);

  // await expect(page.locator("#table tbody tr")).toHaveCount(10);

  for (const ele of columns) {
    const textContent = await ele.textContent();
    console.log(textContent);
  }
}

// This is the actual test that Playwright will recognize
test("web table test", async ({ page }) => {
  await testWebTable(page);
});

// You can add more tests here
test("verify table has data", async ({ page }) => {
  await page.goto(
    "https://examples.bootstrap-table.com/template.html?v=134&url=options%2Ftable-pagination.html"
  );
  await page.waitForTimeout(2000);

  const rows = await page.locator("#table tbody tr");
  await expect(rows).toHaveCount(10);
});
