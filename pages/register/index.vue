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
  await signUp(userInput.value.email, userInput.value.password, userInput.value.name)
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
    <v-app>
    <v-app-bar rounded>
      <v-toolbar-title>TODO</v-toolbar-title>
    </v-app-bar>
      <v-main>
    <v-container>

    <v-label>新規登録</v-label>
    <v-form @submit.prevent="signUpUser">
      <v-row sm="3">
        <v-col sm="3">
        <v-label>なまえ</v-label>
        <v-text-field type="text" v-model="userInput.name" />
        </v-col>
        <v-col sm="3">
        <v-label>メール</v-label>
        <v-text-field type="text" v-model="userInput.email" />
        </v-col>
        <v-col sm="3">
        <v-label>パスワード</v-label>
        <v-text-field autocomplete="off" type="password" v-model="userInput.password" />
        </v-col>
      </v-row>
        <v-btn>
          <button>登録</button>
        </v-btn>
    </v-form>
    </v-container>
        <v-container>
          <v-btn y="3"
            href="/login"
            label
            min-height="20"
          >登録済の方
          </v-btn>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>