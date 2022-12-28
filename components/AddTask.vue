<script setup lang='ts'>
const { addTask } = useFirestore()


// interface Props {
//
// }
type Task = {
  category: string
  person: string
  title: string
  detail: string
  id: string
}


//データを追加する時に使う
const task = ref<Task>({
  category: '',
  title: '',
  detail: '',
  person: '',
  id: '',
})
const Create = () => {
  addTask(task.value)
}

//const props = defineProps<Props>()


</script>

<template>
  <div>
    <form @submit.prevent='Create'>
      <div>カテゴリー<input type='text' v-model='task.category' /></div>
      <div>タイトル<input type='text' v-model='task.title' /></div>
      <div>詳細<input type='text' v-model='task.detail' /></div>
      <div>担当者<input type='text' v-model='task.person' /></div>
      <button>保存する</button>
    </form>
  </div>
</template>