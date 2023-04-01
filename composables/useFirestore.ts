import { getFirestore, collection } from 'firebase/firestore'
import { doc, setDoc, getDocs, addDoc, updateDoc, deleteDoc } from '@firebase/firestore'
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'


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
    category?: string
    person?: string
    title?: string
    detail?: string
    id?: string
    photo?: string
    index_id?: number | null
  }

  //追加予定
  // type Category = {
  //   id: string
  //   name: string
  // }

  const db = getFirestore()
  const taskDoc = collection(firestore, 'tasks')

  const getTasks = async() => {
    const getData = await getDocs(collection(db, 'tasks'))
    const allGetData = getData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    })
    return allGetData
  }

  const addTask = async(task: Task, file?: any) => {
     file ??= ''
    const metadata = {
      cacheControl: 'public,max-age=300',
      contentType: 'image/jpeg'
    };
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + file.name);

        uploadBytesResumable(storageRef, file, metadata)
            .then((snapshot) => {
              getDownloadURL(snapshot.ref)
                  .then((url) => {
                    addDoc(taskDoc, {
                      category: task.category,
                      title: task.title,
                      detail: task.detail,
                      person: task.person,
                      photo: url,
                    })
                        .then(() => {
                          console.log('success')
                        })
                        .catch((e) => {
                          console.log('fail', e)
                        })
                  });
            })
            .catch((error) => {
              console.error('Upload failed', error);
            });
    //   addDoc(taskDoc, {
    //     category: task.category,
    //     title: task.title,
    //     detail: task.detail,
    //     person: task.person,
    //   })
     }


  // const addTask = async (task: Task) => {
  //   await addDoc(taskDoc, {
  //     category: task.category,
  //     title: task.title,
  //     detail: task.detail,
  //     person: task.person,
  //     //logo: task.logo,
  //   })
  // }
  const getDocIds = async() => {
    const getData = await getDocs(collection(db, 'tasks'))
      getData.forEach((doc) => { doc.id })
  }

  const updateTask = async(taskDetail: Task) => {
    console.log(taskDetail.id);
    await updateDoc(doc(db, 'tasks', taskDetail.id!), {
      category: taskDetail.category,
      detail: taskDetail.detail,
      person: taskDetail.person,
      title: taskDetail.title,
    })
  }
  const deleteTask = async (taskDetail: Task) => {
    await deleteDoc(doc(db, 'tasks', taskDetail.id!))
  }

  // ユーザー作成
  type User = {
    id: string;
    name: string;
    email: string;
    uid: string;
  }
  const createUser = async (user: User) => {
    await setDoc(doc(db, 'users', user.uid!), {
      name: user.name,
    })
  };

  return {
    getDocIds,
    addTask,
    updateTask,
    deleteTask,
    getTasks,
    createUser,
  }
}
