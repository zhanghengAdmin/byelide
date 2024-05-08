<script setup lang="ts">
import { useCountStore } from '@/stores/counter'
import { useEnvStore } from '@/stores/debug'
import { storeToRefs } from 'pinia';

// const { count, increment, decrement, doubleCount } = useCountStore(); // 这样解构会丢掉响应式

const store = useCountStore();

const { count, doubleCount } = storeToRefs(store); // 为了从 store 中提取属性时保持其响应性，需要使用 storeToRefs()。    【count和doubleCount 是响应式的 ref】
const { increment, decrement } = store; // // 作为 action 的 increment和decrement 可以直接解构

const envStore = useEnvStore();
</script>

<template>
  <div>
    <p>{{ count }}---------{{ doubleCount }}</p>
    <button @click="increment">+</button> |
    <button @click="decrement">-</button>

    <hr>

    <nav>
      <p>{{ store.count }}---------{{ store.doubleCount }}</p>
      <button @click="store.increment">+</button> |
      <button @click="store.decrement">-</button>
    </nav>
    <main :class="{ debug: envStore.debug }" @click="envStore.toggle">
      <p>LayoutView</p>
    </main>
  </div>
</template>
<style scoped lang="less">
.debug {
  border: 2px solid red;
}
</style>
