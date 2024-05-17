import { smoothDnD } from 'smooth-dnd'
import { defineComponent, h } from 'vue'

export const DndContainer = defineComponent({
  name: 'DndContainer',
  setup() {
    return { dndContainer: null }
  },
  mounted() {
    const containerElement = this.$refs.container || this.$el
    this.container = smoothDnD(containerElement, { groupName: 'material' })
  },
  render() {
    return h(
      'div',
      {
        ref: 'container',
        class: 'dnd-container',
        style: {
          color: 'pink',
          fontSize: '20px'
        }
      },
      this.$slots.default?.()
    )
  }
})
