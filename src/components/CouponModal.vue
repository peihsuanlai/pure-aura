<template>
    <div class="modal fade" id="couponModal" ref="couponModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="btn text-white"
              data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                     placeholder="請輸入標題" v-model="tempCoupon.title">
            </div>
            <div class="mb-3">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code"
                     placeholder="請輸入優惠碼" v-model="tempCoupon.code">
            </div>
            <div class="mb-3">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date">
            </div>
            <div class="mb-3">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
              placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                       :true-value="1"
                       :false-value="0"
                       id="is_enabled"
                       v-model="tempCoupon.is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary text-white"
            @click="updateData">確認</button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>

import axios from 'axios';
import { Modal } from 'bootstrap';
import { showSuccessToast, showErrorToast } from '@/methods/toastHelper';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
export default {
  props: {
    // 外層 tempCoupon 傳進來的資料透過 props coupon 接收
    coupon: {
      // 預期傳進來是物件型別
      type: Object,
      // 如果沒有正確傳入，則給予預設值
      default: () => ({}),
    },
    isNew: {
      type: Boolean,
    },
  },
  data() {
    return {
      couponModal: null,
      // 作為外層資料的接收
      tempCoupon: {},
      due_date: '',
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // 將 due_date 轉成符合 Modal 的格式（yyyy-mm-dd)
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      // eslint-disable-next-line prefer-destructuring
      this.due_date = dateAndTime[0];
    },
    due_date() {
      // 將 due_date 轉成適合父元件儲存的格式（1695427200） 所以要除 1000 回來
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  methods: {
    updateData() {
      let apiUrl = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon/${this.coupon.id}`;
      let http = 'put';
      if (this.isNew) {
        apiUrl = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon`;
        http = 'post';
      }
      axios[http](apiUrl, { data: this.tempCoupon })
        .then(() => {
          this.$emit('update');
          showSuccessToast();
        })
        .catch((err) => {
          showErrorToast(err);
        });
      this.closeModal();
    },
    openModal() {
      this.couponModal.show();
    },
    closeModal() {
      this.couponModal.hide();
    },
  },
  mounted() {
    this.couponModal = new Modal(this.$refs.couponModal);
    this.tempCoupon = this.coupon;
  },
};

</script>
