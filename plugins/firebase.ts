import { initializeApp } from 'firebase/app'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: runtimeConfig.public.firebaseConfig.apiKey,
    authDomain: runtimeConfig.public.firebaseConfig.authDomain,
    projectId: runtimeConfig.public.firebaseConfig.projectId,
    storageBucket: runtimeConfig.public.firebaseConfig.storageBucket,
    messagingSenderId: runtimeConfig.public.firebaseConfig.messagingSenderId,
    appId: runtimeConfig.public.firebaseConfig.appId,
  }

  initializeApp(firebaseConfig)
})