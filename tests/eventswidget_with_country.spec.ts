// tests/eventswidget_with_country.spec.ts
import { test, expect } from '../fixtures/eventswidget-fixtures';

test.describe('Events widget – базовая загрузка и превью', () => {
  
  test('TC2: Базовая загрузка и генерация превью с выбором варианта страны', async ({ eventsWidgetPage }) => {
    // 1. Проверяем загрузку страницы
    await eventsWidgetPage.waitForPageLoad();
    
    // 2. Выбираем тематику Igaming
    await eventsWidgetPage.selectTopic();
    
    // 3. Выбираем страну (с параметром true - "Выбрать все")
    await eventsWidgetPage.selectCountry(true); // true = выбрать все страны
    
    // 4. Устанавливаем размеры виджета
    await eventsWidgetPage.setDimensions('570', '480');
    
    // 5. Выбираем зеленую тему
    await eventsWidgetPage.selectGreenTheme();
    
    // 6. Генерируем превью
    await eventsWidgetPage.generatePreview();
    
    // 7. Ожидаем загрузки превью
    await eventsWidgetPage.waitForPreview();
    
    // 8. Проверяем строки событий в iframe
    await eventsWidgetPage.verifyEventRows();
  });

});