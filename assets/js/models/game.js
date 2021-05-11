class Game {
    constructor(canvasId) {
        this.intervalId = null

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 750
        this.canvas.height = 600
        this.background = new Background(this.ctx)
        this.spaceShip = new SpaceShip(this.ctx)
        this.invasores = []
        this.direction = 1
        this.score = new Score(this.ctx)
        this.lifes = []
        this.moveCount = 0
        this.difficulty = {
            bulletVelocity: 5,
            invasorMoveRate: 75
        }
        this.board = {
            rows: 2,
            cols: 9
        }
   }

    start() {
        this.addInvasors()
        this.addLifes()
        this.intervalId = setInterval(() => {
            this.clear()
            this.move()
            this.checkCollisions()
            this.checkIfNoInvasors()

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
         this.score.draw()
    }

    move() {
        this.background.move()
        this.spaceShip.move()
        this.moveCount = (this.moveCount + 1) % this.difficulty.invasorMoveRate
        if (this.moveCount === 0) {
            this.invasores[Math.floor(Math.random() * this.invasores.length)].weaponInvasor.shoot(this.difficulty.bulletVelocity)
            this.invasores.forEach(invasor => invasor.move())
            let speedChange = this.invasores.some(inv => inv.x + inv.w > this.ctx.canvas.width - 50 || inv.x < 50)
            if (speedChange) {
                this.invasores.forEach(invasor =>  {
                    invasor.y += 20
                    invasor.vx *= -1
                })
            }
        }
    }

    checkIfNoInvasors() {
        if (this.invasores.length === 0) {
            this.clearBullets()
            this.increaseDifficulty()
            this.addInvasors()
        }
    }

    increaseDifficulty() {
        if (this.board.rows < 4) {
            this.board.rows++
        }
        this.difficulty.invasorMoveRate -= 10
        this.difficulty.bulletVelocity += 2
        this.background.changeBackground()
    }


    onKeyEvent(event) {
        this.spaceShip.onKeyEvent(event)
    }

    addLifes() {
        for( let row = 0; row < 1; row++) {
            for (let col = 0; col < 3; col++) {
                const life = new Life(this.ctx, col * 25 + 625, row * 25 + 550)
                this.lifes.push(life)
            }
        }
    }


    addInvasors() {
        for( let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                const invasor = new Invasor(this.ctx, col * 65 + 93, row * 65 + 40)
                this.invasores.push(invasor)
            }
        }
    }
    
    clearLife(life) {
        this.lifes.pop()
        if (this.lifes.length === 0) {
            this.gameOver()
        }
    }

    clearBulletInv(invasor, bulletInv) {
        invasor.weaponInvasor.bulletsInv = invasor.weaponInvasor.bulletsInv.filter(bull => bull !== bulletInv)
    }

    clearBullet(bullet) {
        this.spaceShip.weapon.bullets = this.spaceShip.weapon.bullets.filter(bull => bull !== bullet)
    }

    clearBullets() {
        this.spaceShip.weapon.bullets = []
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
                    this.updateScore()
                }
            }
        }

        for (let invasor of this.invasores) {
            for (let bullet of invasor.weaponInvasor.bulletsInv) {
                if (this.spaceShip.collide(bullet)) {
                    this.clearLife()
                    this.clearBulletInv(invasor, bullet)
                }
            }
        }      
        for (let invasor of this.invasores) {
            if (this.spaceShip.collide(invasor)) {
                this.gameOver()
            }
        }
        
    }
    updateScore() {
        this.score.value += 20
      }

      gameOver() {
        clearInterval(this.intervalId)
    
        this.ctx.font = "40px Comic Sans MS";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
          "GAME OVER",
          this.ctx.canvas.width / 2,
          this.ctx.canvas.height / 2
        );
      }

}


        

  /*   Un marcador con la puntuación, otro marcador con la puntuación más alta
    Una barra de vida, que reste el 33% de la vida
    Incrementar la dificultad/ menos timpo

    La opción de parar el juego con un STOP!!

 */