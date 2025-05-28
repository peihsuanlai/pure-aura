<template>
  <main class="cart-page no-banner">
    <!-- 購物車列表 -->
     <div class="container-lg">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">首頁</a></li>
            <li class="breadcrumb-item active" aria-current="page">購物車</li>
          </ol>
        </nav>
        <h2 class="reveal" data-origin="top">購物車</h2>
        <div class="row justify-content-center mb-5 reveal" data-origin="top">
          <div class="col-lg-7">
            <div class="row step-list">
              <div class="col">
                <div class="item">
                  <div class="step d-flex flex-column align-items-center">
                    <span>STEP</span>
                    <span>1</span>
                  </div>
                  <h5>確認訂單</h5>
                </div>
              </div>
              <div class="col" :class="{'active' : !order.is_paid}">
                <div class="item">
                  <div class="step d-flex flex-column align-items-center"
                   :class="{'active' : !order.is_paid}">
                    <span>STEP</span>
                    <span>2</span>
                  </div>
                  <h5>結帳付款</h5>
                </div>
              </div>
              <div class="col">
                <div class="item">
                  <div class="step d-flex flex-column align-items-center"
                  :class="{'active' : order.is_paid}">
                    <span>STEP</span>
                    <span>3</span>
                  </div>
                  <h5>訂單完成</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="cart-table reveal">
            <thead>
                <tr>
                  <th>圖片</th>
                  <th>品項</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>總價</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="order.products">
                  <tr v-for="item in order.products" :key="item.id">
                      <td data-th="圖片"><div class="img"
                        :style="{ backgroundImage: `url(${item.product.imageUrl})` }"></div></td>
                      <td data-th="品項" v-text="item.product.title"></td>
                      <td data-th="單價" v-text="'NT$' + $filter.currency(item.product.price)"></td>
                      <td data-th="數量">
                          <span v-text="item.qty"></span>
                      </td>
                      <td data-th="總價">
                        <div v-text="'NT$' + $filter.currency(item.total)"
                         :class="{'text-decoration-line-through':
                        item.final_total !== item.total}"></div>
                        <div v-if="item.final_total !== item.total" class="text-danger">
                          <span>折扣後：</span>
                          <span v-text="'NT$' + $filter.currency(item.final_total)"></span>
                        </div>
                      </td>
                  </tr>
                </template>
            </tbody>
        </table>
        <div class="total-summary mb-5 reveal">
            <div class="d-flex justify-content-between fw-bold">
              <span>應付總額</span>
              <span v-text="'NT$' + $filter.currency(order.total)"></span>
            </div>
        </div>
        <div class="order-info reveal">
          <h4>訂購資訊</h4>
          <div v-if="order.is_paid">
            <span>訂單編號</span>
            <span v-text="order.id"></span>
          </div>
          <div>
            <span>姓名</span>
            <span v-text="order.user.name"></span>
          </div>
          <div>
            <span>信箱</span>
            <span v-text="order.user.email" style="word-break: break-all;"></span>
          </div>
          <div>
            <span>電話</span>
            <span v-text="order.user.tel"></span>
          </div>
          <div>
            <span>地址</span>
            <span v-text="order.user.address"></span>
          </div>
          <div v-if="order.message">
            <span>備註</span>
            <span v-text="order.message"></span>
          </div>
          <div>
            <span>付款狀態</span>
            <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </div>
        </div>
        <div class="text-center reveal" v-if="!order.is_paid" style="margin-top:60px;">
          <button type="button" class="cta-btn" @click="payOrder">確認付款</button>
        </div>
    </div>
  </main>
  <LoadingOverlay v-model:active="isLoading"/>
</template>

<script>
import axios from 'axios';
import { showErrorAlert } from '@/methods/alertHelper';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      isLoading: true,
    };
  },
  methods: {
    getOrder() {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/order/${this.orderId}`)
        .then((res) => {
          this.isLoading = false;
          this.order = res.data.order;
        })
        .catch(() => {
          showErrorAlert();
        });
    },
    payOrder() {
      this.isLoading = true;
      axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/pay/${this.orderId}`)
        .then(() => {
          this.isLoading = false;
          this.getOrder();
        })
        .catch(() => {
          showErrorAlert();
        });
    },
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
