import { get, createServer } from 'https'

export const healthCheck = createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('OK')
  res.end()
})

export function selfPing(URL: string) {
  if (!URL) {
    console.error('URL is not defined')
    throw new Error('URL is required')
  }
  get(URL, () => true).on('error', err => {
    console.error('Error pinging URL:', err)
  })
}
