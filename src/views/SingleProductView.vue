<template>
    <main class="single-product-page no-banner">
      <div class="container-lg mb-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">首頁</a></li>
            <li class="breadcrumb-item">
              <RouterLink to="/products">全系列商品</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page" v-text="product.title"></li>
          </ol>
        </nav>
        <div class="row top" v-if="product.title">
          <div class="col-md-7 col-lg-6">
            <ProductImageCarousel v-if="Array.isArray(product.imagesUrl)"
            :images="product.imagesUrl" />
          </div>
          <div class="col-md-5 offset-lg-1">
            <div class="py-md-3 py-lg-5 d-flex h-100 flex-column justify-content-between">
              <div>
                <h4 v-text="product.category"></h4>
                <h2 v-text="product.title"></h2>
                <div v-html="formateText(product.description)" class="des"></div>
                <div class="price">
                  <span
                    class="original-price"
                    v-text="'NT$' + $filter.currency(product.origin_price)"
                  ></span>
                  <span class="offer-price" v-text="'NT$' + $filter.currency(product.price)">
                  </span>
                </div>
                <div class="number-box mb-3">
                  <button type="button" @click="changeNum('minus')" :disabled="productNum === 1" >
                    <i class="bi bi-dash-lg"></i>
                  </button>
                  <span v-text="productNum"></span>
                  <button type="button" @click="changeNum('plus')">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
              <div class="action-btns">
                <button type="button" @click="addToCart(product.id, productNum)">
                  <i class="bi bi-cart3"></i> 加入購物車</button>
                <RouterLink to="/cart"><i class="bi bi-bag-check"></i> 直接購物</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="list-unstyled tablink">
        <li><button type="button" :class="{'active': contentType == 'intro'}"
           @click= "contentType = 'intro'">產品介紹</button></li>
        <li><button type="button" :class="{'active': contentType == 'spec'}"
          @click = "contentType = 'spec'">產品規格</button></li>
      </ul>
      <div class="container">
        <div class="tabcontent" v-html="formateText(product.content)"
         v-show="contentType =='intro'"></div>
        <div class="tabcontent" v-html="formateText(product.spec)"
         v-show="contentType == 'spec'"></div>
      </div>
      <LoadingOverlay v-model:active="isLoading"/>
    </main>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import cartStore from '../stores/cartStore';
import ProductImageCarousel from '../components/ProductImageCarousel.vue';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {},
      productId: null,
      contentType: 'intro',
      productNum: 1,
      isLoading: true,
    };
  },
  methods: {
    formateText(str) {
      return (str || '').replace(/\n/g, '<br>');
    },
    changeNum(direction) {
      if (direction === 'minus') {
        this.productNum -= 1;
      } else if (direction === 'plus') {
        this.productNum += 1;
      }
    },
    getProduct(id) {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.product;
        })
        .catch(() => {
        });
    },
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
    ...mapActions(cartStore, ['addToCart']),
  },
  components: { ProductImageCarousel },
  mounted() {
    this.productId = this.$route.params.id;
    this.getProduct(this.productId);
  },
};
</script>
