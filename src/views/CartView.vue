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
        <h2 claas="reveal" data-origin="top">購物車</h2>
        <div class="row justify-content-center mb-5 reveal" data-origin="top">
          <div class="col-lg-7">
            <div class="row step-list">
              <div class="col active">
                <div class="item">
                  <div class="step active d-flex flex-column align-items-center">
                    <span>STEP</span>
                    <span>1</span>
                  </div>
                  <h5>確認訂單</h5>
                </div>
              </div>
              <div class="col">
                <div class="item">
                  <div class="step d-flex flex-column align-items-center">
                    <span>STEP</span>
                    <span>2</span>
                  </div>
                  <h5>結帳付款</h5>
                </div>
              </div>
              <div class="col">
                <div class="item">
                  <div class="step d-flex flex-column align-items-center">
                    <span>STEP</span>
                    <span>3</span>
                  </div>
                  <h5>訂單完成</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center"
         style="margin-bottom: 1.5rem;">
          <h3 class="reveal mb-0">確認訂購品項</h3>
          <button type="button" class="remove-btn" @click="emptyCart"
          v-if="cart?.carts?.length > 0">清空購物車</button>
        </div>
        <table class="cart-table reveal" :class="{'mb-4': cart?.carts?.length === 0}">
            <thead>
                <tr>
                  <th>圖片</th>
                  <th>品項</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>總價</th>
                  <th>刪除</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="cart.carts?.length > 0">
                  <tr v-for="item in cart.carts" :key="item.id">
                      <td data-th="圖片"><div class="img"
                        :style="{ backgroundImage: `url(${item.product.imageUrl})` }"></div></td>
                      <td data-th="品項" v-text="item.product.title"></td>
                      <td data-th="單價" v-text="'NT$' + $filter.currency(item.product.price)"></td>
                      <td data-th="數量">
                        <div class="number-box">
                          <button type="button" @click="changeNum(item,'minus')"
                          :disabled="loadingStatus.loadingItem === item.id || item.qty === 1" >
                            <i class="bi bi-dash-lg"></i>
                          </button>
                          <span v-text="item.qty"></span>
                          <button type="button" @click="changeNum(item,'plus')"
                          :disabled="loadingStatus.loadingItem === item.id">
                            <i class="bi bi-plus-lg"></i>
                          </button>
                        </div>
                      </td>
                      <td data-th="總價">
                        <div v-text="'NT$' + $filter.currency(item.total)"
                         :class="{'text-decoration-line-through':
                         item.final_total !== item.total}"></div>
                        <div v-if="item.final_total !== item.total">
                          <span>折扣後：</span>
                          <span v-text="'NT$' + $filter.currency(item.final_total)"></span>
                        </div>
                      </td>
                      <td data-th="刪除">
                        <button type="button" class="remove-btn" @click="deleteProduct(item.id)">
                          <i class="bi bi-trash3"></i>
                        </button>
                      </td>
                  </tr>
                </template>
            </tbody>
        </table>
        <div v-if="cart?.carts?.length > 0" class="total-summary mb-5 reveal">
          <div>
            <div class="text-end fw-bold">共計 <span v-text="cart?.carts?.length"></span> 項商品</div>
            <div class="d-flex justify-content-between fw-bold">
              <span>商品小計</span>
              <span v-text="'NT$' + $filter.currency(cart.total)"></span>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="radio1" value="1"
               v-model="useCoupon">
              <label class="form-check-label" for="radio1">
                使用優惠折扣碼
              </label>
            </div>
            <div class="input-group mb-3 input-group-sm" v-show="useCoupon == 1">
              <input type="text" class="form-control" placeholder="請輸入折扣碼" v-model="couponCode">
              <button type="button" class="btn btn-primary text-white" @click="applyCoupon">
                套用折扣碼
              </button>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="radio2" value="0"
              v-model="useCoupon">
              <label class="form-check-label" for="radio2">
                取消任何折扣
              </label>
            </div>
            <div class="d-flex justify-content-between border-bottom pb-3 mb-3 fw-bold">
              <span>折扣</span>
              <span v-text="'-NT$' + $filter.currency(discount)"></span>
            </div>
            <div class="d-flex justify-content-between fw-bold">
              <span>應付總額</span>
              <span v-text="'NT$' + $filter.currency(cart.final_total)"></span>
            </div>
          </div>
        </div>
        <h3 class="reveal">填寫訂購資料</h3>
        <div class="mt-5 reveal">
            <VeeForm
              ref="form"
              class="row justify-content-center"
              v-slot="{ errors }"
              @submit="sendOrder"
            >
             <div class="col-lg-5 mb-3">
                <label for="name" class="form-label">姓名</label>
                <VeeField
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  rules="required" v-model="form.user.name"
                />
                <ErrorMessage
                  name="姓名"
                  class="invalid-feedback"
                />
              </div>
              <div class="col-lg-5 mb-3">
                <label for="email" class="form-label">信箱</label>
                <VeeField
                  id="email"
                  name="信箱"
                  type="email"
                  class="form-control"
                  rules="email|required"
                  :class="{ 'is-invalid': errors['信箱'] }" v-model="form.user.email"
                />
                <ErrorMessage
                  name="信箱"
                  class="invalid-feedback"
                />
              </div>
              <div class="col-lg-5 mb-3">
                <label for="tel" class="form-label">電話</label>
                <VeeField
                  id="tel"
                  name="電話"
                  type="tel"
                  class="form-control"
                  :rules="isPhone"
                  :class="{ 'is-invalid': errors['電話'] }" v-model="form.user.tel"
                />
                <ErrorMessage
                  name="電話"
                  class="invalid-feedback"
                />
              </div>
              <div class="col-lg-5 mb-3">
                <label for="address" class="form-label">地址</label>
                <VeeField
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  rules="required" v-model="form.user.address"
                />
                <ErrorMessage
                  name="地址"
                  class="invalid-feedback"
                />
              </div>
              <div class="col-lg-10 mb-5">
                <label for="message" class="form-label">備註</label>
                <textarea
                  id="message"
                  class="form-control"
                  cols="30"
                  rows="10" v-model="form.message"
                ></textarea>
              </div>
              <div class="text-center">
                <button type="submit" class="cta-btn"
                :disabled="cart?.carts?.length === 0">確認</button>
              </div>
            </VeeForm>
        </div>
    </div>
  </main>
  <LoadingOverlay v-model:active="isLoading"/>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import { showSuccessAlert, showErrorAlert } from '@/methods/alertHelper';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: '',
      },
      useCoupon: null,
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    changeNum(item, direction) {
      this.loadingStatus.loadingItem = item.id;
      const targetItem = this.cart.carts.find((i) => i.id === item.id);
      if (!targetItem) return;

      if (direction === 'minus') {
        targetItem.qty -= 1;
      } else if (direction === 'plus') {
        targetItem.qty += 1;
      }
      const cart = {
        product_id: item.product_id,
        qty: targetItem.qty,
      };
      axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${item.id}`, { data: cart })
        .then(() => {
          this.loadingStatus.loadingItem = '';
          this.getCart();
        })
        .catch(() => {
          showErrorAlert();
        });
    },
    deleteProduct(id) {
      Swal.fire({
        title: '確定刪除此商品？',
        showCancelButton: true,
        confirmButtonText: '是，刪除',
        cancelButtonText: '取消',
        icon: 'warning',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`)
            .then(() => {
              this.getCart();
            })
            .catch(() => {
              showErrorAlert();
            });
        }
      });
    },
    applyCoupon() {
      const trimmedTCode = this.couponCode.trim();
      const coupon = {
        code: trimmedTCode,
      };
      axios
        .post(`${VITE_API_URL}/api/${VITE_API_PATH}/coupon`, { data: coupon })
        .then(() => {
          showSuccessAlert('優惠券已套用', false);
          this.getCart();
        })
        .catch(() => {
          showErrorAlert('無此優惠券', false);
        });
    },
    emptyCart() {
      Swal.fire({
        title: '確定刪除購物車內所有商品？',
        showCancelButton: true,
        confirmButtonText: '是，刪除',
        cancelButtonText: '取消',
        icon: 'warning',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/carts`)
            .then(() => {
              this.getCart();
              this.$router.push('/products');
            })
            .catch(() => {
              showErrorAlert();
            });
        }
      });
    },
    sendOrder() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/order`;
      const order = this.form;
      axios
        .post(url, { data: order })
        .then((res) => {
          this.$refs.form.resetForm();
          this.$router.push(`/checkout/${res.data.orderId}`);
        })
        .catch(() => {
          showErrorAlert();
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼';
    },
    ...mapActions(cartStore, ['getCart']),
  },
  computed: {
    discount() {
      return this.cart.total - this.cart.final_total;
    },
    ...mapState(cartStore, ['cart', 'isLoading']),
  },
  mounted() {
    this.getCart();
  },
};
</script>
