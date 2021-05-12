class Weapon {
  constructor(shooter) {
    this.shooter = shooter;
    this.bullets = []
    this.canShoot = true
  }

  shoot() {
    if (this.canShoot) {
      this.canShoot = false
      const bullet = new Bullet(
        this.shooter.ctx,
        this.shooter.x + this.shooter.w * 0.5,
        this.shooter.y + this.shooter.h * 0.5,
        5,
        5
      )
      this.bullets.push(bullet)
      setTimeout(() => {
        this.canShoot = true
      }, 200)
    }
  }


  draw() {
    this.bullets.forEach(b => b.draw())
    this.clearBullets()
  }

  clearBullets() {
    this.bullets = this.bullets.filter(b => b.isVisible())
  }


  move() {
    this.bullets.forEach(b => b.move())
  }
}