<template>
    <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary text-white" @click="openModal('new')">
          建立新的優惠券
        </button>
      </div>
      <table class="table mt-4">
        <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in coupons" :key="item.key">
          <td v-text="item.title"></td>
          <td v-text="item.percent"></td>
          <td v-text="$filter.date(item.due_date)"></td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm"  @click="openModal('delete', item)"
              >刪除</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <PaginationComponent :pages="pagination" @switch-page="getOrders"></PaginationComponent>
    </div>
    <LoadingOverlay v-model:active="isLoading"/>
    <DeleteModal ref="modalDelete" :item="tempCoupon"
     @update="getCoupons" :type="type"></DeleteModal>
    <CouponModal ref="modalCoupon" :coupon="tempCoupon" :is-new="isNew"
     @update="getCoupons"></CouponModal>
  </template>
<script>
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal.vue';
import CouponModal from '../../components/CouponModal.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      type: 'coupon',
      coupons: [],
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      // 透過 props 傳到內層，內層透過 coupon 來接收
      isNew: null,
      isLoading: true,
    };
  },
  components: {
    DeleteModal,
    CouponModal,
    PaginationComponent,
  },
  methods: {
    getCoupons(page = 1) {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupons?page=${page}`).then((res) => {
        this.isLoading = false;
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        // 取得當前時間戳(毫秒) 除以 1000 變秒
        this.tempCoupon = { due_date: new Date().getTime() / 1000 };
        this.isNew = true;
        this.$refs.modalCoupon.openModal();
      } else if (isNew === 'edit') {
        this.tempCoupon = { ...item };
        this.isNew = false;
        this.$refs.modalCoupon.openModal();
      } else if (isNew === 'delete') {
        this.tempCoupon = { ...item };
        this.$refs.modalDelete.openModal();
      }
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
