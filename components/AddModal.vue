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
  //let reader = new FileReader();
  //reader.onload = (props: any) => {
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
          <v-form @submit.prevent='Create'>
            <v-table>
              <v-col sm="3">
              <tr>新規登録</tr>
              <tr><td><v-text-field label='カテゴリー' type='text' v-model='task.category' /></td></tr>
              <tr><td><v-text-field label='タイトル' type='text' v-model='task.title' /></td></tr>
              <tr><td><v-text-field label='詳細' type='text' v-model='task.detail' /></td></tr>
              <tr><td><v-text-field label='担当者' type='text' v-model='task.person' /></td></tr>
              <tr><td><input label='添付ファイル' type="file" accept="image/jpeg,image/png"  @change="changeImage" /></td></tr>
              <img v-if='photo' :src="url"  alt='' width='100' height='100' />
              </v-col>
            </v-table>
            <v-btn>保存する</v-btn>
          </v-form>
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
  height: 70%;
  padding: 1em;
  background: #fff;
}

button {
  //border: none;
  //outline: none;
  background: #F2F2F2;
  color: black;
  cursor: pointer;
}
</style>