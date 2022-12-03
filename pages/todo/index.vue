<script setup lang='ts'>
interface todo {
  message: string
}
const message = ref('')
const checked = ref(false)

</script>

<template>
  <div>
    工事中...
    <textarea type='text' v-model='message'></textarea>
    <p>{{ message }}</p>
    <input type='checkbox' id='checkbox' v-model='checked' />
    <label for='checkbox'>{{ checked }}</label>
  </div>

</template>