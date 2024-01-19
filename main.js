var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
		
	// TODO: SceneManager and valid gameEngine
	// new SceneManager(gameEngine);
	gameEngine.start();
});
