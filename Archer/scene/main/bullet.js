var Bullet = function (game) {
    var o = game.imgByName('bullet');
    var canvas = document.querySelector('#id-canvas');
    o.speed = 10

    o.move = function () {
        o.y -= o.speed
    }

    o.death = function () {
        o.live = false
    }

    o.hasPoint = function (x, y) {
        var xIn = x >= o.x && x <= o.x + o.w;
        var yIn = y >= o.y && y <= o.y + o.h;
        return xIn && yIn
    };

    return o
};
