<template>
  <div class="co-table">
    <div class="co-thead" :style="{ '--theadHeight': theadHeight }">
      <div v-for="(item, index) in theadData" :key="index">{{ item }}</div>
    </div>
    <div class="co-body" :style="{ '--theadHeight': theadHeight }">
      <div class="co-body-tr" :style="{ '--pageSize': pageSize }">
        <div>1</div>
        <div>云翠社区</div>
        <div>20</div>
        <div>40</div>
        <div>90</div>
      </div>
      <div class="co-body-tr" :style="{ '--pageSize': pageSize }">
        <div>1</div>
        <div>云翠社区</div>
        <div>20</div>
        <div>40</div>
        <div>90</div>
      </div>
      <div class="co-body-tr" :style="{ '--pageSize': pageSize }">
        <div>1</div>
        <div>云翠社区</div>
        <div>20</div>
        <div>40</div>
        <div>90</div>
      </div>
      <div class="co-body-tr" :style="{ '--pageSize': pageSize }">
        <div>1</div>
        <div>云翠社区</div>
        <div>20</div>
        <div>40</div>
        <div>90</div>
      </div>
      <div class="co-body-tr" :style="{ '--pageSize': pageSize }">
        <div>1</div>
        <div>云翠社区</div>
        <div>20</div>
        <div>40</div>
        <div>90</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'co-table',
  props: {
    theadData: {
      type: Array,
      default: () => ['排名', '组织名称', '三会一课', '公益活动', '微心愿']
    },
    // 表头的高度,内容的高度是100%-表头/平均的分数
    theadHeight: {
      type: String,
      default: '20%'
    },
    pageSize: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.co-table {
  box-sizing: border-box;
  width: 500px;
  height: 500px;
  border: 1px solid red;
  .co-thead {
    width: 100%;
    height: var(--theadHeight);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid red;
  }
  .co-body {
    height: calc(100% - var(--theadHeight));
    display: flex;
    flex-direction: column;
    &-tr {
      height: calc(100% / var(--pageSize));
      border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
</style>
