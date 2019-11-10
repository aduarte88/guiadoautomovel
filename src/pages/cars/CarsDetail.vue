<template>
      
     <div class="car-card alt">
            <div class="meta">
              <div class="photo" v-bind:style="{ 'background-image': 'url(' + carDetail.photo + ')' }">
                </div>
              <ul class="details">
                 <li class="author">{{carDetail.author}}</li>
              </ul>
            </div>
            <div class="description">
             <h1>{{carDetail.subTitle}}</h1>
              <h2>{{carDetail.title}}</h2>
              <p> {{carDetail.body}}{{carDetail.body}}{{carDetail.body}}{{carDetail.body}}</p>
              
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



  data () {
    return {
      newsText: 'NewsPage2 Component'
    }
  },

  methods: {
    fetchData () {
      this.$store.dispatch('carDetail/getById', { params: this.fetchParams })
    }
  },
   
  computed: {
      
    ...mapState('carDetail', {
      carDetail: 'carDetail',
     // pagination: 'pagination',
      error: 'error',
      loading: 'loading'
    }),
    ...mapGetters('carDetail', [
      'isEmpty'
    ]),
    useInUrlQueryPropList () {
      /*
      return this.prepareQueryParamsMixin({
        limit: this.pagination.limit,
        page: this.pagination.page
      })
      */
    },
    fetchParams () {
      /*
      const pagination = this.prepareFetchParamsMixin({
        limit: this.pagination.limit,
        page: this.pagination.page
      })
      */
      const params = {
          id: this.$route.params.id
      }

      return params
      
    }
  },

  created () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>



</style>
