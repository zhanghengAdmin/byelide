<template>
    <div>
        <input type="text" :value="props.newVal.props.content"
            @change="e => handleChange((e.target as HTMLInputElement).value)">
    </div>
</template>
<script setup lang="ts">
import type { TextBlock } from '@/blocks/blockType';
const props = defineProps<{
    newVal: TextBlock
}>()
const newEmit = defineEmits<{
    (event: 'myChange', v: TextBlock): void
}>()
const handleChange = (content: string) => {
    const newBlock = { ...props.newVal, props: { content } }

    newEmit('myChange', newBlock)
}
</script>
<style lang="less" scoped></style>