import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getFirestore } from "@firebase/firestore";
const nuxtApp = useNuxtApp()

export const useAuth = () => {
  const token = useState<string | null>('token', () => null)
  const db = getFirestore()
    //サインアップ
  const signUp = async(email: string, password: string) => {
    return await new Promise<void>(() => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
          alert('登録完了！')
             setDoc(doc(db, 'users', userCredential.user.uid!), {
              email: userCredential.user.email,
              name: userCredential.user.user.name,
            })
        })
        .catch(() => {
          alert('登録できませんでした')
      })
    })
  }


  type User = {
    id: string;
    name: string;
    email: string;
    uid: string;
  }



  //ログイン
  const signIn = async(email: string, password: string) => {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth()
      return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user
          .getIdToken()
          .then((idToken) => {
            token.value = idToken
            resolve()
          })
          .catch(reject)
      })
      .catch(reject)
    })
  }

  //ログアウト
  const signOut = async() => {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth()
      firebaseSignOut(auth)
        .then(() => {
            token.value = null
            resolve()
        })
        .catch((error) => {
            reject(error)
        })
      })
  }
    //ログイン中かどうか
  const checkAuthState = async() => {
    return await new Promise<void>((resolve, reject) => {
    if (process.server)
      return resolve()

    const auth = getAuth()
    onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            user.getIdToken()
            .then((idToken) => {
              token.value = idToken
              resolve()
            })
            .catch(reject)
          } else {
            token.value = null
            resolve()
          }
        },
  (error) => {
          reject(error)
        }
      )
    })
  }

  return {
    signUp,
    signIn,
    signOut,
    token,
    checkAuthState,
  }
}