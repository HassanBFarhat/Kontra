class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0; // Scene Camera Position

        this.gameOver = false;

        this.lance = new Lance(this.game, this.x, 154);

        this.lance.velocity = { x: 0, y: 0 };

        this.lance.state = 0; //loads in idle state

        this.loadLevel(levelOne, 2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true);

        this.debugCheckbox = document.getElementById("debug");
    };

    loadLevel(level) {

        this.game.entities = [];
        this.x = 0;

        for (var i = 0; i < level.background.length; i++) {
            let backgrounds = level.background[i];
            this.game.addEntity(new Background(this.game, backgrounds.x, backgrounds.y));
        }

        for (var i = 0; i < level.ground.length; i++) {
            let grounds = level.ground[i];
            this.game.addEntity(new Ground(this.game, grounds.x, grounds.y, grounds.w, grounds.h));
        }

        for (var i = 0; i < level.lance.length; i++) {
            let lances = level.lance[i];
            this.game.addEntity(new Lance(this.game, lances.x, lances.y));
        }

        for (var i = 0; i < level.soldier.length; i++) {
            let soldiers = level.soldier[i];
            this.game.addEntity(new Soldier(this.game, soldiers.x, soldiers.y, [{x: 1600, y: 349}, {x: 1200, y: 349}, {x: 800, y: 349}, {x: 400, y: 349}, {x: -20, y: 349}]));
        }
    }

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    update() {
        const midpoint = PARAMS.CANVAS_WIDTH / 2 - this.lance.width / 2;

        if (this.x < this.game.lance.x - midpoint) this.x = this.game.lance.x - midpoint;

        // Check if debug checkbox is checked
        PARAMS.DEBUG = this.debugCheckbox.checked;
    };
 
    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
            ctx.strokeStyle = "White";
            ctx.lineWidth = 2;


            ctx.fillText(`FPS: ${this.game.timer.ticks.length}`, 5, 25)
            ctx.strokeStyle = this.game.left ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6 * PARAMS.BLOCKWIDTH - 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("L", 6 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.down ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("D", 6.5 * PARAMS.BLOCKWIDTH + 2, 3.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.strokeStyle = this.game.up ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH - 4, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("U", 6.5 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2);
            ctx.strokeStyle = this.game.right ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("R", 7 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            ctx.strokeStyle = this.game.A ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(8.25 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText("A", 8 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.B ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(9 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText("B", 8.75 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            ctx.translate(0, 10);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle;
        }
    };

}