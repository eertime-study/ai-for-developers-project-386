### Hexlet tests and linter status:
[![Actions Status](https://github.com/eertime-study/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/eertime-study/ai-for-developers-project-386/actions)

## Календарь звонков

Учебный Design First проект: фиксируем API-контракт в TypeSpec, затем независимо реализуем фронтенд и бэкенд по нему.

### Спецификация

API-контракт описан в [spec/main.tsp](spec/main.tsp) на [TypeSpec](https://typespec.io/). Он покрывает публичные сценарии гостя (просмотр типов событий, выбор слота в 14-дневном окне, бронирование) и административные сценарии владельца календаря (создание типов событий, просмотр предстоящих встреч).