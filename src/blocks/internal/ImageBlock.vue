<template>
    <div>
        <img :src="props.data.props.src" width="100%" height="400">
    </div>
</template>
<script setup lang="ts">
import type { ImageBlock } from '../blockType';
const props = defineProps<{
    data: ImageBlock
}>()
</script>
<style lang="less" scoped></style>