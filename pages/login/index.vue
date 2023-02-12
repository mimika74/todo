<script setup lang='ts'>
import { useAuth } from "~/composables/useAuth";
const { signIn } = useAuth()

type UserInput = {
  email: string
  password: string
}

const userInput = ref<UserInput>({ email: '', password: ''})

const login = async () => {
  await signIn(userInput.value.email, userInput.value.password)
    .then(() => {
      navigateTo('/main')
    })
    .catch(() => {
      alert('ログインできませんでした')
    })
}
</script>

<template>
  <div>
    <div>ログイン</div>
    <form @submit.prevent="login">
      <div>
        <label>メールアドレス</label>
        <input type="text" v-model="userInput.email">
      </div>
      <div>
        <label>パスワード</label>
        <input autocomplete="off" type="password" v-model="userInput.password">
      </div>
      <div>
        <button>ログイン</button>
      </div>
    </form>
    <NuxtLink to="/register">新規登録へ</NuxtLink>
  </div>
</template>