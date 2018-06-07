var Ball = function (game) {
    var o = game.imgByName('ball');
    var canvas = document.querySelector('#id-canvas');
    o.x = 180;
    o.y = 200;
    o.speedX = 5;
    o.speedY = 5;
    o.fired = false;

    o.fire = function () {
        o.fired = true;
    };

    o.反弹 = function () {
        o.speedY *= -1;
    };

    o.反 = function () {
        o.speedY *= -1;
        o.speedX *= -1;
    };

    o.左回弹 = function () {
        o.speedY *= -1;
        o.speedX = -5;
    };

    o.右回弹 = function () {
        o.speedY *= -1;
        o.speedX = 5;
    };

    o.hasPoint = function (x, y) {
        var xIn = x >= o.x && x <= o.x + o.w;
        var yIn = y >= o.y && y <= o.y + o.h;
        return xIn && yIn
    };

    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > canvas.width - o.image.width) {
                o.speedX *= -1;
            }
            if (o.y < 0 || o.y > canvas.height - o.image.height) {
                o.speedY *= -1;
            }
            o.x += o.speedX;
            o.y -= o.speedY;
        }
    };
    return o
};
