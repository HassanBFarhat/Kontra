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
    ground: [{x: 110, y: 350, w: 5630, h: 50},
        {x: 620, y: 485, w: 365, h: 30},
        {x: 1015, y: 600, w: 130, h: 20},
        {x: 1150, y: 730, w: 260, h: 50},
        {x: 1400, y: 600, w: 130, h: 20},
        {x: 1665, y: 485, w: 260, h: 50},
        {x: 2430, y: 730, w: 260, h: 50},
        {x: 2550, y: 540, w: 380, h: 50},
        {x: 5650, y: 730, w: 355, h: 50},
        {x: 5520, y: 210, w: 2000, h: 10},
        {x: 7450, y: 350, w: 1000, h: 50},
        {x: 6050, y: 540, w: 190, h: 50},
        {x: 6420, y: 475, w: 840, h: 50},
        {x: 7000, y: 730, w: 2000, h: 10},
        {x: 7690, y: 600, w: 250, h: 50},
        {x: 8060, y: 600, w: 250, h: 50},
        {x: 8190, y: 515, w: 5231, h: 400}],
    lance: [{x: 113, y: 0}],
    trigger: [{x: 100, y: 0, fn: () => {console.log("Hello!");}}]
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
