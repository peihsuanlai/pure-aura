<template>
    <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-6">
            <p class="h3 mb-3">登入</p>
            <form id="form" class="form-signin" @submit.prevent="login">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="username"
                 required autofocus v-model="user.username">
                <label for="username">帳號(Email)</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control"
                id="password" required v-model="user.password">
                <label for="password">密碼</label>
              </div>
              <button class="btn btn-lg btn-primary text-white w-100 mt-3" type="submit">
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
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
      user: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    ToastMessage,
  },
  provide() {
    return {
      emitter,
    };
  },
  methods: {
    login() {
      axios.post(`${VITE_API_URL}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/admin/products');
        })
        .catch(() => {
          emitter.emit('push-message', {
            style: 'danger',
            title: '登入失敗',
          });
          this.user.username = '';
          this.user.password = '';
        });
    },
  },
};
</script>
