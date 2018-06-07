var Ruan = function (game) {
    var o = game.imgByName('ruan');
    var canvas = document.querySelector('#id-canvas');
    o.x = 50;
    o.y = 75;
    o.speedX = 5;
    o.speedY = 5;
    o.live = 50;
    o.width = 300;
    o.height = 450;

    return o
};
