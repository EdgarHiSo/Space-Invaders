class Background {

  constructor(ctx) {
    this.ctx = ctx

    this.x = 0
    this.y = 0

    this.h = this.ctx.canvas.height
    this.w = this.ctx.canvas.width

    this.vx = -1

    this.backgrounds = ['assets/img/galaxias/jdjd.jpeg', 'assets/img/galaxias/background.jpeg', 'assets/img/galaxias/galxxi.jpeg']
    this.img = new Image()
    this.imgPosition = 0
    this.img.src = this.backgrounds[this.imgPosition]
  }

  changeBackground() {
    this.imgPosition = (this.imgPosition + 1) % 3
    this.img.src = this.backgrounds[this.imgPosition]
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.ctx.drawImage(
      this.img,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    )
  }

  move() {
    this.x += this.vx

    if (this.x <= -this.w) {
      this.x = 0
    }
  }
}