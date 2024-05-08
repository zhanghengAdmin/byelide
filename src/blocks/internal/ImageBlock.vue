<template>
    <div>
        <img :src="image.props.src" :alt="image.props.alt">
    </div>
</template>
<script setup lang="ts">
const image = {
    type: 'image',
    props: {
        src: '1https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Google'
    }
}
</script>
<style lang="less" scoped></style>