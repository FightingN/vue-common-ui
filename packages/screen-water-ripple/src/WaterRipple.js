// 生成圆圈动态水波纹
/**参考文章:https://juejin.cn/post/6976190371370500103#heading-4 */
export default class WaterRipple {
  constructor(options) {
    console.log('id', options.id)
    this.id = options.id
    this.canvas = ''
    this.ctx = ''

    this.initCanvas().then(res => {
      var sinX = 0 // x轴
      var offsetY = 0.3 // 高度  -- 越大高度越高
      this.drawWave(res, sinX, offsetY, 0.06, 4, '#a4def6')
    })
  }
  initCanvas() {
    return new Promise(resolve => {
      this.canvas = document.getElementById(this.id)
      this.ctx = this.canvas.getContext('2d')
      // this.handleDpr()
      resolve(this.ctx)
    })
  }
  /**
   * 波浪线
   * @param ctx --canvas上下文
   * @param sinX -- 波浪线 sin坐标中 x轴的位置
   * @param offsetY -- 波浪线 在画布中的 高度比 画布垂直距离
   * @param waveW -- 波浪宽度
   * @param waveH -- 波浪深度
   * */
  drawWave(ctx, sinX, offsetY, waveW, waveH, color) {
    var canvasW = this.canvas.width
    var canvasH = this.canvas.height
    var offsetX = 0 // 波浪线 初始x轴坐标
    ctx.beginPath()
    ctx.lineWidth = 1
    for (var x = offsetX; x < canvasW; x += 20 / canvasW) {
      // 正弦曲线公式：y = Asin(ωx+φ) + k
      var y =
        waveH * Math.sin((offsetX + x) * waveW + sinX) + (1 - offsetY) * canvasH
      ctx.lineTo(x, y)
    }
    ctx.stroke()

    // 填充背景 水
    ctx.lineTo(canvasW, canvasH)
    ctx.lineTo(offsetX, canvasH)
    ctx.fillStyle = color
    ctx.fill()
  }
}
