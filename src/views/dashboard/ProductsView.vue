<template>
    <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('new')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4 mb-5">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">推薦指數</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">上下架</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{item.category}}</td>
              <td>{{item.title}}</td>
              <td>{{item.star}}</td>
              <td>{{item.origin_price}}</td>
              <td>{{item.price}}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">上架</span>
                <span v-else>下架</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit',item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete',item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationComponent :pages="pagination" @switch-page="getProducts"></PaginationComponent>
    </div>
    <LoadingOverlay v-model:active="isLoading"/>
    <ProductModal
      :product="tempProduct"
      :is-new="isNew"
      @update="getProducts" ref="modalProduct"
    ></ProductModal>
    <DeleteModal
      :product="tempProduct"
      :is-new="isNew"
      @update="getProducts" ref="modalDelete"
    ></DeleteModal>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '../../components/PaginationComponent.vue';
import ProductModal from '../../components/ProductModal.vue';
import DeleteModal from '../../components/DeleteModal.vue';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: null,
      pagination: {},
      isLoading: true,
    };
  },
  methods: {
    getProducts(page = 1) {
      axios
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/products?page=${page}`)
        .then((res) => {
          // console.log(res);
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          this.isLoading = false;
        })
        .catch(() => {
          // alert(err.data.message);
          // location.href = "index.html";
        });
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.modalProduct.openModal();
        // productModal.show();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.modalProduct.openModal();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        this.$refs.modalDelete.openModal();
        // deleteModal.show();
      }
    },
  },
  components: {
    ProductModal,
    PaginationComponent,
    DeleteModal,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;
    this.getProducts();
  },
};
</script>
