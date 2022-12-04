// https://nuxt.com/docs/api/configuration/nuxt-config

import { config } from 'dotenv'
const envPath = `.env.${process.env.APP_ENV}`
config({ path: envPath })

export default defineNuxtConfig({
  app: {
    head: {
      title: 'toodoo',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'x-ua-compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width-device-width, initial-scale=1.0' },
      ],
    }
  },
  runtimeConfig: {
    public: {
      firebaseConfig: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      }
    }
  },
})
