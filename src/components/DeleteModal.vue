<template>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
           aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{product.title}}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="deleteData">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  props: ['product', 'isNew'],
  data() {
    return {
      delModal: null,
    };
  },
  methods: {
    deleteData() {
      axios
        .delete(
          `${VITE_API_URL}/api/${VITE_API_PATH}/admin/product/${this.product.id}`,
        )
        .then(() => {
        // alert(res.data.message);
          this.closeModal();
          this.$emit('update');
        })
        .catch(() => {
        // alert(err.data.message);
        });
    },
    openModal() {
      this.delModal.show();
    },
    closeModal() {
      this.delModal.hide();
    },
  },
  mounted() {
    this.delModal = new Modal(this.$refs.delProductModal);
  },
};
</script>
