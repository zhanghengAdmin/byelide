<template>
    <div>
        {{ text.content }}
    </div>
</template>
<script setup lang="ts">
// 左边是物料(block)协议，中间是页面协议（左边数据加到中间时，中间是个json数据）
const text = {
    type: 'text',
    content: '这是一段文本哈哈'
}
</script>
<style lang="less" scoped></style>