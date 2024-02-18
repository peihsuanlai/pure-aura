<template>
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': pages.current_page === 1}">
        <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="switchPage(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        <li v-for="(item, index) in pages.total_pages" :key="index"
          class="page-item" :class="{'active': item === pages.current_page}">
            <a class="page-link" href="#" @click.prevent="switchPage(item)">{{ item }}</a>
        </li>
        <li class="page-item"
        :class="{'disabled': pages.current_page === pages.total_pages}">
            <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="switchPage(pages.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    switchPage(page) {
      this.$emit('switchPage', page);
    },
  },
};
</script>
