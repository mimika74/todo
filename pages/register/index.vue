<script setup lang='ts'>
import { useAuth } from "~/composables/useAuth";
import {useFirestore} from "~/composables/useFirestore";
import {doc, setDoc} from "@firebase/firestore";

const { signUp } = useAuth()
const { createUser } = useFirestore()

type User = {
  name: string;
  id: string;
  email: string;
  uid: string;
}

type UserInput = {
  name: string;
  email: string
  password: string
}

const userInput = ref<UserInput>({ name: '', email: '', password: ''})


const signUpUser = async () => {
  await signUp(userInput.value.email, userInput.value.password)
    .then((userInput) => {
      //await createUser({ name: userInput.name})
      navigateTo('/thanks')
    })
    .catch(() => {
      alert('登録できませんでした')
    })
}
</script>

<template>
  <div>
    <div>新規登録</div>
    <form @submit.prevent="signUpUser">
      <div>
        <label>お名前</label>
        <input type="text" v-model="userInput.name">
      </div>
      <div>
        <label>メールアドレス</label>
        <input type="text" v-model="userInput.email">
      </div>
      <div>
        <label>パスワード</label>
        <input autocomplete="off" type="password" v-model="userInput.password">
      </div>
      <div>
        <button>登録</button>
      </div>
    </form>
    <NuxtLink to="/login">ログイン</NuxtLink>
  </div>
</template>