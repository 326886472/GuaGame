var Paddle = function (game) {
    var o = game.imgByName('paddle');
    o.speed = 5;
    o.w = 100;
    o.h = 20;
    o.x = 150;
    o.y = 240;
    o.moveLeft = function () {
        if (o.x > 0) {
            o.x -= o.speed;
        }
    };
    o.moveRight = function () {
        if (o.x + o.image.width < 400) {
            o.x += o.speed;
        }
    };
    var aInb = function (x, x1, x2) {
        return x >= x1 && x <= x2
    };
    o.collide = function (ball) {
        var a = o;
        var b = ball;
        if (aInb(a.x, b.x, b.x + b.image.width) || aInb(b.x, a.x, a.x + a.image.width)) {
            if (aInb(a.y, b.y, b.y + b.image.height) || aInb(b.y, a.y, a.y + a.image.height)) {
                // 左回弹
                if (a.x+a.w/4 + b.w/2 > b.x ) {
                    return 1
                } else {
                // 右回弹
                    return 2
                }
            }
        }
        return false
    };
    return o;
};
