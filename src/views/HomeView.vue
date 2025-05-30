<template>
    <!-- 單張圖片輪播 -->
    <CarouselComponent
      :slides="slidesData"
      :spaceBetween="0"
      :navigation="false"
      class="home-banner"
    >
      <template v-slot:default="{ item }">
        <img :src="getImage(item)" :alt="item.alt" />
      </template>
    </CarouselComponent>
    <section class="category-container home-section">
      <div class="container">
        <h2 class="title reveal" data-origin="top">
          <span v-text="titles.brandSelect"></span>
        </h2>
        <div class="row category-list reveal">
          <div
            class="col-sm-6 col-lg-4"
            v-for="(item, index) in categoryData"
            :key="'category' + index"
          >
            <RouterLink
              :to="item.link"
              class="item"
              :style="{ backgroundImage: `url(${item.src})` }"
            ></RouterLink>
          </div>
        </div>
      </div>
    </section>
    <section class="brand-container home-section">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 reveal" data-origin="left">
            <div
              class="img"
              :style="{ backgroundImage: `url(${brand.imageSrc})` }"
            ></div>
          </div>
          <div class="col-sm-6 reveal" data-origin="right">
            <div class="content">
              <h2 class="title" v-text="brand.slogan1"></h2>
              <p v-text="brand.intro1"></p>
              <h3 v-text="brand.slogan2"></h3>
              <p v-text="brand.intro2"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="home-img-block">
      <div class="container reveal" data-opacitty="0.3">
        <img :src="adImgSrc" alt="" class="w-100" />
      </div>
    </section>
    <section class=" limit-sale-container home-section">
      <div class="container">
        <h2 class="title reveal" data-origin="top">
          <span v-text="titles.limitSale"></span>
        </h2>
        <div class="countdown-time reveal" data-origin="top">
          <div class="wrapper">
            <div>
                <span class="num" v-text="countDown.day"></span><span>日</span>
            </div>
            <span class="colon">:</span>
            <div>
                <span class="num" v-text="countDown.hr"></span><span>時</span>
            </div>
            <span class="colon">:</span>
            <div>
                <span class="num" v-text="countDown.min"></span><span>分</span>
            </div>
            <span class="colon">:</span>
            <div>
                <span class="num" v-text="countDown.sec"></span><span>秒</span>
            </div>
          </div>
        </div>
        <div class="row product-carousel product-list reveal">
          <!-- 多個產品輪播 -->
          <CarouselComponent :slides="saleProducts" :slidesPerView="1"
            :spaceBetween="0" :loop="false" :autoplay="false"
            :pagination="false" :breakpoints="{
              576: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 20 }}">
            <template v-slot:default="{ item }">
              <RouterLink :to="{ name: 'Product', params: { id: item.id } }" class="item">
                    <div
                      class="img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    >
                      <div class="overlay">
                        <div>查看細節</div>
                      </div>
                    </div>
                    <h4 class="product-title" v-text="item.title"></h4>
                    <div class="price">
                      <span
                        class="original-price"
                        v-text="'NT$' + $filter.currency(item.origin_price)"
                      ></span>
                      <span class="offer-price"
                      v-text="'NT$' + $filter.currency(item.price)"></span>
                    </div>
              </RouterLink>
              <button type="button" class="add-btn" @click="addToCart(item.id)">
                <i class="bi bi-cart3"></i> 加入購物車
              </button>
            </template>
          </CarouselComponent>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import CarouselComponent from '@/components/CarouselComponent.vue';
import { showErrorAlert } from '@/methods/alertHelper';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      slidesData: [
        {
          src: '/images/banner1.png',
          mobileSrc: '/images/banner1-sm.png',
          alt: 'banner1',
        },
        {
          src: '/images/banner2.png',
          mobileSrc: '/images/banner2-sm.png',
          alt: 'banner2',
        },
      ],
      titles: {
        brandSelect: '品牌嚴選',
        limitSale: '限時特惠',
      },
      categoryData: [
        {
          src: '/images/category1.png',
          link: { name: 'Products', query: { category: '質感提案' } },
        },
        {
          src: '/images/category2.png',
          link: { name: 'Products', query: { category: '天然の香' } },
        },
        {
          src: '/images/category3.png',
          link: { name: 'Products', query: { category: '舒壓放鬆' } },
        },
      ],
      brand: {
        bgSrc: '/images/brand-bg.png',
        imageSrc: '/images/store.png',
        slogan1: '打造清新生活，享受天然香氣',
        slogan2: '喚醒感官，享受純粹',
        intro1:
          '放慢腳步，讓香氛帶領您進入一個清新、純淨的世界。從精心挑選的原料，到細緻手工的調配與製作，每個細節都代表著我們對天然與純粹的追求。',
        intro2:
          '我們用心製作每一個小物件，為您的生活空間帶來無可比擬的清新與品味，從純粹的香氣中找到平靜，將自然的力量注入您的每一天。',
      },
      adImgSrc: '/images/ad-banner.png',
      saleProducts: [],
      countDown: {
        day: 0,
        hr: 0,
        min: 0,
        sec: 0,
      },
      timer: null,
      endTimeStr: '2025-06-30T23:59:59+08:00',
      windowWidth: null,
    };
  },
  methods: {
    getSaleProducts() {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
        .then((res) => {
          this.saleProducts = res.data.products.filter(
            (item) => item.price < item.origin_price,
          );
        })
        .catch(() => {
          showErrorAlert();
        });
    },
    countDownHandler(time) {
      const endTime = new Date(time).getTime();
      this.timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
          clearInterval(this.timer);
          this.countDown = {
            day: 0, hr: 0, min: 0, sec: 0,
          };
          return;
        }

        const day = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((distance % (1000 * 60)) / 1000);

        this.countDown = {
          day, hr, min, sec,
        };
      }, 1000);
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    getImage(item) {
      return this.isMobile ? item.mobileSrc : item.src;
    },
    ...mapActions(cartStore, ['addToCart']),
  },
  computed: {
    isMobile() {
      return this.windowWidth < 576;
    },
  },
  components: { CarouselComponent },
  mounted() {
    this.getSaleProducts();
    this.countDownHandler(this.endTimeStr);
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('resize', this.updateWindowWidth);
  },
};
</script>
