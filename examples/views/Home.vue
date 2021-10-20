<template>
  <div class="home">
    <co-button type="primary">提交</co-button>
    <!-- <co-table :theadData="theadData"></co-table> -->
    <screen-loading></screen-loading>
    <screen-dropdown-menu width="200px"></screen-dropdown-menu>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      theadData: ['排名', '组织名称', '三会一课', '公益活动', '微心愿']
    }
  },
  components: {}
}
</script>
<style scoped>
.home {
  /* background: #061a3b; */
  background: #2c3e50;
  padding: 50px;
}
</style>
