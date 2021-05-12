class Bullet {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.vy = -5
  }

  draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, 5, 5)
  }

  move() {
    this.y += this.vy
  }

  increaseVelocity() {
    this.vy -= 10
  }


  isVisible() {
    return (
      this.x < this.ctx.canvas.width &&
      this.x > 0 &&
      this.y > 0 &&
      this.y < this.ctx.canvas.height
    )
  }

}
//fillRect(x, y, width, height)