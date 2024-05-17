<template>
  <div class="divBox">
    <!-- 物料区 -->
    <div class="material-panel" ref="materialContainer">
      <div v-for="(item, index) in materialList" :key="index">{{ item.title }}</div>
    </div>
    <!-- 编排区 -->
    <div class="layout" ref="layoutContainer">
      <!-- 报错：Uncaught (in promise) DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node. -->
      <!-- 数据跟新引起dom的异常，是由于 key/dom 的复用引起的，此时使用下标就不会导致报错 -->
      <!-- <div v-for="item in layoutList" :key="item.id">{{ item.content }}</div> -->

      <div v-for="(item, index) in layoutList" :key="index">{{ item.content }}</div>
    </div>

    <DndContainer>
      <div>123</div>
    </DndContainer>
  </div>
</template>
<script setup lang="ts">
import { dropHandlers, smoothDnD } from 'smooth-dnd'
import { onMounted, ref, toRaw } from 'vue'

import { DndContainer } from './DndContainer'
smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
const materialList = [
  { title: '图片', type: 'image' },
  { title: '文本', type: 'text' },
  { title: '表格', type: 'table' },
  { title: '视频', type: 'video' }
]
const layoutList = ref([
  {
    type: 'image',
    content: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    id: 1
  },
  { type: 'text', content: '文本', id: 2 },
  { type: 'table', content: '姓名年龄', id: 3 },
  { type: 'video', content: '视频视频', id: 4 }
])
const materialContainer = ref(null as unknown as HTMLElement)
const layoutContainer = ref(null as unknown as HTMLElement)

function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice() // 深拷贝数组
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]) // splice方法允许反向操作

  return newArray
}

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  const result = [...arr] // 拷贝arr  arr.slice(0)
  if (addedIndex === null) return result // 没做操作

  // 从外部向内添加元素
  if (addedIndex !== null && removedIndex === null) {
    result.splice(
      addedIndex,
      0,
      // payload
      {
        id: `${Math.random()}`,
        ...payload
      }
    )
  }
  // 元素内部移动
  if (addedIndex !== null && removedIndex !== null) {
    return arrayMove(result, removedIndex, addedIndex)
  }

  return result
}

onMounted(() => {
  // 物料区
  smoothDnD(materialContainer.value, {
    groupName: 'material',
    behaviour: 'copy',
    getChildPayload(index) {
      return {
        type: materialList[index].type,
        content: materialList[index].title
      }
    }
  })

  // 编排区
  smoothDnD(layoutContainer.value, {
    groupName: 'material',
    onDrop(dropResult) {
      const result = applyDrag(toRaw(layoutList.value), dropResult) // 使用toRaw转成原始对象
      layoutList.value = result
    }
  })
})
</script>
<style lang="less" scoped>
.divBox {
  display: flex;
  .material-panel {
    width: 200px;
  }
}
</style>
