<template>
    <img :src="url" alt="">
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            require: true,
        }
    }
}
</script>

<style scoped></style>