import 'dotenv/config'
import { RichPresence } from 'discord.js-selfbot-v13'
import {
  configUrl,
  TOKEN,
  KOYEB_PUBLIC_DOMAIN,
  KOYEB_HEALTH_CHECK_ENABLED
} from '@/env'
import { loadConfig } from '@/config/loader'
import { createClient } from '@/rpc/client'
import { updateRPC } from '@/rpc/builder'
import { healthCheck, selfPing } from '@/platform/koyeb'

let config = await loadConfig(configUrl)

const client = createClient()

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.username}`)
})

const RPC = new RichPresence(client).setApplicationId(config.APPLICATION_ID)

setInterval(() => {
  void (async () => {
    config = await loadConfig(configUrl)
    updateRPC(RPC, config)
    client.user?.setActivity(RPC)
  })()
}, config.refreshInterval || 15000)

if (KOYEB_HEALTH_CHECK_ENABLED) {
  setInterval(() => {
    selfPing(`https://${KOYEB_PUBLIC_DOMAIN}`)
  }, 60000)
}

try {
  if (KOYEB_HEALTH_CHECK_ENABLED) {
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
