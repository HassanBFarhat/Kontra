const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("backgrounds/random kontra level.png");
ASSET_MANAGER.queueDownload("./sprites/Lance.png")
ASSET_MANAGER.queueDownload("./sprites/rectangle.png")

ASSET_MANAGER.downloadAll(function () {
	const gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById('gameWorld');
	const ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	gameEngine.addEntity(new Background(gameEngine, 0, 32));
	gameEngine.addEntity(new Lance(gameEngine, 0, 0));
	gameEngine.addEntity(new Ground(gameEngine, 0, 515, 264, 50));
	gameEngine.addEntity(new Ground(gameEngine, 300, 615, 264, 50));
	gameEngine.addEntity(new Ground(gameEngine, 600, 515, 264, 50));
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.init(ctx);
	
	gameEngine.start();
});
