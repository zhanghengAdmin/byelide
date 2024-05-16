<template>
  <div>
    <canvas ref="canvasDom" width="1600" height="1200"></canvas>
    <!-- canvas样式设置宽高后，内容设置为它的两倍 -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 不要使用dom操作
const canvasDom = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (canvasDom.value) {
    const ctx = canvasDom.value?.getContext('2d')
    if (ctx) {
      // 假设用毛笔练习书法：1.按下去画笔，2.开始写字，3.松开画笔

      // 准备绘图（按下去）:
      ctx.beginPath()

      // 开始绘图：
      ctx.moveTo(0, 0)
      ctx.lineTo(200, 200)

      // 设置画笔：使用fill(填充)或者stroke(描边)
      ctx.strokeStyle = 'red'
      ctx.stroke() // 绘制图形轮廓

      ctx.font='40px Arial' // 设置字体
      ctx.fillText('Hello World', 100, 100) // 画文字
      // 要实现table表格渲染，其实就是画行画列画格子

      // canvas是位图（svg是矢量图），需要处理缩放的问题（否则会很模糊）
      // 很多图表通过浏览器渲染都会存在模糊的情况，这与浏览器的物理像素和逻辑像素有关联，一般乘以2或者乘以3就不会模糊了
      console.log(window.devicePixelRatio) // 获取浏览器设备的像素比

      // 绘图结束：
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
