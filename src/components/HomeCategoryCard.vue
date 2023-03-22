<template>
    <div class="category-box">
        <div class="categoty-img">
            <img :src="url" alt="">
        </div>
        <div class="category-text">
            <p>{{ categotyTitles }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            required: true,
        },

        categotyTitles: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped>
.category-box a {
    text-decoration: none;
    color: black;
}

.category-box {
    border: 0.5px solid rgba(0, 0, 0, 0.05);
    width: 14.2859%;
    padding: 8px;
}

.category-box:hover {
    box-shadow: 0 0 4px 2px #ccc;
    transition: ease 0.2s;
    cursor: pointer;
}

.categoty-img img {
    width: 50%;
}

.categoty-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.category-text p {
    text-align: center;
    text-transform: capitalize;
    font-weight: 500;
    padding: 6px;
    font-size: 12px;
}
</style>