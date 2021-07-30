# Webinar.ru — Тестовое задание для frontend-разработчиков

### Новые фичи

#### F2. Напоминания

Была добавлена возможность устанавливать время напоминаний.
Данная возможность отключена, если Браузер не поддерживает данную функцию.

### Доработки

#### I1. Редактирование

Появилась возможность редактировать любую из карточек.
Для этого необходимо нажать на соответствующую кнопку на карточке.

#### I3. Свои идеи

-   Сделано отображение времени, когда должно прийти уведомление, если указать необходимость напоминания
-   Сделано разделение Контента на две части, когда список карточек не пуст
-   Сделано автоматическое удаление карточки, если она помечена, как завершенная через 5минут, чтобы отменить процесс, достаточно карточку убрать статус готовности у карточки.

### Баги

#### B1. LocalStorage Quota

для того чтобы воспроизвести данный баг необходимо, бесконечно начать заполнять localStorage карточками, либо:

```
let exceed = false;
const STORAGE_KEY = 'STORAGE_KEY';
let storageValue = '';
localStorage.setItem(STORAGE_KEY, storageValue)
while(!exceed) {
    storageValue = localStorage.getItem(STORAGE_KEY)
    try {
        localStorage.setItem(STORAGE_KEY, storageValue + '_')
    } catch(e) {
        exceed = e instanceof DOMException && (
            e.code === 22 || e.code === 1014 ||
            e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED');
    } finally {
        console.log(`max value is => ${storageValue.length}`);
    }
}
```

Единственный найденный мною вариант по исправлению данного поведения - не добавлять новых данных, когда localStorage вот-вот заполнится. Реализовано было с помощью небольшой миддлвары в провайдере [здесь](https://github.com/biostunt/webinar-frontend-test-task/blob/e59b063331b2bb121a146fe0404a969353a53a6e/src/contexts/TodoItems/Provider.tsx#L34)

### Технические задачи

#### T1. Форматирование кода

[Коммит](https://github.com/biostunt/webinar-frontend-test-task/commit/b4c5b07ad35721233651279124b80a3f1f9da9d5)

#### T2. Типизация

Вот [тут](https://github.com/biostunt/webinar-frontend-test-task/blob/590432dd2a1521b1e361cfbf81e743d396237a75/src/contexts/TodoItems/actions.ts#L31) интерфейс.

#### T3. Иммутабельность

Редюсер находится вот [здесь](https://github.com/biostunt/webinar-frontend-test-task/blob/590432dd2a1521b1e361cfbf81e743d396237a75/src/contexts/TodoItems/reducer.ts)

#### T4. Свои идеи

-   Контекст вынесен в отдельную папку
-   Компоненты вынесены в отдельную папку
