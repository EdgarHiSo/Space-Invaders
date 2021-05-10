class SpaceShip {
    constructor(ctx) {
        this.ctx = ctx

        this.w = 90
        this.h = 60

        this.x = 375
        this.y = 500
        this.y0 = this.y

        this.vx = 0
        this.vy = 0
        this.ay = 0
        this.ax = 0
        this.g = 0.1


        this.img = new Image()
        this.img.src = "assets/img/navita-removebg-preview.png"

        this.weapon = new Weapon(this)

    }


    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.weapon.draw()
    }

    move() {

        this.vy += this.g
        this.y += this.vy
        this.x += this.vx

        if (this.y >= this.y0) {
            this.y = this.y0
        }

        this.weapon.move()
    }
    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y
        if (collideX && collideY) {
            this.isVisible = false
        }
        return collideX && collideY
    }


    onKeyEvent(event) {
        if (event.type === 'keydown') {
            switch (event.keyCode) {
                case KEY_LEFT:
                    if (this.x >= 0) {
                        this.vx = -5
                        
                    } else {
                        this.x = this.ctx.canvas.width - this.w
                        this.vx = 0
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.ctx.canvas.width - this.w) {
                        this.vx = 5
                    } else {
                        this.x = 0
                        this.vx = 0
                    }
                    break;
                case KEY_SPACE:
                    this.weapon.shoot()
                    this.vy = 5
            }
        } else {
            switch (event.keyCode) {
                case KEY_RIGHT:
                    this.vx = 0
                    break;
                case KEY_LEFT:
                    this.vx = 0
                    break;
            }
        }
    }
}