<script setup lang='ts'>
import { getFirestore, collection } from 'firebase/firestore'
import { CollectionReference, doc, getDocs, addDoc, onSnapshot, updateDoc, deleteDoc } from '@firebase/firestore'
import { initializeApp } from "firebase/app";


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
  id: string
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
//console.log(tasksDocs.docs[1].id)

//onSnapshotを使ってリアルタイム更新(できればやりたい)
// const q = collection(db, 'tasks')
// const tasksAllData = onSnapshot(q, (doc) => {
//   doc.docs.map((doc) => doc.data())
//   })


const tasksAllDataRef = ref(tasksAllData)

//データを追加する時に使う
const task = ref<Task>({
  category: '',
  title: '',
  detail: '',
  person: '',
  id: '',
})

const taskDoc = collection(
    firestore,
    'tasks'
)
const db = getFirestore()
const addTask = async(task: Task) => {
  //taskDocId変数->ドキュメントの中に自動生成IDを格納したいので、事前にIDを取得しておく
  const taskDocId = doc(taskDoc).id
    await addDoc(taskDoc, {
    category: task.category,
    title: task.title,
    detail: task.detail,
    person: task.person,
    id: taskDocId
  })
  //console.log(taskDocId)
}

const Create = () => {
  addTask(task.value)
}

//第1引数(firestore または db) 第2引数(コレクション名)、第3引数(自動生成id)
//第3引数は、ドキュメントのフィールドに自動生成IDを入れて、紐付けることにした(やむなく)
const updateTask = async(taskArg: Task) => {
  const taskDataRef = doc(db, 'tasks', taskArg.id)
  await updateDoc(taskDataRef, {
    title: taskArg.title,
    category: taskArg.category,
    detail: taskArg.detail,
    person: taskArg.person,
  })
}

const deleteTask = async(taskArg: Task) => {
  await deleteDoc(doc(db,'tasks', taskArg.id))
}

//本当はフィールドにドキュメントid入れるのよくないけど、updateとdeleteの時に第三引数が取り出しやすくなった
const doUpdate = (taskArg: Task) => {
  return updateTask(taskArg)
}
const doDelete = async(taskArg: Task) => {
  await deleteTask(taskArg)
}

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
    <table>
      <tbody>
      <tr>
        <th>
          ID
        </th>
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
        <th></th>
        <th></th>
      </tr>
      <tr v-for='taskArg in tasksAllDataRef'>
        <td>
          {{ taskArg.id }}
        </td>
        <td>
          <input type='text' v-model='taskArg.category'>
        </td>
        <td>
          <input type='text' v-model='taskArg.title'>
        </td>
        <td>
          <input type='text' v-model='taskArg.detail'>
        </td>
        <td>
          <input type='text' v-model='taskArg.person'>
        </td>
        <td>
          <button @click='doUpdate(taskArg)'>更新</button>
        </td>
        <td>
          <button type='button' @click='doDelete(taskArg)'>削除</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>