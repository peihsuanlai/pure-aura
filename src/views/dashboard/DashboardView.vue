<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <h5 class="mb-0 me-3 py-2">後台系統</h5>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
         data-bs-target="#navbarText">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/admin/products">產品列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/admin/coupons">優惠券</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/admin/orders">訂單</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/">回到前台</RouterLink>
            </li>
            <li class="nav-item">
              <a href="#" @click.prevent="signout">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   <RouterView v-if="checkSuccess"></RouterView>
   <ToastMessage></ToastMessage>
</template>

<script>
import axios from 'axios';
import emitter from '@/methods/emitter';
import ToastMessage from '@/components/ToastMessage.vue';

const { VITE_API_URL } = import.meta.env;
export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    check() {
      axios.post(`${VITE_API_URL}/api/user/check`)
        .then(() => {
          this.checkSuccess = true;
          emitter.emit('push-message', {
            style: 'success',
            title: '登入成功',
          });
        })
        .catch(() => {
          this.checkSuccess = false;
          this.$router.push('/login');
        });
    },
    signout() {
      document.cookie = 'myToken=;expires=;';
      this.$router.push('/login');
    },
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastMessage,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;
    this.check();
  },
};
</script>
