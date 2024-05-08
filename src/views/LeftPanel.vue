<script setup lang="ts">
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable';
</script>
<template>
    <div>
        <SmoothDndContainer class="divSty" group-name="blocks" tag="div"
            :get-child-payload="(index: number) => index + 1" @drop="(e: any) => console.log('drop---', e)">
            <SmoothDndDraggable v-for="i in 10" class="numBox">
                {{ i }}
            </SmoothDndDraggable>
        </SmoothDndContainer>
    </div>
</template>
<style lang="less" scoped>
.divSty {
    display: flex;
    flex-wrap: wrap;
    width: 150px;
    justify-content: center;
    padding-top: 30px;

    .numBox {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        width: 30px;
        height: 30px;
        margin: 5px;


    }
}
</style>