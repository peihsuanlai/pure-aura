<template>
    <RouterLink :to="{ name: 'Product', params: { id: product.id } }" class="item">
        <div class="img" :style="{ backgroundImage: `url(${product.imageUrl})` }">
            <div class="overlay">
                <div>查看細節</div>
            </div>
        </div>
        <h4 class="product-title" v-text="product.title"></h4>
        <div class="price">
            <span class="original-price" v-text="'NT$' + $filter.currency(product.origin_price)">
            </span>
            <span class="offer-price" v-text="'NT$' + $filter.currency(product.price)"></span>
        </div>
    </RouterLink>
    <button type="button" class="add-btn" @click="addToCart(product.id)">
        <i class="bi bi-cart3"></i> 加入購物車
    </button>
</template>

<script>

import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
  },
};

</script>
