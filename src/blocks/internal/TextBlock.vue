<template>
    <div>
        {{ props.data.props.content }}
    </div>
</template>
<script setup lang="ts">
import type { TextBlock } from '../blockType';

// 左边是物料(block)协议，中间是页面协议（左边数据加到中间时，中间是个json数据）
const props = defineProps<{
    data: TextBlock
}>()

</script>
<style lang="less" scoped></style>