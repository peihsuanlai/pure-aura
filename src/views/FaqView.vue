<template>
  <section style="background-image:url('images/faq-banner.png')" class="page-banner reveal"
  data-origin="top">
    <h2>常見問題</h2>
  </section>
  <main class="reveal">
    <div class="container-lg">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">首頁</a></li>
            <li class="breadcrumb-item active" aria-current="page">常見問題</li>
          </ol>
        </nav>
    </div>
    <div class="container-lg">
      <div class="search-container mb-4 mb-md-5">
        <input type="text" placeholder="請輸入關鍵字" v-model="searchText"
        @compositionstart="compositionStatus = true" @compositionend="compositionStatus = false"
        @keyup.enter="searchHandler">
        <button @click="searchHandler">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="row mb-5">
        <div class="col-lg-3">
          <div class="left-menu mb-4 mb-lg-0">
            <a href="#" class="menu-switch" @click.prevent="toggleMenu">分類
              <i class="bi bi-chevron-right arrow-icon"
              :class="{'rotate': menuOpen }"></i></a>
            <ul class="mb-0 list-unstyled menu-list d-lg-block"
            :class="{'d-none': !menuOpen }">
              <li v-for="(item, index) in menu" :key="'category'+ (index+1)">
                <a href="#" :class="{'active' : currentCategory === item}"
                v-text="item" @click.prevent="currentCategory = item"></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="accordion" id="myAccordion">
            <div class="accordion-item" v-for="(item, index) in filteredQuestions"
            :key="'item'+index">
              <h2 class="accordion-header" :id="'heading'+ index">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                :data-bs-target="'#collapse'+index"
                :class="['accordion-button', {'collapsed': index != 0 }]"
                v-text="'Q'+ (index+1)+ '. '+ item.question">
                </button>
              </h2>
              <div :id="'collapse'+index" data-bs-parent="#myAccordion"
              :class="['accordion-collapse','collapse', { 'show': index == 0 }]">
                <div class="accordion-body" v-text="item.answer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      menu: ['全部', '商品購物', '訂單問題', '退換貨政策'],
      questions: [
        {
          question: '下單後多久可以收到商品呢？',
          answer: '下單後1-2個工作天即會出貨（工作日不包含週六、週日及國定假日）。',
          category: '商品購物',
        },
        {
          question: '有哪些付款方式？',
          answer: '我們提供多樣化的付款方式，現金、信用卡(VISA、萬事達卡、JCB、美國運通卡)、Apple pay、Google pay、Samsung pay、LINE Pay、全支付、悠遊卡、悠遊付、街口支付均有接受，線上與實體店同步。',
          category: '商品購物',
        },
        {
          question: '顯示售完的商品還會再補貨嗎？',
          answer: '常態商品會盡快補貨上架，檔期限量商品皆為售完不再追加，想知道最新補貨消息記得追蹤我們的官方IG及FB動態唷！',
          category: '商品購物',
        },
        {
          question: '寄送海外可以提供送貨編號嗎？',
          answer: '歡迎傳送訊息告知客服人員訂單編號或訂購人姓名，我們將盡快查詢並提供您相關資訊。',
          category: '商品購物',
        },
        {
          question: '有固定推出新品的時間嗎？',
          answer: '香氛、精油等產品在前期開發及後續實用測試皆需較長的時間，目前無固定排程上新品。不想遺漏任何新品資訊可追蹤我們的社群，最新消息以IG、FB的公告為主。',
          category: '商品購物',
        },
        {
          question: '會員消費累積的點數，線上和實體店面都可使用嗎？',
          answer: '是的，線上消費可以選擇要折抵的點數，線下消費可以報電話累積點數並使用',
          category: '商品購物',
        },
        {
          question: '如何知道商品是否已出貨？',
          answer: '訂單狀態更新為『已確認』後，即表示物流人員已將您的商品出貨，恕無法中斷流程且沒有修改商品明細、拆併訂單、付款方式及配送方式之服務，請您結帳前務必確認訂單內容後再送出。',
          category: '訂單問題',
        },
        {
          question: '如何取消訂單？',
          answer: '如欲取消訂單，請於訂單狀態顯示『處理中』時，盡快與客服聯繫說明欲取消此筆訂單，若訂單已進入出貨流程恕無法取消。',
          category: '訂單問題',
        },
        {
          question: '可否於訂單付款完成後，進行商品明細之變更？',
          answer: '線上購物付款完成後，將無法再進行訂單商品明細的變更，如需查詢，請與客服人員聯繫或登入官網會員進行查詢。',
          category: '訂單問題',
        },
        {
          question: '如果我訂錯商品或是對商品不滿意，請問我可以在線上直接換購其他商品嗎？',
          answer: '目前尚未提供線上直接變更訂單內容、或是退補差額換購其它商品之服務，請見諒。',
          category: '訂單問題',
        },
        {
          question: '收到商品後，是否提供鑑賞期服務？',
          answer: '消費者保護法所規定的鑑賞期屬於「猶豫期」而非「試用期」。從商品抵達您手上開始即擁有7天商品鑑賞期（含假日），鑑賞期會從您取件後隔天開始計算第一天。如有退貨需求，請於收到商品7天內於官網聯繫客服人員，並提供「姓名」、「訂單編號」、「連絡信箱」、「退貨原因及商品照片」等資料，客服人員收到後會協助您後續作業。',
          category: '退換貨政策',
        },
        {
          question: '退換貨需要自行負擔運費嗎？',
          answer: '若因商品瑕疵、商品錯誤需退換貨，客服人員會協助提供7-11退貨便單號，您可將商品包裝完整後攜至任一7-11門市寄出，或是我們派快遞到府向您收件，您無須負擔任何費用；若因下單錯誤、不符所需等個人因素申請退貨，則須由消費者自行將商品寄回，負擔物流之費用，待客服人員確認收到退回之商品無誤後，會立即為您辦理退款手續，或重新寄出正確商品。',
          category: '退換貨政策',
        },
        {
          question: '我已經將商品退貨完成，請問何時才會將貨款退還給我？',
          answer: '我們會於收回商品確認無誤後，於14個工作日內將款項退回你當初付款的支付方式中，若退款處理時程已超過當期帳單結帳日，將延至下一期帳單退款。',
          category: '退換貨政策',
        },
        {
          question: '我要如何知道退貨的進度？',
          answer: '請來信或致電客服，告知我們你的訂單編號，將會有專人幫你確認退貨的流程及進度。',
          category: '退換貨政策',
        },
        {
          question: '我是使用線上刷卡的方式進行購買，請問退款是直接退到我的信用卡帳戶嗎？',
          answer: '是的，我們會直接將款項刷退至你當初付款的信用卡帳戶中；另由於退款需作業時間，因此會佔用你的信用卡額度，實際額度返還的時程請與你的持卡銀行確認。',
          category: '退換貨政策',
        },
      ],
      currentCategory: '全部',
      compositionStatus: 'false',
      searchText: '',
      finalSearch: '',
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    searchHandler() {
      if (this.compositionStatus) return;
      this.finalSearch = this.searchText.trim();
    },
  },
  computed: {
    filteredQuestions() {
      if (this.finalSearch) {
        return this.questions.filter((item) => item.question.includes(this.finalSearch)
        || item.answer.includes(this.finalSearch));
      }
      return this.currentCategory === '全部' ? this.questions : this.questions.filter((item) => item.category === this.currentCategory);
    },
  },
};
</script>
