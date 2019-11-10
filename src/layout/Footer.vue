<template>
  <div class="footer">
    <div class="wrapper">
     Guia do Automóvel ©  {{ currentYear }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  background-color: #5ad67d;
  padding: 9px 0;
  width: 100%;
  margin-top: auto;
}
</style>
