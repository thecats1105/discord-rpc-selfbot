# Discord RPC Selfbot

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=discord-rpc-selfbot&type=git&repository=github.com/thecats1105/discord-rpc-selfbot&branch=main&build_command=npm+run+build&run_command=npm+start&instance_type=free&regions=was&instances_min=0&autoscaling_sleep_idle_delay=300&env%5BCONFIG_URL%5D=https%3A%2F%2Fgist.githubusercontent.com%2Fthecats1105%2F73a024b05976b79cfa9246995faefd6f%2Fraw%2F6cfdcfffe7cbfe6b8e65f9be3a9e40d356a65118%2Fdiscord_rpc_config.json&env%5BTOKEN%5D=%7B%7B+secret.DISCORD_TOKEN+%7D%7D&ports=8080%3Bhttp2%3B%2F&hc_protocol%5B8080%5D=tcp&hc_grace_period%5B8080%5D=5&hc_interval%5B8080%5D=30&hc_restart_limit%5B8080%5D=3&hc_timeout%5B8080%5D=5&hc_path%5B8080%5D=%2F&hc_method%5B8080%5D=get)
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jsZQh-?referralCode=DY_B7C)

A Discord Selfbot for Custom Rich Presence

> [!WARNING]  
> **I don't take any responsibility for blocked Discord accounts that used this module.**

> [!CAUTION]  
> **Using this on a user account is prohibited by the [Discord TOS](https://discord.com/terms) and can lead to the account block.**

## How to Use

1. Fill out your [`config.json`](https://github.com/thecats1105/discord-rpc-selfbot/blob/main/config.json)

```ts
{
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
```

2. Upload your `config.json` to Github Gist or any webservers

3. Setup your Environment

```env
CONFIG_URL="<CONFIG_URL>"
TOKEN="<TOKEN>"
```

## About Configs

### `STREAMING` Activity Type

If the Activity Type is set to `STREAMING`, the `streamURL` value must be set to the URL of that stream.

e.g.:

```json
{
  "type": "STREAMING",
  "streamURL": "https://www.twitch.tv/thecats1105"
}
```

### Set Timestamp to LocalTime

> [!NOTE]
> If you want to use this function, you need to remove `startTimeStamp` and `endTimeStamp` key.

By setting the `setLocalTime` value to `true` and entering a Timezone value from the IANA Time Zone Database for the `timezone` value, you can set the total activity time to the current time in that Timezone.

e.g. Setting to the current time in the `Asia/Seoul` Timezone:

```json
{
  "setLocalTime": true,
  "timezone": "Asia/Seoul"
}
```

### Assets

`assets.large_image` and `assets.small_image` must be formatted as follows:

- `cdn.discordapp.com` URL
- `media.discordapp.net` URL
- Assets ID
  - You can get the ID of each Asset by running this command:
  ```bash
  curl https://discord.com/api/v9/oauth2/applications/<APPLICATION_ID>/assets
  ```
- Media Proxy (`mp:external/<hash>`)
- Twitch (`twitch:<username>`)
- YouTube (`youtube:<video_id>`)
- Spotify (`spotify:<image_id>`)

(See [here](https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/RichPresenceImage) for more information.)
