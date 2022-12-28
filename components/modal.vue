<script setup lang='ts'>
//親から、タスク内容を渡してもらう

// interface Props {　
//
// }
// interface Emits {
//保存ボタンクリックのイベントを渡す記述が必要
// }


//const props = defineProps<Props>()
// const emits = defineEmits<Emits>()

</script>

<template>
  <div>
    <div class='overlay'>
      <div class='contents'>
        <p></p>
        <slot />
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

</style>