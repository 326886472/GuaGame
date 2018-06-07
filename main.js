var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
window.enable = false

var enableDebugMode = function(game) {
    if(!window.enable) {
        document.getElementById('plugin').style.display = 'none'
    } else {
        // div disable
        document.getElementById('plugin').style.display = 'block'
        // mouse event
        window.paused = false
        window.addEventListener('keydown', function(event){
            var k = event.key
            if (k == 'p') {
                // 暂停功能
                window.paused = !window.paused
            } else if ('1234567'.includes(k)) {
                // 为了 debug 临时加的载入关卡功能
                blocks = loadLevel(game, Number(k))
            }
        })
        // 控制速度
        document.querySelector('#id-speed').addEventListener('input', function(event) {
            var input = event.target.value
            // log(event, input.value)
            if (input != 0) {
                window.fps = Number(input)
            }
        })
    }

}

var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    var game =new GuaGame(60, images, function(g){
        var s = new SceneTitle(g);
        g.runWithScene(s);
    })

    var radio = document.querySelector('#id-debug')
    radio.onclick = function () {
        window.enable = this.checked
        enableDebugMode(game)
    }
    // enableDebugMode(game)
}

__main()