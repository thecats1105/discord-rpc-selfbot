# Discord RPC Selfbot

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
