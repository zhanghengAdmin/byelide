<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

import AppNavigator from '@/components/AppNavigator.vue'

</script>

<template>
  <AppNavigator />

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