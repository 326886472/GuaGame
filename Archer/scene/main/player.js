var Player = function (game) {
    var o = game.imgByName('player');
    var canvas = document.querySelector('#id-canvas');
    o.x = 180;
    o.y = 500;
    o.speed = 10;
    o.cooldown = 0;

    o.move = function () {
        if (o.x < 0) {
            o.x = 0
        }
        if (o.x + o.w >= 400) {
            o.x = 400 - o.w
        }
        if (o.y < 0) {
            o.y = 0
        }
        if (o.y + o.h >= 600) {
            o.y = 600 - o.h
        }
    }

    o.moveLeft = function () {
        o.x -= o.speed
        o.move()
    };

    o.moveRight = function () {
        o.x += o.speed;
        o.move()

    };

    o.moveUp = function () {
        o.y -= o.speed;
        o.move()

    };

    o.moveDown = function () {
        o.y += o.speed;
        o.move()

    };

    o.fire = function () {
        let b = Bullet(game)
        let x = o.x + o.w/2 - b.w/2
        let y = o.y - 5
        b.x = x
        b.y = y
        return b
    }

    return o
};
