import type { Config } from '@/config/schema'

export async function loadConfig(url: string): Promise<Config> {
  try {
    const response = await fetch(url)
    return (await response.json()) as Config
  } catch (error) {
    console.error('Error loading config:', error)
    throw new Error('Failed to load config')
  }
}
