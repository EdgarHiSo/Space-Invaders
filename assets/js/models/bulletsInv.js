class BulletInv {
    constructor(ctx, x, y, w, h) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.vy = 5
    }

    draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, 5, 5)
    }

    move() {

      this.y += this.vy

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