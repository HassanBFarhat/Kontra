var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("backgrounds/random kontra level.png");
ASSET_MANAGER.queueDownload("./sprites/Lance.png")
ASSET_MANAGER.queueDownload("./sprites/rectangle.png")
// ASSET_MANAGER.queueDownload("./LanceMovingR+IdleR.png");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	gameEngine.addEntity(new Background(gameEngine, 0, 32));
	gameEngine.addEntity(new Lance(gameEngine, 0, 376));
	gameEngine.addEntity(new ground(gameEngine,0, 515, 264, 50));
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.init(ctx);
		
	
	gameEngine.start();
});
