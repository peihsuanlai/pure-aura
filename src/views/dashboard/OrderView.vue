<template>
    <div class="container">
        <table class="table mt-4">
          <thead>
          <tr>
            <th>時間</th>
            <th>姓名</th>
            <th>信箱</th>
            <th>品項</th>
            <th>總金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
          </thead>
          <tbody>
            <template v-for="(item, key) in orders" :key="key">
              <tr v-if="orders.length">
                <td v-text="$filter.date(item.create_at)"></td>
                <td v-if="item.user"><span v-text="item.user.name"></span></td>
                <td v-if="item.user"><span v-text="item.user.email"></span></td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="(product, i) in item.products" :key="i">
                      {{ product.product.title }} 數量：{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td v-text="$filter.currency(item.total)"></td>
                <td>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" :id="`paidSwitch-${item.id}`"
                           v-model="item.is_paid"
                           @change="updatePaid(item)">
                    <label class="form-check-label" :for="`paidSwitch-${item.id}`">
                      <span v-if="item.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm"
                            @click="openModal('view', item)">檢視</button>
                    <button class="btn btn-outline-danger btn-sm"
                            @click="openModal('delete', item)"
                    >刪除</button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <PaginationComponent :pages="pagination" @switch-page="getOrders"></PaginationComponent>
    </div>
    <LoadingOverlay v-model:active="isLoading"/>
    <OrderModal :order="tempOrder" ref="modalOrder"></OrderModal>
    <DeleteModal :item="tempOrder" :type="type" ref="modalDelete" @update="getOrders"></DeleteModal>
</template>
<script>
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal.vue';
import OrderModal from '../../components/OrderModal.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      type: 'order',
      orders: [],
      pagination: {},
      isLoading: true,
      tempOrder: {},
      currentPage: 1,
    };
  },
  methods: {
    getOrders(page = 1) {
      this.currentPage = page;
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        });
    },
    openModal(type, item) {
      this.tempOrder = { ...item };
      if (type === 'view') {
        this.$refs.modalOrder.openModal();
      } else if (type === 'delete') {
        this.$refs.modalDelete.openModal();
      }
    },
    updatePaid(item) {
      const paid = {
        is_paid: item.is_paid,
      };
      axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/order/${item.id}`, { data: paid })
        .then(() => {
          this.isLoading = false;
          this.getOrders(this.currentPage);
          this.emitter.emit('push-message', {
            style: 'success',
            title: '付款狀態已更新',
          });
        });
    },
  },
  inject: ['emitter'],
  components: {
    DeleteModal,
    OrderModal,
    PaginationComponent,
  },
  mounted() {
    this.getOrders();
  },
};
</script>
