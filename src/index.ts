import 'dotenv/config'
import axios from 'axios'
import { Client } from 'discord.js-selfbot-v13'
import Discord from 'discord.js-selfbot-v13'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

const { CONFIG_URL, TOKEN } = process.env

interface Config {
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

let config: Config

if (!CONFIG_URL) {
  console.error('CONFIG_URL is not defined in .env')
  throw new Error('CONFIG_URL is required')
} else {
  try {
    const response = await axios.get<Config>(CONFIG_URL)
    console.log(response.data)
    config = response.data
    console.log('Config loaded successfully')
  } catch (error) {
    console.error('Error loading config:', error)
    throw new Error('Failed to load config')
  }
}

function getAMInTimezone(timezone: string): number {
  const now = dayjs().tz(timezone)
  const AM = now.startOf('day')
  return AM.valueOf()
}

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.username}`)
})

setInterval(() => {
  const RPC = new Discord.RichPresence(client)
    .setApplicationId(config.APPLICATION_ID)
    .setParty({ max: 10, current: 1 })
  if (config.type) {
    RPC.setType(config.type)
    if (config.type === 'STREAMING' && config.streamURL) {
      RPC.setURL(config.streamURL)
    }
  }
  if (config.name) {
    RPC.setName(config.name)
  }
  if (config.details) {
    RPC.setDetails(config.details)
  }
  if (config.state) {
    RPC.setState(config.state)
  }
  if (config.party) {
    RPC.setParty({
      max: config.party.size.max,
      current: config.party.size.current
    })
  }
  if (config.setLocalTime && config.timezone) {
    RPC.setStartTimestamp(getAMInTimezone(config.timezone))
  }
  if (config.startTimestamp) {
    RPC.setStartTimestamp(config.startTimestamp)
  }
  if (config.endTimestamp) {
    RPC.setEndTimestamp(config.endTimestamp)
  }
  if (config.assets) {
    if (config.assets.large_image) {
      RPC.setAssetsLargeImage(config.assets.large_image)
    }
    if (config.assets.large_text) {
      RPC.setAssetsLargeText(config.assets.large_text)
    }
    if (config.assets.small_image) {
      RPC.setAssetsSmallImage(config.assets.small_image)
    }
    if (config.assets.small_text) {
      RPC.setAssetsSmallText(config.assets.small_text)
    }
  }
  if (config.buttons) {
    config.buttons.forEach(button => {
      RPC.addButton(button.label, button.url)
    })
  }

  client.user?.setActivity(RPC)
}, config.refreshInterval || 15000)

try {
  await client.login(TOKEN)
} catch (error) {
  console.error('Error logging in:', error)
  throw new Error('Failed to log in')
}
