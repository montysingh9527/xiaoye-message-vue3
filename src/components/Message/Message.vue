<template>
  <transition name="jspp-message-fade">
    <div v-show="visible" :class="styleClass" :style="{ top: top + 'px' }">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { computed, reactive, toRefs } from "vue";
import types from "./types";

let t = null;

const props = defineProps({
  type: {
    type: String,
    default: types.MESSAGE,
    validator(value) {
      return Object.values(types).includes(value);
    },
  },
  message: {
    type: String,
    default: types.MESSAGE,
  },
});

const state = reactive({
  visible: false,
  top: 0,
});

const setVisible = (isVisible) => {
  // 使用异步让动画生效
  return new Promise((resolve) => {
    state.visible = isVisible;
    t = setTimeout(() => {
      clearTimeout(t);
      t = null;
      resolve("");
    }, 300);
  });
};

/**
 * 设置每条消息距离顶部高度
 * @param {*} top 高度 
 */
const setTop = (top)=>{
    state.top = top;
    return top;
}

// 将数据暴露出去给其它组件
defineExpose({
  setVisible,
  setTop,
  height: 40,
  margin: 20,
});
const styleClass = computed(() => ["jspp-message", props.style]);

const { visible, top } = toRefs(state);
</script>

<style scoped lang="scss">
.jspp-message {
  position: fixed;
  left: 50%;
  z-index: 99999;
  width: 380px;
  height: 40px;
  margin-left: -190px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-radius: 5px;
  transition: top .3s ease-out;
  &.success {
    background-color: #f0f9eb;
    color: #529b2e;
  }
  &.warning {
    background-color: #fdf6ec;
    color: #b88230;
  }
  &.message {
    background-color: #fdf6ec;
    color: #b6b0a6;
  }
  &.error {
    background-color: #fdf6ec;
    color: #dc572e;
  }
}

.jspp-message-fade-enter-active {
  transition: all 0.3s ease-in;
}

.jspp-message-fade-leave-active {
  transition: all 0.3s ease-out;
}
.jspp-message-fade-enter-from,
.jspp-message-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
