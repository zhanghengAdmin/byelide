import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppEditorStore = defineStore('appEditor', () => {
    const blocks = ref([]) as any
    const addBlock = (item: any) => {
        blocks.value.push(item)
    }
    const updateBlocks = (newVal: any) => {
        blocks.value = newVal;
    }


    return { blocks, addBlock, updateBlocks }
})
