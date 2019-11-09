<template>
  <div class="news page">
    <div>
      <h1>{{ newsText }}</h1>
      <br><br>
    </div>
    <div class="news-list">
        {{news}}
    
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import prepareQueryParamsMixin from '../../mixins/prepareQueryParamsMixin'
import prepareFetchParamsMixin from '../../mixins/prepareFetchParamsMixin'

import DataBox from '../../components/DataBox'

export default {
  name: 'NewsPage',
  mixins: [prepareQueryParamsMixin, prepareFetchParamsMixin],
  components: {
    DataBox
  },

  props: {
    limit: { type: Number },
    page: { type: Number }
  },

  watch: {
    'pagination.limit': function () {
      this.$router.replace({
        query: this.useInUrlQueryPropList
      })
      this.fetchData()
    },
    'pagination.page': function () {
      this.$router.replace({
        query: this.useInUrlQueryPropList
      })
      this.fetchData()
    },
    limit: {
      handler: function (newVal) {
        this.$store.commit('news/SET_PAGINATION', { limit: newVal })
      },
      immediate: true
    },
    page: {
      handler: function (newVal) {
        this.$store.commit('news/SET_PAGINATION', { page: newVal })
      },
      immediate: true
    }
  },

  data () {
    return {
      newsText: 'NewsPage2 Component'
    }
  },

  methods: {
    fetchData () {
      this.$store.dispatch('news/getListPublicById', { params: this.fetchParams })
    }
  },
   
  computed: {
      
    ...mapState('news', {
      news: 'items2',
      pagination: 'pagination',
      error: 'error',
      loading: 'loading'
    }),
    ...mapGetters('news', [
      'isEmpty'
    ]),
    useInUrlQueryPropList () {
      return this.prepareQueryParamsMixin({
        limit: this.pagination.limit,
        page: this.pagination.page
      })
    },
    fetchParams () {
      const pagination = this.prepareFetchParamsMixin({
        limit: this.pagination.limit,
        page: this.pagination.page
      })
      const params = {
          id: this.$route.params.id
      }

      return params
    }
  },

  created () {
      console.log("ID: "+this.$route.params.id)
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
img:hover{
 // width: 50px;
}
</style>
