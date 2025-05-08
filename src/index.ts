import 'dotenv/config'
import axios from 'axios'
import { Client } from 'discord.js-selfbot-v13'
import Discord from 'discord.js-selfbot-v13'
// import moment from 'moment'
const { CONFIG_URL, TOKEN } = process.env

interface Config {
  APPLICATION_ID: string
  type: string
  name?: string
  details?: string
  startTimeStamp?: string
  endTimeStamp?: string
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

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.username}`)
})

const startTimestamps = {
  startTime: Date.now()
}

setInterval(() => {
  const RPC = new Discord.RichPresence(client)
    .setApplicationId(config.APPLICATION_ID)
    .setType(config.type as 'PLAYING' | 'LISTENING' | 'WATCHING' | 'COMPETING')
    .setStartTimestamp(startTimestamps.startTime)

  if (config.name) {
    RPC.setName(config.name)
  }
  if (config.details) {
    RPC.setDetails(config.details)
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
}, 10000)

try {
  await client.login(TOKEN)
} catch (error) {
  console.error('Error logging in:', error)
  throw new Error('Failed to log in')
}
