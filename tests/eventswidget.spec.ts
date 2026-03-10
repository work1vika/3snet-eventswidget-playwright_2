// tests/eventswidget.spec.ts
import { test, expect } from '../fixtures/eventswidget-fixtures';

test.describe('Events widget – базовая загрузка и превью', () => {
  
  test('TC1: Базовая загрузка и генерация превью без выбора страны', async ({ eventsWidgetPage }) => {
    // Шаг 1: Открыть страницу конструктора календаря
    // (выполняется автоматически в фикстуре)
    
    // Шаг 2: Проверить, что страница загрузилась (блок тематики видим)
    await eventsWidgetPage.waitForPageLoad();
    
    // Шаг 3: Открыть попап и выбрать тематику Igaming
    await eventsWidgetPage.selectTopic();
    
    // Шаг 4: Установить ширину 570px и высоту 480px
    await eventsWidgetPage.setDimensions('570', '480');
    
    // Шаг 5: Выбрать зеленый цвет темы
    await eventsWidgetPage.selectGreenTheme();
    
    // Шаг 6: Кликнуть по кнопке генерации превью
    await eventsWidgetPage.generatePreview();
    
    // Шаг 7: Дождаться появления и полной загрузки iframe с превью
    await eventsWidgetPage.waitForPreview();
    
    // Шаг 8: Проверить, что в таблице событий есть данные
    await eventsWidgetPage.verifyEventRows();
    
    // Дополнительно: проверим, что страна не выбиралась (опционально)
    // Можно добавить специфичную для TC1 проверку, если нужно
    console.log('✅ Тест TC1 успешно выполнен (без выбора страны)');
  });

});