import { Client } from 'discord.js-selfbot-v13'

export function createClient(): Client {
  return new Client({
    sweepers: {
      autoModerationRules: {
        filter: () => () => true,
        interval: 60
      },
      bans: {
        filter: () => () => true,
        interval: 60
      },
      emojis: {
        filter: () => () => true,
        interval: 60
      },
      invites: {
        lifetime: 10,
        interval: 60
      },
      guildMembers: {
        filter: () => () => true,
        interval: 60
      },
      messages: {
        lifetime: 10,
        interval: 60
      },
      presences: {
        filter: () => () => true,
        interval: 60
      },
      reactions: {
        filter: () => () => true,
        interval: 60
      },
      stageInstances: {
        filter: () => () => true,
        interval: 60
      },
      stickers: {
        filter: () => () => true,
        interval: 60
      },
      threadMembers: {
        filter: () => () => true,
        interval: 60
      },
      threads: {
        lifetime: 10,
        interval: 60
      },
      users: {
        filter: () => () => true,
        interval: 60
      },
      voiceStates: {
        filter: () => () => true,
        interval: 60
      }
    }
  })
}
