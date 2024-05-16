<template>
  <div>
    <canvas ref="canvasDom" width="1600" height="1200"></canvas>
    <!-- canvas样式设置宽高后，内容设置为它的两倍 -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvasDom = ref<HTMLCanvasElement | null>(null)
const data = {
  columns: [
    { title: '姓名', key: 'name', width: 100 },
    { title: '年龄', key: 'age', width: 100 }
  ],
  row: Array.from({ length: 100000 }).map((v, i) => {
    return {
      name: `name-${i}`,
      age: Math.floor(Math.random() * 100)
    }
  })
}
onMounted(() => {
  if (canvasDom.value) {
    const ctx = canvasDom.value?.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      const pixelRatio = window.devicePixelRatio // 缩放比例

      // 定义单元格的高度和宽度
      const cellWidth = 100 * pixelRatio
      const cellHeight = 50 * pixelRatio

      const { columns, row } = data

      // 画表头
      for (let i = 0; i < columns.length; i++) {
        const val = columns[i]
        ctx.font = `bold ${24 * pixelRatio}px Arial`
        ctx.fillText(val.title, i * cellWidth + 10, cellHeight / 2)
      }
      // 画表格
      for (let i = 0; i < row.length; i++) {
        const val = row[i]
        for (let j = 0; j < columns.length; j++) {
          ctx.font = `${24 * pixelRatio}px Arial`
          ctx.fillText(
            val[columns[j].key],
            j * cellWidth + 10,
            (i + 1) * cellHeight + cellHeight / 2
          )
        }
      }

      ctx.closePath()
    }
  }
})
</script>
<style lang="less" scoped>
canvas {
  background: #ccc;
  width: 800px;
  height: 600px;
}
</style>
