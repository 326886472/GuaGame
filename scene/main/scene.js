var  Scene = function (game) {
    var s = {
        game,
    }
    // 初始化
    var ball = Ball(game)

    var paddle = Paddle(game)

    game.score = 0

    var level = 1

    blocks = loadLevel(game, level)

    // 进入下一关
    blocks.graveyard = 0
    NextLevel = function () {
        var b = blocks
        b.graveyard ++
        log(b.graveyard,b.length)
        if (b.graveyard >= b.length) {
            level ++
            if(level-1 >= levels.length) {
                var tas = new SceneTas(game)
                game.replaceScene(tas)
            }else {
                blocks = loadLevel(game, level)
                blocks.graveyard = 0
                var o =ball
                o.fired = false
                o.x = 180;
                o.y = 200;
                o.speedX = 5;
                o.speedY = 5;
            }

        }
    }

    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })

    // mouse event
    var enableDrag = false;
    game.canvas.addEventListener('mousedown', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        if (ball.hasPoint(x,y)) {
            enableDrag = true;
        }
    });
    game.canvas.addEventListener('mousemove', function (event) {
        if (enableDrag) {
            ball.x = event.offsetX;
            ball.y = event.offsetY;
        }
    })
    game.canvas.addEventListener('mouseup', function () {
        enableDrag = false;
    })

    s.update = function () {
        if (window.paused) {
            return
        }

        if (ball.y > paddle.y + paddle.h) {
            // 跳转到 游戏结束 的场景
            var end = new SceneEnd(game)
            game.replaceScene(end)
        }

        ball.move()
        // 判断相撞
        switch (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            case 1:
                ball.左回弹()
                break
            case 2:
                ball.右回弹()
                break
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            switch (block.collide(ball)) {
                case 1:
                    block.kill(
                        NextLevel
                    )
                    ball.反弹()
                    game.score += 100
                    break
                case 2:
                    block.kill(
                        NextLevel
                    )
                    ball.反()
                    game.score += 100
                    break
            }

        }
    }
    s.draw = function () {
        // draw
        let bg = new Image()
        bg.src = 'img/timg.jpg'
        game.context.drawImage(bg, 0, 0, 400, 300)
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('分数: ' + game.score, 70, 270)
    }
    return s
}