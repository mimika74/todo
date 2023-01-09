<script setup lang='ts'>
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
  await deleteTask()
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
</script>

<template>
  <div class='main'>
    <button @click='openAddModal()'>新規登録</button>
    <AddModal v-if='isAddShow'>
      <button @click='closeAddModal()'>✖︎</button>
    </AddModal>
    <div>
      <div v-for='taskArg in tasksAllDataRef' class="inline-block" :key='taskArg.id'>
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
      <modal v-if='isShow' >
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
          <button class='button-space' @click='doUpdate()'>更新</button>
          <button class='button-space' type='button' @click='doDelete()'>削除</button>
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
