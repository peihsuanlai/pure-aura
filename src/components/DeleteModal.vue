<template>
  <div id="delItemModal" ref="delItemModal" class="modal fade" tabindex="-1"
           aria-labelledby="delItemModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="delItemModalLabel" class="modal-title">
            <span>刪除 (刪除後將無法恢復)</span>
          </h5>
          <button type="button" class="btn text-white"
          data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="modal-body">
          確定刪除
          <strong class="text-danger">{{item.title ? item.title : "該筆訂單"}}</strong>。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
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
  props: ['item', 'type'],
  data() {
    return {
      delModal: null,
    };
  },
  inject: ['emitter'],
  methods: {
    deleteData() {
      axios
        .delete(
          `${VITE_API_URL}/api/${VITE_API_PATH}/admin/${this.type}/${this.item.id}`,
        )
        .then(() => {
          this.closeModal();
          this.$emit('update');
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除成功',
          });
        })
        .catch(() => {
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
    this.delModal = new Modal(this.$refs.delItemModal);
  },
};
</script>
