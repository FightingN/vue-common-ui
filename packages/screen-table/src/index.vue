<template>
  <div class="screen-custom-table" :style="{'--pageSize': pageSize}">
    <ul>
      <li class="table-header">
        <div class="table-td" v-for="(item, index) in headerList" :style="{width: Object.prototype.toString.call(item) == '[object Object]' ? item.width : '100%',
                cursor: Object.prototype.toString.call(item) == '[object Object]' ? item.isOrder?'pointer':'' : ''}" :data-index="index" :data-order="item.isOrder" @click="onReorder" :key="index">
          {{Object.prototype.toString.call(item) == '[object Object]' ? item.title : item}}
          <span v-if="(Object.prototype.toString.call(item) == '[object Object]' ? item.isOrder : false) && (orderIndex == index)" :class="orderAsc ? 'asc' : 'desc'"></span>
        </div>
      </li>
      <li class="table-body" v-if="dataList.length > 0" @mouseover="stopAnimation" @mouseout="startAnimation">
        <div class="scroll-view" id="scroll-view" :style="{top: top, transition: transition}">
          <div class="table-tr" :style="{backgroundColor: (isChangeColor && index % 2 !== 0)?rowColor:'',
                 '--isChangeColor': isChangeColor}" v-for="(item, index) in dataList" :key="index" @click="clickItemCb(index)">
            <div class="table-td" :style="{width: Object.prototype.toString.call(headerList[order]) == '[object Object]' ? headerList[order].width : '100%'}" v-for="(td, order) in item" :key="order">
              <div class="table-td-content" v-html="td"></div>
            </div>
          </div>
        </div>
        <div class="page-btn" v-show="isShowPageBtn">
          <div class="page-up" @click="onPageUp">∧</div>
          <div class="page-down" @click="onPageDown">∨</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'screen-table',
  data () {
    return {
      top: 0,
      scrollTime: 0,
      transition: 'top 1s linear',
      timer: '',
      isShowPageBtn: false,
      orderIndex: 0,
      orderAsc: true
    }
  },
  props: {
    headerList: {
      type: Array,
      required: true,
      default: () => []
    },
    dataList: {
      type: Array,
      required: true,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 5
    },
    // 是否隔行换色
    isChangeColor: {
      type: Boolean,
      default: false
    },
    // 隔行换色更换的颜色
    rowColor: {
      type: String,
      default: ''
    },
    // 是否调用动画
    animationShow: {
      type: Boolean,
      default: true // true 调用  false 不调用
    },
    clickItem: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dataList: {
      immediate: true,
      handler: function (newvalue) {
        if (newvalue.length > 0) {
          if (!this.animationShow) return false
          this.scrollView()
        }
      }
    }
  },
  methods: {
    scrollView () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.dataList.length % this.pageSize === 0) {
          if (this.scrollTime < this.dataList.length / this.pageSize - 1) {
            this.transition = 'top 1s linear'
            this.scrollTime += 1
            this.top = `-${100 * this.scrollTime}%`
          } else {
            this.transition = 'top 1s ease-in-out'
            this.top = '0px'
            this.scrollTime = 0
          }
        } else {
          if (this.scrollTime < Math.floor(this.dataList.length / this.pageSize)) {
            this.transition = 'top 1s linear'
            this.scrollTime += 1
            this.top = `-${100 * this.scrollTime}%`
          } else {
            this.transition = 'top 1s ease-in-out'
            this.top = '0px'
            this.scrollTime = 0
          }
        }
      }, 5000)
    },
    stopAnimation () {
      clearInterval(this.timer)
      this.isShowPageBtn = true
    },
    startAnimation () {
      this.scrollView()
      this.isShowPageBtn = false
    },
    onPageUp () {
      if (this.scrollTime > 0) {
        this.transition = 'top 0.4s linear'
        this.scrollTime -= 1
        this.top = `-${100 * this.scrollTime}%`
      }
    },
    onPageDown () {
      if (this.dataList.length % this.pageSize === 0) {
        if (this.scrollTime < this.dataList.length / this.pageSize - 1) {
          this.transition = 'top 0.4s linear'
          this.scrollTime += 1
          this.top = `-${100 * this.scrollTime}%`
        }
      } else {
        if (this.scrollTime < Math.floor(this.dataList.length / this.pageSize)) {
          this.transition = 'top 0.4s linear'
          this.scrollTime += 1
          this.top = `-${100 * this.scrollTime}%`
        }
      }
    },
    onReorder ($event) {
      if ($event.currentTarget.dataset.order) {
        this.orderIndex = $event.currentTarget.dataset.index
        if (this.orderAsc) {
          this.dataList.sort((a, b) => { return b[this.orderIndex] - a[this.orderIndex] })
        } else {
          this.dataList.sort((a, b) => { return a[this.orderIndex] - b[this.orderIndex] })
        }
        this.orderAsc = !this.orderAsc
      }
    },
    // 点击某条数据
    clickItemCb (index) {
      this.$emit('clickItemCb', { itemIndex: index })
    }
  }
}
</script>

<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.screen-custom-table {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ul {
    width: 100%;
    height: 100%;
    .table-header {
      height: 35px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #2a70e1;
      font-size: 15px;
      .table-td {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .asc {
          margin-top: 7px;
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          border-bottom: 5px solid #2a70e1;
          border-right: 5px solid #2c3e50;
          border-left: 5px solid #2c3e50;
          content: "";
        }
        .desc {
          margin-top: 7px;
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          border-top: 5px solid #2a70e1;
          border-right: 5px solid #2c3e50;
          border-left: 5px solid #2c3e50;
          content: "";
        }
      }
    }
    .table-body {
      width: 100%;
      height: calc(100% - 35px);
      overflow: hidden;
      position: relative;
      .scroll-view {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        .table-tr {
          width: 100%;
          box-sizing: border-box;
          height: calc(100% / var(--pageSize));
          display: flex;
          align-items: center;
          .table-td {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-items: center;
            overflow: hidden;
            &-content {
              width: 100%;
              color: #fff;
              font-size: 14px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: center;
            }
          }
          & + .table-tr {
            border-top: 1px solid #47556f9b;
          }
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
      .page-btn {
        position: absolute;
        right: 0px;
        top: 30%;
        cursor: pointer;
        .page-up,
        .page-down {
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          width: 30px;
          height: 50px;
          border-radius: 6px;
          background-color: rgba(255, 255, 255, 0.3);
          & + .page-down {
            margin-top: 10px;
          }
          &:hover {
            background-color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
    .loading-box {
      width: 100%;
      height: calc(100% - 35px);
    }
    .no-data {
      width: 100%;
      height: calc(100% - 35px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.8);
      font-size: 18px;
    }
  }
}
</style>
