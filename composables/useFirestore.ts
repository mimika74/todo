import { getFirestore, collection } from 'firebase/firestore'
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from '@firebase/firestore'
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

export const useFirestore = () => {
  //取得するデータの型を用意する
  type Task = {
    category: string
    person: string
    title: string
    detail: string
    id: string
  }
  const db = getFirestore()
  const taskDoc = collection(firestore, 'tasks')

  const getTask = async(taskDetail: Task) => {
    const getDocId = await getDoc(doc(db, 'tasks'))
      console.log(getDocId)
  }
  const getTasks = async() => {
  const getData = await getDocs(collection(db, 'tasks'))
  const allGetData = getData.docs.map((doc) => doc.data())
    return allGetData
  }

  const addTask = async (task: Task) => {
    await addDoc(taskDoc, {
      category: task.category,
      title: task.title,
      detail: task.detail,
      person: task.person,
    })
  }
  const getDocIds = async() => {
    const getData = await getDocs(collection(db, 'tasks'))
      getData.forEach((doc) => { doc.id })
    }

  const updateTask = async(taskDetail: Task) => {
    await updateDoc(doc(db, 'tasks'), {
      category: taskDetail.category,
      title: taskDetail.title,
      detail: taskDetail.detail,
      person: taskDetail.person,
    })
  }
  const deleteTask = async () => {
    await deleteDoc(doc(db, 'tasks', `DpNyPvFGGfZR76Lvuluo`))
  }


  return {
    getTask,
    getDocIds,
    addTask,
    updateTask,
    deleteTask,
    getTasks,
  }
}
