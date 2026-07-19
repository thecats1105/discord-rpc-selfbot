import * as z from 'zod'

const { CONFIG_URL, TOKEN, KOYEB_PUBLIC_DOMAIN, KOYEB_HEALTH_CHECK } =
  process.env

if (!CONFIG_URL) {
  console.error('CONFIG_URL is not defined in .env')
  throw new Error('CONFIG_URL is required')
}

export const configUrl: string = CONFIG_URL
export { TOKEN, KOYEB_PUBLIC_DOMAIN }

export const KOYEB_HEALTH_CHECK_ENABLED: boolean =
  KOYEB_PUBLIC_DOMAIN &&
  (KOYEB_HEALTH_CHECK === undefined || z.stringbool().parse(KOYEB_HEALTH_CHECK))
    ? true
    : false
