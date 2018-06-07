class SceneTas extends GuaScene {
    constructor (game) {
        super(game)
        // 初始化
        game.registerAction('r', function () {
            var start = Scene(game)
            game.replaceScene(start)
        })
    }
    draw () {
        // draw labels
        var end = new Image
        end.src = 'img/game_over.jpg'
        this.game.context.drawImage(end, 0, 0, 400 , 300)
        this.game.context.fillText('恭喜游戏通关', 200, 120)
        this.game.context.fillText('按"R"重新开始', 200, 180)
    }
}
