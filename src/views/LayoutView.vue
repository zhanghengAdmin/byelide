<script setup lang="ts">
import { Lightning, Share } from '@icon-park/vue-next'
import { storeToRefs } from 'pinia'
import { type DropResult } from 'smooth-dnd'
import { ref, unref } from 'vue'

import BlockRenderer from '@/blocks/BlockRenderer.vue'
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer'
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable'
import { useAppEditorStore } from '@/stores/appEditor'
import { useEnvStore } from '@/stores/debug'
import { arrayMove } from '@/utils/array'

import LeftPanel from './LeftPanel.vue'
import RightPanel from './RightPanel/RightPanel.vue'

const { debug } = storeToRefs(useEnvStore())
const editorStore = useAppEditorStore()
const { blocks } = storeToRefs(editorStore)

type Mode = 'outline' | 'piece' | null
const modeVal = ref<Mode>(null)

const toggleMode = (newMode: Mode) => {
  if (newMode == modeVal.value) {
    modeVal.value = null
  } else {
    modeVal.value = newMode
  }
}

console.log('blocks', unref(blocks)) // 拿到最终编排的数据：导出（出码）后，渲染JSON(最终拿到的是JSON数据)，最后再转换成对应组件（用来描述特定领域某些模块的数据结构，也称为数据协议/json schema）
// 拖拽的元素按顺序插入：
const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult

  const result = [...arr] // 拷贝arr  arr.slice(0)

  if (addedIndex === null) return result // 没做操作

  // 从外部向内添加元素
  if (addedIndex !== null && removedIndex === null) {
    result.splice(
      addedIndex,
      0,
      payload
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

      <!-- 增加过渡 -->
      <Transition name="app-left-panel-drawer">
        <div class="contentDiv app-left-panel-drawer" v-show="modeVal">
          <h2>{{ modeVal }}</h2>
          <LeftPanel />
        </div>
      </Transition>
    </nav>
    <div class="layout-painter">
      <SmoothDndContainer
        group-name="blocks"
        tag="div"
        orientation="vertical"
        @drop="
          (e) => {
            editorStore.updateBlocks(applyDrag(blocks, e))
            console.log('e:', e)
          }
        "
      >
        <!-- @drop="e => { editorStore.addBlock(e.payload) }" -->

        <SmoothDndDraggable v-for="item in blocks" :key="item.id">
          <div
            :class="{
              'block-wrapper': true,
              debug: debug || editorStore.currentBlockId == item.id
            }"
            @click="editorStore.selectBlock(item.id)"
            :data-block-id="item.id"
            :data-block-type="item.type"
          >
            <BlockRenderer :blockVal="item" />
          </div>
        </SmoothDndDraggable>
      </SmoothDndContainer>
    </div>
    <RightPanel />
  </div>
</template>
<style scoped lang="less">
.layout-painter {
  width: 100%;
  overflow-y: auto;
  margin: 20px;
  border: 1px solid #000;
  padding: 20px;
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

.block-wrapper {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.block-wrapper.debug {
  border: 2px solid #3eaf7c;
}

/* 动画样式直接作用到Transition包裹的元素上 */
.app-left-panel-drawer {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  box-shadow: var(--color-gray-300) 1px 0 0;
  overflow: hidden;
  box-sizing: border-box;
}

/* Transition动画样式（和name属性匹配） */
.app-left-panel-drawer-enter-active,
.app-left-panel-drawer-leave-active {
  transition: width 0.2s ease;
}

.app-left-panel-drawer-enter-from {
  width: 0 !important; /* 强制从0开始 */
}

.app-left-panel-drawer-leave-to {
  width: 0 !important; /* 强制缩到0 */
}
</style>
