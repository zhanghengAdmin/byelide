<template>
  <div>
    <canvas ref="canvasDom" width="1600" height="1200"></canvas>
    <!-- canvas样式设置宽高后，内容设置为它的两倍 -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const canvasDom = ref<HTMLCanvasElement | null>(null)

const pixelRatio = window.devicePixelRatio // 缩放比例
// 定义单元格的高度和宽度
const cellWidth = 100 * pixelRatio
const cellHeight = 50 * pixelRatio

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

const selectedCell = reactive({ row: -1, column: -1 })
// canvas没有事件机制，需要自己使用代理去做，计算当前点击的内容是不是在这个区域中（主要是通过x，y来判断当前内容是否被点击。如果点击，就绘制）
const handleClick = (ev: MouseEvent) => {
  if (canvasDom.value) {
    const { left, top } = canvasDom.value.getBoundingClientRect() // 获取元素的上下左右位置
    const x = ev.clientX - left
    const y = ev.clientY - top
    // console.log('x:', x, 'y:', y)

    // 判断点击位置落到哪个单元格下（也就是碰撞检测的问题），如果点到对应区域就重新绘制
    const rowIndex = Math.floor((y * 2) / cellHeight) - 1 // 因为cellHeight的值乘以了缩放比例，所以这里要给y乘以2
    const colIndex = Math.floor((x * 2) / cellWidth)
    if (rowIndex <= data.row.length && colIndex <= data.columns.length) {
      // 说明有单元格被选中
      console.log(`第${rowIndex}行，第${colIndex}列`)
      selectedCell.row = rowIndex
      selectedCell.column = colIndex
      // 重绘表格
      drawTable()
    }
  }
}

const randomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

const drawTable = () => {
  if (canvasDom.value) {
    canvasDom.value.addEventListener('click', handleClick)
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
      for (let i = 0; i < row.length; i++) {
        const val = row[i]
        for (let j = 0; j < columns.length; j++) {
          // 先画背景：如果被选中，那么就画矩形来高亮单元格（画矩形其实是fill填充操作）
          if (selectedCell.row == i && selectedCell.column == j) {
            ctx.fillStyle = randomColor()
            ctx.fillRect(j * cellWidth, (i + 1) * cellHeight, cellWidth, cellHeight)
            ctx.fillStyle = 'black'
          }

          // 再画内容
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
}

onMounted(() => {
  drawTable()
})

onUnmounted(() => {
  // 将绑定的事件销毁
  canvasDom.value?.removeEventListener('click', handleClick)
})
</script>
<style lang="less" scoped>
canvas {
  background: #ccc;
  width: 800px;
  height: 600px;
}
</style>
