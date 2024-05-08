<script setup lang="ts">
import { Lightning, Share } from '@icon-park/vue-next'
import { ref } from 'vue';
import LeftPanel from './LeftPanel.vue'
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable';
import { type DropResult } from 'smooth-dnd'
import { useAppEditorStore } from '@/stores/appEditor'
import { storeToRefs } from 'pinia';
import { arrayMove } from '@/utils/array';

import ImageBlock from "@/blocks/internal/ImageBlock.vue";
import TextBlock from "@/blocks/internal/TextBlock.vue";

const editorStore = useAppEditorStore();
const { blocks } = storeToRefs(editorStore);

type Mode = 'outline' | 'piece' | null;
const modeVal = ref<Mode>(null);

const toggleMode = (newMode: Mode) => {
  if (newMode == modeVal.value) {
    modeVal.value = null;
  } else {
    modeVal.value = newMode;
  }
}

// 拖拽的元素按顺序插入：
const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult

  const result = [...arr] // 拷贝arr  arr.slice(0)

  if (addedIndex === null) return result // 没做操作

  // 从外部向内添加元素
  if (addedIndex !== null && removedIndex === null) {
    result.splice(addedIndex, 0, payload
      //  {
      //   id: `${Math.random()}`,
      //   ...payload
      // }
    )
  }
  // 元素内部移动
  if (addedIndex !== null && removedIndex !== null) {
    return arrayMove(result, removedIndex, addedIndex)
  }

  return result
}
</script>

<template>
  <div class="layout-wrapper">
    <nav class="leftBox">
      <div class="textDiv">
        <div class="btn" :class="{ active: modeVal == 'outline' }" @click="toggleMode('outline')">
          <Lightning size="20" />
        </div>
        <div class="btn" :class="{ active: modeVal == 'piece' }" @click="toggleMode('piece')">
          <Share size="20" />
        </div>
      </div>
      <div class="contentDiv" v-show="modeVal">{{ modeVal }}</div>
    </nav>

    <main style="display: flex;">
      <LeftPanel />
      <SmoothDndContainer class="middleBox" group-name="blocks" tag="div" orientation="vertical"
        @drop="e => { editorStore.updateBlocks(applyDrag(blocks, e)); console.log('e:', e); }">
        <!-- @drop="e => { editorStore.addBlock(e.payload) }" -->

        <!-- <SmoothDndDraggable v-for="item in blocks">
          {{ item }}
        </SmoothDndDraggable> -->
        <SmoothDndDraggable>
          <ImageBlock />
          <TextBlock />
        </SmoothDndDraggable>

      </SmoothDndContainer>
    </main>
    <p>右右右右右右</p>
  </div>
</template>
<style scoped lang="less">
.middleBox {
  border: 2px solid red;
  min-width: 150px;
  margin-right: 20px;
}

.layout-wrapper {
  display: flex;
  height: 100%;
  background-color: pink;

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    cursor: pointer;

    &:hover {
      background-color: #fff;
    }

    &.active {
      background-color: green;
      color: #fff;
    }

    // &:last-child {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .leftBox {
    display: flex;
    background-color: #ccc;

    .textDiv {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 1px solid red;
    }

    .contentDiv {
      flex: 1;
      width: 250px;
      overflow: hidden;
    }
  }
}
</style>
