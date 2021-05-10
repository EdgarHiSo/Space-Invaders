class Game {
    constructor(canvasId) {
        this.intervalId = null

        const canvas = document.getElementById(canvasId)
        this.ctx = canvas.getContext('2d')

        canvas.width = 750
        canvas.height = 600
        this.background = new Background(this.ctx)
        this.spaceShip = new SpaceShip(this.ctx)
        this.invasores = []
        this.direction = 1
        this.score = new Score(this.ctx)
        this.lifes = [new Life(this.ctx)]
        this.moveCount = 0
   }

    start() {
        this.addInvasor()
        this.addLifes()
        this.intervalId = setInterval(() => {
            this.clear()
            this.move()
            this.draw()
        }, 1000 / 60)

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    }

    draw() {
         this.background.draw()
         this.spaceShip.draw()
         this.invasores.forEach(i => i.draw())
         this.lifes.forEach(l => l.draw())
         this.checkCollisions()
         this.clearInvasor()
         this.clearBullet()
         this.score.draw()
    }
// this.invasores[0].weaponInvasor.shoot()
    move() {
        this.background.move()
        this.spaceShip.move()
        if (this.moveCount++ === 100) {
            this.invasores[Math.floor(Math.random()* this.invasores.length)].weaponInvasor.shoot()
            this.invasores.forEach(invasor =>  invasor.move())
            let speedChange = this.invasores.some(inv => inv.x + inv.w > this.ctx.canvas.width - 50 || inv.x < 50)
            if (speedChange) {
                this.invasores.forEach(invasor =>  {
                    invasor.y += 20
                    invasor.vx *= -1
                })
            }
            this.moveCount = 0
        }
    }

    stop() {

    }

    onKeyEvent(event) {
        this.spaceShip.onKeyEvent(event)
    }

    updateScore() {

    }

    addLifes() {
        for( let row = 0; row < 1; row++) {
            for (let col = 0; col < 3; col++) {
                const life = new Life(this.ctx, col * 25 + 625, row * 25 + 550)
                this.lifes.push(life)
            }
        }
    }


    addInvasor() {
        for( let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                const invasor = new Invasor(this.ctx, col * 65 + 93, row * 65 + 40)
                this.invasores.push(invasor) // x EXISTE
            }
        }
    }
 /*    clearLife(life) {
        this.lifes = this.lifes.filter(lif => lif !== life)
        
    }
    clearBulletInv(bulletInv) {
        this.invasores.weaponInvasor.bulletsInv = this.invasores.weaponInvasor.bulletsInv.filter(bull => bull !== bulletInv)
    } */

    clearBullet(bullet) {
        this.spaceShip.weapon.bullets = this.spaceShip.weapon.bullets.filter(bull => bull !== bullet)
    }

    clearInvasor(invasor) {
        this.invasores = this.invasores.filter(inv => inv !== invasor)
    }

    checkCollisions() {
        for (let bullet of this.spaceShip.weapon.bullets) {
            for (let invasor of this.invasores) {
                if (invasor.collide(bullet)) {
                    this.clearInvasor(invasor)
                    this.clearBullet(bullet)
                }
            }
        }
      
        
    }

}


        

  /*   Un marcador con la puntuación, otro marcador con la puntuación más alta
    Una barra de vida, que reste el 33% de la vida
    Incrementar la dificultad/ menos timpo

    La opción de parar el juego con un STOP!!

 */