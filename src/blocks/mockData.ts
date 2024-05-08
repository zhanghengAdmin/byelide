import type { Block } from './blockType'
export const myBlocks: Block[] = [
    {
        id: '1',
        type: 'text',
        props: { content: '这是一段文本' }
    },
    {
        id: '2',
        type: 'image',
        props: { src: 'https://www.baidu.com/' }
    },
]