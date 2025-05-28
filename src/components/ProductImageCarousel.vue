<template>
  <!-- 大圖 -->
    <Swiper
      :modules="modules"
      :thumbs="{ swiper: thumbsSwiper }"
      :navigation="true"
      class="product-main-swiper"
    >
      <SwiperSlide v-for="(item, index) in images" :key="index">
        <div class="item">
            <div class="img" :style="{ backgroundImage: `url(${item})` }"></div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- 小圖 -->
    <Swiper
     :modules="modules"
      class="product-thumb-swiper"
      spaceBetween="10"
      slidesPerView="5"
      :watchSlidesProgress="true"
      :freeMode="true"
      @swiper="setThumbsSwiper"
    >
      <SwiperSlide v-for="(item, index) in images" :key="'thumb-' + index">
        <div class="item">
            <div class="img" :style="{ backgroundImage: `url(${item})` }"></div>
        </div>
      </SwiperSlide>
    </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';

export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      thumbsSwiper: null,
      modules: [Navigation, Thumbs, FreeMode],
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
