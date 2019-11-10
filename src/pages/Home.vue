<template>
      
      <DataBox :loading="loading" :isEmpty="isEmpty" :error="error">
       
        <div class="item" v-for="(car,index) in cars" :key="car.id">

          <div :class="getCarClass(index)">
        
            <div class="meta">
              <div class="photo" v-bind:style="{ 'background-image': 'url(' + car.photo + ')' }">
              
              </div>
              <ul class="details">
                <li class="author">{{car.author}}</li>
                <li class="tags">Views: {{getRandomNumber()}}</li>
                 
              </ul>
            </div>
            <div class="description">
              <h1>{{car.subTitle}}</h1>
              <h2>{{car.title}}</h2>
              <p> {{car.body}}</p>
              <p class="read-more">
                 <router-link :to="{ name: 'cars', params: { id: car.id } }">Read More</router-link>
              </p>
            </div>
          </div>
        </div>
      </DataBox>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

import prepareQueryParamsMixin from '../mixins/prepareQueryParamsMixin'
import prepareFetchParamsMixin from '../mixins/prepareFetchParamsMixin'

import DataBox from '../components/DataBox'
import UiImgLoader from '../components/UiImgLoader'

export default {
  name: 'NewsPage',
  mixins: [prepareQueryParamsMixin, prepareFetchParamsMixin],
  components: {
    DataBox
  },

  methods: {
    fetchData () {
      this.$store.dispatch('cars/getAll', { params: this.fetchParams })
    },
    getRandomNumber(){
      return Math.ceil(Math.random() * 1000);
    },
    getCarClass(index){
      return index+1 & 1 ? 'car-card alt' : 'car-card'; 
    }
  },

  computed: {
    ...mapState('cars', {
      cars: 'cars',
      //pagination: 'pagination',
      error: 'error',
      loading: 'loading'
    }),
    ...mapGetters('cars', [
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

      return { ...pagination }
      */
    }
  },

  created () {
    this.fetchData()
    
  }
}
</script>

<style lang="scss" scoped>



</style>
