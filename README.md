# Discord RPC Selfbot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jsZQh-?referralCode=DY_B7C)

A Discord Selfbot for Custom Rich Presence

## How to Use

1. Fill out your [`config.json`](https://github.com/thecats1105/discord-rpc-selfbot/blob/main/config.json)

```json
{
  "$schema": "https://raw.githubusercontent.com/thecats1105/discord-rpc-selfbot/refs/heads/main/config.schema.json",
  "APPLICATION_ID": "<APPLICATION_ID>",
  "type": "<ACTIVITY_TYPE>",
  "name": "<ACTIVITY_NAME>",
  "details": "<ACTIVITY_DETAILS>",
  "state": "<ACTIVITY_STATE>",
  "streamURL": "<STREAM_URL>",
  "party": {
    "size": {
      "current": null,
      "max": null
    }
  },
  "setLocalTime": null,
  "timezone": "<TIMEZONE>",
  "startTimeStamp": null,
  "endTimeStamp": null,
  "assets": {
    "large_image": "<LARGE_IMAGE>",
    "large_text": "<LARGE_TEXT>",
    "small_image": "<SMALL_IMAGE>",
    "small_text": "<SMALL_TEXT>"
  },
  "buttons": [
    {
      "label": "<BUTTON_LABEL>",
      "url": "<BUTTON_URL>"
    },
    {
      "label": "<BUTTON_LABEL>",
      "url": "<BUTTON_URL>"
    }
  ],
  "refreshInterval": null
}
```

2. Upload your `config.json` to Github Gist or any webservers

3. Setup your Environment

```env
CONFIG_URL="<CONFIG_URL>"
TOKEN="<TOKEN>"
```
