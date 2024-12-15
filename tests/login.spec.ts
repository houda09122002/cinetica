import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  const baseURL = 'http://localhost:3000/login'; 

  test('should display login page', async ({ page }) => {
    await page.goto(baseURL);

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should show an error for invalid login', async ({ page }) => {
    await page.goto(baseURL);

    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill("wrongUser");
    await page.getByPlaceholder('Password').fill('wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.locator('text="CredentialsSignin"');
    await expect(errorMessage).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto(baseURL);

    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill("Houda Yasmine");
    await page.getByPlaceholder('Password').fill('HoudaYasmine');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('http://localhost:3000/dashboard');

    await expect(page).toHaveURL('http://localhost:3000/dashboard');

    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
  });
});
