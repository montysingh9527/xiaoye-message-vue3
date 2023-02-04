import types from "./types.js";
import message from "./message.vue";
import { createApp, ref, watch } from "vue";

const messageArr = ref([]);
/**
 * 创建组件
 * @param {*} options 参数
 */
const Message = (options) => {
  // 创建message组件，传递opt参数
  const messageApp = createApp(message, options);
  showMessage(messageApp, options.duration);
};

Object.values(types).forEach((type) => {
  Message[type] = (options) => {
    options.type = type;
    return Message(options);
  };
});

/**
 * 创建节点
 * @param {*} app 组件实例
 * @param {*} duration 延迟时间
 */
function showMessage(app, duration) {
  const oFrag = document.createDocumentFragment();
  const vm = app.mount(oFrag);
  messageArr.value.push(vm);
  document.body.appendChild(oFrag);
  console.log("====vm=111==",vm)
  setTop(vm);
  vm.setVisible(true);
  // 监听数据变化，重新设置高度
  watch(messageArr, () => {
    setTop(vm);
  });
  hideMessage(app, vm, duration);
}

/**
 * 销毁节点
 * @param {*} app
 * @param {*} vm 组件实例
 * @param {*} duration 延迟时间
 */
function hideMessage(app, vm, duration) {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false);
    app.unmount();
    // 将销毁的节点排除
    messageArr.value = messageArr.value.filter((item) => item !== vm);
    clearTimeout(vm.timer);
    vm.timer = null;
  }, duration || 3000);
}

/**
 * 设置高度
 * @param {*} vm 实例
 */
function setTop(vm) {
  const { setTop, height, margin } = vm;
  // 消息索引
  const currentIndex = messageArr.value.findIndex((item) => item === vm);
  // 设置高度
  setTop(margin * (currentIndex + 1) + height * currentIndex);
}

export { types };

export default Message;
