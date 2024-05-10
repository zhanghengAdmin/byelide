<template>
    <div>
        <input type="text" :value="props.newVal.props.src"
            @change="e => handleChange((e.target as HTMLInputElement).value)">
        <!-- https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg -->
    </div>
</template>
<script setup lang="ts">
import type { ImageBlock } from '@/blocks/blockType';
const props = defineProps<{
    newVal: ImageBlock
}>()
const newEmit = defineEmits<{
    (event: 'myChange', v: ImageBlock): void
}>()
const handleChange = (src: string) => {
    const newBlock = { ...props.newVal, props: { src } }

    newEmit('myChange', newBlock)
}
</script>
<style lang="less" scoped></style>