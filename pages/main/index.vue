<script setup lang='ts'>
import { getFirestore, collection } from 'firebase/firestore'
import { CollectionReference, doc, getDoc, getDocs, addDoc, onSnapshot } from '@firebase/firestore'
import { initializeApp } from "firebase/app";
import { onMounted } from 'vue'

//firebaseと接続する
const runtimeConfig = useRuntimeConfig()
const firebaseConfig = {
  apiKey: runtimeConfig.public.firebaseConfig.apiKey,
  authDomain: runtimeConfig.public.firebaseConfig.authDomain,
  projectId: runtimeConfig.public.firebaseConfig.projectId,
  storageBucket: runtimeConfig.public.firebaseConfig.storageBucket,
  messagingSenderId: runtimeConfig.public.firebaseConfig.messagingSenderId,
  appId: runtimeConfig.public.firebaseConfig.appId,
}
const firebaseApp = initializeApp(firebaseConfig)
const firestore = getFirestore(firebaseApp)

//⓪取得するデータの方を用意する
type Task = {
  category: string
  person: string
  title: string
  detail: string
}

//①firestoreからデータを取得する
const TaskRef = collection(
    firestore,
    'tasks'
) as CollectionReference<Task>

//②一つのドキュメントを取得する時
//const TaskRefId1 = doc(TaskRef, 'upuO8Oq5sLxzQd0p4uKg')
//const tasksDocId1 = await getDoc(TaskRefId1)
//const tasksDataId1 = tasksDocId1.data()
//console.log(tasksDataId1)

//②複数のドキュメントを取得する時
const tasksDocs = await getDocs(TaskRef)
const tasksAllData = tasksDocs.docs.map((doc) => doc.data())
//console.log(tasksAllData)

//onSnapshotを使ってリアルタイム更新(できればやりたい)
// const q = collection(db, 'tasks')
// const tasksAllData = onSnapshot(q, (doc) => {
//   doc.docs.map((doc) => doc.data())
//   })



//const tasksAllDataRef = ref(tasksAllData)

//データを追加する時に使う
const task = ref<Task>({
  category: '',
  title: '',
  detail: '',
  person: '',
})

const taskDoc = collection(
    firestore,
    'tasks'
)
const addTask = async(task: Task) => {
    await addDoc(taskDoc, {
    category: task.category,
    title: task.title,
    detail: task.detail,
    person: task.person
  })
}

const onClick = () => {
  addTask(task.value)
  console.log(task.value)
}

</script>

<template>
  <div>
    <form @submit.prevent='onClick'>
      <div>カテゴリー<input type='text' v-model='task.category' /></div>
      <div>タイトル<input type='text' v-model='task.title' /></div>
      <div>詳細<input type='text' v-model='task.detail' /></div>
      <div>担当者<input type='text' v-model='task.person' /></div>
      <button>保存する</button>
    </form>
    <table>
      <tbody>
      <tr>
        <th>
          カテゴリー
        </th>
        <th>
          タイトル
        </th>
        <th>
          詳細
        </th>
        <th>
          担当者
        </th>
      </tr>
      <tr v-for='task in tasksAllData'>
        <td>
          {{ task.category }}
        </td>
        <td>
          {{ task.title }}
        </td>
        <td>
          {{ task.detail }}
        </td>
        <td>
          {{ task.person }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>