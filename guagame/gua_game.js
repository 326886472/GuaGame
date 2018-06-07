class GuaGame {
    constructor (fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        var canvas = document.querySelector('#id-canvas')
        var context = canvas.getContext('2d')
        this.canvas = canvas
        this.context = context
        // events
        // var g = this
        window.addEventListener('keydown', (event) =>{
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', (event) =>{
            this.keydowns[event.key] = false
        })
        this.loop()
    }
    drawImage (game) {
        var g = this
        g.context.drawImage(game.image, game.x, game.y)
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop () {
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.scene.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.scene.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    loop () {
        var self =this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(self.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = self.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                self.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    self.__start()
                }
            }
        }
    }
    imgByName (name) {
        var img = this.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    replaceScene (scene) {
        this.scene = scene
    }
    __start () {
        this.runCallback(this)
    }
    runWithScene (scene) {
        var self =this
        self.scene = scene
        // 开始运行程序
        setTimeout(function(){
            self.runloop()
        }, 1000/fps)
    }
}
// var GuaGame = function(fps, images, runCallback) {
//     // images 是一个对象, 里面是图片的引用名字和图片路径
//     // 程序会在所有图片载入成功后才运行
//     var g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: {},
//     }
//     var canvas = document.querySelector('#id-canvas')
//     var context = canvas.getContext('2d')
//     g.canvas = canvas
//     g.context = context
//     // draw
//     g.drawImage = function(guaImage) {
//         g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
//     }
//     // events
//     window.addEventListener('keydown', function(event){
//         g.keydowns[event.key] = true
//     })
//     window.addEventListener('keyup', function(event){
//         g.keydowns[event.key] = false
//     })
//     //
//     g.registerAction = function(key, callback) {
//         g.actions[key] = callback
//     }
//     // timer
//     window.fps = 60
//     var runloop = function() {
//         // events
//         var actions = Object.keys(g.actions)
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i]
//             if(g.keydowns[key]) {
//                 // 如果按键被按下, 调用注册的 action
//                 g.actions[key]()
//             }
//         }
//         // update
//         g.scene.update()
//         // clear
//         context.clearRect(0, 0, canvas.width, canvas.height)
//         // draw
//         g.scene.draw()
//         // next run loop
//         setTimeout(function(){
//             runloop()
//         }, 1000/window.fps)
//     }
//
//     //
//     var loads = []
//     // 预先载入所有图片
//     var names = Object.keys(images)
//     for (var i = 0; i < names.length; i++) {
//         let name = names[i]
//         var path = images[name]
//         let img = new Image()
//         img.src = path
//         img.onload = function() {
//             // 存入 g.images 中
//             g.images[name] = img
//             // 所有图片都成功载入之后, 调用 run
//             loads.push(1)
//             if (loads.length == names.length) {
//                 g.__start()
//             }
//         }
//     }
//     g.imgByName = function(name) {
//         var img = g.images[name]
//         var image = {
//             w: img.width,
//             h: img.height,
//             image: img,
//         }
//         return image
//     }
//     g.replaceScene = function(scene) {
//         g.scene = scene
//     }
//
//     g.__start = function (scene) {
//         runCallback(g)
//     }
//
//     g.runWithScene = function(scene) {
//         g.scene = scene
//         // 开始运行程序
//         setTimeout(function(){
//             runloop()
//         }, 1000/fps)
//     }
//
//     return g
// }