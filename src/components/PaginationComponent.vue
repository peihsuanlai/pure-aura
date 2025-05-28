<template>
    <nav>
      <ul class="pagination justify-content-center">
          <li class="page-item" :class="{'disabled': pages.current_page === 1}">
          <a class="page-link" href="#" aria-label="Previous"
              @click.prevent="switchPage(pages.current_page - 1)">
              <i class="bi bi-chevron-left"></i> Prev
          </a>
          </li>
          <li v-for="(item, index) in pages.total_pages" :key="index"
            class="page-item" :class="{'active': item === pages.current_page}">
              <a class="page-link" href="#"
              @click.prevent="switchPage(item, pages.category)">{{ item }}</a>
          </li>
          <li class="page-item"
          :class="{'disabled': pages.current_page === pages.total_pages}">
              <a class="page-link" href="#" aria-label="Previous"
                  @click.prevent="switchPage(pages.current_page + 1)">
                  Next <i class="bi bi-chevron-right"></i>
              </a>
          </li>
      </ul>
    </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    switchPage(page, category) {
      this.$emit('switchPage', page, category);
    },
  },
};
</script>
