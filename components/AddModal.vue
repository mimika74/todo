<script setup lang='ts'>



// interface Props {　
//
// }
// interface Emits {
//保存ボタンクリックのイベントを渡す記述が必要
// }


//const props = defineProps<Props>()
// const emits = defineEmits<Emits>()
const { addTask } = useFirestore()


// interface Props {
//
// }
type Task = {
  category: string
  person: string
  title: string
  detail: string
  id: string
}


//データを追加する時に使う
const task = ref<Task>({
  category: '',
  title: '',
  detail: '',
  person: '',
  id: '',
})
const Create = () => {
  addTask(task.value)
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
  background: #cfdc28;
  color: white;
  cursor: pointer;
}
</style>