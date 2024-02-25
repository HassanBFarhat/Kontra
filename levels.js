//ALL OF THE JSON DATA IS REPLICATING LEVELFOUR DATA!!! BE SURE TO CHANGE THIS!!!!!!!!!
//avi’s level (stage 1)
const levelOne = {
    music:"music/1.mp3",
    label:"1",
    background: [{x: 0, y: 32, img: "backgrounds/random kontra level.png"}],
    ground: [{x: 0, y: 515, w: 3585, h: 50},
        {x: 3850, y: 515, w: 2800, h: 50},
        {x: 6790, y: 515, w: 895, h: 50},
        {x: 8190, y: 515, w: 5500, h: 400}],
    lance: [{x: 0, y: 0}],
    soldier: [{x: 1800, y: 349}, {x: 600, y: 349}, {x: 900, y: 349}, {x: 1500, y: 349}, {x: 1600, y: 349}, {x:1700, y: 349}, 
              {x: 4370, y: 349}, {x: 4470, y: 349}, {x: 4570, y: 349}, {x: 7000, y: 349}, {x: 7200, y: 349}, {x: 8800, y: 349}, 
              {x: 8900, y: 349}, {x: 9000, y: 349}, {x: 9100, y: 349}, {x: 11500, y: 349}, {x: 11900, y: 349}],
    sniper: [{x: 1200, y: 349}, {x: 4100, y: 349}, {x: 6000, y: 349}, {x: 6400, y: 349}, {x: 10600, y: 349}],
    trigger: [{x: 13421, y: 0, fn: (that) => {ASSET_MANAGER.pauseBackgroundMusic();that.game.addEntity(new TransitionScreen(that.game, levelTwo, 0, 0, false, ));}}]
};

//Jungle Level (stage 2),
const levelTwo = {
    music:"music/2.mp3",
    label:"2",
    background: [{x: 0, y: 32, img: "backgrounds/stage1.png"}],
    ground:[{"x":5504,"y":222,"w":2044,"h":20},{"x":8192,"y":222,"w":636,"h":20},{"x":9984,"y":222,"w":252,"h":20},{"x":12920,"y":234,"w":40,"h":20},{"x":128,"y":350,"w":2940,"h":20},{"x":3584,"y":350,"w":636,"h":20},{"x":4736,"y":350,"w":1020,"h":20},{"x":7424,"y":350,"w":892,"h":20},{"x":8960,"y":350,"w":252,"h":20},{"x":9856,"y":350,"w":252,"h":20},{"x":10368,"y":350,"w":252,"h":20},{"x":12032,"y":350,"w":508,"h":20},{"x":640,"y":478,"w":380,"h":20},{"x":1664,"y":478,"w":252,"h":20},{"x":6400,"y":478,"w":892,"h":20},{"x":8704,"y":478,"w":380,"h":20},{"x":9344,"y":478,"w":252,"h":20},{"x":10496,"y":478,"w":636,"h":20},{"x":11776,"y":478,"w":252,"h":20},{"x":12544,"y":478,"w":124,"h":20},{"x":2560,"y":542,"w":380,"h":20},{"x":6016,"y":542,"w":252,"h":20},{"x":8448,"y":542,"w":124,"h":20},{"x":10112,"y":542,"w":124,"h":20},{"x":12160,"y":542,"w":380,"h":20},{"x":1024,"y":606,"w":124,"h":20},{"x":1408,"y":606,"w":124,"h":20},{"x":7680,"y":606,"w":252,"h":20},{"x":8064,"y":606,"w":252,"h":20},{"x":9472,"y":606,"w":380,"h":20},{"x":11392,"y":606,"w":252,"h":20},{"x":12672,"y":606,"w":124,"h":20},{"x":1152,"y":734,"w":252,"h":20},{"x":2432,"y":734,"w":252,"h":20},{"x":5632,"y":734,"w":380,"h":20},{"x":6912,"y":734,"w":764,"h":20},{"x":9344,"y":734,"w":124,"h":20},{"x":9984,"y":734,"w":124,"h":20},{"x":10880,"y":734,"w":380,"h":20},{"x":12032,"y":734,"w":956,"h":20}],
    lance: [{x: 113, y: 0}],
    trigger: [{x: 13421, y: 0, fn: (that) => {ASSET_MANAGER.pauseBackgroundMusic();that.game.addEntity(new TransitionScreen(that.game, levelThree, 0, 0, false, ));}}]

};

//waterfall level (stage 3)
const levelThree = {
    music:"music/3.mp3",
    label:"3",
    background: [{x: 0, y: 32, img: "backgrounds/stage2.png"}],
    ground: [{x: 0, y: 515, w: 3585, h: 50}, {x: 3850, y: 515, w: 2800, h: 50}, {x: 6790, y: 515, w: 895, h: 50},
        {x: 7685, y: 640, w: 530, h: 50}, {x: 8190, y: 515, w: 5231, h: 400}],
    lance: [{x: 0, y: 0}],
    soldier:[{x: 1600, y: 349}],
    trigger: [{x: 100, y: 0, fn: () => {console.log("Hello!");}}]
};

//Snow level (stage 4)
const levelFour = {
    music:"music/4.mp3",
    label:"4",
    background: [{x: 0, y: 32, img: "backgrounds/stage3.png"}],
    ground: [{x: 0, y: 515, w: 3585, h: 50}, {x: 3850, y: 515, w: 2800, h: 50}, {x: 6790, y: 515, w: 895, h: 50},
        {x: 7685, y: 640, w: 530, h: 50}, {x: 8190, y: 515, w: 5231, h: 400}],
    lance: [{x: 0, y: 0}],
    soldier:[{x: 1600, y: 349}],
    sniper: [{x: 1200, y: 349}],
    trigger: [{x: 100, y: 0, fn: () => {console.log("Hello!");}}]
};
