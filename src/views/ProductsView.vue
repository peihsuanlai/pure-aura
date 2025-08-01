<template>
   <section :style="{ backgroundImage: `url(${banner})` }" class="page-banner reveal"
   data-origin="top">
    <h2>全系列商品</h2>
  </section>
  <main class="reveal">
    <div class="container-lg">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">首頁</a></li>
          <li class="breadcrumb-item">
            <RouterLink to="/products">全系列商品</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page" v-text="currentCategory"></li>
        </ol>
      </nav>
      <div class="row product-page">
        <div class="col-lg-3">
          <div class="left-menu mb-4 mb-lg-0">
            <a href="#" class="menu-switch" @click.prevent="toggleMenu">分類
              <i class="bi bi-chevron-right arrow-icon"
              :class="[isRotated ? 'rotate' :'']"></i></a>
            <div class="menu-list-container">
              <ul class="mb-0 list-unstyled menu-list d-lg-block"
              :class="[isMenuVisible ? 'd-none' :'']">
                <li>
                  <a href="#" @click.prevent="getProducts(1)"
                  :class="{'active' : currentCategory === '全系列商品'}">全系列商品</a>
                </li>
                <li v-for="(item, index) in menu" :key="'category'+ (index+1)">
                  <a href="#" :class="{'active' : currentCategory === item}"
                  v-text="item" @click.prevent="getProducts(1, item)"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row product-list mb-5">
            <div class="col-sm-6 col-lg-4" v-for="item in products" :key="item.id">
              <ProductComponent :product="item"></ProductComponent>
            </div>
          </div>
          <PaginationComponent :pages="pagination" @switch-page="getProducts"></PaginationComponent>
        </div>
      </div>
    </div>
    <LoadingOverlay v-model:active="isLoading"/>
  </main>
</template>

<script>
import axios from 'axios';
import ProductComponent from '@/components/ProductComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { showErrorAlert } from '@/methods/alertHelper';

const { VITE_API_URL, VITE_API_PATH, BASE_URL } = import.meta.env;
export default {
  data() {
    return {
      banner: `${BASE_URL}images/product-banner.png`,
      isMenuVisible: true,
      isRotated: false,
      menu: [],
      currentCategory: '全系列商品',
      products: [],
      pagination: {},
      isLoading: true,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
      this.isRotated = !this.isRotated;
    },
    getCategory() {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
        .then((res) => {
          const categoryList = [];
          res.data.products.forEach((item) => {
            const trimmedCate = item.category.trim();
            if (!categoryList.includes(trimmedCate)) {
              categoryList.push(trimmedCate);
              this.menu = categoryList;
            }
          });
        })
        .catch(() => {
          showErrorAlert();
        });
    },
    getProducts(page = 1, category = '') {
      this.isLoading = true;
      axios
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/products?category=${category}&page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          this.currentCategory = category || '全系列商品';
          this.isLoading = false;
        })
        .catch(() => {
          showErrorAlert();
        });
    },
  },
  watch: {
    '$route.query.category': {
      handler(newCategory) {
        this.getProducts(1, newCategory || '');
      },
      immediate: true,
    },
  },
  components: {
    PaginationComponent,
    ProductComponent,
  },
  mounted() {
    this.getCategory();
  },
};
</script>
