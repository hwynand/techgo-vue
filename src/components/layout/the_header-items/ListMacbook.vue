<template>
    <div class="home-list">
        <div class="home-list-items" v-for="(listMacbook, index) in listMacbook" :key="index">
            <a href="">{{ listMacbook.title }}</a>
            <ul v-for="(value, index) in listMacbook.data" :key="index">
                <li> {{ value }} </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        listMacbook: Array,
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