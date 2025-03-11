<template>
  <main>
    <!-- 單張圖片輪播，無箭頭和分頁 -->
    <CarouselComponent
      :slides="slidesData"
      :slidesPerView="1"
      :spaceBetween="0"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: true }"
      :navigation="false"
      :pagination="true"
      class="home-banner"
    >
      <template v-slot:default="{ item }">
        <img :src="getImage(item)" :alt="item.alt" />
      </template>
    </CarouselComponent>
    <section class="catrgory-container home-section">
      <div class="container">
        <h2 class="title">
          <span v-text="titles.brandSelect"></span>
        </h2>
        <div class="row catrgory-list">
          <div
            class="col-sm-6 col-lg-4"
            v-for="(item, index) in categoryData"
            :key="'cateory' + index"
          >
            <a
              :href="item.link"
              class="item"
              :style="{ backgroundImage: `url(${item.src})` }"
            ></a>
          </div>
        </div>
      </div>
    </section>
    <section class="brand-container home-section">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div
              class="img"
              :style="{ backgroundImage: `url(${brand.imageSrc})` }"
            ></div>
          </div>
          <div class="col-sm-6">
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
      <div class="container">
        <img :src="adImgSrc" alt="" class="w-100" />
      </div>
    </section>
    <section class="limit-sale-container home-section">
      <div class="container">
        <h2 class="title">
          <span v-text="titles.limitSale"></span>
        </h2>
          <div class="countdown-time">
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
        <div class="row product-list">
          <CarouselComponent :slides="saleProduct" :slidesPerView="1"
            :spaceBetween="0" :loop="false" :autoplay="false" :navigation="true"
            :pagination="false" :breakpoints="{
              576: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 20 }
            }">
            <template v-slot:default="{ item }">
              <a href="###" class="item">
                    <div
                      class="img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    >
                      <div class="overlay">
                        <span><i class="bi bi-cart3"></i></span>
                      </div>
                    </div>
                    <h4 v-text="item.title"></h4>
                    <div class="price">
                      <span
                        class="original-price"
                        v-text="'NT$' + item.origin_price"
                      ></span>
                      <span class="offer-price" v-text="'NT$' + item.price"></span>
                    </div>
                </a>
            </template>
          </CarouselComponent>
          <!-- <div
            class="col-sm-6 col-lg-4"
            v-for="(item, index) in saleProduct"
            :key="'product' + index"
          >
            <a href="###" class="item">
              <div
                class="img"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              >
                <div class="overlay">
                  <span><i class="bi bi-cart3"></i></span>
                </div>
              </div>
              <h4 v-text="item.title"></h4>
              <div class="price">
                <span
                  class="original-price"
                  v-text="'NT$' + item.origin_price"
                ></span>
                <span class="offer-price" v-text="'NT$' + item.price"></span>
              </div>
            </a>
          </div> -->
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import CarouselComponent from '../components/CarouselComponent.vue';

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
          link: '',
        },
        {
          src: '/images/category2.png',
          link: '',
        },
        {
          src: '/images/category3.png',
          link: '',
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
      saleProduct: [],
      countDown: {
        day: 10,
        hr: 0,
        min: 0,
        sec: 0,
      },
      timer: null,
      windowWidth: null,
    };
  },
  methods: {
    getSaleProduct() {
      axios
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
        .then((res) => {
          this.saleProduct = res.data.products.filter(
            (item) => item.price < item.origin_price,
          );
        })
        .catch(() => {
          // alert(err.data.message);
        });
    },
    countDownHandler() {
      this.timer = setInterval(() => {
        this.countDown.sec -= 1;
        if (this.countDown.sec === -1) {
          this.countDown.sec = 59;
          this.countDown.min -= 1;
          if (this.countDown.min === -1) {
            this.countDown.min = 59;
            this.countDown.hr -= 1;
            if (this.countDown.hr === -1) {
              this.countDown.hr = 23;
              this.countDown.day -= 1;
              if (this.countDown.day === -1) {
                this.countDown.day = 0;
                this.countDown.hr = 0;
                this.countDown.min = 0;
                this.countDown.sec = 0;
              }
            }
          }
        }
      }, 1000);
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    getImage(item) {
      return this.isMobile ? item.mobileSrc : item.src;
    },
  },
  computed: {
    isMobile() {
      return this.windowWidth < 576;
    },
  },
  components: { CarouselComponent },
  mounted() {
    this.getSaleProduct();
    this.countDownHandler();
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('resize', this.updateWindowWidth);
  },
};
</script>

<style scoped></style>
