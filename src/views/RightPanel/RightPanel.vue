<script setup lang="ts">
import { Lightning, Share } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import type { Block } from '@/blocks/blockType';
import { useAppEditorStore } from '@/stores/appEditor'

import ImagePage from './ImagePage.vue'
import TextPage from './TextPage.vue'

const editorStore = useAppEditorStore();
const { selectData } = storeToRefs(editorStore)

// 渲染器：分发渲染逻辑
const blockRightPanel = computed(() => { // 让数据具有响应式
    switch (selectData.value?.type) {
        case 'text':
            return TextPage;
        case 'image':
            return ImagePage;
        default:
            return null;
    }
});

</script>
<template>
    <div class="right-box" v-if="selectData">
        <component :is="blockRightPanel" :newVal="selectData" @myChange="(v: Block) => editorStore.editFun(v)">
        </component>
    </div>
</template>
<style lang="less" scoped>
.right-box {
    padding: 20px;
    padding-left: 0;
    width: 250px;
}
</style>