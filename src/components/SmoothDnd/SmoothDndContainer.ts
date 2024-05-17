// 使用smooth-dnd做编排引擎基本拖拽的实现：容器Container，拖拽对象Draggable（拖拽的内容要放到容器中）
import { dropHandlers, type SmoothDnD, smoothDnD } from "smooth-dnd";
import { defineComponent, h } from "vue";

import { getTagProps, validateTagProp } from './utils'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
smoothDnD.wrapChild = false

type EventKey = 'drag-start' | 'drag-end' | 'drop' | 'drag-enter' | 'drag-leave' | 'drop-ready'

// Record可以为一组固定的属性名创建一个类型。第一个类型参数是属性名的类型（通常是string或number），第二个类型参数是属性值的类型。
// 抹平API差异，drag-start等这些方法是SmoothDnd中提供的
const eventEmitterMap: Record<EventKey, string> = {
    'drag-start': 'onDragStart',
    'drag-end': 'onDragEnd',
    'drop': 'onDrop',
    'drag-enter': 'onDragEnter',
    'drag-leave': 'onDragLeave',
    'drop-ready': 'onDropReady'
}

export const SmoothDndContainer = defineComponent({
    name: 'SmoothDndContainer',
    setup() {
        return {
            container: null as SmoothDnD | null
        }
    },
    mounted() { // 初始化容器，将组件和DOM关联起来
        // 先初始化props相关参数
        const options: any = Object.assign({}, this.$props)

        for (const key in eventEmitterMap) {
            const eventKey = key as EventKey
            options[eventEmitterMap[eventKey]] = (props: any) => {
                this.$emit(eventKey, props)
            }
        }

        const containerElement = this.$refs.container || this.$el // 获取DOM元素
        this.container = smoothDnD(containerElement, options) // 初始化容器
    },
    unmounted() {
        if (this.container) {
            try {
                this.container.dispose() // 销毁实例
            } catch {
            }
        }
    },
    emits: ['drop', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drop-ready'],
    props: { // 对api进行约束
        orientation: { type: String, default: 'vertical' },
        removeOnDropOut: { type: Boolean, default: false },
        autoScrollEnabled: { type: Boolean, default: true },
        animationDuration: { type: Number, default: 250 },
        behaviour: String,
        groupName: String,
        dragHandleSelector: String,
        nonDragAreaSelector: String,
        lockAxis: String,
        dragClass: String,
        dropClass: String,
        dragBeginDelay: Number,
        getChildPayload: Function,
        shouldAnimateDrop: Function,
        shouldAcceptDrop: Function,
        getGhostParent: Function,
        dropPlaceholder: [Object, Boolean],
        tag: {
            validator: validateTagProp,
            default: 'div'
        }
    },
    render() {
        const tagProps = getTagProps(this)
        return h(
            tagProps.value,
            Object.assign({}, { ref: 'container' }, tagProps.props),
            this.$slots.default?.()
        )
    }

})