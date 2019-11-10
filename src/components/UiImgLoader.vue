<template>
  <div class="img-loader component">
    <div class="img-container" :class="{'is-loaded': !loading, 'is-animated': animated}">
      <img :src="src" :alt="alt" ref="image" v-show="!loading">
    </div>

    <div class="loading" v-if="loading">
      <PulseLoading></PulseLoading>
    </div>
  </div>
</template>

<script>
/**
 * @description Component check image loading status and show loading animation if image still not loaded
 */
import PulseLoading from './PulseLoading.vue'

export default {
  name: 'ImgLoader',
  components: {
    PulseLoading
  },
  props: {
    alt: {
      type: String
    },
    src: {
      type: String,
      required: true
    },
    animated: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    src: {
      handler: 'checkLoadingStatus',
      immediate: true
    }
  },

  data () {
    return {
      loading: true,
      error: false
    }
  },

  methods: {
    checkLoadingStatus () {
      this.loading = true
      let interval = setInterval(() => {
        if (this.$refs.image && this.$refs.image.complete) {
          this.loading = false
          clearInterval(interval)
        }
      }, 250)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
    opacity: 0.4;
}
img:hover {
    opacity: 1.0;
                  transition: opacity .55s ease-in-out;
                  -moz-transition: opacity .55s ease-in-out;
                  -webkit-transition: opacity .55s ease-in-out;
}
</style>
