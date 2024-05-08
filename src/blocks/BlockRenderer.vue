<template>
    <div>
        <component :is="block"></component>
    </div>
</template>
<script setup lang="ts">
import ImageBlock from "./internal/ImageBlock.vue";
import TextBlock from "./internal/TextBlock.vue";
type BlockType = 'image' | 'text'
const type: BlockType = 'image'
let block: any;

switch (type) {
    case 'image':
        block = ImageBlock;
    case 'text':
        block = TextBlock;
}
</script>
<style lang="less" scoped></style>