var Npc = function (game) {
    var npcName = 'npc' + Math.floor(Math.random() * 5)
    var o = game.imgByName(npcName);
    var canvas = document.querySelector('#id-canvas');
    var random = function () {
        return Math.floor(Math.random() * 10)
    }
    o.live = true;
    o.x = random() * 40;
    o.y = -o.h - random() * 10;
    o.speed = random() * 0.5 + 2;
    o.live = true

    o.boom = function () {
        let b = game.imgByName('boom')
        b.lives = 50
        return b
    }

    o.move = function () {
        o.y += o.speed
    }

    o.death = function () {
        o.live = false
    }


    var aInb = function (x, x1, x2) {
        return x >= x1 && x <= x2
    };

    o.collide = function (bullet) {
        var a = o;
        var b = bullet;
        if (aInb(a.x, b.x, b.x + b.image.width) || aInb(b.x, a.x, a.x + a.image.width)) {
            if (aInb(a.y, b.y, b.y + b.image.height) || aInb(b.y, a.y, a.y + a.image.height)) {
               return true
            }
        }
    };
    return o
};
