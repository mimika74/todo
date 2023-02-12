export default defineNuxtRouteMiddleware(async () => {
  //ログイン状態を維持する
  if (!process.server) {
    const { checkAuthState, token } = useAuth()
    await checkAuthState()
    if (!token.value) {
      return await navigateTo('/login', { replace: true })
    }
  }
})