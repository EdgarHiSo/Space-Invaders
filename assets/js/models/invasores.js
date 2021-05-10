class Invasor {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.isVisible = true
        this.w = 50
        this.h = 50
        this.x = x
        this.y = y
        this.vx = 15
        this.img = new Image()
        this.img.src = "assets/img/KMA_Space_Oohroo_spaceship_sprite.png"
        this.weaponInvasor = new WeaponInv(this)
    }


    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.weaponInvasor.draw()
        this.weaponInvasor.move()
    }

    isInvasorVisible() {
        return this.x < this.ctx.canvas.width && this.x > 0
    }


    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y

        if (collideX && collideY) {
            this.isVisible = false
        }
        return collideX && collideY
    }

    move(direction) {
        this.x += this.vx
    }
    

}