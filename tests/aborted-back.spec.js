import { expect, test } from '@playwright/test'

/** The visible page: Ionic hides inactive pages with .ion-page-hidden. */
const visible = (page) => page.locator('.ion-page:not(.ion-page-hidden)').last()

test('after an aborted IonBackButton navigation, router.replace shows its own page', async ({
  page,
}) => {
  await page.goto('/home')
  await page.locator('#open-form').click()
  await expect(page).toHaveURL(/\/form$/)
  await expect(visible(page).locator('#form-heading')).toBeVisible()

  // IonBackButton -> handleNavigateBack -> router.back(); the leave guard returns false.
  await page.locator('#back').click()
  await expect(page.locator('#guard-log')).toHaveText('Guard said: stay on the form')
  await expect(page).toHaveURL(/\/form$/)

  // The next navigation.
  await visible(page).locator('#send').click()
  await expect(page).toHaveURL(/\/done$/)
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'test-results/after-send.png' })
  // Expected: the Done page. Actual (unpatched 8.8.19): the Home page stays visible under /done.
  await expect(visible(page).locator('#done-heading')).toBeVisible()
})
