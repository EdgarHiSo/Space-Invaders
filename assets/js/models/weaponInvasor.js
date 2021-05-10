class WeaponInv {
    constructor(shooterInv) {
      this.shooterInv = shooterInv;
      this.bulletsInv = []
    }

    shoot(bulletVelocity) {
      const bulletInv = new BulletInv(
        this.shooterInv.ctx,
        this.shooterInv.x + this.shooterInv.w * 0.5,
        this.shooterInv.y + this.shooterInv.h * 0.5,
        5,
        5,
        bulletVelocity
      )
      this.bulletsInv.push(bulletInv)
    }


    draw() {
      this.bulletsInv.forEach(b => b.draw())
      this.clearBullets()
    }

    clearBullets() {
      this.bulletsInv = this.bulletsInv.filter(b => b.isVisible())
    }


    move() {
      this.bulletsInv.forEach(b => b.move())
    }
    
  }