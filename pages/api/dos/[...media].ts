// pages/api/dos/[...media].ts
import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-dos/dist/handlers'

import { isAuthorized } from '@tinacms/auth'

export const config = mediaHandlerConfig

export default createMediaHandler({
  config: {
    endpoint: process.env.SPACES_ENDPOINT,
    credentials: {
      accessKeyId: process.env.SPACES_KEY || '',
      secretAccessKey: process.env.SPACES_SECRET_KEY || '',
    },
    region: 'syd1',
  },
  bucket: process.env.SPACES_NAME || '',
  authorized: async (req, _res) => {
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    try {
      const user = await isAuthorized(req)

      return user && user.verified || false
    } catch (e) {
      console.error(e)
      return false
    }
  },
})