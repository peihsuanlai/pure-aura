import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min';

import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import './assets/style/all.scss';
import App from './App.vue';
import router from './router';
import { currency, date } from './methods/filter';

Object.keys(AllRules).forEach((rule) => {
  const ruleFunc = AllRules[rule];
  if (typeof ruleFunc === 'function') {
    defineRule(rule, ruleFunc);
  }
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$filter = { currency, date };
app.use(createPinia());
app.use(router);
app.component('LoadingOverlay', Loading);
app.component('VeeForm', Form);
app.component('VeeField', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
