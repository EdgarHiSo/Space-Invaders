class Life {
      constructor(ctx, x, y) {
        this.ctx = ctx
        this.isVisible = true
        this.x = x
        this.y = y


        this.w = 30
        this.h = 30

        this.vx = 0,5
        


        this.img = new Image()
        this.img.src = "assets/img/corazonROJO.png"
    }


    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
}