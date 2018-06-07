var  Scene = function (game) {
    var s = {
        game,
    }
    // 初始化
    var player = Player(game)
    var enemy = []
    var enemys = 10
    var booms = []
    var ruan = ''
    //子弹速度
    var Archer = 20
    var bullets = []
    for (let i = 0; i < enemys; i ++) {
        let npc = Npc(game)
        enemy.push(npc)
    }

    game.score = 0


    game.registerAction('o' ,function () {
        for (let i = 0; i < enemy.length; i++) {
            let o = enemy[i]
            game.score += 100
            enemy.splice(i, 1)
            setTimeout(function () {
                enemy.push(Npc(game))
            },2000)
            let boom = o.boom()
            boom.x = o.x
            boom.y = o.y
            booms.push(boom)
            ruan = Ruan(game)
        }
    })

    s.update = function () {
        if (window.paused) {
            return
        }
        player.cooldown ++
        if (ruan !== '') {
            ruan.live --
            ruan.x --
            ruan.y --
            ruan.width += 2
            ruan.height += 2
        }

        game.registerAction('a' ,function () {
            player.moveLeft()
        })

        game.registerAction('d' ,function () {
            player.moveRight()
        })

        game.registerAction('w' ,function () {
            player.moveUp()
        })

        game.registerAction('s' ,function () {
            player.moveDown()
        })


//           开火
        game.registerAction('j' ,function () {
            if (player.cooldown % 10 == 0) {
                bullets.push(player.fire())
            }
        })


//          子弹移动
        for (let i = 0; i < bullets.length; i++) {
            let o = bullets[i]
            o.move()
        }
//          敌人移动
        for (let i = 0; i < enemy.length; i ++) {
            let npc = enemy[i]
            npc.move()
            if (npc.y > 600) {
                npc.death()
                enemy.splice(i, 1, Npc(game))
            }
            //               death
            if(npc.collide(player)) {
                var end = new SceneEnd(game)
                game.replaceScene(end)
            }
            for (let l = 0; l < bullets.length; l++) {
                let d = bullets[l]
//              击落
                if (npc.collide(d)) {
                    game.score += 100
                    enemy.splice(i, 1)
                    setTimeout(function () {
                        enemy.push(Npc(game))
                    },2000)
                    bullets.splice(l, 1)
                    let boom = npc.boom()
                    boom.x = d.x
                    boom.y = d.y
                    booms.push(boom)
                }
            }
        }
//          爆炸
        for(let i = 0;i < booms.length; i ++) {
            let o = booms[i];
            o.lives --
            if (o.lives < 0 ) {
                booms.splice(i,1)
            }
        }
    }
    s.draw = function () {
        // draw
        let bg = new Image()
        bg.src = 'img/sky.jpg'
        game.context.drawImage(bg, 0, 0, 400, 600)
        for (let i = 0; i < enemy.length; i ++) {
            let npc = enemy[i]
            if(npc.live) {
                game.drawImage(npc)
            }
        }

        if(ruan !== '') {
            if(ruan.live > 0) {
                if (ruan.live%2 == 0) {
                game.drawImage(ruan, ruan.width, ruan.height)
                }
            }

        }


        for (let i = 0; i < booms.length; i ++) {
            let b = booms[i]
            if(b.lives > 0) {
                game.drawImage(b,60, 60)
            }
        }
        for (let i = 0; i < bullets.length; i ++) {
            let o = bullets[i]
            if (o.y >= 0) {
                game.drawImage(o)
            } else {
                bullets.splice(i,1);
            }
        }
        game.drawImage(player)
        // draw labels
        this.game.context.font = '24px Arial'
        game.context.fillText('分数: ' + game.score, 70, 70)
    }
    return s
}