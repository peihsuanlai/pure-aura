<template>
   <section :style="{ backgroundImage: `url(${banner})` }" class="page-banner reveal"
   data-origin="top">
    <h2>關於我們</h2>
  </section>
  <main>
    <section class="container-lg mb-4">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">首頁</a></li>
            <li class="breadcrumb-item active" aria-current="page">關於我們</li>
          </ol>
        </nav>
    </section>
    <section class="container-lg">
      <div class="row team-block">
        <div class="col-lg-5 reveal" data-origin="left">
          <img :src="brandIntro.imageSrc" alt="">
        </div>
        <div class="col-lg-5 reveal" data-origin="right">
          <div class="content">
            <h2 v-text="brandIntro.title"></h2>
            <p v-html="brandIntro.text"></p>
          </div>
        </div>
      </div>
      <div class="row gallery-list reveal">
        <div class="col-lg-4" v-for="(item,index) in gallery" :key="'gallery'+(index+1)">
          <img :src="item.src" alt="">
        </div>
      </div>
      <div class="contact-block">
        <div class="text-center">
          <h2 v-text="contactInfo.title" class="reveal" data-origin="top"></h2>
          <p v-html="contactInfo.text" class="reveal" data-origin="top"></p>
        </div>
        <VeeForm class="row justify-content-center g-3 reveal"
        @submit="sendMessage" v-slot="{ errors }">
          <div class="col-md-5">
            <label for="name" class="form-label"><span class="text-danger">*</span>姓名</label>
            <VeeField type="text" name="姓名" class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }" id="name" rules="required"/>
            <ErrorMessage
                name="姓名"
                class="invalid-feedback"
              />
          </div>
          <div class="col-md-5">
            <label for="phone" class="form-label">聯絡電話</label>
            <input type="tel" name="phone" class="form-control" id="phone">
          </div>
          <div class="col-md-5">
            <label for="email" class="form-label"><span class="text-danger">*</span>電子信箱</label>
            <VeeField type="email" name="電子信箱" class="form-control"
            :class="{ 'is-invalid': errors['電子信箱'] }" id="email" rules="email|required"/>
            <ErrorMessage
                name="電子信箱"
                class="invalid-feedback"
              />
          </div>
          <div class="col-md-5">
            <label for="type" class="form-label"><span class="text-danger">*</span>項目</label>
            <VeeField name="諮詢項目" id="type" class="form-select"
            :class="{ 'is-invalid': errors['諮詢項目'] }" as="select" rules="required">
              <option value="" disabled>-- 請選擇 --</option>
              <option value="item" v-for="(item, index) in contactInfo.typeOption" :key="index"
              v-text="item"></option>
            </VeeField>
            <error-message name="諮詢項目" class="invalid-feedback"></error-message>
          </div>
          <div class="col-md-10 mb-5">
            <label for="message" class="form-label">留言內容</label>
            <textarea name="message" id="message" rows="10" class="form-control" ></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="confirm-btn">送出</button>
          </div>
        </VeeForm>
      </div>
    </section>
  </main>
</template>

<script>
import { showSuccessAlert } from '@/methods/alertHelper';

const { BASE_URL } = import.meta.env;

export default {
  data() {
    return {
      banner: `${BASE_URL}images/about-banner.png`,
      brandIntro: {
        imageSrc: `${BASE_URL}images/team.png`,
        title: '親近自然、共享純粹',
        text: '在忙碌與壓力交織的現代生活中，PURE AURA 致力於為您打造一片靜謐的避風港。我們的每一款產品，皆嚴選天然原料，融合大地的純粹與清新，期許每一位顧客都能擁抱自然的溫柔氣息，營造品味與質感兼具的生活氛圍。<br><br>我們相信，放鬆不僅是一種感受，更是一種生活態度。<br><br>PURE AURA 團隊熱愛自然，時常走入山林與大地，感受自然的力量，並將這份真摯的感動融入每一項產品之中，希望透過產品把這份自然之美傳遞給每一位珍愛生活的您。<br><br>讓 PURE AURA 成為您生活中的療癒夥伴，與您一起尋找生活的靜好片刻。',
      },
      gallery: [
        {
          src: `${BASE_URL}images/gallery1.png`,
        },
        {
          src: `${BASE_URL}images/gallery2.png`,
        },
        {
          src: `${BASE_URL}images/gallery3.png`,
        },
        {
          src: `${BASE_URL}images/gallery4.png`,
        },
        {
          src: `${BASE_URL}images/gallery5.png`,
        },
        {
          src: `${BASE_URL}images/gallery6.png`,
        },
      ],
      contactInfo: {
        title: '與我們聯繫',
        text: '您的支持是我們持續進步最大的動力，我們會持續研發更貼近生活需求的產品，<br>若有任何問題或建議，請不吝與我們分享指教。<br>訂單相關問題，請直接於訂單處留言，或直接聯繫客服，將有專人為您服務。<br>不方便來電，可以透過下方表單留言，我們會於 2 個工作天內回覆您。<br>上班時間：周一至周五 09:00~18:00',
        typeOption: [
          '商品建議', '訂單問題', '合作洽談', '其他'],
      },
    };
  },
  methods: {
    sendMessage() {
      showSuccessAlert('您的留言已送出', true);
    },
  },
};
</script>
