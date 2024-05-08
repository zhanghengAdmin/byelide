<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute(); // route是当前路由对象
const activeTab = computed(() => route.name);

const router = useRouter();
console.log(router.options.routes); // 获取全部路由


</script>

<template>
  <!-- 
    写法一：
  <nav class="navBox">
    <RouterLink to="/dataSource">
      <span :style="{ backgroundColor: activeTab == 'dataSource' ? 'pink' : '' }">dataSource</span>
    </RouterLink> |
    <RouterLink to="/layout">
      <span :style="{ backgroundColor: activeTab == 'layout' ? 'pink' : '' }">layout</span>
    </RouterLink> |
    <RouterLink to="/actions">
      <span :style="{ backgroundColor: activeTab == 'actions' ? 'pink' : '' }">actions</span>
    </RouterLink>
  </nav> -->

  <nav class="navBox">
    <RouterLink v-for="(route, index) in router.options.routes" :key="route.name" :to="{ name: route.name }">
      <!-- <span :style="{ backgroundColor: activeTab == route.name ? 'pink' : '' }">{{ route.name }}</span> -->
      <span :class="{ activeSty: activeTab == route.name }">{{ route.name }}</span>
      <span v-if="index !== router.options.routes.length - 1">|</span>
    </RouterLink>
  </nav>

  <RouterView />
</template>
<style scoped lang="less">
.navBox {
  display: flex;
  justify-content: space-between;
}

.activeSty {
  background-color: pink;
}
</style>