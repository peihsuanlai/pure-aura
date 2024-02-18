<template>
    <nav>
        <RouterLink to="/admin/products">產品列表</RouterLink> |
        <RouterLink to="/admin/order">訂單</RouterLink> |
        <RouterLink to="/">回到前台</RouterLink>
        <a href="#" @click.prevent="signout">登出</a>
    </nav>
   <RouterView v-if="checkSuccess"></RouterView>
</template>

<script>
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;
export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    check() {
      axios
        .post(`${VITE_API_URL}/api/user/check`)
        .then(() => {
          this.checkSuccess = true;
          // console.log('驗證成功', res.data.success);
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    signout() {
      document.cookie = 'myToken=;expires=;';
      this.$router.push('/login');
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // console.log(token);
    axios.defaults.headers.common.Authorization = token;
    this.check();
  },
};
</script>
