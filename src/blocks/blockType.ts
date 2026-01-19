// interface组合比较麻烦，一般使用type
export type BaseBlock = {
    id: string
    type: string
}
// & 是 TypeScript 的交叉类型运算符
export type TextBlock = BaseBlock & {
    type: 'text'
    props: { content: string }
}
export type ImageBlock = BaseBlock & {
    type: 'image'
    props: { src: string }
}

export type Block = TextBlock | ImageBlock

// 类型保护（有利于推导）
// const m:Block = {
//     id:'1',
//     type:'image',
//     props: { src: 'https://www.baidu.com/' }
// }
// const isImage = (val:Block):val is ImageBlock =>{
//     return val.type == 'image'
// }
// if(isImage(m)){
//     m.props.src = '...'
// }