import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { Block } from '@/blocks/blockType'
import { myBlocks as myNewBlocks } from '@/blocks/mockData'

export const useAppEditorStore = defineStore('appEditor', () => {
    const blocks = ref<Block[]>(myNewBlocks)
    const currentBlockId = ref<string | null>(null)
    const selectBlock = (id: string) => {
        currentBlockId.value = id
    }

    // 需要从currentBlockId 派生 （需要依赖某一个数据，进行加工后，生成新的数据，并且这个新的数据是和他相关联的(新老关联)）
    // 什么是派生：https://www.cnblogs.com/scx-xiaochun/p/16529282.html
    const selectData = computed(() => {
        return blocks.value.find(v => v.id == currentBlockId.value || null)
    })
    const addBlock = (item: Block) => {
        blocks.value.push(item)
    }
    const updateBlocks = (newVal: Block[]) => {
        blocks.value = newVal;
    }
    const editFun = (msg: Block) => {
        const index = blocks.value.findIndex(v => v.id == msg.id)
        if (index != -1) {
            blocks.value.splice(index, 1, msg)
        }

    }

    return { blocks, addBlock, updateBlocks, currentBlockId, selectBlock, selectData, editFun }
})
