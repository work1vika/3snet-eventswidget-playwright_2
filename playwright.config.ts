// playwright.config.ts
import { defineConfig } from '@playwright/test';

// Конфигурационные данные для тестов
export const testConfig = {
  baseUrl: 'https://dev.3snet.info/eventswidget/',
  timeouts: {
    navigation: 30000,
    preview: 55000,
    selector: 10000,
    default: 30000
  },
  selectors: {
    topic: {
      value: '10964',
      selector: '.checkselect[data-select="Выбрать тематику"]'
    },
    country: {
      selector: '.checkselect[data-select="Все страны"]',
      selectAll: 'label:has(input.selectAll)'
    },
    dimensions: {
      width: '570',
      height: '480'
    },
    theme: {
      green: 'green'
    }
  }
};

export default defineConfig({
  testDir: './tests',          // где лежат тесты
  timeout: 30_000,             // общий таймаут на тест
  retries: 0,                  // можно 1–2, если хочешь устойчивость
  use: {
    baseURL: testConfig.baseUrl,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
 
// Передаем конфиг в тесты через дополнительные параметры
    extraHTTPHeaders: {
      'x-test-config': JSON.stringify(testConfig)
    }
  },

  // по желанию: запуск в нескольких браузерах
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // можно добавить firefox / webkit
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
  ],
  reporter: [['list']]       // простой вывод в консоль
});

