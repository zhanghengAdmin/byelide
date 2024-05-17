<template>
  <div id="canvas-container" ref="canvasContainer">
    <canvas ref="canvasDom" width="1600" height="1200"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

const canvasDom = ref<HTMLCanvasElement | null>(null)

const pixelRatio = window.devicePixelRatio // 缩放比例
const cellWidth = 100 * pixelRatio
const cellHeight = 50 * pixelRatio

const showRows = Math.ceil(1200 / cellHeight) - 1

let startRow = 0

const oldObj = {
  columns: [
    { title: '姓名', key: 'name', width: 100 },
    { title: '年龄', key: 'age', width: 100 }
  ],
  row: Array.from({ length: 40 }).map((v, i) => {
    return {
      name: `name-${i}`,
      age: Math.floor(Math.random() * 100)
    }
  })
}

const data = reactive({
  ...oldObj,
  tempRow: oldObj.row
})

const drawTable = () => {
  if (canvasDom.value) {
    const ctx = canvasDom.value?.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      const { columns, row } = data
      ctx.clearRect(0, 0, 1600, 1200) // 清除画布

      // 画表头
      for (let i = 0; i < columns.length; i++) {
        const val = columns[i]
        ctx.font = `bold ${24 * pixelRatio}px Arial`
        ctx.fillText(val.title, i * cellWidth + 10, cellHeight / 2)
      }
      // 画表格
      for (let i = startRow; i < startRow + showRows; i++) {
        const val = row[i]
        for (let j = 0; j < columns.length; j++) {
          ctx.font = `${24 * pixelRatio}px Arial`
          ctx.fillText(
            val[columns[j].key],
            j * cellWidth + 10,
            (i - startRow + 1) * cellHeight + cellHeight / 2
          )
        }
      }

      ctx.closePath()
    }
  }
}
watch(
  () => data.row,
  () => {
    drawTable()
  }
)
const canvasContainer = ref<HTMLDivElement | null>(null)
let startTop = 0
let mm
const handleWheel = () => {
  canvasContainer.value?.addEventListener('scroll', (ev: any) => {
    // const scrollTop = ev.target.scrollTop
    // const scrollHeight = ev.target.scrollHeight
    // const clientHeight = ev.target.clientHeight
    // const scrolledPercent = (scrollTop / (scrollHeight - clientHeight)) * 100

    var isTop = ev.target.scrollTop - startTop
    startTop = ev.target.scrollTop
    mm = isTop < 0 ? -1 : 1
    if (mm < 0) {
      // if (ev.deltaY < 0) {
      // 向上滚动
      startRow = Math.max(0, startRow - 1)
    } else {
      // 向下滚动
      startRow = Math.min(data.row.length - showRows, startRow + 1)
    }
    console.log('startRow', startRow)

    drawTable()
  })
}

onMounted(() => {
  drawTable()
  handleWheel()
})
</script>
<style lang="less" scoped>
#canvas-container {
  width: 800px;
  height: 300px;
  overflow-y: scroll;
}
canvas {
  background: #ccc;
  width: 800px;
  height: 600px;
}
</style>
