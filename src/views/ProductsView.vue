<template>
   <section style="background-image:url('/images/product-banner.png')" class="page-banner">
    <h2>全系列商品</h2>
  </section>
  <main>
    <div class="container-lg">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">首頁</a></li>
          <li class="breadcrumb-item">
            <RouterLink to="/products">全系列商品</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page" v-text="currentCategory"></li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-3">
          <div class="left-menu mb-4 mb-lg-0">
            <a href="#" class="menu-switch" @click.prevent="toggleMenu">分類
              <i class="bi bi-chevron-right arrow-icon"
              :class="[isRotated ? 'rotate' :'']"></i></a>
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
        <div class="col-lg-9 product-page">
          <div class="row product-list mb-5">
            <div class="col-sm-6 col-lg-4" v-for="item in products" :key="item.id">
              <RouterLink :to="{ name: 'Product', params: { id: item.id } }" class="item">
                    <div
                      class="img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    >
                      <div class="overlay">
                        <div>查看細節</div>
                      </div>
                    </div>
                    <h4 v-text="item.title"></h4>
                    <div class="price">
                      <span
                        class="original-price"
                        v-text="'NT$' + $filter.currency(item.origin_price)"
                      ></span>
                      <span class="offer-price" v-text="'NT$' + $filter.currency(item.price)">
                      </span>
                    </div>
              </RouterLink>
              <button type="button" class="add-btn" @click="addToCart(item.id)">
                <i class="bi bi-cart3"></i> 加入購物車
              </button>
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
import { mapActions } from 'pinia';
import cartStore from '../stores/cartStore';
import PaginationComponent from '../components/PaginationComponent.vue';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
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
    getCategory() {
      axios
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
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
        });
    },
    ...mapActions(cartStore, ['addToCart']),
    // addToCart(id, qty = 1) {
    //   const cart = {
    //     product_id: id,
    //     qty,
    //   };
    //   axios
    //     .post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data: cart })
    //     .then(() => {
    //       Swal.fire({
    //         title: '商品已加入購物車',
    //         icon: 'success',
    //         timer: 1500,
    //         showConfirmButton: false,
    //       });
    //     })
    //     .catch(() => {
    //     });
    // },
  },
  watch: {
    '$route.query.category': {
      handler(newCategory) {
        this.getProducts(1, newCategory || '');
      },
    },
  },
  components: {
    PaginationComponent,
  },
  mounted() {
    this.getCategory();
  },
  created() {
    this.getProducts(1, this.$route.query.category || '');
  },
};
</script>
