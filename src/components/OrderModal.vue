<template>
    <div class="modal fade" id="orderModal" ref="orderModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單細節</span>
            </h5>
            <button type="button" class="btn text-white"
              data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <h3>收件人</h3>
                <table class="table">
                  <tbody v-if="tempOrder.user">
                    <tr>
                      <th style="width: 100px;">姓名</th>
                      <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                      <th>信箱</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-8">
                <h3>訂單細節</h3>
                <table class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>{{ $filter.date(tempOrder.create_at)}}</td>
                    </tr>
                    <tr>
                      <th>付款時間</th>
                      <td>
                        <span v-if="tempOrder.paid_date">
                          {{ $filter.date(tempOrder.paid_date) }}
                        </span>
                        <span v-else>--</span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                        <span v-else class="text-muted">尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td>
                        {{ $filter.currency(tempOrder.total) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h3>商品</h3>
                <table class="table">
                  <thead>
                    <tr>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tempOrder.products" :key="item.id">
                      <th>
                        {{ item.product.title }}
                      </th>
                      <td>
                        {{ item.qty }} {{ item.product.unit }}
                      </td>
                      <td class="text-end">
                        {{ $filter.currency(item.final_total) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light"
                    data-bs-dismiss="modal">取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import { Modal } from 'bootstrap';

export default {
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      orderModal: null,
      tempOrder: {},
    };
  },
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  methods: {
    openModal() {
      this.orderModal.show();
    },
    closeModal() {
      this.orderModal.hide();
    },
  },
  mounted() {
    this.orderModal = new Modal(this.$refs.orderModal);
    this.tempOrder = this.order;
  },
};
</script>
