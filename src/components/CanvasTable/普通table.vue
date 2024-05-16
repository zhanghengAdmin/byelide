<template>
    <div>
        <!-- 普通table渲染 -->
        <table>
            <thead>
                <tr>
                    <th v-for="(v,i) in data.columns" :key="i">{{v.title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item1,index1) in data.row" :key="index1">
                    <td v-for="item2 in data.columns" :key="item2.key">{{item1[item2.key]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
const data = {
    columns: [
        {title: '姓名',key:'name',width:100},
        {title: '年龄',key:'age',width:100},
    ],
    // row:[
    //     {name:'张三',age:18},
    //     {name:'李四',age:19},
    // ],

    // 假如有十万行数据，页面就会卡死。因此普通table实现大量数据有弊端，需要使用虚拟列表
    row:Array.from({length:100000}).map((v,i)=>{
        return {
            name:`name-${i}`,
            age:Math.floor(Math.random()*100)
        }
    })
}
</script>
<style lang="less" scoped>
table{
    border-collapse:collapse;
    text-align:center;
    td{
        width:100px;
        border:1px solid #ccc;
    }
}
</style>