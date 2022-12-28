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

//⓪取得するデータの型を用意する
type Task = {
    category: string
    person: string
    title: string
    detail: string
    id: string
}


    const db = getFirestore()

    const taskDoc = collection(
      firestore,
      'tasks'
    )

    const getTask = async(taskArg: Task) => {
      const getDocId = await getDoc(doc(db, 'tasks'))
      return getDocId.id
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

    const getDocIds = async(taskArg: Task) => {
        const getData = await getDocs(collection(db, 'tasks'))
        getData.forEach((doc) => {
                doc.id
            })
        }


    const updateTask = async(taskArg: Task) => {
      const id = getTask(taskArg)
      const taskDataRef = doc(db, 'tasks')
      await updateDoc(taskDataRef, {
        category: taskArg.category,
        title: taskArg.title,
        detail: taskArg.detail,
        person: taskArg.person,
      })
    }

    const deleteTask = async (taskArg: Task) => {
      await deleteDoc(doc(db, 'tasks', taskArg.id))
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
