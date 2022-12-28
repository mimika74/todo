<script setup lang='ts'>
const { getTask, getDocIds, getTasks, updateTask, deleteTask } = useFirestore()


type Task = {
  category: string
  person: string
  title: string
  detail: string
  id: string
}


const tasksAllData = await getTasks()
const tasksAllDataRef = ref(tasksAllData)

//本当はフィールドにドキュメントid入れるのよくないけど、updateとdeleteの時に第三引数が取り出しやすくなった
const doUpdate = (taskArg: Task) => {
  return updateTask(taskArg)
}
const doDelete = async (taskArg: Task) => {
  return deleteTask(taskArg)
}

const isShow = ref(false)
const isAddShow = ref(false)

const taskDetail = ref<Task>()

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
  <div>
    <button @click='openAddModal()'>新規登録</button>
    <AddModal v-if='isAddShow'>
      <div>
        <AddTask />
        <button @click='closeAddModal()'>close</button>
      </div>
    </AddModal>

    <div>
      <div v-for='taskArg in tasksAllDataRef' class="inline-block" :key='taskArg.id'>
        <p>

        </p>
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
          <p>
            分類
          </p>
          <p>
            表題
          </p>
          <p>
            詳細
          </p>
          <p>
            担当
          </p>
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
        <p>
        <button @click='doUpdate(taskDetail)'>更新</button>

        <button type='button' @click='doDelete(taskDetail)'>削除</button>
        </p>
      </modal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
}
</style>
