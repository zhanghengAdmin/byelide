<template>
  <div class="myTable">
    <input type="text" @input="handleSearch" />
    <hr style="margin: 20px 0" />
    <canvas ref="canvasDom" width="1600" height="1200"></canvas>
    <!-- canvas样式设置宽高后，内容设置为它的两倍 -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

const canvasDom = ref<HTMLCanvasElement | null>(null)

const pixelRatio = window.devicePixelRatio // 缩放比例
// 定义单元格的高度和宽度
const cellWidth = 100 * pixelRatio
const cellHeight = 50 * pixelRatio

const showRows = Math.ceil(1200 / cellHeight) - 1 // 可以渲染多少行：当前可视区域高度 / 单元格高度 - 头部1行
let startRow = 0 // 当前可视区域渲染的开始行

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
// 响应式数据：数据跟UI本身没有关系，做筛选影响的是数据，然后通过数据去驱动视图更新来渲染UI
const data = reactive({
  ...oldObj,
  tempRow: oldObj.row
})

const selectedCell = reactive({ row: -1, column: -1 })
// canvas没有事件机制，需要自己使用代理去做，计算当前点击的内容是不是在这个区域中（主要是通过x，y来判断当前内容是否被点击。如果点击，就绘制）
const handleClick = (ev: MouseEvent) => {
  if (canvasDom.value) {
    const { left, top } = canvasDom.value.getBoundingClientRect() // 获取元素的上下左右位置
    const x = ev.clientX - left
    const y = ev.clientY - top
    // console.log('x:', x, 'y:', y)

    // 判断点击位置落到哪个单元格下（也就是碰撞检测的问题），如果点到对应区域就重新绘制
    const rowIndex = Math.floor((y * 2) / cellHeight) - 1 + startRow // 因为cellHeight的值乘以了缩放比例，所以这里要给y乘以2。加startRow为了拿到真实的行下标
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
      for (let i = startRow; i < startRow + showRows; i++) {
        const val = row[i]
        for (let j = 0; j < columns.length; j++) {
          // 先画背景：如果被选中，那么就画矩形来高亮单元格（画矩形其实是fill填充操作）
          if (selectedCell.row == i && selectedCell.column == j) {
            ctx.fillStyle = randomColor()
            ctx.fillRect(j * cellWidth, (i - startRow + 1) * cellHeight, cellWidth, cellHeight)
            ctx.fillStyle = 'black'
          }
          // 再画内容
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

// 虚拟滚动效果
const handleWheel = () => {
  document.addEventListener('wheel', (ev) => {
    console.log('滚动值', ev.deltaY)
    // 方法一：
    // if (ev.deltaY > 0 && startRow < data.row.length - showRows) {
    //   startRow += 1
    // } else if (ev.deltaY < 0 && startRow > 0) {
    //   startRow -= 1
    // }

    // 方法二：
    // if (ev.deltaY > 0) {
    //   startRow += 1
    // } else {
    //   startRow -= 1
    // }
    // if (startRow < 0 || startRow > data.row.length - showRows) return

    // 方法三：
    if (ev.deltaY > 0) {
      startRow = Math.min(data.row.length - showRows, startRow + 1)
    } else {
      startRow = Math.max(0, startRow - 1)
    }
    drawTable()
  })
}

// 监听data.row变化
watch(
  () => data.row,
  () => {
    drawTable()
  }
)
const handleSearch = (e) => {
  const value = e.target.value
  // vue中操作数组时，如果变动太大会导致页面组件的重新渲染(rerender)，比如data = data.map......
  // canvas table方案不需要考虑这个问题（就算重新渲染影响也不大，跟vue关系不大）

  // data.row = data.row.filter((item) => item.name.includes(value)) // 这样操作数据，当输入框删除时，数据不会响应不能还原
  data.row = data.tempRow.filter((item) => item.name.includes(value)) // 用data.tempRow做筛选，让原始值=当前筛选值
}

onMounted(() => {
  drawTable()
  handleWheel()
})

onUnmounted(() => {
  // 将绑定的事件销毁
  canvasDom.value?.removeEventListener('click', handleClick)
})
</script>
<style lang="less" scoped>
.myTable {
  padding: 10px;
}
canvas {
  background: #ccc;
  width: 800px;
  height: 600px;
}
</style>
