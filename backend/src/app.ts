import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from '@fastify/cors'
import addFormats from 'ajv-formats'
import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import openapiGlue from 'fastify-openapi-glue'
import { systemClock, type Clock } from './clock.js'
import { registerErrorHandler } from './errors.js'
import { createService } from './service.js'
import { createStore } from './store.js'

const here = dirname(fileURLToPath(import.meta.url))

/** Тот же артефакт, что кормит фронт. Требует предварительного `spec compile`. */
const SPEC_PATH = resolve(here, '../../spec/tsp-output/@typespec/openapi3/openapi.yaml')

const CORS_ORIGINS = ['http://localhost:5173', 'http://localhost:4173']

// ajv-formats и Fastify тянут собственные (несовпадающие по версии) типы Ajv,
// поэтому плагин кастуем к ожидаемому Fastify типу элемента plugins.
type AjvPlugin = NonNullable<NonNullable<FastifyServerOptions['ajv']>['plugins']>[number]

export interface BuildOptions {
  /** Источник времени; в тестах передаётся фиксированный clock. */
  clock?: Clock
  /** Уровень логирования Fastify (по умолчанию выключен — удобно для тестов). */
  logger?: boolean
}

export async function buildApp(options: BuildOptions = {}): Promise<FastifyInstance> {
  const clock = options.clock ?? systemClock
  const store = createStore()

  const app = Fastify({
    logger: options.logger ?? false,
    // ajv-formats добавляет валидацию форматов контракта (date-time, int32, email).
    ajv: { plugins: [addFormats as unknown as AjvPlugin] },
  })

  registerErrorHandler(app)
  await app.register(cors, { origin: CORS_ORIGINS })
  await app.register(openapiGlue, {
    specification: SPEC_PATH,
    serviceHandlers: createService(store, clock),
  })

  return app
}
