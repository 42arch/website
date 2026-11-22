import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, timeZone } from './config'
import zh from '../../messages/zh.json'

export default getRequestConfig(async () => {
  return {
    locale: defaultLocale,
    messages: zh,
    timeZone,
  }
})
