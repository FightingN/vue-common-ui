export default function CircleProgress (canvas, opts) {
  this.ctx = canvas.getContext('2d')
  this.size = Math.min(canvas.clientWidth, canvas.clientHeight)
  this.radius = opts.radius
  this.lineWidth = opts.lineWidth
  this.step = opts.step
  this.degreeStart = opts.degreeStart
  this.percent = opts.percent
  this.activeColor = opts.activeColor
  this.bgColor = opts.bgColor
  this.current = opts.degreeStart
  this.id = null
}

CircleProgress.prototype.render = function () {
  this.ctx.clearRect(0, 0, this.size, this.size)
  this.ctx.beginPath()
  this.ctx.lineWidth = this.lineWidth
  this.ctx.strokeStyle = this.bgColor
  this.ctx.arc(this.size / 2, this.size / 2, this.radius - this.lineWidth / 2, 0, 2 * Math.PI, false)
  this.ctx.stroke()
  this.ctx.closePath()
  // this.renderPercent()
  this.renderPercentWidthAnimation()
}

CircleProgress.prototype.renderPercent = function () {
  this.ctx.beginPath()
  this.ctx.lineWidth = this.lineWidth
  this.ctx.lineCap = 'round'
  this.ctx.strokeStyle = this.activeColor
  this.ctx.arc(this.size / 2, this.size / 2, this.radius - this.lineWidth / 2, this.degreeStart * Math.PI / 180, (this.degreeStart + (360 * this.percent / 100)) * Math.PI / 180, false)
  this.ctx.stroke()
  this.ctx.closePath()
}

CircleProgress.prototype.renderPercentWidthAnimation = function () {
  const degreeEnd = this.degreeStart + 360 * this.percent / 100
  cancelAnimationFrame(this.id)
  this.id = requestAnimationFrame(() => {
    if ((degreeEnd - this.step < this.current && this.current < degreeEnd) || (degreeEnd + this.step > this.current && this.current > degreeEnd)) {
      this.current = degreeEnd
      this.ctx.beginPath()
      this.ctx.lineWidth = this.lineWidth
      this.ctx.lineCap = 'round'
      this.ctx.strokeStyle = this.activeColor
      this.ctx.arc(this.size / 2, this.size / 2, this.radius - this.lineWidth / 2, this.degreeStart * Math.PI / 180, this.current * Math.PI / 180, false)
      this.ctx.stroke()
      this.ctx.closePath()
    } else if (this.current < degreeEnd) {
      this.current += this.step
      this.ctx.beginPath()
      this.ctx.lineWidth = this.lineWidth
      this.ctx.lineCap = 'round'
      this.ctx.strokeStyle = this.activeColor
      this.ctx.arc(this.size / 2, this.size / 2, this.radius - this.lineWidth / 2, this.degreeStart * Math.PI / 180, this.current * Math.PI / 180, false)
      this.ctx.stroke()
      this.ctx.closePath()
      this.renderPercentWidthAnimation()
    } else if (this.current > degreeEnd) {
      this.current -= this.step
      this.ctx.beginPath()
      this.ctx.lineWidth = this.lineWidth
      this.ctx.lineCap = 'round'
      this.ctx.strokeStyle = this.activeColor
      this.ctx.arc(this.size / 2, this.size / 2, this.radius - this.lineWidth / 2, this.degreeStart * Math.PI / 180, this.current * Math.PI / 180, false)
      this.ctx.stroke()
      this.ctx.closePath()
      this.renderPercentWidthAnimation()
    }
  })
}
