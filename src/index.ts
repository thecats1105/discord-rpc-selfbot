import 'dotenv/config'
import axios from 'axios'
import { Client, RichPresence } from 'discord.js-selfbot-v13'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import { healthCheck, selfPing } from './koyebCompact.js'
import type { Config } from './types/config'

dayjs.extend(utc)
dayjs.extend(timezone)

const { CONFIG_URL, TOKEN, KOYEB_PUBLIC_DOMAIN } = process.env

if (!CONFIG_URL) {
  console.error('CONFIG_URL is not defined in .env')
  throw new Error('CONFIG_URL is required')
}

let config = await loadConfig(CONFIG_URL)

const client = new Client({
  sweepers: {
    /*
     * i dont know how to use this
     * anybody wanna help me?
     */
    // applicationCommands: {
    //   filter: () => () => true,
    //   interval: (config.refreshInterval || 15000 ) / 1000
    // },
    autoModerationRules: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    bans: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    emojis: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    invites: {
      lifetime: 10,
      interval: (config.refreshInterval || 15000) / 1000
    },
    guildMembers: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    messages: {
      lifetime: 10,
      interval: (config.refreshInterval || 15000) / 1000
    },
    presences: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    reactions: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    stageInstances: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    stickers: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    threadMembers: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    threads: {
      lifetime: 10,
      interval: (config.refreshInterval || 15000) / 1000
    },
    users: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    },
    voiceStates: {
      filter: () => () => true,
      interval: (config.refreshInterval || 15000) / 1000
    }
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.username}`)
})

const RPC = new RichPresence(client).setApplicationId(config.APPLICATION_ID)

setInterval(() => {
  void (async () => {
    // Reload the config
    config = await loadConfig(CONFIG_URL)

    // Update the rich presence
    updateRPC(RPC, config)
    client.user?.setActivity(RPC)

    // Koyeb Self-ping
    if (KOYEB_PUBLIC_DOMAIN) selfPing(`https://${KOYEB_PUBLIC_DOMAIN}`)
  })()
}, config.refreshInterval || 15000)

try {
  if (KOYEB_PUBLIC_DOMAIN) {
    healthCheck.listen(8000)
    console.log(
      `Health check server for Koyeb running at https://${KOYEB_PUBLIC_DOMAIN}`
    )
  }
  await client.login(TOKEN)
} catch (error) {
  console.error('Error logging in:', error)
  throw new Error('Failed to log in')
}

/**
 * Get the start of the day in the specified timezone
 * @param {string} timezone The timezone to get the start of the day for
 * @return {number} The start of the day in milliseconds since the Unix epoch
 */
function getStartOfDayInTimezone(timezone: string): number {
  const now = dayjs().tz(timezone)
  const AM = now.startOf('day')
  return AM.valueOf()
}

/**
 * Loads the configuration from the specified URL.
 * @param url URL of the configuration file
 * @returns A promise that resolves to the configuration object
 */
async function loadConfig(url: string): Promise<Config> {
  try {
    const response = await axios.get<Config>(url)
    console.log(response.data)
    console.log('Config loaded successfully')
    return response.data
  } catch (error) {
    console.error('Error loading config:', error)
    throw new Error('Failed to load config')
  }
}

/**
 * Updates the Rich Presence object based on the provided configuration.
 * @param rpc The Rich Presence object to update.
 * @param config The configuration to apply.
 */
function updateRPC(rpc: RichPresence, config: Config) {
  if (config.name) rpc.setName(config.name)
  if (config.details) rpc.setDetails(config.details)
  if (config.state) rpc.setState(config.state)
  if (config.party) {
    rpc.setParty({
      max: config.party.size.max,
      current: config.party.size.current
    })
  }

  // Activity Type
  if (config.type) {
    rpc.setType(config.type)
    if (config.type === 'STREAMING' && config.streamURL) {
      rpc.setURL(config.streamURL)
    }
  }

  // Timestamps
  if (config.setLocalTime && config.timezone) {
    rpc.setStartTimestamp(getStartOfDayInTimezone(config.timezone))
  } else if (config.startTimestamp) {
    rpc.setStartTimestamp(config.startTimestamp)
  }
  if (config.endTimestamp) {
    rpc.setEndTimestamp(config.endTimestamp)
  }

  // Assets
  if (config.assets) {
    if (config.assets.large_image)
      rpc.setAssetsLargeImage(config.assets.large_image)
    if (config.assets.large_text)
      rpc.setAssetsLargeText(config.assets.large_text)
    if (config.assets.small_image)
      rpc.setAssetsSmallImage(config.assets.small_image)
    if (config.assets.small_text)
      rpc.setAssetsSmallText(config.assets.small_text)
  }

  // Buttons
  if (config.buttons) {
    rpc.setButtons(
      ...config.buttons.map(button => ({
        name: button.label,
        url: button.url
      }))
    )
  }
}
