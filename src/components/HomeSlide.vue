<template>
    <div class="baner-carousel">
        <v-carousel cycle height="415" hide-delimiter-background show-arrows="hover" interval="3000">
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet height="100%">
                    <div class="fill-height justify-center align-center">
                        <div class="text-h2">
                            <img :src="slide.image" alt="">
                        </div>
                    </div>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slides: [
                { image: 'https://theme.hstatic.net/200000516791/1000880762/14/slide_2_img.jpg?v=2257' },
                { image: 'https://cdn.tgdd.vn/hoi-dap/963888/khuyenmai-800x450.jpg' },
                { image: 'https://inhat.vn/ha-noi/wp-content/uploads/2019/07/sua-macbook-hoan-kiem-11.jpg' },
            ],
        }
    }
}
</script>

<style scoped>
.baner-carousel {
    padding: 12px 6px;
    color: white;
    border-radius: 50px;
}

.text-h2 img {
    width: 100%;
}

:deep .mdi-chevron-left::before {
    color: white !important;
}

:deep(.mdi-chevron-right::before) {
    color: white !important;
}
</style>