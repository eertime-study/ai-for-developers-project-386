### Hexlet tests and linter status:
[![Actions Status](https://github.com/eertime-study/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/eertime-study/ai-for-developers-project-386/actions)

## Календарь звонков

Учебный Design First проект: фиксируем API-контракт в TypeSpec, затем независимо реализуем фронтенд и бэкенд по нему.

### Спецификация

API-контракт описан в [spec/main.tsp](spec/main.tsp) на [TypeSpec](https://typespec.io/). Он покрывает публичные сценарии гостя (просмотр типов событий, выбор слота в 14-дневном окне, бронирование) и административные сценарии владельца календаря (создание типов событий, просмотр предстоящих встреч).

### Фронтенд

UI лежит в [frontend/](frontend/). Стек:

- **Vite + React 19 + TypeScript** — сборка и dev-сервер
- **shadcn/ui** (preset radix-nova, на Radix + Tailwind) — UI-компоненты
- **React Router v6** — маршрутизация
- **TanStack Query** — запросы, кэш, инвалидация
- **react-hook-form + zod** — формы и валидация
- **openapi-typescript** — генерация типов из контракта
- **[Prism](https://stoplight.io/open-source/prism)** — mock-сервер по `openapi.yaml`

Типы API генерируются из `spec/main.tsp` → `openapi.yaml` → `frontend/src/api/schema.ts`, поэтому фронт всегда соответствует контракту. Технические договорённости — в [CLAUDE.md](CLAUDE.md).

Структура `frontend/src/`:

```
src/
├── api/
│   ├── schema.ts      # автоген типов из openapi.yaml (не править руками)
│   ├── client.ts      # типизированный openapi-fetch + класс ошибки ApiFailure
│   └── queries.ts     # хуки TanStack Query на все операции контракта
├── lib/
│   ├── time.ts        # форматирование дат через Intl.DateTimeFormat(timeZone)
│   └── utils.ts       # cn() от shadcn
├── components/
│   ├── ui/            # примитивы shadcn (button, card, input, table, alert, …)
│   ├── AppShell.tsx   # общий layout: шапка + футер с часовым поясом
│   ├── OwnerHeader.tsx, EventTypeCard.tsx
│   ├── SlotGrid.tsx, SlotLegend.tsx          # 14-дневная сетка слотов
│   └── BookingsTable.tsx, EventTypeCreateForm.tsx  # админка
├── routes/
│   ├── EventTypesListPage.tsx   # /                         (гость: список типов)
│   ├── SlotPickerPage.tsx       # /event-types/:id          (сетка слотов)
│   ├── BookingFormPage.tsx      # /event-types/:id/book     (форма бронирования)
│   ├── BookingSuccessPage.tsx   # /bookings/success         (экран успеха)
│   ├── AdminPage.tsx            # /admin/bookings           (таблица + создание типа)
│   └── NotFoundPage.tsx         # *                         (404)
├── main.tsx           # bootstrap: QueryClientProvider + RouterProvider
└── App.tsx            # layout-обёртка
```

### Локальный запуск

Нужны два терминала — mock-сервер и фронт работают одновременно:

```sh
# 1. mock-сервер на :4010
cd spec && npm install && npm run compile && npm run mock

# 2. фронт на :5173
cd frontend && npm install --legacy-peer-deps && npm run gen:api && npm run dev
```

Откройте `http://localhost:5173/`. Если страница не грузится — почти всегда не запущен один из двух процессов.

### Роли и навигация

Авторизации нет (по контракту владелец один и заранее задан). Роли разведены по URL:

| Роль | URL | Что доступно |
|------|-----|--------------|
| **Гость** | `http://localhost:5173/` | Список типов встреч → выбор слота → бронирование → экран успеха |
| **Владелец** | `http://localhost:5173/admin/bookings` | Таблица предстоящих встреч + форма создания типа встречи |

Переключение — смена адреса в браузере. Ссылки из гостевой части в админку нет намеренно: публичный URL не должен раскрывать административный экран.

### Что проверить в UI

При запущенных Prism (:4010) и Vite (:5173):

1. **Бронирование (happy path):** `/` → выбрать тип → кликнуть зелёный (`available`) слот → заполнить имя/email → «Забронировать» → попасть на экран успеха.
2. **Слот уже занят (409):** при повторном бронировании занятого слота — красный баннер «Этот слот уже заняли» со ссылкой на возврат к сетке.
3. **Невалидный email:** ввести строку без `@` → submit блокируется с подсказкой под полем.
4. **Создание типа встречи:** на `/admin/bookings` заполнить форму справа → «Создать тип встречи» → зелёный alert, форма очищается, новый тип появляется в списке гостя.

> Mock Prism отдаёт **случайные** данные (lorem ipsum, абсурдные даты и длительности) — это нормально для контрактного мока. С реальным бэком по тому же контракту значения станут осмысленными.

### Полезные скрипты

| Команда | Где | Назначение |
|---------|-----|------------|
| `npm run compile` | `spec/` | TypeSpec → `openapi.yaml` |
| `npm run mock` | `spec/` | Prism mock на :4010 |
| `npm run gen:api` | `frontend/` | Регенерация типов из контракта (`schema.ts`) |
| `npm run dev` | `frontend/` | Dev-сервер Vite на :5173 |
| `npm run build` | `frontend/` | Прод-сборка (`tsc -b && vite build`) |