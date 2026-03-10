// fixtures/eventswidget-fixtures.ts
import { test as base, expect } from '@playwright/test';
import { testConfig } from '../playwright.config';

// Расширяем базовые фикстуры Playwright
export const test = base.extend<{
  eventsWidgetPage: EventsWidgetPage;
}>({
  eventsWidgetPage: async ({ page }, use) => {
    const eventsWidgetPage = new EventsWidgetPage(page);
    await eventsWidgetPage.goto();
    await use(eventsWidgetPage);
  },
});

// Класс Page Object Model для виджета событий
export class EventsWidgetPage {
  constructor(public readonly page: Page) {}

  // Локаторы
  private topicSelect = this.page.locator('.checkselect[data-select="Выбрать тематику"]');
  private countrySelect = this.page.locator('.checkselect[data-select="Все страны"]');
  private widthInput = this.page.locator('input[name="width"]');
  private heightInput = this.page.locator('input[name="height"]');
  private greenLabel = this.page.locator('label:has(input[value="green"])');
  private greenInput = this.page.locator('input[name="theme"][value="green"]');
  private generateButton = this.page.getByRole('button', { name: 'Сгенерировать превью' });
  private previewFrame = this.page.locator('#preview').frameLocator('iframe[id="3snet-frame"]');

  // Базовые методы
  async goto() {
    await this.page.goto(testConfig.baseUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: testConfig.timeouts.navigation 
    });
  }

  async waitForPageLoad() {
    await expect(this.topicSelect).toBeVisible({ timeout: testConfig.timeouts.default });
  }

  async selectTopic() {
    await this.topicSelect.locator('.checkselect-control').click();
    const igamingOption = this.topicSelect.locator(`label:has(input[value="${testConfig.selectors.topic.value}"])`);
    await igamingOption.click();
    await this.topicSelect.locator('.checkselect-control').click();
  }

  async selectCountry(selectAll: boolean = true) {
    await expect(this.countrySelect).toBeVisible({ timeout: testConfig.timeouts.default });
    await this.countrySelect.locator('.checkselect-control').click();
    
    if (selectAll) {
      const countryOption = this.countrySelect.locator(testConfig.selectors.country.selectAll);
      await countryOption.click();
    }
    
    await this.countrySelect.locator('.checkselect-control').click();
  }

  async setDimensions(width: string = testConfig.selectors.dimensions.width, height: string = testConfig.selectors.dimensions.height) {
    await this.widthInput.clear();
    await this.widthInput.fill(width);
    await this.heightInput.clear();
    await this.heightInput.fill(height);
    
    await expect(this.widthInput).toHaveValue(width);
    await expect(this.heightInput).toHaveValue(height);
  }

  async selectGreenTheme() {
    await expect(this.greenLabel).toBeVisible({ timeout: testConfig.timeouts.default });
    await this.greenLabel.click();
    await expect(this.greenInput).toBeChecked();
    console.log('✅ Зеленая тема выбрана');
  }

  async generatePreview() {
    await expect(this.generateButton).toBeEnabled({ timeout: testConfig.timeouts.default });
    await this.generateButton.click();
  }

  async waitForPreview() {
    await this.page.waitForSelector('#preview', { timeout: testConfig.timeouts.selector });
    await expect(this.previewFrame.locator('body')).toBeVisible({ timeout: testConfig.timeouts.preview });
    
    const table = this.previewFrame.locator('div.events_wrap_table > table');
    await expect(table).toBeVisible({ timeout: testConfig.timeouts.preview });
  }

  async verifyEventRows() {
    const dataTable = this.previewFrame.locator('table:not(.event-activity-head)');
    const eventRows = dataTable.locator('tbody tr');
    const rowsCount = await eventRows.count();
    
    expect(rowsCount).toBeGreaterThan(0);
    
    const rowsToCheck = Math.min(rowsCount, 3);

    for (let i = 0; i < rowsToCheck; i++) {
      const row = eventRows.nth(i);
      const nameCell = row.locator('.event-name');
      const dateCell = row.locator('td.date-column');
      const countryCell = row.locator('td.country-column');

      await expect(nameCell, `пустое название события в строке ${i + 1}`).not.toHaveText(/^\s*$/);
      await expect(dateCell, `пустая дата события в строке ${i + 1}`).not.toHaveText(/^\s*$/);
      await expect(countryCell, `пустая страна события в строке ${i + 1}`).not.toHaveText(/^\s*$/);
    }
  }
}

export { expect } ;