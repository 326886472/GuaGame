
class SceneTitle extends GuaScene {
    constructor (game) {
        super(game)
        // 初始化
        game.registerAction('k', function () {
            var start = Scene(game)
            game.replaceScene(start)
        })
    }
    draw () {
        // draw labels
        var titleImg = new Image
        titleImg.src = 'img/title.jpg'
        this.game.context.drawImage(titleImg, 0, 0, 400 , 300)
        this.game.context.textAlign = 'center'
        this.game.context.font = '24px Arial'
        this.game.context.fillStyle  = '#fff'
        this.game.context.fillText('按 K 开始游戏', 200, 150)
    }
}
