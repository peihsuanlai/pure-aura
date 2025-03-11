<template>
  <Swiper
    :slidesPerView="slidesPerView"
    :spaceBetween="spaceBetween"
    :loop="loop"
    :autoplay="autoplay ? autoplay : undefined"
    :navigation="navigation"
    :pagination="pagination"
    :breakpoints="breakpoints || undefined"
    :modules="modules"
  >
    <SwiperSlide v-for="(item, index) in slides" :key="index">
      <slot :item="item"></slot>
      <!-- <img :src="item.src" :alt="item.alt" /> -->
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default {
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
  props: {
    slides: {
      type: Array,
      required: true,
    },
    slidesPerView: {
      type: Number,
      default: 1, // 每次顯示幾張
    },
    spaceBetween: {
      type: Number,
      default: 10, // 每個滑塊之間的間距
    },
    loop: {
      type: Boolean,
      default: true, // 是否循環
    },
    autoplay: {
      type: [Object, Boolean],
      default: () => ({
        delay: 3000, // 3 秒自動播放
        disableOnInteraction: true, //
      }),
    },
    navigation: {
      type: Boolean,
      default: true, // 顯示左右箭頭
    },
    pagination: {
      type: Boolean,
      default: true, // 顯示分頁指示器
    },
    breakpoints: {
      type: Object,
      default: null,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
