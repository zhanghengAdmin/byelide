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
