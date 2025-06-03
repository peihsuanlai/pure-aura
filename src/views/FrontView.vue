<template>
    <section class="navbar-container">
        <div class="news-carousel">
            <div class="item" @animationend="getNewIndex" :key="currentIndex">
                <span v-text="currentItem.date"></span>
                <p class="mb-0" v-text="currentItem.text"></p>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg container-lg align-items-center">
            <RouterLink class="d-lg-none ps-2" to="/">
                <h1 class="logo"
                :style="{ backgroundImage: `url(${logos.phoneWhite})` }">PURE AURA</h1>
            </RouterLink>
            <input type="checkbox" id="menuToggle" v-model="menuOpen">
            <label for="menuToggle">
                <span :class="{'rotate': menuOpen }"></span>
                <span :class="{'rotate': menuOpen }"></span>
                <span :class="{'rotate': menuOpen }"></span>
            </label>
            <div class="navbarMenu" :class="{'show': menuOpen }">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item">
                        <RouterLink class="nav-link"
                        :class="{ active: !$route.query.category && $route.path === '/products' }"
                        to="/products">全系列商品</RouterLink>
                    </li>
                     <li class="nav-item">
                        <RouterLink class="nav-link"
                        :class="{ active: $route.query.category === '天然の香' }"
                        :to="{ name: 'Products', query: { category: '天然の香' }  }">天然の香</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link"
                        :class="{ active: $route.query.category === '舒壓放鬆' }"
                        :to="{ name: 'Products', query: { category: '舒壓放鬆' }  }">舒壓放鬆</RouterLink>
                    </li>
                    <li class="nav-item d-none d-lg-block">
                        <RouterLink class="nav-link" to="/">
                            <h1 class="logo"
                            :style="{ backgroundImage: `url(${logos.pcWhite})` }" >PURE AURA</h1>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link"
                        :class="{ active: $route.query.category === '質感提案' }"
                        :to="{ name: 'Products', query: { category: '質感提案' }  }">質感提案</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about"
                        :class="{ active: $route.path === '/about' }">關於我們</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/faq"
                        :class="{ active: $route.path === '/faq' }">常見問題</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </section>
    <RouterView></RouterView>
    <footer>
        <div class="container-lg mb-3">
            <div class="row">
                <div class="col-md-4 col-lg-5">
                    <div class="item">
                        <RouterLink to="/">
                            <img :src="logos.footerGreen" alt="PURE AURA">
                        </RouterLink>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-5">
                    <div class="item">
                        <span class="title">CONTACT US</span>
                        <ul class="contact-info">
                            <li>TEL：<a href="tel:2-1234567">02-1234567</a></li>
                            <li>E-MAIL：
                                <a href="mailto:service@pureaura.com">
                                    service@pureaura.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-2">
                    <div class="item">
                        <span class="title">FOLLOW US</span>
                        <ul class="social-icons">
                            <li>
                                <a href="###" target="_blank" class="fb-icon">
                                    <i class="bi bi-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="###" target="_blank" class="line-icon">
                                    <i class="bi bi-line"></i>
                                </a>
                            </li>
                            <li>
                                <a href="###" target="_blank" class="ig-icon">
                                    <i class="bi bi-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-lg bottom">
            <div>所有圖片均取自<a href="https://unsplash.com/">Unsplash</a> ，僅作為個人學習與作品製作之用。</div>
            <div>
                Copyright @ 2025 PURE AURA Inc. All rights reserved.
            </div>
        </div>
    </footer>
    <div class="cart-btn">
        <RouterLink to="/cart" class="action">
            <span class="num" :class="{ bounce: isBouncing }" v-text="cart.carts?.length"></span>
            <i class="bi bi-cart-check"></i>
        </RouterLink>
    </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import ScrollReveal from 'scrollreveal';
import cartStore from '@/stores/cartStore';

const { BASE_URL } = import.meta.env;

export default {
  data() {
    return {
      logos: {
        phoneWhite: `${BASE_URL}images/logo-white-sm.png`,
        pcWhite: `${BASE_URL}images/logo-white.png`,
        footerGreen: `${BASE_URL}images/logo-green.png`,
      },
      isBouncing: false,
      currentIndex: 0,
      menuOpen: false,
      news: [
        {
          date: '2025-05-20',
          text: '開幕慶~~結帳輸入折扣碼 「happy520」，立即享九折優惠',
        },
        {
          date: '2025-06-12',
          text: '開幕慶期間，多項商品享優惠價格，結帳輸入折扣碼可再打折！',
        },
      ],
      bounceTimer: null,
    };
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    currentItem() {
      return this.news[this.currentIndex];
    },
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'addToCart']),
    // 上方跑馬燈動畫結束需重新獲得新index
    getNewIndex() {
      this.currentIndex = (this.currentIndex + 1) % this.news.length;
    },
    // 視差
    initScrollReveal() {
      document.querySelectorAll('.reveal').forEach((el) => {
        ScrollReveal().reveal(el, {
          origin: el.dataset.origin || 'bottom',
          distance: el.dataset.distance || '50px',
          opacity: Number(el.opacity) || 0,
          duration: 1000,
          delay: Number(el.dataset.delay) || 0,
          easing: 'ease-out',
          reset: false,
          viewFactor: 0.1,
        });
      });
    },
  },
  watch: {
    // 監聽購物車數量以變動isBouncing，產生彈跳效果
    'cart.carts.length': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isBouncing = true;
          clearTimeout(this.bounceTimer);
          this.bounceTimer = setTimeout(() => {
            this.isBouncing = false;
          }, 500);
        }
      },
    },
    // 監聽路由變化：切換的時候關閉選單、啟動頁面視差
    '$route.fullPath': {
      handler() {
        if (this.menuOpen) {
          this.menuOpen = !this.menuOpen;
        }
        // dom 更新後執行
        this.$nextTick(() => {
          this.initScrollReveal();
        });
      },
    },
  },
  beforeUnmount() {
    clearTimeout(this.bounceTimer);
  },
  mounted() {
    this.getCart();
    this.getNewIndex();
    this.initScrollReveal();
  },
};
</script>
