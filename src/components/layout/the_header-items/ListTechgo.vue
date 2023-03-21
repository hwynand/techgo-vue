<template>
    <div class="home-list">
        <div class="home-list-items" v-for="(item_title, index) in item_title" :key="index">
            <a href="">{{ item_title.title }}</a>
            <ul v-for="(value, index) in item_title.listTechgo" :key="index">
                <li> {{ value }} </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item_title: Array,
    },

    data() {
        return {

        }
    }
}
</script>

<style scoped >
.home-list {
    width: 900px;
    display: flex;
}

.home-list-items {
    padding: 0 32px;
    width: 25%;
}

.home-list-items li {
    list-style: none;
    padding: 4px 8px;
    text-transform: capitalize;
    font-size: 0.9rem;
    color: #3d3d3d;
}

.home-list-items a {
    text-decoration: none;
    color: black;
    font-weight: 500;
    text-transform: capitalize;
}
</style>