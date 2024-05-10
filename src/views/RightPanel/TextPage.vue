<template>
    <div>
        <input type="text" :value="props.newVal.props.content"
            @change="e => handleChange((e.target as HTMLInputElement).value)" />
        <hr style="margin: 20px 0;">

        <div>
            <input v-model="content" v-bind="contentAttr" />
            <button @click="push('')">动态添加</button> ||
            <button @click="console.log('values', JSON.stringify(values))">查看数据</button>
            <!-- 可以拿到files的所有数据，表单处理在设计的时候通过provide和inject将状态和一些依赖的数据都规整好，只需要使用对应api就可以拿到值 -->

            <nav v-for="(v, i) in fields" :key="v.key" class="navBox"> <!-- v.key就是对应的下标 -->
                <input v-model="v.value" />
                <button @click="remove(i)">动态删除</button>
            </nav>
        </div>

        <hr style="margin: 20px 0;">

        <div>
            <button @click="pushTwo('数据')">添加Two</button>
            <nav v-for="v in fieldsTwo" :key="v.key">
                <input v-model="v.value" />
                <p v-if="!v.value">{{ errors.hobby }}</p>
            </nav>
        </div>



    </div>
</template>
<script setup lang="ts">
import { defineRule, useFieldArray, useForm } from 'vee-validate'
import { watch } from 'vue';

import type { TextBlock } from '@/blocks/blockType';

const props = defineProps<{
    newVal: TextBlock
}>()
const newEmit = defineEmits<{
    (event: 'myChange', v: TextBlock): void
}>()
const handleChange = (content: string) => {
    const newBlock = { ...props.newVal, props: { content } }
    newEmit('myChange', newBlock)
}

// -----------------------------------------------------

// 使用vee-validate
const { values, errors, defineField } = useForm({
    validationSchema: {
        hobby: 'required'
    },
    initialValues: {
        content: props.newVal.props.content,
        hobby: ['篮球', '足球']
    }
})
defineRule('required', (value: string[]) => {
    for (let v of value) {
        if (v == '') {
            return 'This field is required';
        }
    }
    return true;
});
const [content, contentAttr] = defineField('content')

// 不同数据间有个keyPath，如果要做高性能表单，对于keyPath要重点关注（比如 person.name，name就是person的keyPath）
// 通过keyPath既可以表征普通的数据类型，也可以表征数组
const { fields, push, remove } = useFieldArray('myFiles')
const { fields: fieldsTwo, push: pushTwo } = useFieldArray('hobby')
console.log('errors', errors);

// 尽量不要使用此方法，可以使用change方法，或者使用节流的形式处理数据
watch(content, n => {
    const newBlock = { ...props.newVal, props: { content: n } }
    newEmit('myChange', newBlock)
})

</script>
<style lang="less" scoped>
.navBox {
    display: flex;
    margin-bottom: 5px;

    &:nth-of-type(1) {
        margin-top: 5px;
    }

    input {
        width: 50%;
        margin-right: 5px;
    }
}
</style>