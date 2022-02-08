/***
难点:计算圆圈点的中心点
*/
export default class CircleCanvas {
  constructor(options) {
    this.id = options.id
    this.canvas = ''
    this.x = options.x
    this.y = options.y
    this.percentage = options.percentage
    this.fontColor = options.fontColor
    this.fontSize = options.fontSize
    this.circleColor = options.circleColor
    this.circleWidth = options.circleWidth
    this.progressColor = options.progressColor
    this.progressWidth = options.progressWidth
    this.pointRadius = options.pointRadius
    this.pointColor = options.pointColor
    this.visiblePoint = options.visiblePoint
    this.startDeg = options.startDeg
    this.step = options.step
    this.visibleGradient = options.visibleGradient
    this.gradient = ''
    this.lineGradientColor = options.lineGradientColor
    this.radius = options.radius //圆的半径
    this.initCanvas().then(res => {
      this.animateDraw(this.startDeg, this.step)
    })
  }
  initCanvas() {
    return new Promise(resolve => {
      this.canvas = document.getElementById(this.id)
      this.ctx = this.canvas.getContext('2d')
      this.handleDpr()
      resolve(this.ctx)
    })
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
  }
  drawCircle() {
    this.ctx.beginPath() // 开始一条路径，或重置当前的路径
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI) // 参数3是圆的半径
    this.ctx.strokeStyle = this.circleColor
    this.ctx.lineWidth = this.circleWidth
    this.ctx.stroke() // stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
  }
  drawText(current) {
    this.ctx.font = `${this.fontSize}px Arial,"Microsoft YaHei"`
    this.ctx.fillStyle = this.fontColor
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    // this.ctx.fillText(this.percentage + '%', this.canvas.clientWidth / 2, this.canvas.clientWidth / 2)//处理dpr位置不对
    current = Math.round(current) + '%'
    this.ctx.fillText(current, this.x, this.x)
  }
  drawProgressCircle(current) {
    if (this.visibleGradient) {
      this.gradient = this.ctx.createLinearGradient(
        this.radius,
        0,
        this.radius,
        this.radius * 2
      )
      this.lineGradientColor.forEach(item => {
        this.gradient.addColorStop(item.percent, item.color)
      })
    }
    this.ctx.strokeStyle = this.visibleGradient
      ? this.gradient
      : this.progressColor
    this.ctx.lineWidth = this.progressWidth
    this.ctx.beginPath()
    this.ctx.lineCap = 'round'
    /***
      目标值计算公式: Math.PI * (1.5 + (2 * this.percentage) / 100)
    */
    this.ctx.arc(
      this.x,
      this.y,
      this.radius,
      this.deg2Arc(270),
      Math.PI * (1.5 + (2 * current) / 100)
    ) // 参数3是圆的半径
    // this.ctx.arc(this.x, this.y, this.radius, this.deg2Arc(270), this.deg2Arc(90)) // 参数3是圆的半径
    this.ctx.stroke()
  }
  drawPoint(current) {
    let nextDeg = this.getTargetDegByPercentage(current)
    // -90是因为计算出来的角度跟实际有偏差
    const pointPosition = this.getPositionsByDeg(nextDeg - 90)
    this.ctx.fillStyle = this.pointColor
    this.ctx.beginPath()
    // this.ctx.arc(this.x, this.y + this.radius, this.pointRadius, 0, this.deg2Arc(360))
    this.ctx.arc(
      pointPosition.x + this.pointRadius,
      pointPosition.y + this.pointRadius,
      this.pointRadius,
      0,
      this.deg2Arc(360)
    )
    this.ctx.fill()
  }
  animateDraw(current, step) {
    this.clearCanvas()
    cancelAnimationFrame(animationId)
    this.drawCircle()
    this.drawText(current)
    this.drawProgressCircle(current)
    if (this.visiblePoint && this.percentage !== 100) {
      this.drawPoint(current)
    }
    let animationId = requestAnimationFrame(() => {
      if (this.percentage > current) {
        // 解决js一直累加,会出现小数的bug把所有数乘以1000即：num*1000;然后累加得到sum,然后除以1000即：sum=sum/1000;
        current = current * 1000
        step = step * 1000
        current += step
        current = current / 1000
        this.animateDraw(current, this.step)
      } else {
        cancelAnimationFrame(animationId)
      }
    })
  }
  // 处理失真
  handleDpr() {
    // 参考链接:https://blog.csdn.net/leyyang/article/details/52245445?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.no_search_link&spm=1001.2101.3001.4242.1
    const dpr = Math.max(window.devicePixelRatio, 1)
    // 调整画布物理像素
    this.canvas.width = this.x * 2 * dpr
    this.canvas.height = this.x * 2 * dpr
    // 同时用scale处理倍率
    this.ctx.scale(dpr, dpr)
  }
  // deg转弧度
  deg2Arc(deg) {
    return (deg / 180) * Math.PI
  }
  // 计算圆点的坐标参考教程:https://juejin.cn/post/6844903990610624520#heading-17或https://blog.csdn.net/abld99/article/details/50886937
  getPositionsByDeg(deg) {
    // realx：真实的x坐标
    // realy：真实的y坐标
    // resultx：平移后求取的x坐标
    // resultx：平移后求取的y坐标
    // pointRadius 圆点半径
    // realx = resultx + pointRadius
    // realy = resulty + pointRadius
    let x = 0
    let y = 0
    if (deg >= 0 && deg <= 90) {
      // 0~90度
      x = this.radius * (1 + Math.cos(this.deg2Arc(deg)))
      y = this.radius * (1 + Math.sin(this.deg2Arc(deg)))
    } else if (deg > 90 && deg <= 180) {
      // 90~180度
      x = this.radius * (1 - Math.cos(this.deg2Arc(180 - deg)))
      y = this.radius * (1 + Math.sin(this.deg2Arc(180 - deg)))
    } else if (deg > 180 && deg <= 270) {
      // 180~270度
      x = this.radius * (1 - Math.sin(this.deg2Arc(270 - deg)))
      y = this.radius * (1 - Math.cos(this.deg2Arc(270 - deg)))
    } else {
      // 270~360度
      x = this.radius * (1 + Math.cos(this.deg2Arc(360 - deg)))
      y = this.radius * (1 - Math.sin(this.deg2Arc(360 - deg)))
    }
    return { x, y }
  }
  // 根据开始角度和进度百分比求取目标角度
  getTargetDegByPercentage(percentage) {
    if (percentage === 100) {
      return this.startDeg + 360
    } else {
      const targetDeg = (this.startDeg + (360 * percentage) / 100) % 360
      return targetDeg
    }
  }
}
