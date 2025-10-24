import { test, expect } from '@playwright/test';

test.describe('Bilingual Homepage with Language Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Start at the root, which should redirect to /en by default
    await page.goto('http://localhost:3001');
  });

  test('AC1: Homepage displays welcome message in current locale (EN)', async ({ page }) => {
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator('h1')).toContainText('Welcome to Chess Coaching');
    await expect(page.locator('text=Learn chess from a professional instructor')).toBeVisible();
  });

  test('AC2: Language toggle button visible in header', async ({ page }) => {
    await expect(page.locator('text=Language:')).toBeVisible();
    await expect(page.locator('button:has-text("EN")')).toBeVisible();
    await expect(page.locator('button:has-text("FR")')).toBeVisible();
  });

  test('AC3: Clicking toggle switches between /en and /fr routes', async ({ page }) => {
    // Should start at /en
    await expect(page).toHaveURL(/\/en/);

    // Click FR button
    await page.click('button:has-text("FR")');
    await expect(page).toHaveURL(/\/fr/);

    // Click EN button
    await page.click('button:has-text("EN")');
    await expect(page).toHaveURL(/\/en/);
  });

  test('AC4: Content updates immediately when language changes', async ({ page }) => {
    // Start in English
    await expect(page.locator('h1')).toContainText('Welcome to Chess Coaching');

    // Switch to French
    await page.click('button:has-text("FR")');
    await expect(page.locator('h1')).toContainText('Bienvenue au Coaching d\'Échecs');

    // Switch back to English
    await page.click('button:has-text("EN")');
    await expect(page.locator('h1')).toContainText('Welcome to Chess Coaching');
  });

  test('AC5: Selected language persists across page reloads', async ({ page, context }) => {
    // Switch to French
    await page.click('button:has-text("FR")');
    await expect(page).toHaveURL(/\/fr/);
    await expect(page.locator('h1')).toContainText('Bienvenue au Coaching d\'Échecs');

    // Reload the page
    await page.reload();

    // Should still be in French
    await expect(page).toHaveURL(/\/fr/);
    await expect(page.locator('h1')).toContainText('Bienvenue au Coaching d\'Échecs');

    // Navigate to homepage and verify still French
    await page.goto('http://localhost:3001/fr');
    await expect(page.locator('h1')).toContainText('Bienvenue au Coaching d\'Échecs');
  });

  test('AC6: Both French and English translations are professional', async ({ page }) => {
    // Check English
    await expect(page.locator('h1')).toContainText('Welcome to Chess Coaching');
    await expect(page.locator('text=Learn chess from a professional instructor')).toBeVisible();

    // Switch to French
    await page.click('button:has-text("FR")');

    // Check French
    await expect(page.locator('h1')).toContainText('Bienvenue au Coaching d\'Échecs');
    await expect(page.locator('text=Apprenez les échecs avec un instructeur professionnel')).toBeVisible();
  });

  test('AC7: Homepage includes placeholder sections for future content', async ({ page }) => {
    // Check About section
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Content coming soon...')).toBeVisible();

    // Check Services section
    await expect(page.locator('text=Services')).toBeVisible();

    // Check Contact section
    await expect(page.locator('text=Contact')).toBeVisible();

    // Count placeholder text occurrences (should be 3)
    const placeholders = await page.locator('text=Content coming soon...').count();
    expect(placeholders).toBe(3);
  });

  test('AC8: Page fully responsive on mobile screen sizes', async ({ page }) => {
    // Set mobile viewport (iPhone SE)
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify page renders correctly
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Welcome to Chess Coaching')).toBeVisible();

    // Verify all sections are visible
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
  });

  test('AC8: Page fully responsive on tablet screen sizes', async ({ page }) => {
    // Set tablet viewport (iPad)
    await page.setViewportSize({ width: 768, height: 1024 });

    // Verify page renders correctly
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Welcome to Chess Coaching')).toBeVisible();

    // Verify all sections are visible
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
  });

  test('AC8: Page fully responsive on desktop screen sizes', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verify page renders correctly
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Welcome to Chess Coaching')).toBeVisible();

    // Verify all sections are visible
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
  });

  test('Header stays sticky on scroll', async ({ page }) => {
    // Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 500));

    // Header should still be visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=Chess Coaching')).toBeVisible();
    await expect(page.locator('text=Language:')).toBeVisible();
  });

  test('French translations in all sections', async ({ page }) => {
    // Switch to French
    await page.click('button:has-text("FR")');

    // Verify all section titles are in French
    await expect(page.locator('text=À propos')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
    await expect(page.locator('text=Contenu à venir...')).toBeVisible();
  });
});
