
import { test, expect } from '@playwright/test';

test.describe('Landing and Main Navigation', () => {
  test('Landing page loads and nav buttons present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Prompt Labs/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Get Started|Dashboard/i })).toBeVisible();
    await expect(page.locator('text=View Templates')).toBeVisible();
  });

  test('Templates page loads via nav', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /View Templates/i }).click();
    // It should go to "/prompt-lab"
    await expect(page).toHaveURL(/\/prompt-lab$/);
    await expect(page.getByText(/Prompt Lab/i)).toBeVisible();
  });

  test('Legal/Policy page loads from sidebar', async ({ page }) => {
    await page.goto('/dashboard');
    // Open sidebar Policy link
    await page.getByText(/Policies/i).click();
    await expect(page).toHaveURL(/\/policy$/);
    await expect(page.getByText(/Legal & Policy/i)).toBeVisible();
  });
});
