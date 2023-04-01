<script setup lang='ts'>
const { addTask } = useFirestore()

type Task = {
  category: string
  person: string
  title: string
  detail: string
  photo: string
}

//データを追加する時に使う
const task = ref<Task>({
  category: '',
  title: '',
  detail: '',
  person: '',
  photo: '',
})

// interface Props {
//   closeAddModal: any
//   }
// interface Emits {
//   closeAddModal: any
//   }
// const props = defineProps<Props>()
// const emits = defineEmits<Emits>()

const photo = ref<string>()
const url = ref<string>()
const changeImage = (props: any) => {
  photo.value = props.target.files[0] || null
  const img = props.target.files[0]
  url.value = URL.createObjectURL(img)
}

const Create = async() => {
  await addTask(task.value, photo.value)
}

</script>

<template>
  <div>
    <div class='overlay'>
      <div class='contents'>
        <div>
          <slot />
          <p>新規登録</p>
          <form @submit.prevent='Create'>
            <table>
              <tr><th>カテゴリー</th><td><input type='text' v-model='task.category' /></td></tr>
              <tr><th>タイトル</th><td><input type='text' v-model='task.title' /></td></tr>
              <tr><th>詳細</th><td><input type='text' v-model='task.detail' /></td></tr>
              <tr><th>担当者</th><td><input type='text' v-model='task.person' /></td></tr>
              <tr><th>添付ファイル</th><td><input type="file" accept="image/jpeg,image/png"  @change="changeImage"></td></tr>
              <img v-if='photo' :src="url"  alt='' width='100' height='100' />
            </table>
            <button>保存する</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contents {
  z-index: 2;
  width: 50%;
  height: 50%;
  padding: 1em;
  background: #fff;
}

button {
  border: none;
  outline: none;
  background: #F2F2F2;
  color: black;
  cursor: pointer;
}
</style>