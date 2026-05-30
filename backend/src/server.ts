import { buildApp } from './app.js'
import { fixedClock, systemClock, type Clock } from './clock.js'

const PORT = Number(process.env.PORT ?? 3000)
const HOST = process.env.HOST ?? '0.0.0.0'

const clock: Clock = process.env.FIXED_CLOCK_ISO
  ? fixedClock(process.env.FIXED_CLOCK_ISO)
  : systemClock

const app = await buildApp({ logger: true, clock })

try {
  await app.listen({ port: PORT, host: HOST })
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
