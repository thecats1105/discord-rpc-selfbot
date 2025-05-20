import { createServer } from 'http2'

export const healthCheck = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('OK')
  res.end()
})
