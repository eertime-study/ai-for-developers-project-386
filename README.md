### Hexlet tests and linter status:
[![Actions Status](https://github.com/eertime-study/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/eertime-study/ai-for-developers-project-386/actions)

## Календарь звонков

Учебный Design First проект: фиксируем API-контракт в TypeSpec, затем независимо реализуем фронтенд и бэкенд по нему.

### Спецификация

API-контракт описан в [spec/main.tsp](spec/main.tsp) на [TypeSpec](https://typespec.io/). Он покрывает публичные сценарии гостя (просмотр типов событий, выбор слота в 14-дневном окне, бронирование) и административные сценарии владельца календаря (создание типов событий, просмотр предстоящих встреч).

### Фронтенд

UI лежит в [frontend/](frontend/) — Vite + React + TypeScript + shadcn/ui. Типы API генерируются из `spec/main.tsp` через `openapi-typescript`, в качестве mock-сервера используется [Prism](https://stoplight.io/open-source/prism) поверх сгенерированного `openapi.yaml`. Подробнее — в [CLAUDE.md](CLAUDE.md).

Локальный запуск (два терминала):

```sh
# 1. mock-сервер на :4010
cd spec && npm install && npm run compile && npm run mock

# 2. фронт на :5173
cd frontend && npm install --legacy-peer-deps && npm run gen:api && npm run dev
```