const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("backgrounds/random kontra level.png");
ASSET_MANAGER.queueDownload("./sprites/Lance.png");
ASSET_MANAGER.queueDownload("./sprites/Lance_2.png");
ASSET_MANAGER.queueDownload("./sprites/Lance_3.png");
ASSET_MANAGER.queueDownload("./sprites/bullet_1.png");
ASSET_MANAGER.queueDownload("./sprites/Soldier.png");

ASSET_MANAGER.downloadAll(function () {
	const gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById('gameWorld');
	const ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	gameEngine.addEntity(new Background(gameEngine, 0, 32));
	gameEngine.addEntity(new Lance(gameEngine, 0, 0));
	gameEngine.addEntity(new Soldier(gameEngine, 1600, 349, [{x: 1600, y: 349}, {x: 1200, y: 349}, {x: 800, y: 349}, {x: 400, y: 349}, {x: -20, y: 349}]));
	gameEngine.addEntity(new Ground(gameEngine, 0, 515, 3585, 50));
	gameEngine.addEntity(new Ground(gameEngine, 3850, 515, 2800, 50));
	gameEngine.addEntity(new Ground(gameEngine, 6790, 515, 895, 50));
	gameEngine.addEntity(new Ground(gameEngine, 7685, 640, 530, 50));
	gameEngine.addEntity(new Ground(gameEngine, 8190, 515, 5231, 400));
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.init(ctx);
	
	gameEngine.start();
});
