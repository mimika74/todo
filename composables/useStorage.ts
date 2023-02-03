import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { FileReader } from "undici";


//画像ファイルをBase64に変換
// const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   })
// }
// const changeImage = (e: Event) => {
//   const reader = new FileReader()
//   let file = e.target.files[0]
//   if (file) {
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         console.log(file)
//         setImage(file)
//       }
//     }
//   reader.readAsDataURL(e.target.files[0])
//   } else {
//   setImage(null)
// }
// }


export const useStorage = () => {

  const storage = getStorage()
  const gsRef = ref(storage, 'gs://todo-a0e30.appspot.com')
  const getURL = getDownloadURL(gsRef)

  const imageURL = `${getURL}`



  const Upload = async(path: string, file: File) =>{
    const reader = new FileReader()
    reader.onload = () => {

      const storageRef = ref(storage, path)

      const result = uploadBytes(storageRef, file)
    }
  }
  return {
    Upload,
    imageURL,
  }
}