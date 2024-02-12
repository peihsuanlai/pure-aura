<template>
    <div class="container">
          <div class="row py-3">
            <div class="col-md-6">
              <h2>產品列表</h2>
              <table class="table table-hover mt-4">
                <thead>
                  <tr>
                    <th width="150">產品名稱</th>
                    <th width="120">
                      原價
                    </th>
                    <th width="120">
                      售價
                    </th>
                    <th width="150">
                      是否啟用
                    </th>
                    <th width="120">
                      查看細節
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in products" :key="item.id">
                    <td width="150">{{item.title}}</td>
                    <td width="120">
                      {{item.origin_price}}
                    </td>
                    <td width="120">
                      {{item.price}}
                    </td>
                    <td width="150">
                      <span class="text-success" v-if="item.is_enabled===1">啟用</span>
                      <span v-else>未啟用</span>
                    </td>
                    <td width="120">
                      <button type="button" class="btn btn-primary"
                      @click="showProduct(item.id)">查看細節</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>目前有<span>{{productLength}}</span>項產品</p>
              <LoadingOverlay v-model:active="isLoading"/>
            </div>
            <div class="col-md-6">
              <h2>單一產品細節</h2>
              <template v-if="temp.title">
                <div class="card mb-3">
                  <img :src="temp.imageUrl" class="card-img-top primary-image" alt="主圖">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{temp.title}}
                      <span class="badge bg-primary ms-2">{{temp.category}}</span>
                    </h5>
                    <p class="card-text">商品描述：{{temp.description}}</p>
                    <p class="card-text">商品內容：{{temp.content}}</p>
                    <div class="d-flex">
                      <p class="card-text me-2">{{temp.price}}</p>
                      <p class="card-text text-secondary"><del>{{temp.origin_price}}</del></p>
                      元 / {{temp.unit}}
                    </div>
                  </div>
                </div>
                <template v-for="(item,index) in temp.imagesUrl" :key="'image'+index">
                  <img :src="item" alt="" class="images m-2">
                </template>
              </template>
              <p class="text-secondary" v-else>請選擇一個商品查看</p>
            </div>
          </div>
        </div>
</template>

<script>
import axios from 'axios';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      temp: {},
      isLoading: true,
    };
  },
  methods: {
    getProducts() {
      axios
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch(() => {
          // alert(err.data.message);
        });
    },
    showProduct(id) {
      axios
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`)
        .then((res) => {
          this.temp = res.data.product;
        })
        .catch(() => {
          // alert(err.data.message);
        });
    },
  },
  computed: {
    productLength() {
      return Object.keys(this.products).length;
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
