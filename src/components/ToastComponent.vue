<template>
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
        <div class="toast-header">
            <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
            <strong class="me-auto" v-text="msg.title"></strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
        <div class="toast-body" v-if="msg.content" v-text="msg.content"></div>
    </div>
</template>
<script>
import { Toast } from 'bootstrap';

export default {
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    const toastElement = this.$refs.toast;
    const toast = new Toast(toastElement, {
      delay: 2000,
    });
    toast.show();
  },
};
</script>
