window.addEventListener('load', () => {
    const game = new Game("canvas")

    const startButton = document.getElementById('start-button')
    const pauseButton = document.getElementById('pause-button')
    const tryButton = document.getElementById('try-again-button')
    let start = false

    startButton.onclick = () => {
        if(!game.intervalId) {
            game.start()
            startButton.style.visibility = "hidden"
            start = !start
            pauseButton.style.visibility = "visible"
            tryButton.style.visibility = "visible"

        }
    }
    pauseButton.onclick = () => {

    }


    document.addEventListener("keydown", event => {
        console.log(event)
        if (event.key == 'x') {
        
            game.pauseGame()
        }
    })



    document.addEventListener("keydown", event => {
        game.onKeyEvent(event)
    })

    document.addEventListener("keyup", event => {
        game.onKeyEvent(event)
    })


})