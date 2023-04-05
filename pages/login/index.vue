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
    <v-app>
      <v-app-bar rounded>
        <v-toolbar-title>TODO</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
    <v-label>ログイン</v-label>
    <v-form @submit.prevent="login">
      <v-row>
      <v-col sm="3">
        <v-label>メールアドレス</v-label>
        <v-text-field type="text" v-model="userInput.email" />
      </v-col>
      <v-col sm="3">
        <v-label>パスワード</v-label>
        <v-text-field autocomplete="off" type="password" v-model="userInput.password" />
      </v-col>
      </v-row>
      <v-btn>
        <button>ログイン</button>
      </v-btn>
    </v-form>
        </v-container>
        <v-container>
          <v-btn y="3"
                 href="register"
                 label
                 min-height="20"
          >新規登録へ
          </v-btn>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss" scoped>

</style>