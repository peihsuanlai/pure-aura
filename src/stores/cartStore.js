import { defineStore } from 'pinia';

import axios from 'axios';
import { showSuccessAlert, showErrorAlert } from '@/methods/alertHelper';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    cart: {},
    isLoading: true,
  }),
  actions: {
    getCart() {
      this.isLoading = true;
      axios
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then((res) => {
          this.isLoading = false;
          this.cart = res.data.data;
        })
        .catch(() => {
          showErrorAlert();
        });
    },
    addToCart(id, qty = 1) {
      const cart = {
        product_id: id,
        qty,
      };
      axios
        .post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data: cart })
        .then(() => {
          showSuccessAlert('商品已加入購物車', false);
          this.getCart();
        })
        .catch(() => {
          showErrorAlert();
        });
    },
  },
});
