const ASSET_MANAGER = new AssetManager();


//spritesheets and backgrounds
ASSET_MANAGER.queueDownload("backgrounds/random kontra level.png");
ASSET_MANAGER.queueDownload("backgrounds/stage1.png");
ASSET_MANAGER.queueDownload("backgrounds/stage2.png");
ASSET_MANAGER.queueDownload("backgrounds/stage3.png");

ASSET_MANAGER.queueDownload("backgrounds/kontra-title.png");
ASSET_MANAGER.queueDownload("./sprites/Lance.png");
ASSET_MANAGER.queueDownload("./sprites/Lance_2.png");
ASSET_MANAGER.queueDownload("./sprites/Lance_3.png");
ASSET_MANAGER.queueDownload("./sprites/bullet_1.png");
ASSET_MANAGER.queueDownload("./sprites/Soldier.png");
ASSET_MANAGER.queueDownload("./sprites/Sniper_2.png");


//music
ASSET_MANAGER.queueDownload("music/1.mp3");
ASSET_MANAGER.queueDownload("music/2.mp3");
ASSET_MANAGER.queueDownload("music/3.mp3");
ASSET_MANAGER.queueDownload("music/4.mp3");


ASSET_MANAGER.downloadAll(function () {
	const gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById('gameWorld');
	const ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	gameEngine.init(ctx);
	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});
