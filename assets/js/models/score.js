class Score {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 20
        this.y = 575
        this.value = 0
    }
    draw() {
        this.ctx.font = "23px Arial"
        this.ctx.fillText(`Score: ${this.value}!`, this.x, this.y)
    }
    calculateScore() {

    }
}