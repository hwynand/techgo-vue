<template>
    <base-layout>
        <template #header>
        </template>
        <template #main>
            <slot></slot>
        </template>
        <template #footer>
        </template>
    </base-layout>
</template>
  
<script>
import BaseLayout from "./BaseLayoutAdmin.vue";
export default {
    components: { BaseLayout },
};
</script>
