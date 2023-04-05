<script setup lang='ts'>
import { useAuth } from "~/composables/useAuth";


const { signOut } = useAuth()
const { getTasks, updateTask, deleteTask } = useFirestore()

definePageMeta({
  middleware: ['auth']
})
type Task = {
  category: string
  person: string
  title: string
  detail: string
  id: string
  photo?: string
  index_id?: number | null
}

const tasksAllData = <any>(await getTasks())
const tasksAllDataRef = ref<Task[]>(tasksAllData)
//const taskArg = ref<Task>()
const taskDetail = ref<Task>()

const photo = ref<string>()

const url = ref<string>()
const reset = (taskDetail: Task) => {
  taskDetail.photo = ''
}

const editImage = (props: any) => {
  photo.value = props.target.files[0] || null
  const img = props.target.files[0]
  url.value = URL.createObjectURL(img)
}


const doUpdate = async(taskDetail: Task) => {
  await updateTask(taskDetail, photo.value)
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
      return taskArg.person.includes(searchCondition.value.search_keyword)
    })
  }

}


const dragStart = (index: number) => {
  dragIndex.value = index
}

const dragEnter = (index: number) => {
  //console.log('index', index)
  //console.log('dragIndex', dragIndex)
  if (index === dragIndex.value) {
    return
  }
  //const deleteElement = tasksAllDataRef.value.splice(dragIndex.value, 1)[0]
  //tasksAllDataRef.value.splice(index, 0, deleteElement)
  dragIndex.value = index
}
const dragIndex = ref<number | null>(null)
const dragEnd = (index: number, taskArg: Task) => {

  taskArg.index_id = dragIndex.value
  console.log(taskArg)
}
// dragIndex.value = null
// watch(dragIndex, (newValue, oldValue) => {
//
// })

const logout = async() => {
  await signOut()
    .then(() => {
      navigateTo('/login', { replace: true })
    })
}

</script>

<template>
  <div class='main'>
    <v-btn @click="logout">ログアウト</v-btn>
    <v-container>
    <v-btn @click='openAddModal()' class='add'>＋</v-btn>
    <AddModal v-if='isAddShow' @closeAddModal="closeAddModal">
      <v-btn @click='closeAddModal()'>✖︎</v-btn>
    </AddModal>
    <v-spacer></v-spacer>
    <div>
      <div>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
                v-model="searchCondition.search_keyword"
                label="キーワード"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn @click='search'>検索</v-btn>
      </div>
      <div class='board'>
        <div v-for='(taskArg, index) in tasksAllDataRef' @click='open(taskArg)'
             :key='index' class ='card' :draggable="true" @dragstart="dragStart(index)"
             @dragenter="dragEnter(index)" @dragover.prevent @dragend="dragEnd(index, taskArg)">
          <div class="category">
            {{ taskArg.category }}
          </div>
          <div class="box">
            {{ taskArg.title }}
          </div>
          <div class="box">
            {{ taskArg.person }}
          </div>
          <img v-if='taskArg.photo' :src='taskArg.photo' alt='' width='100' height='100' />
        </div>
      </div>
      <modal v-if='isShow'>
        <v-btn @click='close()'>✖︎</v-btn>
        <v-text-field v-model='taskDetail.category' placeholder='カテゴリー' />
        <v-text-field type='text' v-model='taskDetail.title' placeholder='タイトル' class='edit-box-input' />
        <v-text-field type='text' v-model='taskDetail.person' placeholder='担当者' class='edit-box-input' />
        <v-text-field type='text' v-model='taskDetail.detail' placeholder='説明' class='edit-box-input' />
        <div>
          <input type="file" accept="image/jpeg,image/png"  @change="editImage">
          <img v-if='taskDetail.photo' :src='taskDetail.photo' alt='' width='100' height='100' />
          <img v-if='photo' :src='url' alt='' width='100' height='100' />
        </div>
          <div @click="reset">✖</div>
        <div>
          <v-btn @click='doUpdate(taskDetail)'>保存</v-btn>
          <v-btn type='button' @click='doDelete(taskDetail)'>削除</v-btn>
        </div>
      </modal>
    </div>
    </v-container>
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
  min-width: 500px;
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
  //border: none;
  //outline: none;
  //border-bottom: 1px solid #999;
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
  //border: none;
  //outline: none;
  background: #F2F2F2;
  color: black;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
}

.add {
  //border: none;
  //outline: none;
  background: #F2F2F2;
  color: black;
  cursor: pointer;
  border-radius: 50px;
}

.trelloboard {
  display: flex;
}
</style>
