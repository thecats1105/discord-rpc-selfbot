export interface Config {
  APPLICATION_ID: string
  type?: 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING' | 'COMPETING'
  name?: string
  details?: string
  state?: string
  streamURL?: string
  party?: {
    size: {
      current: number
      max: number
    }
  }
  setLocalTime?: boolean
  timezone?: string
  startTimestamp?: number
  endTimestamp?: number
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  buttons?: {
    label: string
    url: string
  }[]
  refreshInterval?: number
}
