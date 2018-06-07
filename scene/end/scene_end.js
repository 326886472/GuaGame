// var SceneEnd = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     game.registerAction('r', function () {
//         var start = Scene(game)
//         game.replaceScene(start)
//     })
//     s.draw = function() {
//         // draw labels
//         game.context.fillText('游戏结束,按"r"重新开始', 150, 150)
//     }
//     s.update = function() {
//
//     }
//     return s
// }

class SceneEnd extends GuaScene {
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
        this.game.context.fillText('游戏结束', 200, 120)
        this.game.context.fillText('得分：' + this.game.score, 200, 150)
        this.game.context.fillText('按"R"重新开始', 200, 180)
    }
}
