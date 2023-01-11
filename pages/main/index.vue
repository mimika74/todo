<script setup lang='ts'>
import draggable from 'vuedraggable'
import { useFirestore } from "~/composables/useFirestore";
const { getTasks, updateTask, deleteTask } = useFirestore()

type Task = {
  category: string
  person: string
  title: string
  detail: string
  id: string
}

const tasksAllData = await getTasks()
const tasksAllDataRef = ref(tasksAllData)

const taskDetail = ref<Task>()

const doUpdate = async(taskDetail: Task) => {

  await updateTask(taskDetail)
}
const doDelete = async (taskDetail: Task) => {
  await deleteTask(taskDetail)
}

const isShow = ref(false)
const isAddShow = ref(false)

const open = (taskArg: Task) => {
  isShow.value = true
  taskDetail.value = taskArg
}

const close = () => isShow.value = false

const openAddModal = () => {
  isAddShow.value = true

}
const closeAddModal = () => {
  isAddShow.value = false

}

const keyword = ref('')
const searchCondition = ref(tasksAllData)
const search = () => {
  if (keyword.value.length < 0) {
    return tasksAllDataRef
  }
  if(keyword.value.length > 0) {
     tasksAllDataRef.value = tasksAllData.filter(taskArg => {
      return taskArg.value.includes(keyword.value)
    })
  }
}
</script>

<template>
  <div class='main'>
    <button @click='openAddModal()'>新規登録</button>
    <AddModal v-if='isAddShow'>
      <button @click='closeAddModal()'>✖︎</button>
    </AddModal>
    <div>
      <div><input type='text' v-model='keyword' ><button @click='search'>検索</button></div>
      <div v-for='taskArg in tasksAllDataRef' class='inline-block' @start="true" @end="false" :key='taskArg'>
        <p>
          {{ taskArg.category }}
        </p>
        <p>
          {{ taskArg.title }}
        </p>
        <p>
         {{ taskArg.detail }}
        </p>
        <p>
          {{ taskArg.person }}
        </p>
        <p>
          <button @click='open(taskArg)'>編集</button>
        </p>
      </div>
      <modal v-if='isShow'>
        <div class="inline-block">
          <button @click='close()'>✖︎</button>
          <p>分類</p>
          <p>表題</p>
          <p>詳細</p>
          <p>担当</p>
        </div>
        <div class="inline-block">
          <p>
            <input type='text' v-model='taskDetail.category'>
          </p>
          <p>
            <input type='text' v-model='taskDetail.title'>
          </p>
          <p>
            <input type='text' v-model='taskDetail.detail'>
          </p>
          <p>
            <input type='text' v-model='taskDetail.person'>
          </p>
        </div>
        <div>
          <button class='button-space' @click='doUpdate(taskDetail)'>更新</button>
          <button class='button-space' type='button' @click='doDelete(taskDetail)'>削除</button>
        </div>
      </modal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  font-family: 'M PLUS 1p', sans-serif;
}

.button-space {
  margin:  5px;
}

.inline-block {
  display: inline-block;
}

button {
  border: none;
  outline: none;
  background: #cfdc28;
  color: white;
  cursor: pointer;
}
</style>
