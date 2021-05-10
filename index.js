window.addEventListener('load', () => {
    const game = new Game("canvas")

    document.getElementById('start-button').onclick = () => {
        if(!game.intervalId) {
            game.start()
        }
    }

    document.addEventListener("keydown", event => {
        game.onKeyEvent(event)
    })

    document.addEventListener("keyup", event => {
        game.onKeyEvent(event)
    })


})