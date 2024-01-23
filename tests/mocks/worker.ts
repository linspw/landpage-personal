import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.
export const worker = setupWorker(...handlers)

export const setupMockWorker = () => {
  worker.start()
  window.msw = {
    worker,
  }
  return worker
}
