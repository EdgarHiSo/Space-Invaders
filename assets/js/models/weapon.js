class Weapon {
    constructor(shooter) {
      this.shooter = shooter;
      this.bullets = []
    }

    shoot() {
      const bullet = new Bullet(
        this.shooter.ctx,
        this.shooter.x + this.shooter.w * 0.5,
        this.shooter.y + this.shooter.h * 0.5,
        5,
        5
      )

      this.bullets.push(bullet)
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