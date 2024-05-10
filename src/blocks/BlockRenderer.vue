<template>
    <div>
        <component :is="blockMaterial" :data="blockVal"></component>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import type { Block } from "./blockType";
import FillBackBlock from "./internal/FillBackBlock.vue";
import ImageBlock from "./internal/ImageBlock.vue";
import TextBlock from "./internal/TextBlock.vue";

const props = defineProps<{
    blockVal: Block
}>()
// 渲染引擎（渲染器）：外面传进来的数据根据type判断是一个什么物料，然后决定用哪一个渲染（分发上层的数据）
const blockMaterial = computed(() => { // 让数据具有响应式
    switch (props.blockVal.type) {
        case 'text':
            return TextBlock;
        case 'image':
            return ImageBlock;
        default:
            return FillBackBlock; // 没有类型时，设置一个降级兜底的组件
    }
});

</script>
<style lang="less" scoped></style>