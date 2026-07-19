import { RichPresence } from 'discord.js-selfbot-v13'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import type { Config } from '@/config/schema'

dayjs.extend(utc)
dayjs.extend(timezone)

export function getStartOfDayInTimezone(tz: string): number {
  const now = dayjs().tz(tz)
  const AM = now.startOf('day')
  return AM.valueOf()
}

export function updateRPC(rpc: RichPresence, config: Config) {
  if (config.name) rpc.setName(config.name)
  if (config.details) rpc.setDetails(config.details)
  if (config.state) rpc.setState(config.state)
  if (config.party) {
    rpc.setParty({
      max: config.party.size.max,
      current: config.party.size.current
    })
  }

  if (config.type) {
    rpc.setType(config.type)
    if (config.type === 'STREAMING' && config.streamURL) {
      rpc.setURL(config.streamURL)
    }
  }

  if (config.setLocalTime && config.timezone) {
    rpc.setStartTimestamp(getStartOfDayInTimezone(config.timezone))
  } else if (config.startTimestamp) {
    rpc.setStartTimestamp(config.startTimestamp)
  }
  if (config.endTimestamp) {
    rpc.setEndTimestamp(config.endTimestamp)
  }

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

  if (config.buttons) {
    rpc.setButtons(
      ...config.buttons.map(button => ({
        name: button.label,
        url: button.url
      }))
    )
  }
}
