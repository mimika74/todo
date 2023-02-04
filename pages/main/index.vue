<script setup lang='ts'>
import { useFirestore } from "~/composables/useFirestore";
import {integer} from "vscode-languageserver-types";
const { getTasks, updateTask, deleteTask } = useFirestore()


type Task = {
  category: string
  person: string
  title: string
  detail: string
  id: string
  logo: string
}

type Category = {
  id: string
  name: string
}

const tasksAllData = <any>(await getTasks())
const tasksAllDataRef = ref<Task[]>(tasksAllData)



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

interface searchCondition {
  search_keyword: string,
}

const searchCondition = ref<searchCondition>({
  search_keyword: '',
})

//const searchCondition = ref(tasksAllData)
const search = () => {
  tasksAllDataRef.value = tasksAllData
  if (searchCondition.value.search_keyword == null) {
    return tasksAllDataRef
  }
  if(searchCondition.value.search_keyword.length > 0) {
     tasksAllDataRef.value = tasksAllDataRef.value.filter((taskArg) => {
      return taskArg.title.includes(searchCondition.value.search_keyword)
    })
  }
}

const dragIndex = ref<any | null>(null)
const dragStart = (index: number) => {
  dragIndex.value = index
}

const dragEnter = (index: number) => {
  //console.log('index', index)
  //console.log('dragIndex', dragIndex)
  if (index === dragIndex) {
    return
  }
  const deleteElement = tasksAllDataRef.value.splice(dragIndex.value, 1)[0]
  tasksAllDataRef.value.splice(index, 0, deleteElement)
  dragIndex.value = index
}

const dragEnd = () => {
  dragIndex.value = null
}


</script>

<template>
  <div class='main'>
    <button @click='openAddModal()' class='add'>＋</button>
    <AddModal v-if='isAddShow'>
      <button @click='closeAddModal()'>✖︎</button>
    </AddModal>
    <div>
      <div>
        <input type='text' v-model='searchCondition.search_keyword'>
        <button @click='search'>検索</button>
      </div>
      <div class="board" >
        <div class="board-block" id="todo">a</div>
        <div class="board-block" id="todo">b</div>
      </div>
      <div class='board'>
        <div v-for='(taskArg, index) in tasksAllDataRef' :key='taskArg.id' @click='open(taskArg)' class ='card'
             :draggable="true" @dragstart="dragStart(index)" @dragenter="dragEnter(index)" @dragover.prevent @dragend="dragEnd">
          <div class="category">
            {{ taskArg.category }}
          </div>
          <div class="box">
            {{ taskArg.title }}
          </div>
          <div class="box">
            {{ taskArg.person }}
          </div>
          <img v-if='taskArg.logo' :src='taskArg.logo' alt='' width='100' height='100' />
        </div>
      </div>

<!--        <div class='board-block' id='todo'>-->
<!--          <draggable v-model="tasksAllDataRef" item-key='id' group='item' @start='draggableStart' @end='dragging=false' handle='.handle'>-->
<!--            <template #item="{ category }">-->
<!--                {{ category }}-->
<!--            </template>-->
<!--          </draggable>-->
<!--        </div>-->

      <modal v-if='isShow'>
        <button @click='close()'>✖︎</button>
        <div class="edit-card">
          <div class='edit-box'>
            <input type='text' v-model='taskDetail.category' placeholder='カテゴリー' class='edit-box-input'>
          </div>
          <div class='edit-box'>
            <input type='text' v-model='taskDetail.title' placeholder='タイトル' class='edit-box-input'>
          </div>
          <div class='edit-box'>
            <input type='text' v-model='taskDetail.person' placeholder='担当者' class='edit-box-input'>
          </div>
          <div class='edit-box'>
            <input type='text' v-model='taskDetail.detail' placeholder='説明' class='edit-box-input'>
          </div>
        </div>
        <div>
          <button @click='doUpdate(taskDetail)'>保存</button>
          <button type='button' @click='doDelete(taskDetail)'>削除</button>
        </div>
      </modal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  font-family: 'M PLUS 1p', sans-serif;
}

.board {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.board-block {
  padding: 0.6rem;
  min-width: 200px;
  min-height: 500px;
  border-radius: 0.3rem;
  margin-right: 20px;
  margin-top: 20px;
}

#todo {
  background-color: blanchedalmond;
}

.edit-box {
  margin-top: 50px;
  margin-right: 20px;
}

.category {
  margin-top: 2px;
  margin-left: 2px;
  margin-right: 2px;
  background-color: #303030;
  color: lightgray;
  max-height: 30px;
  border-radius: 25px;
  padding-top: 5px;
  padding-right: 2px;
  padding-left: 2px;
  font-weight: bold;
}

.box {
  margin-top: 5px;
  margin-right: 2px;
}

.edit-box-input {
  margin-right: 5px;
  border: none;
  outline: none;
  border-bottom: 1px solid #999;
}

.card {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  background-color: #F2F2F2;
  border-radius: 15px;
  margin: 10px 10px;
  min-width: 100px;
  max-width: 200px;
  min-height: 100px;
  max-height: 150px;
}

.edit-card {
  display: flex;
  flex-wrap: wrap;
}

button {
  border: none;
  outline: none;
  background: #F2F2F2;
  color: black;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
}

.add {
  border: none;
  outline: none;
  background: #F2F2F2;
  color: black;
  cursor: pointer;
  border-radius: 50px;
}

.trelloboard {
  display: flex;
}
</style>
