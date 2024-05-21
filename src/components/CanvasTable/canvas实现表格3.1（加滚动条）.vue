<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
    <div ref="scrollContainer" class="scroll-container" @scroll="handleScroll">
      <div :style="{ height: spacerHeight + 'px' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

const canvas = ref<any>(null)
const context = ref<any>()
const scrollContainer = ref<any>(null)

const data = reactive({
  columns: ['Name', 'Age'],
  rows: Array.from({ length: 20 }, (_, i) => ({
    name: `name-${i + 1}`,
    age: Math.floor(Math.random() * 100)
  }))
})

const rowHeight = 30
const headerHeight = 30
const visibleRows = 10
const containerHeight = 330
const devicePixelRatio = window.devicePixelRatio // 缩放比例

// 计算总内容高度和spacer的高度
const totalContentHeight = data.rows.length * rowHeight + headerHeight
const spacerHeight = totalContentHeight > containerHeight ? totalContentHeight : 0

onMounted(() => {
  if (canvas.value) {
    adjustCanvasResolution()
    drawTable()
  }
})

function adjustCanvasResolution() {
  const canvasWidth = 400
  if (!canvas.value) return
  canvas.value.width = canvasWidth * devicePixelRatio
  canvas.value.height = containerHeight * devicePixelRatio
  canvas.value.style.width = `${canvasWidth}px`
  canvas.value.style.height = `${containerHeight}px`

  context.value = canvas.value.getContext('2d')
  context.value.scale(devicePixelRatio, devicePixelRatio)
}

function handleScroll() {
  drawTable()
}

function drawTable() {
  if (!context.value) return

  const scrollTop = scrollContainer.value.scrollTop
  const startRow = Math.floor(scrollTop / rowHeight)

  const endRow = data.rows.length > visibleRows ? startRow + visibleRows : data.rows.length

  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height * 2)
  context.value.fillStyle = '#000'
  // 绘制表头
  if (scrollTop < headerHeight) {
    context.value.fillText(data.columns.join(`${' '.repeat(10)}`), 10, headerHeight - scrollTop)
  }

  // context.value.fillStyle = '#ff0'
  // context.value.fillRect(0, 0, canvas.value.width, 30)
  // context.value.fillStyle = '#000'
  // context.value.fillText(data.columns.join(`${' '.repeat(10)}`), 10, 20)

  // 绘制可视区域的行
  for (let i = 0; i < endRow; i++) {
    const y = (i - startRow) * rowHeight + headerHeight - (scrollTop % rowHeight)
    const rowText = `${data.rows[i].name}${' '.repeat(10)}${data.rows[i].age}`
    context.value.fillText(rowText, 10, y + 20)
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 420px;
}

.scroll-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 330px;
  overflow-y: auto;
}

canvas {
  position: sticky;
  top: 30px;
  left: 0;
  display: block;
}
</style>
