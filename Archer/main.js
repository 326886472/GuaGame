window.enable = false

var enableDebugMode = function(game) {
    // mouse event
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
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

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        player: 'img/player.gif',
        sky: 'img/sky.jpg',
        npc0: 'img/npc0.png',
        npc1: 'img/npc1.png',
        npc2: 'img/npc2.png',
        npc3: 'img/npc3.png',
        npc4: 'img/npc4.png',
        title: 'img/title.jpg',
        boom: 'img/boom.png',
        ruan: 'img/ruan.jpg',
    }
    var game =new GuaGame(60, images, function(g){
        var s = new SceneTitle(g);
        g.runWithScene(s);
    })

    var radio = document.querySelector('#id-debug')
    enableDebugMode(game)
}

__main()