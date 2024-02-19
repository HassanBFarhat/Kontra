//ALL OF THE JSON DATA IS REPLICATING LEVELFOUR DATA!!! BE SURE TO CHANGE THIS!!!!!!!!!
//Jungle Level (stage 1),
const levelOne = {
    music:"music/1.mp3",
    label:"1",
    background: [{x: 0, y: 32, img: "backgrounds/random kontra level.png"}],
    ground: [{x: 0, y: 515, w: 3585, h: 50}, {x: 3850, y: 515, w: 2800, h: 50}, {x: 6790, y: 515, w: 895, h: 50},
        {x: 7685, y: 640, w: 530, h: 50}, {x: 8190, y: 515, w: 5231, h: 400}],
    lance: [{x: 0, y: 0}],
    soldier: [{x: 1600, y: 349}],
    sniper: [{x: 1200, y: 349}],
    trigger: [{x: 13421, y: 0, fn: (that) => {ASSET_MANAGER.pauseBackgroundMusic();that.game.addEntity(new TransitionScreen(that.game, levelOne, 0, 0, true));}}]
};

//waterfall level (stage 2)
const levelTwo = {
    music:"music/2.mp3",
    label:"2",
    background: [{x: 0, y: 32, img: "backgrounds/stage1.png"}],
    ground: [{x: 0, y: 515, w: 3585, h: 50}, {x: 3850, y: 515, w: 2800, h: 50}, {x: 6790, y: 515, w: 895, h: 50},
        {x: 7685, y: 640, w: 530, h: 50}, {x: 8190, y: 515, w: 5231, h: 400}],
    lance: [{x: 0, y: 0}],
    soldier:[{x: 1600, y: 349}],
    trigger: [{x: 100, y: 0, fn: () => {console.log("Hello!");}}]
};

//Snow level (stage 3)
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

//avi’s level (stage 4)
const levelFour = {
    music:"music/4.mp3",
    label:"4",
    background: [{x: 0, y: 32, img: "backgrounds/stage3"}],
    ground: [{x: 0, y: 515, w: 3585, h: 50}, {x: 3850, y: 515, w: 2800, h: 50}, {x: 6790, y: 515, w: 895, h: 50},
        {x: 7685, y: 640, w: 530, h: 50}, {x: 8190, y: 515, w: 5231, h: 400}],
    lance: [{x: 0, y: 0}],
    soldier:[{x: 1600, y: 349}],
    sniper: [{x: 1200, y: 349}],
    trigger: [{x: 100, y: 0, fn: () => {console.log("Hello!");}}]
};
