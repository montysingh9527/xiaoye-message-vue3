<template>
  <div>
    <button @click="Message.success({ message: 'This is a SUCCESS Text.' })">
      SHOW SUCCESS
    </button>
    <button @click="Message.warning({ message: 'This is a WARNING Text.' })">
      SHOW WARNING
    </button>
    <button
      @click="Message({ type: types.MESSAGE, message: 'This is a MESSAGE Text.' })"
    >
      SHOW MARNING
    </button>
    <button
      @click="Message({ type: types.ERROR, message: 'This is a ERROR Text.' })"
    >
      SHOW ERROR
    </button>
  </div>
</template>

<script setup>
import Message, { types } from "./components/Message/index.js";
</script>

<style scoped lang="scss">
</style>

