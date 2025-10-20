import { expect, test } from "@playwright/test";

test.describe("Homepage tests", () => {
  // Expect a hero heading to be visible.
  test("Has hero text", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await expect(page.locator("h1")).toBeVisible();
  });

  // Expect a form and submit button to be visible.
  test("Has form and submit button", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // Expect a form to be visible.
    await expect(page.locator("form")).toBeVisible();

    // Expect a placeholder input to be visible.
    await expect(
      page.locator("input[placeholder='https://example.com']"),
    ).toBeVisible();

    // Expect a submit button to be visible.
    await expect(page.locator("button[type='submit']")).toBeVisible();
  });

  // Expect form to behave correctly on different types of submissions.
  test("Form behavior", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // Expect a form to be visible.
    await expect(page.locator("form")).toBeVisible();

    // Expect a placeholder input to be visible.
    await expect(
      page.locator("input[placeholder='https://example.com']"),
    ).toBeVisible();

    // Expect a submit button to be visible.
    await expect(page.locator("button[type='submit']")).toBeVisible();

    // Test invalid URL submissions

    // Nothing
    await page.getByRole("textbox").fill("");
    await page.click("button[type='submit']");
    await expect(page.locator("text=Please enter a valid URL.")).toBeVisible();

    // Whitespaces
    await page.getByRole("textbox").fill(" ");
    await page.click("button[type='submit']");
    await expect(page.locator("text=Please enter a valid URL.")).toBeVisible();

    // https://example.com/ -> trailing slash
    await page.getByRole("textbox").fill("https://example.com/");
    await page.click("button[type='submit']");
    await expect(
      page.locator("text=Please remove trailing slash."),
    ).toBeVisible();

    // TODO: Finally, test a valid URL submission
    // https://example.com -> no trailing slash
  });
});
